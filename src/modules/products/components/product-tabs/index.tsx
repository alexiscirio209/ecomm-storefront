"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Información del Producto",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Tipos de Envío",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full mt-8">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-6">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-2">
            <div className="w-1 h-6 bg-gradient-to-b from-[#f53fd5] to-[#9057d4] rounded-full" />
            <span className="font-semibold text-gray-700">Material</span>
          </div>
          <p className="text-gray-600 ml-3">
            {product.material ? product.material : "-"}
          </p>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-2">
            <div className="w-1 h-6 bg-gradient-to-b from-[#9057d4] to-[#0856b5] rounded-full" />
            <span className="font-semibold text-gray-700">País de Origen</span>
          </div>
          <p className="text-gray-600 ml-3">
            {product.origin_country ? product.origin_country : "-"}
          </p>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-2">
            <div className="w-1 h-6 bg-gradient-to-b from-[#0856b5] to-[#f53fd5] rounded-full" />
            <span className="font-semibold text-gray-700">Tipo</span>
          </div>
          <p className="text-gray-600 ml-3">
            {product.type ? product.type.value : "-"}
          </p>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-2">
            <div className="w-1 h-6 bg-gradient-to-b from-[#f53fd5] to-[#0856b5] rounded-full" />
            <span className="font-semibold text-gray-700">Peso</span>
          </div>
          <p className="text-gray-600 ml-3">
            {product.weight ? `${product.weight} g` : "-"}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-y-3">
          <div className="flex items-center gap-x-2">
            <div className="w-1 h-6 bg-gradient-to-b from-[#9057d4] to-[#f53fd5] rounded-full" />
            <span className="font-semibold text-gray-700">Dimensiones</span>
          </div>
          <p className="text-gray-600 ml-3">
            {product.length && product.width && product.height
              ? `${product.length}L x ${product.width}W x ${product.height}H`
              : "-"}
          </p>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-6">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="flex items-start gap-x-4 p-4 rounded-2xl bg-gradient-to-r from-[#f53fd5]/5 via-[#9057d4]/5 to-[#0856b5]/5 border border-gray-100">
          <div className="p-3 rounded-full bg-gradient-to-br from-[#f53fd5] to-[#9057d4] text-white">
            <FastDelivery />
          </div>
          <div>
            <span className="font-semibold text-gray-800 block mb-1">
              Envío Rápido
            </span>
            <p className="max-w-sm text-gray-600">
              Su paquete llegará de 1 a 5 días hábiles a su domicilio
              dependiendo del tipo de envio que elija.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4 p-4 rounded-2xl bg-gradient-to-r from-[#9057d4]/5 via-[#0856b5]/5 to-[#f53fd5]/5 border border-gray-100">
          <div className="p-3 rounded-full bg-gradient-to-br from-[#9057d4] to-[#0856b5] text-white">
            <Refresh />
          </div>
          <div>
            <span className="font-semibold text-gray-800 block mb-1">
              Cambios por Defectos de Fabrica
            </span>
            <p className="max-w-sm text-gray-600">
              Si sus productos llegan con defectos de fabrica, le reembolsaremos
              su dinero o le repondremos sus productos.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4 p-4 rounded-2xl bg-gradient-to-r from-[#0856b5]/5 via-[#f53fd5]/5 to-[#9057d4]/5 border border-gray-100">
          <div className="p-3 rounded-full bg-gradient-to-br from-[#0856b5] to-[#f53fd5] text-white">
            <Back />
          </div>
          <div>
            <span className="font-semibold text-gray-800 block mb-1">
              Proceso de Devolución
            </span>
            <p className="max-w-sm text-gray-600">
              En caso de detectar defectos en sus productos, contáctenos a
              traves de whatsapp, para que un miembro de soporte pueda darle
              seguimiento a su caso.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
