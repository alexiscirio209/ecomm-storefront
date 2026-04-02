import { HttpTypes } from "@medusajs/types"
import { Table, Text } from "@medusajs/ui"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  return (
    <Table.Row
      className="w-full bg-transparent hover:bg-transparent!"
      data-testid="product-row"
    >
      {/* Imagen del Producto */}
      <Table.Cell className="!pl-0 p-4 small:p-6 w-24 align-middle hover:bg-transparent!">
        <div className="flex w-16">
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </div>
      </Table.Cell>

      {/* Nombre y Variante */}
      <Table.Cell className="text-left align-middle p-4 small:p-6 hover:bg-transparent!">
        <Text
          className="text-base font-semibold text-gray-800"
          data-testid="product-name"
        >
          {item.product_title}
        </Text>
        <span className="text-sm text-gray-600 mt-1 block">
          <LineItemOptions
            variant={item.variant}
            data-testid="product-variant"
          />
        </span>
      </Table.Cell>

      {/* Cantidad y Precio */}
      <Table.Cell className="!pr-0 align-middle p-4 small:p-6 hover:bg-transparent!">
        <span className="flex flex-col items-end h-full justify-center gap-1">
          {/* Cantidad + Precio Unitario */}
          <span className="flex items-center gap-2">
            <Text className="text-sm text-gray-600">
              <span data-testid="product-quantity">{item.quantity}</span>x
            </Text>
            <span className="text-sm text-gray-700">
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          </span>

          {/* Precio Total */}
          <span className="text-base font-bold text-[#9057d4]">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </span>
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
