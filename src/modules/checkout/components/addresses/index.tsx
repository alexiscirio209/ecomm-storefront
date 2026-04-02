"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (message === "success") {
      router.push(pathname + "?step=delivery")
      setMessage(null)
    }
  }, [message, router, pathname])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const result = await setAddresses(null, formData)

    if (result?.success) {
      setMessage("success")
    } else {
      setMessage(result?.error || "Error al guardar la dirección")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="w-full">
      {/* Móvil */}
      <div className="lg:hidden px-4">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <Heading
            level="h2"
            className="flex flex-row items-center justify-center gap-x-3"
          >
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]">
              Dirección de Envío
            </span>
            {!isOpen && <CheckCircleSolid className="text-green-500 w-5 h-5" />}
          </Heading>

          {!isOpen && cart?.shipping_address && (
            <button
              onClick={handleEdit}
              className="mt-2 text-sm font-semibold text-[#9057d4] hover:text-[#f53fd5] transition-colors duration-200"
              data-testid="edit-address-button"
            >
              Editar
            </button>
          )}
        </div>

        {isOpen ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 pb-6">
              <div className="space-y-4">
                <ShippingAddress
                  customer={customer}
                  checked={sameAsBilling}
                  onChange={toggleSameAsBilling}
                  cart={cart}
                />
              </div>

              {!sameAsBilling && (
                <div className="space-y-4 pt-4">
                  <div className="flex flex-col items-center justify-center mb-4 text-center">
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]">
                      Dirección de Facturación
                    </span>
                  </div>
                  <BillingAddress cart={cart} />
                </div>
              )}

              <div className="flex justify-center pt-4">
                <SubmitButton
                  className="w-full h-12 rounded-xl font-bold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] hover:shadow-xl hover:scale-[1.02] active:scale-100 active:shadow-md min-h-[48px]"
                  data-testid="submit-address-button"
                >
                  {isSubmitting ? "Procesando..." : "Continuar al Envío"}
                </SubmitButton>
              </div>

              <ErrorMessage
                error={message}
                data-testid="address-error-message"
              />
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 gap-4">
                <div
                  className="space-y-1"
                  data-testid="shipping-address-summary"
                >
                  <Text className="text-sm font-bold text-gray-800">
                    Dirección de Envío
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.shipping_address.first_name}{" "}
                    {cart.shipping_address.last_name}
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.shipping_address.address_1}{" "}
                    {cart.shipping_address.address_2}
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.shipping_address.postal_code},{" "}
                    {cart.shipping_address.city}
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.shipping_address.country_code?.toUpperCase()}
                  </Text>
                </div>

                <div
                  className="space-y-1"
                  data-testid="shipping-contact-summary"
                >
                  <Text className="text-sm font-bold text-gray-800">
                    Contacto
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.shipping_address.phone}
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.email}
                  </Text>
                </div>

                <div
                  className="space-y-1"
                  data-testid="billing-address-summary"
                >
                  <Text className="text-sm font-bold text-gray-800">
                    Dirección de Facturación
                  </Text>
                  {sameAsBilling ? (
                    <Text className="text-sm text-gray-500">
                      Misma que la dirección de envío
                    </Text>
                  ) : (
                    <>
                      <Text className="text-sm text-gray-600 leading-relaxed">
                        {cart.billing_address?.first_name}{" "}
                        {cart.billing_address?.last_name}
                      </Text>
                      <Text className="text-sm text-gray-600 leading-relaxed">
                        {cart.billing_address?.address_1}{" "}
                        {cart.billing_address?.address_2}
                      </Text>
                      <Text className="text-sm text-gray-600 leading-relaxed">
                        {cart.billing_address?.postal_code},{" "}
                        {cart.billing_address?.city}
                      </Text>
                      <Text className="text-sm text-gray-600 leading-relaxed">
                        {cart.billing_address?.country_code?.toUpperCase()}
                      </Text>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <Spinner />
              </div>
            )}
          </div>
        )}

        <Divider className="mt-6 border-gray-200" />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 small:p-8">
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <Heading
            level="h2"
            className="flex flex-row items-center justify-center gap-x-3"
          >
            <span className="text-2xl small:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]">
              Dirección de Envío
            </span>
            {!isOpen && <CheckCircleSolid className="text-green-500 w-6 h-6" />}
          </Heading>

          {!isOpen && cart?.shipping_address && (
            <button
              onClick={handleEdit}
              className="mt-2 text-sm font-semibold text-[#9057d4] hover:text-[#f53fd5] transition-colors duration-200"
              data-testid="edit-address-button"
            >
              Editar
            </button>
          )}
        </div>

        {isOpen ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 pb-8">
              <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 border border-gray-100">
                <ShippingAddress
                  customer={customer}
                  checked={sameAsBilling}
                  onChange={toggleSameAsBilling}
                  cart={cart}
                />
              </div>

              {!sameAsBilling && (
                <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 border border-gray-100">
                  <div className="flex flex-col items-center justify-center mb-8 text-center">
                    <span className="text-2xl small:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]">
                      Dirección de Facturación
                    </span>
                  </div>
                  <BillingAddress cart={cart} />
                </div>
              )}

              <div className="flex justify-center">
                <SubmitButton
                  className="px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] hover:shadow-xl hover:scale-[1.02] active:scale-100 active:shadow-md"
                  data-testid="submit-address-button"
                >
                  {isSubmitting ? "Procesando..." : "Continuar al Envío"}
                </SubmitButton>
              </div>

              <ErrorMessage
                error={message}
                data-testid="address-error-message"
              />
            </div>
          </form>
        ) : (
          <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 border border-gray-100">
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="space-y-2"
                  data-testid="shipping-address-summary"
                >
                  <Text className="text-sm font-bold text-gray-800 mb-2">
                    Dirección de Envío
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.shipping_address.first_name}{" "}
                    {cart.shipping_address.last_name}
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.shipping_address.address_1}{" "}
                    {cart.shipping_address.address_2}
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.shipping_address.postal_code},{" "}
                    {cart.shipping_address.city}
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.shipping_address.country_code?.toUpperCase()}
                  </Text>
                </div>

                <div
                  className="space-y-2"
                  data-testid="shipping-contact-summary"
                >
                  <Text className="text-sm font-bold text-gray-800 mb-2">
                    Contacto
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.shipping_address.phone}
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    {cart.email}
                  </Text>
                </div>

                <div
                  className="space-y-2"
                  data-testid="billing-address-summary"
                >
                  <Text className="text-sm font-bold text-gray-800 mb-2">
                    Dirección de Facturación
                  </Text>
                  {sameAsBilling ? (
                    <Text className="text-sm text-gray-500">
                      Misma que la dirección de envío
                    </Text>
                  ) : (
                    <>
                      <Text className="text-sm text-gray-600 leading-relaxed">
                        {cart.billing_address?.first_name}{" "}
                        {cart.billing_address?.last_name}
                      </Text>
                      <Text className="text-sm text-gray-600 leading-relaxed">
                        {cart.billing_address?.address_1}{" "}
                        {cart.billing_address?.address_2}
                      </Text>
                      <Text className="text-sm text-gray-600 leading-relaxed">
                        {cart.billing_address?.postal_code},{" "}
                        {cart.billing_address?.city}
                      </Text>
                      <Text className="text-sm text-gray-600 leading-relaxed">
                        {cart.billing_address?.country_code?.toUpperCase()}
                      </Text>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <Spinner />
              </div>
            )}
          </div>
        )}

        <Divider className="mt-8 border-gray-100" />
      </div>
    </div>
  )
}

export default Addresses
