"use client"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 small:p-8">
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <Heading
          level="h2"
          className={clx("flex flex-row items-center justify-center gap-x-3", {
            "opacity-50 pointer-events-none select-none": !isOpen,
          })}
        >
          {/* Header */}
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-tight pb-1 inline-block lg:text-2xl lg:small:text-3xl">
            Revisión
          </span>
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-center justify-center w-full mb-6">
            <div className="w-full max-w-2xl">
              <Text className="txt-medium-plus text-ui-fg-base mb-1 text-center">
                Al hacer clic en el botón{" "}
                <span className="font-semibold text-gray-800">
                  Realizar Pedido
                </span>
                , confirmas que has leído, entendido y aceptado nuestros{" "}
                <span className="font-semibold text-[#9057d4]">
                  Términos de Uso
                </span>
                ,{" "}
                <span className="font-semibold text-[#9057d4]">
                  Términos de Venta
                </span>{" "}
                y{" "}
                <span className="font-semibold text-[#9057d4]">
                  Política de Devoluciones
                </span>
                , y reconoces que has leído la{" "}
                <span className="font-semibold text-[#9057d4]">
                  Política de Privacidad
                </span>{" "}
                de Babygoo.
              </Text>
            </div>
          </div>
          <div className="flex justify-center">
            <PaymentButton cart={cart} data-testid="submit-order-button" />
          </div>
        </>
      )}
    </div>
  )
}

export default Review
