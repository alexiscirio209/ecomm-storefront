import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductListParams = {}
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <div className="product-page-constraint">
      {/* Sección */}
      <div className="flex flex-col items-center text-center mb-12 lg:mb-16 px-4">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-0.5 bg-gradient-to-r from-[#f53fd5] to-[#9057d4] rounded-full" />
          <div className="w-2 h-2 rounded-full bg-[#9057d4]" />
          <div className="w-8 h-0.5 bg-gradient-to-l from-[#0856b5] to-[#9057d4] rounded-full" />
        </div>

        {/* Título */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] mb-3">
          Productos Relacionados
        </h2>

        {/* Subtítulo */}
        <p className="text-gray-600 text-sm md:text-base max-w-md leading-relaxed">
          Descubre más productos diseñados con amor para tu bebé
        </p>
      </div>

      {/* Grid */}
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 small:gap-x-6 gap-y-6 small:gap-y-8">
        {products.map((product) => (
          <li key={product.id} className="group">
            <Product region={region} product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}
