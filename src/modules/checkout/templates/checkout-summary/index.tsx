import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-8 z-10">
      {/* Móvil */}
      <div className="lg:hidden px-4">
        {/* Header */}
        <div className="pb-4 mb-4">
          <Heading
            level="h2"
            className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-tight text-center"
          >
            Resumen del pedido
          </Heading>
        </div>

        {/* Contenido */}
        <div className="space-y-4">
          {/* Items del Carrito */}
          <div className="w-full">
            <ItemsPreviewTemplate cart={cart} />
          </div>

          <Divider className="border-gray-200" />

          {/* Totales del Carrito */}
          <div className="w-full">
            <CartTotals totals={cart} />
          </div>

          <Divider className="border-gray-200" />

          {/* Código de Descuento */}
          <div className="w-full">
            <DiscountCode cart={cart} />
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-gray-50/50 to-white p-6 small:p-8 border-b border-gray-100">
            <Heading
              level="h2"
              className="text-2xl small:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-tight text-center"
            >
              Resumen del pedido
            </Heading>
          </div>

          {/* Contenido */}
          <div className="p-6 small:p-8 space-y-6">
            {/* Items */}
            <div className="w-full -ml-2">
              <ItemsPreviewTemplate cart={cart} />
            </div>

            <Divider className="border-gray-100" />

            {/* Totales */}
            <div className="w-full">
              <CartTotals totals={cart} />
            </div>

            <Divider className="border-gray-100" />

            {/* Código de Descuento */}
            <div className="w-full">
              <DiscountCode cart={cart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
