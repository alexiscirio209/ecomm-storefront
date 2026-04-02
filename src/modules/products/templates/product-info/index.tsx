import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-6 lg:max-w-[500px] mx-auto px-4">
        {/* Badge */}
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="inline-block w-fit mx-auto"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] hover:opacity-90 transition-opacity shadow-md">
              {product.collection.title}
            </span>
          </LocalizedClientLink>
        )}

        {/* Título */}
        <Heading
          level="h2"
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] text-center"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {/* Descripción */}
        <div className="relative">
          <div className="absolute -left-3 top-0 h-full w-1 bg-gradient-to-b from-[#f53fd5] to-[#0856b5] rounded-full opacity-50" />
          <Text
            className="text-base md:text-lg text-gray-600 whitespace-pre-line leading-relaxed pl-6"
            data-testid="product-description"
          >
            {product.description}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
