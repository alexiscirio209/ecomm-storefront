"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import Divider from "@modules/common/components/divider"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeLike(selectedPaymentMethod) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div
      className={clx(
        "bg-transparent shadow-none border-none py-6 px-4",
        "lg:bg-white lg:rounded-2xl lg:shadow-sm lg:border lg:border-gray-100 lg:p-6 lg:small:p-8"
      )}
    >
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center lg:mb-8">
        <Heading
          level="h2"
          className={clx("flex flex-row items-center justify-center gap-x-3", {
            "opacity-50 pointer-events-none select-none":
              !isOpen && !paymentReady,
          })}
        >
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-normal pb-1 lg:text-2xl lg:small:text-3xl">
            Pago
          </span>
          {!isOpen && paymentReady && (
            <CheckCircleSolid
              className={clx("text-green-500 w-5 h-5", "lg:w-6 lg:h-6")}
            />
          )}
        </Heading>
        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            className="mt-2 text-sm font-semibold text-[#9057d4] hover:text-[#f53fd5] transition-colors duration-200"
            data-testid="edit-payment-button"
          >
            Editar
          </button>
        )}
      </div>

      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <>
              {/* Metodos de pago */}
              <div className="mb-4 lg:mb-6">
                <RadioGroup
                  value={selectedPaymentMethod}
                  onChange={(value: string) => setPaymentMethod(value)}
                >
                  <div className="space-y-4 lg:space-y-3">
                    {availablePaymentMethods.map((paymentMethod) => (
                      <div key={paymentMethod.id}>
                        {isStripeLike(paymentMethod.id) ? (
                          <StripeCardContainer
                            paymentProviderId={paymentMethod.id}
                            selectedPaymentOptionId={selectedPaymentMethod}
                            paymentInfoMap={paymentInfoMap}
                            setCardBrand={setCardBrand}
                            setError={setError}
                            setCardComplete={setCardComplete}
                          />
                        ) : (
                          <PaymentContainer
                            paymentInfoMap={paymentInfoMap}
                            paymentProviderId={paymentMethod.id}
                            selectedPaymentOptionId={selectedPaymentMethod}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {paidByGiftcard && (
            <div className="mb-4 lg:mb-6">
              <div className="flex flex-col items-center text-center">
                <Text className="text-sm font-bold text-gray-800 mb-2">
                  Método de Pago
                </Text>
                <Text
                  className="text-sm text-gray-600"
                  data-testid="payment-method-summary"
                >
                  Gift card
                </Text>
              </div>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          {/* Submit */}
          <div className="flex justify-center pt-4 lg:pt-0">
            <Button
              size="large"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={
                (isStripeLike(selectedPaymentMethod) && !cardComplete) ||
                (!selectedPaymentMethod && !paidByGiftcard)
              }
              data-testid="submit-payment-button"
              className={clx(
                "w-full h-12 rounded-xl font-bold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] hover:shadow-xl hover:scale-[1.02] active:scale-100 active:shadow-md min-h-[48px]",
                "lg:w-auto lg:h-auto lg:min-h-0 lg:px-8 lg:py-3",
                {
                  "opacity-50 cursor-not-allowed hover:scale-100":
                    (isStripeLike(selectedPaymentMethod) && !cardComplete) ||
                    (!selectedPaymentMethod && !paidByGiftcard),
                }
              )}
            >
              {!activeSession && isStripeLike(selectedPaymentMethod)
                ? "Ingresar datos de tarjeta"
                : "Continuar a revisión"}
            </Button>
          </div>
        </div>

        {/* Resumen */}
        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="space-y-4 lg:space-y-6">
              <div className="flex flex-col items-center text-center">
                <Text className="text-sm font-bold text-gray-800 mb-2">
                  Método de Pago
                </Text>
                <Text
                  className="text-sm text-gray-600"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[activeSession?.provider_id]?.title ||
                    activeSession?.provider_id}
                </Text>
              </div>
              <div className="flex flex-col items-center text-center">
                <Text className="text-sm font-bold text-gray-800 mb-2">
                  Detalles de Pago
                </Text>
                <div
                  className="flex gap-2 text-sm text-gray-600 items-center justify-center"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-7 w-fit p-2 bg-gray-100 rounded-lg">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text>
                    {isStripeLike(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : "Otro paso aparecerá"}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col items-center text-center">
              <Text className="text-sm font-bold text-gray-800 mb-2">
                Método de Pago
              </Text>
              <Text
                className="text-sm text-gray-600"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          ) : null}
        </div>
      </div>

      <Divider
        className={clx("mt-6 border-gray-200", "lg:mt-8 lg:border-gray-100")}
      />
    </div>
  )
}

export default Payment
