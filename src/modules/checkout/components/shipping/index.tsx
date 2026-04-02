"use client"

import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Button, clx, Heading, Text } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"
import MedusaRadio from "@modules/common/components/radio"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) {
    return ""
  }

  let ret = ""

  if (address.address_1) {
    ret += ` ${address.address_1}`
  }

  if (address.address_2) {
    ret += `, ${address.address_2}`
  }

  if (address.postal_code) {
    ret += `, ${address.postal_code} ${address.city}`
  }

  if (address.country_code) {
    ret += `, ${address.country_code.toUpperCase()}`
  }

  return ret
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)

  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup"
  )

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!_pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[p.value?.id || ""] = p.value?.amount!))

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      }
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)

    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON)
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF)
    }

    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)

        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="w-full">
      {/* Móvil */}
      <div className="lg:hidden px-4">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <Heading
            level="h2"
            className={clx(
              "flex flex-row items-center justify-center gap-x-3",
              {
                "opacity-50 pointer-events-none select-none":
                  !isOpen && cart.shipping_methods?.length === 0,
              }
            )}
          >
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-tight pb-1 inline-block">
              Entrega
            </span>
            {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
              <CheckCircleSolid className="text-green-500 w-5 h-5" />
            )}
          </Heading>
          {!isOpen &&
            cart?.shipping_address &&
            cart?.billing_address &&
            cart?.email && (
              <button
                onClick={handleEdit}
                className="mt-2 text-sm font-semibold text-[#9057d4] hover:text-[#f53fd5] transition-colors duration-200"
                data-testid="edit-delivery-button"
              >
                Editar
              </button>
            )}
        </div>

        {isOpen ? (
          <div className="space-y-4 pb-6">
            {/* Método de Envío */}
            <div className="space-y-4">
              <div className="flex flex-col mb-2">
                <span className="font-medium text-gray-800 text-sm">
                  Método de envío
                </span>
                <span className="text-gray-500 text-sm">
                  ¿Cómo desea que le entreguemos su pedido?
                </span>
              </div>
              <div data-testid="delivery-options-container">
                <div className="pt-2 space-y-4">
                  {hasPickupOptions && (
                    <RadioGroup
                      value={showPickupOptions}
                      onChange={(value) => {
                        const id = _pickupMethods.find(
                          (option) => !option.insufficient_inventory
                        )?.id

                        if (id) {
                          handleSetShippingMethod(id, "pickup")
                        }
                      }}
                    >
                      <Radio
                        value={PICKUP_OPTION_ON}
                        data-testid="delivery-option-radio"
                        className={clx(
                          "flex items-center justify-between text-small-regular cursor-pointer py-4 px-4 border rounded-xl mb-4 hover:shadow-md transition-shadow",
                          {
                            "border-[#0856b5] bg-[#0856b5]/5":
                              showPickupOptions === PICKUP_OPTION_ON,
                          }
                        )}
                      >
                        <div className="flex items-center gap-x-4">
                          <div
                            className={clx(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                              {
                                "border-[#0856b5] bg-[#0856b5]":
                                  showPickupOptions === PICKUP_OPTION_ON,
                                "border-gray-300":
                                  showPickupOptions !== PICKUP_OPTION_ON,
                              }
                            )}
                          >
                            {showPickupOptions === PICKUP_OPTION_ON && (
                              <div className="w-2.5 h-2.5 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="text-base-regular text-gray-700">
                            Recoge tu pedido
                          </span>
                        </div>
                        <span className="justify-self-end text-gray-600 font-medium">
                          -
                        </span>
                      </Radio>
                    </RadioGroup>
                  )}
                  <RadioGroup
                    value={shippingMethodId}
                    onChange={(v) => {
                      if (v) {
                        return handleSetShippingMethod(v, "shipping")
                      }
                    }}
                  >
                    {_shippingMethods?.map((option) => {
                      const isDisabled =
                        option.price_type === "calculated" &&
                        !isLoadingPrices &&
                        typeof calculatedPricesMap[option.id] !== "number"

                      return (
                        <Radio
                          key={option.id}
                          value={option.id}
                          data-testid="delivery-option-radio"
                          disabled={isDisabled}
                          className={clx(
                            "flex items-center justify-between text-small-regular cursor-pointer py-4 px-4 border rounded-xl mb-4 hover:shadow-md transition-shadow",
                            {
                              "border-[#0856b5] bg-[#0856b5]/5":
                                option.id === shippingMethodId,
                              "hover:shadow-none cursor-not-allowed opacity-50":
                                isDisabled,
                            }
                          )}
                        >
                          <div className="flex items-center gap-x-4">
                            <div
                              className={clx(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                {
                                  "border-[#0856b5] bg-[#0856b5]":
                                    option.id === shippingMethodId,
                                  "border-gray-300":
                                    option.id !== shippingMethodId,
                                }
                              )}
                            >
                              {option.id === shippingMethodId && (
                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                              )}
                            </div>
                            <span className="text-base-regular text-gray-700">
                              {option.name}
                            </span>
                          </div>
                          <span className="justify-self-end text-gray-800 font-semibold">
                            {option.price_type === "flat" ? (
                              convertToLocale({
                                amount: option.amount!,
                                currency_code: cart?.currency_code,
                              })
                            ) : calculatedPricesMap[option.id] ? (
                              convertToLocale({
                                amount: calculatedPricesMap[option.id],
                                currency_code: cart?.currency_code,
                              })
                            ) : isLoadingPrices ? (
                              <Loader />
                            ) : (
                              "-"
                            )}
                          </span>
                        </Radio>
                      )
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>

            {/* Recoger en Tienda */}
            {showPickupOptions === PICKUP_OPTION_ON && (
              <div className="space-y-4 pt-4">
                <div className="flex flex-col mb-2">
                  <span className="font-medium text-gray-800 text-sm">
                    Almacén
                  </span>
                  <span className="text-gray-500 text-sm">
                    Elige una tienda cercana a ti
                  </span>
                </div>
                <div data-testid="delivery-options-container">
                  <div className="pt-2 space-y-4">
                    <RadioGroup
                      value={shippingMethodId}
                      onChange={(v) => {
                        if (v) {
                          return handleSetShippingMethod(v, "pickup")
                        }
                      }}
                    >
                      {_pickupMethods?.map((option) => {
                        return (
                          <Radio
                            key={option.id}
                            value={option.id}
                            disabled={option.insufficient_inventory}
                            data-testid="delivery-option-radio"
                            className={clx(
                              "flex items-center justify-between text-small-regular cursor-pointer py-4 px-4 border rounded-xl mb-4 hover:shadow-md transition-shadow",
                              {
                                "border-[#0856b5] bg-[#0856b5]/5":
                                  option.id === shippingMethodId,
                                "hover:shadow-none cursor-not-allowed opacity-50":
                                  option.insufficient_inventory,
                              }
                            )}
                          >
                            <div className="flex items-start gap-x-4">
                              <div
                                className={clx(
                                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                  {
                                    "border-[#0856b5] bg-[#0856b5]":
                                      option.id === shippingMethodId,
                                    "border-gray-300":
                                      option.id !== shippingMethodId,
                                  }
                                )}
                              >
                                {option.id === shippingMethodId && (
                                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-base-regular text-gray-700">
                                  {option.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {formatAddress(
                                    option.service_zone?.fulfillment_set
                                      ?.location?.address
                                  )}
                                </span>
                              </div>
                            </div>
                            <span className="justify-self-end text-gray-800 font-semibold">
                              {convertToLocale({
                                amount: option.amount!,
                                currency_code: cart?.currency_code,
                              })}
                            </span>
                          </Radio>
                        )
                      })}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-center pt-4">
              <ErrorMessage
                error={error}
                data-testid="delivery-option-error-message"
              />
              <Button
                size="large"
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={!cart.shipping_methods?.[0]}
                data-testid="submit-delivery-option-button"
                className={clx(
                  "w-full h-12 rounded-xl font-bold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] hover:shadow-xl hover:scale-[1.02] active:scale-100 active:shadow-md min-h-[48px]",
                  {
                    "opacity-50 cursor-not-allowed hover:scale-100":
                      !cart.shipping_methods?.[0],
                  }
                )}
              >
                Continuar con el pago
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex flex-col items-center text-center">
                <Text className="text-sm font-bold text-gray-800 mb-2">
                  Método de Envío
                </Text>
                <Text className="text-sm text-gray-600 leading-relaxed">
                  {cart.shipping_methods!.at(-1)!.name}{" "}
                  {convertToLocale({
                    amount: cart.shipping_methods!.at(-1)!.amount!,
                    currency_code: cart?.currency_code,
                  })}
                </Text>
              </div>
            )}
          </div>
        )}

        <Divider className="mt-6 border-gray-200" />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 small:p-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <Heading
            level="h2"
            className={clx(
              "flex flex-row items-center justify-center gap-x-3",
              {
                "opacity-50 pointer-events-none select-none":
                  !isOpen && cart.shipping_methods?.length === 0,
              }
            )}
          >
            <span className="text-2xl small:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-tight pb-1 inline-block">
              Entrega
            </span>
            {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
              <CheckCircleSolid className="text-green-500 w-6 h-6" />
            )}
          </Heading>
          {!isOpen &&
            cart?.shipping_address &&
            cart?.billing_address &&
            cart?.email && (
              <button
                onClick={handleEdit}
                className="mt-2 text-sm font-semibold text-[#9057d4] hover:text-[#f53fd5] transition-colors duration-200"
                data-testid="edit-delivery-button"
              >
                Editar
              </button>
            )}
        </div>

        {isOpen ? (
          <div className="space-y-6 pb-8">
            {/* Método de Envío */}
            <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 border border-gray-100">
              <div className="flex flex-col mb-4">
                <span className="font-medium text-gray-800 text-sm">
                  Método de envío
                </span>
                <span className="text-gray-500 text-sm">
                  ¿Cómo desea que le entreguemos su pedido?
                </span>
              </div>
              <div data-testid="delivery-options-container">
                <div className="pt-2">
                  {hasPickupOptions && (
                    <RadioGroup
                      value={showPickupOptions}
                      onChange={(value) => {
                        const id = _pickupMethods.find(
                          (option) => !option.insufficient_inventory
                        )?.id

                        if (id) {
                          handleSetShippingMethod(id, "pickup")
                        }
                      }}
                    >
                      <Radio
                        value={PICKUP_OPTION_ON}
                        data-testid="delivery-option-radio"
                        className={clx(
                          "flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-xl px-6 mb-2 hover:shadow-md transition-shadow",
                          {
                            "border-[#0856b5] bg-[#0856b5]/5":
                              showPickupOptions === PICKUP_OPTION_ON,
                          }
                        )}
                      >
                        <div className="flex items-center gap-x-4">
                          <div
                            className={clx(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                              {
                                "border-[#0856b5] bg-[#0856b5]":
                                  showPickupOptions === PICKUP_OPTION_ON,
                                "border-gray-300":
                                  showPickupOptions !== PICKUP_OPTION_ON,
                              }
                            )}
                          >
                            {showPickupOptions === PICKUP_OPTION_ON && (
                              <div className="w-2.5 h-2.5 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="text-base-regular text-gray-700">
                            Recoge tu pedido
                          </span>
                        </div>
                        <span className="justify-self-end text-gray-600 font-medium">
                          -
                        </span>
                      </Radio>
                    </RadioGroup>
                  )}
                  <RadioGroup
                    value={shippingMethodId}
                    onChange={(v) => {
                      if (v) {
                        return handleSetShippingMethod(v, "shipping")
                      }
                    }}
                  >
                    {_shippingMethods?.map((option) => {
                      const isDisabled =
                        option.price_type === "calculated" &&
                        !isLoadingPrices &&
                        typeof calculatedPricesMap[option.id] !== "number"

                      return (
                        <Radio
                          key={option.id}
                          value={option.id}
                          data-testid="delivery-option-radio"
                          disabled={isDisabled}
                          className={clx(
                            "flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-xl px-6 mb-2 hover:shadow-md transition-shadow",
                            {
                              "border-[#0856b5] bg-[#0856b5]/5":
                                option.id === shippingMethodId,
                              "hover:shadow-none cursor-not-allowed opacity-50":
                                isDisabled,
                            }
                          )}
                        >
                          <div className="flex items-center gap-x-4">
                            <div
                              className={clx(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                {
                                  "border-[#0856b5] bg-[#0856b5]":
                                    option.id === shippingMethodId,
                                  "border-gray-300":
                                    option.id !== shippingMethodId,
                                }
                              )}
                            >
                              {option.id === shippingMethodId && (
                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                              )}
                            </div>
                            <span className="text-base-regular text-gray-700">
                              {option.name}
                            </span>
                          </div>
                          <span className="justify-self-end text-gray-800 font-semibold">
                            {option.price_type === "flat" ? (
                              convertToLocale({
                                amount: option.amount!,
                                currency_code: cart?.currency_code,
                              })
                            ) : calculatedPricesMap[option.id] ? (
                              convertToLocale({
                                amount: calculatedPricesMap[option.id],
                                currency_code: cart?.currency_code,
                              })
                            ) : isLoadingPrices ? (
                              <Loader />
                            ) : (
                              "-"
                            )}
                          </span>
                        </Radio>
                      )
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>

            {/* Recoger en tienda */}
            {showPickupOptions === PICKUP_OPTION_ON && (
              <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 border border-gray-100">
                <div className="flex flex-col mb-4">
                  <span className="font-medium text-gray-800 text-sm">
                    Almacén
                  </span>
                  <span className="text-gray-500 text-sm">
                    Elige una tienda cercana a ti
                  </span>
                </div>
                <div data-testid="delivery-options-container">
                  <div className="pt-2">
                    <RadioGroup
                      value={shippingMethodId}
                      onChange={(v) => {
                        if (v) {
                          return handleSetShippingMethod(v, "pickup")
                        }
                      }}
                    >
                      {_pickupMethods?.map((option) => {
                        return (
                          <Radio
                            key={option.id}
                            value={option.id}
                            disabled={option.insufficient_inventory}
                            data-testid="delivery-option-radio"
                            className={clx(
                              "flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-xl px-6 mb-2 hover:shadow-md transition-shadow",
                              {
                                "border-[#0856b5] bg-[#0856b5]/5":
                                  option.id === shippingMethodId,
                                "hover:shadow-none cursor-not-allowed opacity-50":
                                  option.insufficient_inventory,
                              }
                            )}
                          >
                            <div className="flex items-start gap-x-4">
                              <div
                                className={clx(
                                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                  {
                                    "border-[#0856b5] bg-[#0856b5]":
                                      option.id === shippingMethodId,
                                    "border-gray-300":
                                      option.id !== shippingMethodId,
                                  }
                                )}
                              >
                                {option.id === shippingMethodId && (
                                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-base-regular text-gray-700">
                                  {option.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {formatAddress(
                                    option.service_zone?.fulfillment_set
                                      ?.location?.address
                                  )}
                                </span>
                              </div>
                            </div>
                            <span className="justify-self-end text-gray-800 font-semibold">
                              {convertToLocale({
                                amount: option.amount!,
                                currency_code: cart?.currency_code,
                              })}
                            </span>
                          </Radio>
                        )
                      })}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-center">
              <ErrorMessage
                error={error}
                data-testid="delivery-option-error-message"
              />
              <Button
                size="large"
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={!cart.shipping_methods?.[0]}
                data-testid="submit-delivery-option-button"
                className={clx(
                  "px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] hover:shadow-xl hover:scale-[1.02] active:scale-100 active:shadow-md",
                  {
                    "opacity-50 cursor-not-allowed hover:scale-100":
                      !cart.shipping_methods?.[0],
                  }
                )}
              >
                Continuar con el pago
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 border border-gray-100">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex flex-col items-center text-center">
                <Text className="text-sm font-bold text-gray-800 mb-2">
                  Método de Envío
                </Text>
                <Text className="text-sm text-gray-600 leading-relaxed">
                  {cart.shipping_methods!.at(-1)!.name}{" "}
                  {convertToLocale({
                    amount: cart.shipping_methods!.at(-1)!.amount!,
                    currency_code: cart?.currency_code,
                  })}
                </Text>
              </div>
            )}
          </div>
        )}

        <Divider className="mt-8 border-gray-100" />
      </div>
    </div>
  )
}

export default Shipping
