"use client"

import { Table, Text } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
  view?: "mobile" | "desktop"
}

const Item = ({
  item,
  type = "full",
  currencyCode,
  view = "desktop",
}: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  // Checkout Preview
  if (type === "preview") {
    return (
      <Table.Row
        className="w-full bg-transparent hover:bg-transparent!"
        data-testid="product-row"
      >
        <Table.Cell className="!pl-0 !pr-4 p-0 w-20 align-top hover:bg-transparent!">
          <div className="py-3">
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="block"
            >
              <div className="w-16 h-16 rounded-lg border-2 border-[#9057d4] overflow-hidden bg-gray-50">
                <Thumbnail
                  thumbnail={item.thumbnail}
                  images={item.variant?.product?.images}
                  size="square"
                  className="w-full h-full object-cover"
                />
              </div>
            </LocalizedClientLink>
          </div>
        </Table.Cell>

        <Table.Cell className="text-left align-top p-0 hover:bg-transparent!">
          <div className="flex flex-col py-3 gap-1">
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="hover:underline"
            >
              <Text
                className="text-base font-bold text-gray-800 leading-tight"
                data-testid="product-title"
              >
                {item.product_title}
              </Text>
            </LocalizedClientLink>

            <div className="text-sm text-gray-600 leading-tight">
              <LineItemOptions
                variant={item.variant}
                data-testid="product-variant"
              />
            </div>

            <Text className="text-sm text-gray-500">Cant: {item.quantity}</Text>
          </div>
        </Table.Cell>

        <Table.Cell className="!pr-0 align-top p-0 text-right hover:bg-transparent!">
          <div className="py-3">
            <span className="text-base font-bold text-gray-800 font-sans">
              <LineItemPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          </div>
        </Table.Cell>
      </Table.Row>
    )
  }

  // Vista Móvil
  if (view === "mobile") {
    return (
      <div
        className="bg-white rounded-xl border border-gray-200 p-4"
        data-testid="product-row-mobile"
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
            className="flex-shrink-0 group"
          >
            <div className="w-20 h-20 relative bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.02]">
              <Thumbnail
                thumbnail={item.thumbnail}
                images={item.variant?.product?.images}
                size="square"
              />
            </div>
          </LocalizedClientLink>

          <div className="flex flex-col gap-y-1.5 min-w-0 flex-1">
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="group hover:underline"
            >
              <Text
                className="text-base font-semibold text-gray-800 transition-colors duration-200 line-clamp-2 leading-snug"
                data-testid="product-title"
              >
                {item.product_title}
              </Text>
            </LocalizedClientLink>
            <div className="text-xs text-gray-500">
              <LineItemOptions
                variant={item.variant}
                data-testid="product-variant"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#f53fd5]/30 via-[#9057d4]/30 to-[#0856b5]/30 mb-4" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-4">
          {/* Cantidad */}
          <div className="flex flex-col gap-y-1.5">
            <span className="text-xs text-gray-500 font-medium">Cantidad</span>
            <div className="flex items-center gap-2">
              <CartItemSelect
                value={item.quantity}
                onChange={(value: React.ChangeEvent<HTMLSelectElement>) =>
                  changeQuantity(parseInt(value.target.value))
                }
                className="w-20 h-11 min-h-[44px]"
                data-testid="product-select-button"
              >
                {Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                ))}
                <option value={1} key={1}>
                  1
                </option>
              </CartItemSelect>
              {updating && <Spinner className="w-4 h-4 text-[#9057d4]" />}
            </div>
          </div>

          {/* Precio Total */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-gray-500 font-medium block mb-0.5">
                Total
              </span>
              <div className="text-lg font-bold text-gray-800">
                <LineItemPrice
                  item={item}
                  style="tight"
                  currencyCode={currencyCode}
                />
              </div>
            </div>
            <DeleteButton
              id={item.id}
              data-testid="product-delete-button"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="text-xs text-red-500 mt-3 pt-3 border-t border-gray-100"
            data-testid="product-error-message"
          >
            {error}
          </div>
        )}
      </div>
    )
  }

  // Vista Desktop
  return (
    <Table.Row
      className="w-full hover:bg-gray-50/50 transition-colors duration-200"
      data-testid="product-row"
    >
      {/* Producto */}
      <Table.Cell className="w-[40%] text-left py-6 pl-6 small:pl-8 pr-4">
        <div className="flex items-center gap-4 small:gap-5">
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
            className="flex-shrink-0 group"
          >
            <div className="w-20 h-20 small:w-24 small:h-24 relative bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.02]">
              <Thumbnail
                thumbnail={item.thumbnail}
                images={item.variant?.product?.images}
                size="square"
              />
            </div>
          </LocalizedClientLink>

          <div className="flex flex-col gap-y-1.5 min-w-0 flex-1">
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="group hover:underline"
            >
              <Text
                className="text-sm small:text-base font-semibold text-gray-800 transition-colors duration-200 line-clamp-2 leading-snug"
                data-testid="product-title"
              >
                {item.product_title}
              </Text>
            </LocalizedClientLink>
            <div className="text-xs text-gray-500">
              <LineItemOptions
                variant={item.variant}
                data-testid="product-variant"
              />
            </div>
          </div>
        </div>
      </Table.Cell>

      {/* Selector */}
      <Table.Cell className="w-[20%] text-center py-6 px-4 small:px-6">
        <div className="flex flex-col items-center gap-y-2">
          <div className="flex items-center justify-center gap-2">
            <CartItemSelect
              value={item.quantity}
              onChange={(value: React.ChangeEvent<HTMLSelectElement>) =>
                changeQuantity(parseInt(value.target.value))
              }
              className="w-20 h-10 small:w-24 min-h-[44px] small:min-h-0"
              data-testid="product-select-button"
            >
              {Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
              <option value={1} key={1}>
                1
              </option>
            </CartItemSelect>
            {updating && <Spinner className="w-4 h-4 text-[#9057d4]" />}
          </div>
          {error && (
            <div
              className="text-xs text-red-500"
              data-testid="product-error-message"
            >
              {error}
            </div>
          )}
        </div>
      </Table.Cell>

      {/* Precio unitario */}
      <Table.Cell className="hidden small:table-cell w-[15%] text-center py-6 px-4 small:px-6">
        <div className="flex items-center justify-center h-full">
          <div className="text-sm small:text-base font-medium text-gray-600">
            <LineItemUnitPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>
      </Table.Cell>

      {/* Total */}
      <Table.Cell className="w-[25%] py-6 pl-4 pr-6 small:pl-6 small:pr-8">
        <div className="flex items-center justify-between h-full gap-4">
          <div className="flex items-center justify-end flex-1">
            <div className="text-base small:text-lg font-bold text-gray-800">
              <LineItemPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
          </div>

          <DeleteButton
            id={item.id}
            data-testid="product-delete-button"
            className="min-h-[44px] min-w-[44px] small:min-h-0 small:min-w-0 flex items-center justify-center"
          />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
