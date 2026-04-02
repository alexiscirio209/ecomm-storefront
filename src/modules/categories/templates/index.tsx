import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div
      className="flex flex-col items-center py-6 sm:py-8 lg:py-12 content-container relative px-4 sm:px-6 lg:px-8"
      data-testid="category-container"
    >
      {/* Contenedor */}
      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Cabecera */}
        <header className="mb-3 sm:mb-4 lg:mb-6 text-center w-full max-w-3xl px-2">
          {/* Etiqueta */}
          <div className="mb-2 sm:mb-3 flex justify-center">
            <span className="inline-block bg-gradient-to-r from-[#f53fd5] to-[#9057d4] text-white text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-2.5 py-1 sm:px-3 sm:py-1 rounded-full">
              Categoría
            </span>
          </div>

          {/* Breadcrumbs */}
          {parents && parents.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mb-3 sm:mb-4 text-sm text-gray-500">
              {parents.map((parent) => (
                <span key={parent.id} className="flex items-center gap-2">
                  <LocalizedClientLink
                    className="hover:text-[#9057d4] transition-colors"
                    href={`/categories/${parent.handle}`}
                    data-testid="category-breadcrumb-link"
                  >
                    {parent.name}
                  </LocalizedClientLink>
                  <span className="text-gray-300">/</span>
                </span>
              ))}
            </div>
          )}

          {/* Título */}
          <h1
            data-testid="category-page-title"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0856b5] via-[#9057d4] to-[#f53fd5] tracking-tight leading-tight"
          >
            {category.name}
          </h1>

          {/* Descripción */}
          {category.description && (
            <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-2 sm:mt-3 leading-relaxed px-2">
              {category.description}
            </p>
          )}
        </header>

        {/* Subcategorías */}
        {category.category_children &&
          category.category_children.length > 0 && (
            <div className="w-full mb-6 sm:mb-8 lg:mb-10 flex justify-center px-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {category.category_children.map((c) => (
                  <LocalizedClientLink
                    key={c.id}
                    href={`/categories/${c.handle}`}
                    className="px-4 py-2 rounded-full bg-gray-100 hover:bg-[#9057d4] hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    {c.name}
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          )}

        {/* Acciones */}
        <div className="w-full mb-6 sm:mb-8 lg:mb-10 flex justify-center px-4">
          <div className="w-full max-w-md">
            <RefinementList sortBy={sort} data-testid="sort-by-container" />
          </div>
        </div>

        {/* Grid */}
        <div className="w-full">
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
