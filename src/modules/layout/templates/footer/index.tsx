import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Colores de marca
const BRAND_COLORS = {
  blue: "#55acee",
  green: "#acc931",
  pink: "#ff8ec6",
  yellow: "#ffd234",
}

// Helper color
const getTextColor = (bgColor: string) => {
  // Fondos claros
  if (bgColor === BRAND_COLORS.yellow || bgColor === BRAND_COLORS.green) {
    return "text-gray-800"
  }
  // Fondos oscuros
  return "text-white"
}

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    // Footer
    <footer className="w-full mx-0 px-0">
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 w-full">
        {/* COLUMNA 1 */}
        <div
          className="relative flex flex-col gap-y-3 p-6 md:p-8 min-h-[auto] md:min-h-[280px] w-full overflow-hidden"
          style={{ backgroundColor: BRAND_COLORS.blue }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none z-0" />

          {/* Contenido */}
          <div className="relative z-10 flex flex-col gap-y-3 h-full">
            <LocalizedClientLink
              href="/"
              className={`text-xl md:text-2xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity ${getTextColor(
                BRAND_COLORS.blue
              )}`}
            >
              BABYGOO
            </LocalizedClientLink>
            <p
              className={`${getTextColor(
                BRAND_COLORS.blue
              )} text-sm md:text-base leading-relaxed opacity-90`}
            >
              Moda y accesorios diseñados con amor para la piel más delicada.
              Calidad y estilo en cada detalle.
            </p>

            {/* Iconos */}
            <div className="flex items-center gap-3 mt-2">
              {/* WhatsApp */}
              <a
                href="https://wa.me/522466902272"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 md:p-2 rounded-full hover:bg-white/20 transition-colors duration-200 ${getTextColor(
                  BRAND_COLORS.blue
                )}`}
                aria-label="WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-5 md:w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61561608148068&locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 md:p-2 rounded-full hover:bg-white/20 transition-colors duration-200 ${getTextColor(
                  BRAND_COLORS.blue
                )}`}
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-5 md:w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/babygootlx"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 md:p-2 rounded-full hover:bg-white/20 transition-colors duration-200 ${getTextColor(
                  BRAND_COLORS.blue
                )}`}
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-5 md:w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* COLUMNA 2 */}
        <div
          className="relative flex flex-col gap-y-4 md:gap-y-6 p-6 md:p-8 min-h-[auto] md:min-h-[280px] w-full overflow-hidden"
          style={{ backgroundColor: BRAND_COLORS.green }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col gap-y-3 md:gap-y-4 h-full">
            {/* Sección Categorías */}
            <div className="flex flex-col gap-y-2">
              <span
                className={`text-base md:text-lg font-bold uppercase tracking-wide ${getTextColor(
                  BRAND_COLORS.green
                )}`}
              >
                Categorías
              </span>
              {productCategories && productCategories?.length > 0 ? (
                <ul className="grid grid-cols-1 gap-1">
                  {productCategories?.slice(0, 5).map((c) => {
                    if (c.parent_category) return null
                    return (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className={`${getTextColor(
                            BRAND_COLORS.green
                          )} hover:opacity-70 text-sm md:text-base transition-opacity duration-200 block font-medium`}
                          href={`/categories/${c.handle}`}
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <span
                  className={`${getTextColor(
                    BRAND_COLORS.green
                  )} text-sm opacity-70`}
                >
                  Cargando
                </span>
              )}
            </div>

            {/* Sección Colecciones */}
            <div className="flex flex-col gap-y-2 pt-2 border-t border-gray-500/30">
              <span
                className={`text-base md:text-lg font-bold uppercase tracking-wide ${getTextColor(
                  BRAND_COLORS.green
                )}`}
              >
                Colecciones
              </span>
              {collections && collections.length > 0 ? (
                <ul className="grid grid-cols-1 gap-1">
                  {collections?.slice(0, 4).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className={`${getTextColor(
                          BRAND_COLORS.green
                        )} hover:opacity-70 text-sm md:text-base transition-opacity duration-200 block font-medium`}
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <span
                  className={`${getTextColor(
                    BRAND_COLORS.green
                  )} text-sm opacity-70`}
                >
                  Cargando
                </span>
              )}
            </div>
          </div>
        </div>

        {/* COLUMNA 3 */}
        <div
          className="relative flex flex-col gap-y-3 md:gap-y-4 p-6 md:p-8 min-h-[auto] md:min-h-[280px] w-full overflow-hidden"
          style={{ backgroundColor: BRAND_COLORS.pink }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col gap-y-3 md:gap-y-4 h-full">
            <span
              className={`text-base md:text-lg font-bold uppercase tracking-wide ${getTextColor(
                BRAND_COLORS.pink
              )}`}
            >
              Navegacion
            </span>
            <ul className="grid grid-cols-1 gap-2 md:gap-3">
              {/* 
              <li>
                <LocalizedClientLink
                  href="/account"
                  className={`${getTextColor(
                    BRAND_COLORS.pink
                  )} hover:opacity-70 text-sm md:text-base transition-opacity duration-200 block font-medium`}
                >
                  Mi Perfil
                </LocalizedClientLink>
              </li>
              */}
              <li>
                <LocalizedClientLink
                  href="/cart"
                  className={`${getTextColor(
                    BRAND_COLORS.pink
                  )} hover:opacity-70 text-sm md:text-base transition-opacity duration-200 block font-medium`}
                >
                  Carrito de Compras
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className={`${getTextColor(
                    BRAND_COLORS.pink
                  )} hover:opacity-70 text-sm md:text-base transition-opacity duration-200 block font-medium`}
                >
                  Ver Productos
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
        </div>

        {/* COLUMNA 4 */}
        <div
          className="relative flex flex-col gap-y-3 md:gap-y-4 p-6 md:p-8 min-h-[auto] md:min-h-[280px] w-full overflow-hidden"
          style={{ backgroundColor: BRAND_COLORS.yellow }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col gap-y-3 md:gap-y-4 h-full">
            <span
              className={`text-base md:text-lg font-bold uppercase tracking-wide ${getTextColor(
                BRAND_COLORS.yellow
              )}`}
            >
              Soporte
            </span>
            <ul className="grid grid-cols-1 gap-2 md:gap-3">
              <li>
                <a
                  href="/Politica_de_Privacidad_Babygoo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${getTextColor(
                    BRAND_COLORS.yellow
                  )} hover:opacity-70 text-sm md:text-base transition-opacity duration-200 block font-medium`}
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="/Terminos_y_Condiciones_Babygoo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${getTextColor(
                    BRAND_COLORS.yellow
                  )} hover:opacity-70 text-sm md:text-base transition-opacity duration-200 block font-medium`}
                >
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black text-white py-3 md:py-4 px-6 md:px-8 text-xs md:text-sm w-full flex flex-col md:flex-row justify-center items-center">
        <Text>
          © {new Date().getFullYear()} Babygoo. Todos los derechos reservados.
        </Text>
      </div>
    </footer>
  )
}
