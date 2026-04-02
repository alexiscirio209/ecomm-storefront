import { Heading, Text, clx } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-6 lg:py-8 lg:small:py-12 min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container flex flex-col justify-center items-center gap-y-6 lg:gap-y-8 max-w-4xl w-full px-4 small:px-6">
        {isOnboarding && (
          <div className="w-full mb-4 lg:mb-6">
            <OnboardingCta orderId={order.id} />
          </div>
        )}

        {/* Contenedor Principal */}
        <div
          className={clx(
            "flex flex-col gap-6 w-full bg-transparent shadow-none border-none py-6 px-4",
            "lg:bg-white lg:rounded-2xl lg:shadow-lg lg:border lg:border-gray-100 lg:p-6 lg:small:p-10"
          )}
          data-testid="order-complete-container"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-4 lg:mb-6">
            {/* Icono de éxito */}
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] flex items-center justify-center mb-4 lg:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 lg:w-10 lg:h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Título */}
            <Heading
              level="h1"
              className="text-xl lg:text-2xl lg:small:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-normal lg:leading-tight pb-1 mb-2 lg:mb-3"
            >
              ¡Gracias por tu compra!
            </Heading>

            {/* Subtítulo */}
            <Text className="text-gray-600 text-center max-w-2xl text-sm lg:text-base leading-relaxed">
              Tu pedido ha sido realizado exitosamente.
            </Text>
          </div>

          {/* Detalles del Pedido */}
          <div
            className={clx(
              "bg-transparent rounded-xl p-0 border-none",
              "lg:bg-gradient-to-br lg:from-gray-50/50 lg:to-white lg:rounded-xl lg:p-6 lg:border lg:border-gray-100"
            )}
          >
            <OrderDetails order={order} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 lg:border-gray-100" />

          {/* Resumen del Pedido */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col items-center mb-2">
              {/* Título */}
              <Heading
                level="h2"
                className="text-xl lg:text-2xl lg:small:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-normal lg:leading-tight pb-1"
              >
                Resumen del Pedido
              </Heading>
            </div>

            {/* Items */}
            <div
              className={clx(
                "bg-transparent rounded-xl p-0 border-none",
                "lg:bg-gradient-to-br lg:from-gray-50/50 lg:to-white lg:rounded-xl lg:p-6 lg:border lg:border-gray-100"
              )}
            >
              <Items order={order} />
            </div>

            {/* Totales */}
            <div
              className={clx(
                "bg-transparent rounded-xl p-0 border-none",
                "lg:bg-gradient-to-br lg:from-gray-50/50 lg:to-white lg:rounded-xl lg:p-6 lg:border lg:border-gray-100"
              )}
            >
              <CartTotals totals={order} />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 lg:border-gray-100" />

          {/* Envío */}
          <div
            className={clx(
              "bg-transparent rounded-xl p-0 border-none",
              "lg:bg-gradient-to-br lg:from-gray-50/50 lg:to-white lg:rounded-xl lg:p-6 lg:small:p-8 lg:border lg:border-gray-100"
            )}
          >
            <ShippingDetails order={order} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 lg:border-gray-100" />

          {/* Pago */}
          <div
            className={clx(
              "bg-transparent rounded-xl p-0 border-none",
              "lg:bg-gradient-to-br lg:from-gray-50/50 lg:to-white lg:rounded-xl lg:p-6 lg:small:p-8 lg:border lg:border-gray-100"
            )}
          >
            <PaymentDetails order={order} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 lg:border-gray-100" />

          {/* Ayuda */}
          <div className="pt-2 lg:pt-4">
            <Help />
          </div>
        </div>
      </div>
    </div>
  )
}
