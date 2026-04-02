import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")
    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Email */}
      <Text className="text-gray-700">
        Hemos enviado los detalles de confirmación del pedido a{" "}
        <span className="font-bold text-[#9057d4]" data-testid="order-email">
          {order.email}
        </span>
      </Text>

      {/* Fecha del Pedido */}
      <Text className="text-gray-700">
        Fecha del pedido:{" "}
        <span className="font-bold text-[#9057d4]" data-testid="order-date">
          {new Date(order.created_at).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </Text>

      {/* Número de Pedido */}
      <Text className="text-gray-700">
        Número de pedido:{" "}
        <span className="font-bold text-[#9057d4]" data-testid="order-id">
          #{order.display_id}
        </span>
      </Text>

      {/* Estado de Pedido */}
      {showStatus && (
        <div className="flex flex-col small:flex-row gap-4 mt-4 pt-4 border-t border-gray-100">
          {/* Estado de Envío */}
          <Text className="text-gray-700">
            Estado de envío:{" "}
            <span
              className="font-semibold text-gray-800"
              data-testid="order-status"
            >
              {formatStatus(order.fulfillment_status)}
            </span>
          </Text>

          {/* Estado de Pago */}
          <Text className="text-gray-700">
            Estado de pago:{" "}
            <span
              className="font-semibold text-gray-800"
              data-testid="order-payment-status"
            >
              {formatStatus(order.payment_status)}
            </span>
          </Text>
        </div>
      )}
    </div>
  )
}

export default OrderDetails
