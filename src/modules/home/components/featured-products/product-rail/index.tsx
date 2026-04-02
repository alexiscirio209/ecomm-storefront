import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div
      className="flex flex-col items-center py-6 sm:py-8 lg:py-12 content-container relative px-4 sm:px-6 lg:px-8"
      data-testid="product-rail-container"
    >
      {/* Contenedor */}
      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* header */}
        <header className="mb-12 lg:mb-16 text-center w-full max-w-3xl px-2">
          {/* Etiqueta */}
          <div className="mb-2 sm:mb-3 flex justify-center">
            <span className="inline-block bg-gradient-to-r from-[#f53fd5] to-[#9057d4] text-white text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-2.5 py-1 sm:px-3 sm:py-1 rounded-full">
              Colección
            </span>
          </div>

          {/* Título */}
          <Heading
            level="h2"
            data-testid="product-rail-title"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0856b5] via-[#9057d4] to-[#f53fd5] tracking-tight leading-tight"
          >
            {collection.title}
          </Heading>

          {/* Descripcion */}
          <Text className="text-gray-500 text-sm sm:text-base md:text-lg mt-2 sm:mt-3 leading-relaxed px-2">
            Descubre nuestra colección de productos destacados diseñada con amor
            y dedicación exclusiva para tu bebé.
          </Text>
        </header>

        {/* Grid de Productos */}
        <div className="w-full">
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {pricedProducts &&
              pricedProducts.map((product) => (
                <li key={product.id}>
                  <ProductPreview
                    product={product}
                    region={region}
                    isFeatured
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
