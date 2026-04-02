"use client"

import { HttpTypes } from "@medusajs/types"
import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import { useState, useRef, useCallback, useEffect } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [zoomPosition, setZoomPosition] = useState({ x: 0.5, y: 0.5 })
  const [zoomLevel, setZoomLevel] = useState(2.5)
  const [isZoomActive, setIsZoomActive] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const selectedImage = images[selectedIndex]

  // Detectar dispositivo
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  // Zoom con mouse
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imageRef.current || !isZoomActive) return

      const rect = imageRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      setZoomPosition({
        x: Math.max(0, Math.min(1, x)),
        y: Math.max(0, Math.min(1, y)),
      })
    },
    [isZoomActive]
  )

  // Zoom con touch
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!imageRef.current || !isZoomActive) return

      // Prevenir scroll
      e.preventDefault()

      const touch = e.touches[0]
      const rect = imageRef.current.getBoundingClientRect()
      const x = (touch.clientX - rect.left) / rect.width
      const y = (touch.clientY - rect.top) / rect.height

      setZoomPosition({
        x: Math.max(0, Math.min(1, x)),
        y: Math.max(0, Math.min(1, y)),
      })
    },
    [isZoomActive]
  )

  // Activar zoom
  const handleZoomEnter = useCallback(() => {
    setIsZoomActive(true)
    setZoomPosition({ x: 0.5, y: 0.5 })
  }, [])

  // Desactivar zoom
  const handleZoomLeave = useCallback(() => {
    setIsZoomActive(false)
    setZoomPosition({ x: 0.5, y: 0.5 })
  }, [])

  // Cambiar imagen
  const handleImageChange = (index: number) => {
    setSelectedIndex(index)
    setIsZoomActive(false)
    setZoomPosition({ x: 0.5, y: 0.5 })
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-3 w-full">
      {/* Imagen principalM */}
      <div className="relative w-full flex justify-center">
        <Container className="relative overflow-hidden bg-ui-bg-subtle rounded-2xl shadow-md w-full max-w-[90%] small:max-w-[85%] md:max-w-[75%] mx-auto">
          {/* Contenedor de imagen */}
          <div
            className="aspect-[4/5] small:aspect-square md:aspect-[4/3] w-full relative overflow-hidden"
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleZoomEnter}
            onMouseLeave={handleZoomLeave}
            onTouchStart={handleZoomEnter}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleZoomLeave}
            onTouchCancel={handleZoomLeave}
          >
            {!!selectedImage.url && (
              <div
                className="absolute inset-0 transition-all duration-300 ease-out"
                style={{
                  backgroundImage: `url(${selectedImage.url})`,
                  backgroundSize: isZoomActive ? `${zoomLevel * 100}%` : "100%",
                  backgroundPosition: `${zoomPosition.x * 100}% ${
                    zoomPosition.y * 100
                  }%`,
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Image
                  src={selectedImage.url}
                  priority={true}
                  className="absolute inset-0 rounded-2xl object-contain object-center opacity-0"
                  alt={`Product image ${selectedIndex + 1}`}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 75vw, (max-width: 1024px) 65vw, 600px"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#9057d4]/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

          {/* Badge zoom */}
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
              {/* Texto zoom */}
              <span className="hidden small:inline">
                {isTouchDevice ? "Zoom" : "Zoom"}
              </span>
              <span className="small:hidden">
                {isTouchDevice ? "Zoom" : "Zoom"}
              </span>
            </div>
          </div>

          {/* Contador de imágenes */}
          {images.length > 1 && (
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                {selectedIndex + 1} / {images.length}
              </span>
            </div>
          )}

          {/* Flechas de navegación */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleImageChange(
                    selectedIndex > 0 ? selectedIndex - 1 : images.length - 1
                  )
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 small:w-9 small:h-9 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95"
                aria-label="Imagen anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 small:h-5 small:w-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleImageChange(
                    selectedIndex < images.length - 1 ? selectedIndex + 1 : 0
                  )
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 small:w-9 small:h-9 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95"
                aria-label="Siguiente imagen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 small:h-5 small:w-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </Container>
      </div>

      {/* Carrusel */}
      {images.length > 1 && (
        <div className="w-full flex justify-center">
          <div className="overflow-x-auto pb-2 scrollbar-hide w-full max-w-[90%] small:max-w-[85%] md:max-w-[75%]">
            <div className="flex gap-2 small:gap-2.5 md:gap-3">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => handleImageChange(index)}
                  className={clx(
                    "relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md",
                    {
                      "shadow-md": index === selectedIndex,
                      "opacity-70 hover:opacity-100": index !== selectedIndex,
                    }
                  )}
                  aria-label={`Ver imagen ${index + 1}`}
                  aria-current={index === selectedIndex ? "true" : "false"}
                  style={
                    index === selectedIndex
                      ? {
                          background: `linear-gradient(white, white) padding-box, linear-gradient(to right, #f53fd5, #9057d4, #0856b5) border-box`,
                          border: "2px solid transparent",
                        }
                      : {
                          border: "2px solid transparent",
                        }
                  }
                >
                  <div className="w-12 h-12 small:w-14 small:h-14 md:w-16 md:h-16 relative bg-white rounded-lg">
                    {!!image.url && (
                      <Image
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-contain p-1"
                        fill
                        sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
