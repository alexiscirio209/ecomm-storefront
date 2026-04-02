"use client"

import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-4 py-6 min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="flex flex-col small:flex-row gap-4 justify-between items-center mb-6 px-4 small:px-0">
        {/* Título */}
        <h1 className="text-2xl small:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-tight pb-1">
          Detalles del Pedido
        </h1>

        {/* Botón */}
        <LocalizedClientLink
          href="/account/orders"
          className="flex gap-2 items-center text-sm font-medium text-[#9057d4] hover:text-[#f53fd5] transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
          data-testid="back-to-overview-button"
        >
          <XMark className="w-5 h-5" />
          <span>Volver al resumen</span>
        </LocalizedClientLink>
      </div>

      {/* Contenedor Principal */}
      <div
        className="flex flex-col gap-6 h-full bg-white w-full max-w-4xl mx-auto rounded-2xl shadow-sm border border-gray-100 p-6 small:p-10"
        data-testid="order-details-container"
      >
        {/* Sección Detalles del Pedido */}
        <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 border border-gray-100">
          <OrderDetails order={order} showStatus />
        </div>

        {/* Sección Productos */}
        <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 border border-gray-100">
          <Items order={order} />
        </div>

        {/* Sección Envío */}
        <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 border border-gray-100">
          <ShippingDetails order={order} />
        </div>

        {/* Sección Resumen */}
        <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-6 border border-gray-100">
          <OrderSummary order={order} />
        </div>

        {/* Sección Ayuda */}
        <div className="mt-4">
          <Help />
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
