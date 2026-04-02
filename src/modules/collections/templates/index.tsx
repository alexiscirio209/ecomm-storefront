import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col items-center py-6 sm:py-8 lg:py-12 content-container relative px-4 sm:px-6 lg:px-8"
      data-testid="collection-container"
    >
      {/* Contenedor */}
      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Cabecera */}
        <header className="mb-3 sm:mb-4 lg:mb-6 text-center w-full max-w-3xl px-2">
          {/* Etiqueta */}
          <div className="mb-2 sm:mb-3 flex justify-center">
            <span className="inline-block bg-gradient-to-r from-[#f53fd5] to-[#9057d4] text-white text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-2.5 py-1 sm:px-3 sm:py-1 rounded-full">
              Colección
            </span>
          </div>

          {/* Título */}
          <h1
            data-testid="collection-page-title"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0856b5] via-[#9057d4] to-[#f53fd5] tracking-tight leading-tight"
          >
            {collection.title}
          </h1>

          {/* Descripción */}
          <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-2 sm:mt-3 leading-relaxed px-2">
            Explora nuestra colección {collection.title} diseñada con amor y
            dedicación exclusiva para tu bebé.
          </p>
        </header>

        {/* RefinementList */}
        <div className="w-full mb-6 sm:mb-8 lg:mb-10 flex justify-center px-4">
          <div className="w-full max-w-md">
            <RefinementList sortBy={sort} />
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full">
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={collection.products?.length}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              collectionId={collection.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
