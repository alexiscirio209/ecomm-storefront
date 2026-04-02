import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Babygoo - Moda para tu Bebé",
  description:
    "Moda y accesorios diseñados con amor para la piel más delicada. Calidad y estilo en cada detalle.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* PRODUCTOS DESTACADOS */}
      <div className="py-4 sm:py-6 lg:py-8 bg-white">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>

      {/* ACERCA DE NOSOTROS */}
      <section className="py-4 sm:py-6 lg:py-8 bg-white">
        <div className="content-container px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* ENCABEZADO */}
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0856b5] via-[#9057d4] to-[#f53fd5] tracking-tight leading-tight mb-3">
                Acerca de Nosotros
              </h2>
              <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-2 sm:mt-3 leading-relaxed px-2">
                Conoce nuestra esencia y lo que nos hace especiales para tu bebé
              </p>
            </div>

            {/* MISIÓN Y VISIÓN */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16">
              {/* Misión */}
              <div className="p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-[#f53fd5]/5 to-[#9057d4]/5 border border-[#9057d4]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-[#f53fd5] to-[#9057d4] flex items-center justify-center overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dbq3cuzer/image/upload/v1774985362/mision_msupxs.png"
                      alt="Nuestra Misión"
                      className="w-6 h-6 lg:w-7 lg:h-7 object-contain"
                    />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                    Nuestra Misión
                  </h3>
                </div>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  Proporcionar a las familias mexicanas ropa y accesorios de la
                  más alta calidad para sus bebés, combinando comodidad, estilo
                  y responsabilidad ambiental. Creemos que cada bebé merece lo
                  mejor, y nos esforzamos por superar sus expectativas en cada
                  producto.
                </p>
              </div>

              {/* Visión */}
              <div className="p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-[#9057d4]/5 to-[#0856b5]/5 border border-[#0856b5]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-[#9057d4] to-[#0856b5] flex items-center justify-center overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dbq3cuzer/image/upload/v1774987169/vi_kloe9v.png"
                      alt="Nuestra Visión"
                      className="w-6 h-6 lg:w-7 lg:h-7 object-contain"
                    />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                    Nuestra Visión
                  </h3>
                </div>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  Ser la marca líder en México de ropa para bebé, reconocida por
                  nuestra calidad excepcional, diseños innovadores y compromiso
                  con la sustentabilidad. Aspiramos a ser la primera opción de
                  los padres que buscan lo mejor para sus hijos, expandiendo
                  nuestra presencia en todo el país.
                </p>
              </div>
            </div>

            {/* GRIDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
              {/* Materiales Orgánicos */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50/50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-[#f53fd5] to-[#9057d4] flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dbq3cuzer/image/upload/v1774985331/material_xcqw4i.png"
                    alt="Materiales Orgánicos"
                    className="w-8 h-8 lg:w-9 lg:h-9 object-contain"
                  />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                  Materiales Orgánicos
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Algodón 100% orgánico certificado, libre de químicos.
                </p>
              </div>

              {/* Diseños Únicos */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50/50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-[#9057d4] to-[#0856b5] flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dbq3cuzer/image/upload/v1774985535/dise%C3%B1o_ncj0nr.png"
                    alt="Diseños Únicos"
                    className="w-8 h-8 lg:w-9 lg:h-9 object-contain"
                  />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                  Diseños Únicos
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Colecciones exclusivas creadas con amor y dedicación.
                </p>
              </div>

              {/* Hecho en México */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50/50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-[#0856b5] to-[#f53fd5] flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dbq3cuzer/image/upload/v1774985332/mexico_zimkmt.png"
                    alt="Hecho en México"
                    className="w-8 h-8 lg:w-9 lg:h-9 object-contain"
                  />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                  Hecho en México
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Producción local con los más altos estándares de calidad.
                </p>
              </div>

              {/* Piel Delicada */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50/50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-[#f53fd5] to-[#0856b5] flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dbq3cuzer/image/upload/v1774986096/delicado_qsovzd.png"
                    alt="Piel Delicada"
                    className="w-8 h-8 lg:w-9 lg:h-9 object-contain"
                  />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                  Piel Delicada
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Hipoalergénico, perfecto para la piel sensible de tu bebé.
                </p>
              </div>

              {/* Envíos */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50/50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-[#9057d4] to-[#f53fd5] flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dbq3cuzer/image/upload/v1774986580/caja_phwoqb.png"
                    alt="Envíos a Todo México"
                    className="w-8 h-8 lg:w-9 lg:h-9 object-contain"
                  />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                  Envíos a Todo México
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Entrega segura y rápida en cualquier parte del país.
                </p>
              </div>

              {/* Pagos Seguros */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50/50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-[#0856b5] to-[#9057d4] flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dbq3cuzer/image/upload/v1774985341/pago_xgmgi8.png"
                    alt="Pagos Seguros"
                    className="w-8 h-8 lg:w-9 lg:h-9 object-contain"
                  />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                  Pagos Seguros
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Transacciones protegidas con encriptación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
