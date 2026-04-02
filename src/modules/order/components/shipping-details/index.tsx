import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <Heading
        level="h2"
        className="flex flex-row items-center justify-center gap-x-3 mb-8"
      >
        {/* Header */}
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-tight pb-1 lg:text-2xl lg:small:text-3xl">
          Entrega
        </span>
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {/* Dirección de Envío */}
        <div
          className="flex flex-col gap-3 w-full items-center text-center"
          data-testid="shipping-address-summary"
        >
          <Text className="text-sm font-semibold text-gray-800">
            Dirección de Envío
          </Text>
          <div className="flex flex-col gap-1">
            <Text className="text-sm text-gray-600 leading-relaxed">
              {order.shipping_address?.first_name}{" "}
              {order.shipping_address?.last_name}
            </Text>
            <Text className="text-sm text-gray-600 leading-relaxed">
              {order.shipping_address?.address_1}{" "}
              {order.shipping_address?.address_2}
            </Text>
            <Text className="text-sm text-gray-600 leading-relaxed">
              {order.shipping_address?.postal_code},{" "}
              {order.shipping_address?.city}
            </Text>
            <Text className="text-sm text-gray-600 leading-relaxed">
              {order.shipping_address?.country_code?.toUpperCase()}
            </Text>
          </div>
        </div>

        {/* Contacto */}
        <div
          className="flex flex-col gap-3 w-full items-center text-center"
          data-testid="shipping-contact-summary"
        >
          <Text className="text-sm font-semibold text-gray-800">Contacto</Text>
          <div className="flex flex-col gap-1">
            <Text className="text-sm text-gray-600 leading-relaxed">
              {order.shipping_address?.phone}
            </Text>
            <Text className="text-sm text-gray-600 leading-relaxed">
              {order.email}
            </Text>
          </div>
        </div>

        {/* Método de Envío */}
        <div
          className="flex flex-col gap-3 w-full items-center text-center"
          data-testid="shipping-method-summary"
        >
          <Text className="text-sm font-semibold text-gray-800">
            Método de Envío
          </Text>
          <div className="flex flex-col gap-1">
            <Text className="text-sm text-gray-600 leading-relaxed">
              {(order as any).shipping_methods[0]?.name}
            </Text>
            <Text className="text-sm text-gray-600 leading-relaxed">
              {convertToLocale({
                amount: order.shipping_methods?.[0].total ?? 0,
                currency_code: order.currency_code,
              })}
            </Text>
          </div>
        </div>
      </div>

      <Divider className="mt-8 border-gray-100" />
    </div>
  )
}

export default ShippingDetails
