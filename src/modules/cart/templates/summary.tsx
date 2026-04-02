"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-4 sm:gap-y-6 px-4 sm:px-6 lg:px-0">
      {/* Título */}
      <Heading
        level="h2"
        className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] text-center w-full"
      >
        Resumen del Pedido
      </Heading>

      {/* Código de Descuento */}
      <div className="w-full">
        <DiscountCode cart={cart} />
      </div>

      {/* Divider */}
      <Divider className="border-gray-200" />

      {/* Totales */}
      <div className="flex flex-col gap-y-2.5 sm:gap-y-3">
        <CartTotals totals={cart} />
      </div>

      {/* Divider */}
      <Divider className="border-gray-200" />

      {/* Checkout boton */}
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="group w-full"
      >
        <Button className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg text-white shadow-lg transition-all duration-200 bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] hover:opacity-90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] min-h-[48px]">
          <span className="flex items-center justify-center gap-2">
            <span className="hidden sm:inline">Proceder a la compra</span>
            <span className="sm:hidden">Comprar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </Button>
      </LocalizedClientLink>

      {/* Badges*/}
      <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>Pagos Seguros</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Envíos Seguros</span>
        </div>
      </div>
    </div>
  )
}

export default Summary
