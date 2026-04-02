import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      {/* Contenedor Principal */}
      <div
        className="content-container flex flex-col lg:flex-row small:items-start py-8 lg:py-12 gap-8 lg:gap-12 relative"
        data-testid="product-container"
      >
        {/* COLUMNA izquierda */}
        <div className="w-full lg:w-[60%] relative">
          <ImageGallery images={images} />
        </div>

        {/* Columna derecha */}
        <div className="w-full lg:w-[40%] flex flex-col gap-y-6 lg:sticky lg:top-24 lg:self-start">
          {/* Información del Producto */}
          <ProductInfo product={product} />

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-[#f53fd5]/50 via-[#9057d4]/50 to-[#0856b5]/50" />

          {/* Acciones de Compra*/}
          <div className="flex flex-col gap-y-6">
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>

            {/* Trust Signals */}
            <div className="flex flex-col gap-y-3 pt-4">
              <div className="flex items-center gap-x-3 text-xs text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#9057d4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Envíos estandar y express</span>
              </div>
              <div className="flex items-center gap-x-3 text-xs text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#9057d4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Devoluciones por defectos de fabrica</span>
              </div>
            </div>
          </div>

          {/* Pestañas de informacion*/}
          <div className="pt-6 border-t border-gray-200">
            <ProductTabs product={product} />
          </div>

          {/* CTA */}
          <ProductOnboardingCta />
        </div>
      </div>

      {/* Productos Relacionados */}
      <div
        className="content-container my-16 lg:my-24 border-t border-gray-200 pt-16"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
