import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return (
      <div className="block w-32 h-9 bg-gray-100 animate-pulse rounded-lg" />
    )
  }

  return (
    <div className="flex flex-col gap-y-1">
      {/* Precio Principal */}
      <span
        className={clx(
          "text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]",
          {
            "text-ui-fg-interactive": selectedPrice.price_type === "sale",
          }
        )}
      >
        {!variant && (
          <span className="text-base font-medium text-gray-500 mr-1">
            Desde{" "}
          </span>
        )}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>

      {/* Precio Original y Descuento */}
      {selectedPrice.price_type === "sale" && (
        <div className="flex items-center gap-x-2 mt-1">
          <p className="flex items-center gap-x-1">
            <span className="text-sm text-gray-400">Antes:</span>
            <span
              className="text-sm text-gray-400 line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-sm font-bold text-[#f53fd5] bg-[#f53fd5]/10 px-2 py-0.5 rounded-full">
            -{selectedPrice.percentage_diff}%
          </span>
        </div>
      )}
    </div>
  )
}
