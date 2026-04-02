import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block h-full outline-none"
    >
      <div
        className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out h-full flex flex-col hover:border-[#9057d4]/30 hover:-translate-y-1"
        data-testid="product-wrapper"
      >
        {/* Badge */}
        {isFeatured && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
            <span className="bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md">
              Destacado
            </span>
          </div>
        )}

        {/* Producto */}
        <div className="relative w-full aspect-square bg-slate-50 overflow-hidden">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow border-t border-gray-100/50">
          <Text
            className="text-gray-700 font-medium text-xs sm:text-sm line-clamp-2 mb-1.5 sm:mb-2 group-hover:text-[#9057d4] transition-colors duration-300"
            data-testid="product-title"
          >
            {product.title}
          </Text>

          <div className="flex items-end justify-between mt-auto pt-1.5 sm:pt-2">
            {cheapestPrice && (
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-medium tracking-wide mb-0.5">
                  Desde
                </span>
                <span className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#f53fd5] transition-colors duration-300">
                  <PreviewPrice price={cheapestPrice} />
                </span>
              </div>
            )}

            {/* Botón CTA */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#9057d4] transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-0 rotate-45 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 group-hover:text-white transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="h-0.5 bg-gradient-to-r from-[#0856b5] via-[#9057d4] to-[#f53fd5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </LocalizedClientLink>
  )
}
