import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    })
  }

  return (
    <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 border border-gray-100">
      {/* Título */}
      <h2 className="text-xl small:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-tight pb-1 mb-6 text-center">
        Pedido
      </h2>

      <div className="flex flex-col gap-3">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-gray-700">
          <span className="text-sm font-medium">Subtotal</span>
          <span className="text-sm font-semibold text-gray-800">
            {getAmount(order.subtotal)}
          </span>
        </div>

        {/* Descuento */}
        {order.discount_total > 0 && (
          <div className="flex items-center justify-between text-gray-700">
            <span className="text-sm font-medium">Descuento</span>
            <span className="text-sm font-semibold text-green-600">
              - {getAmount(order.discount_total)}
            </span>
          </div>
        )}

        {/* Gift Card */}
        {order.gift_card_total > 0 && (
          <div className="flex items-center justify-between text-gray-700">
            <span className="text-sm font-medium">Gift Card</span>
            <span className="text-sm font-semibold text-green-600">
              - {getAmount(order.gift_card_total)}
            </span>
          </div>
        )}

        {/* Envío */}
        <div className="flex items-center justify-between text-gray-700">
          <span className="text-sm font-medium">Envío</span>
          <span className="text-sm font-semibold text-gray-800">
            {getAmount(order.shipping_total)}
          </span>
        </div>

        {/* Impuestos */}
        <div className="flex items-center justify-between text-gray-700">
          <span className="text-sm font-medium">Impuestos</span>
          <span className="text-sm font-semibold text-gray-800">
            {getAmount(order.tax_total)}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px w-full border-t border-[#9057d4]/30 my-3" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-800">Total</span>
          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]">
            {getAmount(order.total)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
