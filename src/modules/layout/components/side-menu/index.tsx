"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"

// Elementos
const SideMenuItems = {
  Inicio: "/",
  Productos: "/store",
  //Cuenta: "/account",
  Carrito: "/cart",
}

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  // const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  // Texto
  const violetTextClass = "text-[#9057d4]"

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              {/* Botón menu */}
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full transition-all ease-out duration-200 focus:outline-none font-bold tracking-wide px-2 text-white hover:text-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  suppressHydrationWarning
                >
                  Menú
                </Popover.Button>
              </div>

              {/* Backdrop */}
              {open && (
                <div
                  className="fixed inset-0 top-16 z-[40] bg-transparent pointer-events-auto transition-opacity duration-300 h-[100dvh] sm:h-screen"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              {/* Animación entrada/salida */}
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in duration-200 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <PopoverPanel
                  className="fixed top-0 left-0 h-[100dvh] sm:h-screen w-[85%] sm:w-[400px] lg:w-[450px] z-[51] shadow-[8px_0_24px_rgba(0,0,0,0.3)] overflow-y-auto"
                  static
                >
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-white"
                  >
                    {/* Encabezado */}
                    <div className="relative flex items-center justify-center p-4 sm:p-6 border-b border-gray-100 flex-shrink-0 min-h-[64px]">
                      <h2
                        className={`text-xl sm:text-2xl font-bold tracking-wide uppercase ${violetTextClass}`}
                      >
                        Menú
                      </h2>
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="absolute right-4 sm:right-6 p-3 sm:p-2 hover:bg-gray-50 rounded-full transition-colors duration-200 group min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Close menu"
                      >
                        <XMark className="w-6 h-6 sm:w-5 sm:h-5 text-black group-hover:scale-110 transition-transform duration-200" />
                      </button>
                    </div>

                    {/* Enlaces */}
                    <ul className="flex flex-col gap-2 sm:gap-4 items-start justify-start p-4 sm:p-6 flex-grow">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li
                            key={name}
                            className="w-full border-b border-gray-100 pb-3 sm:pb-4"
                          >
                            <LocalizedClientLink
                              href={href}
                              className={`text-xl sm:text-2xl font-bold leading-snug hover:opacity-80 hover:translate-x-1 transition-all duration-300 py-3 sm:py-2 min-h-[48px] flex items-center border-l-4 border-transparent hover:border-[#9057d4] pl-4 ${violetTextClass}`}
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Selectores */}
                    <div className="flex flex-col gap-y-4 sm:gap-y-6 p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                      {/* Selector idioma */}
                      {!!locales?.length && (
                        <div
                          className="flex justify-between items-center cursor-pointer group min-h-[44px] px-2"
                          onMouseEnter={languageToggleState.open}
                          onMouseLeave={languageToggleState.close}
                        >
                          <div className="font-medium text-gray-600 group-hover:text-[#9057d4] transition-colors text-sm">
                            <LanguageSelect
                              toggleState={languageToggleState}
                              locales={locales}
                              currentLocale={currentLocale}
                            />
                          </div>
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-300 text-black group-hover:scale-110",
                              languageToggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                      )}

                      {/* Pais/Region */}
                      {/* <div
                        className="flex justify-between items-center cursor-pointer group min-h-[44px] px-2"
                        onMouseEnter={countryToggleState.open}
                        onMouseLeave={countryToggleState.close}
                      >
                        {regions && (
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-600 group-hover:text-[#9057d4] transition-colors text-base">
                              <CountrySelect
                                toggleState={countryToggleState}
                                regions={regions}
                              />
                            </div>
                          </div>
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-300 text-black group-hover:scale-110",
                            countryToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div> */}

                      {/* Iconos Redes Sociales */}
                      <div className="flex items-center justify-center gap-3 mt-2 pt-2">
                        {/* WhatsApp */}
                        <a
                          href="https://wa.me/522466902272"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full hover:bg-[#9057d4]/10 transition-colors duration-200 ${violetTextClass}`}
                          aria-label="WhatsApp"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
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
                          className={`p-2 rounded-full hover:bg-[#9057d4]/10 transition-colors duration-200 ${violetTextClass}`}
                          aria-label="Facebook"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
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
                          className={`p-2 rounded-full hover:bg-[#9057d4]/10 transition-colors duration-200 ${violetTextClass}`}
                          aria-label="Instagram"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        </a>
                      </div>

                      {/* Copyright */}
                      <Text
                        className="text-xs text-gray-400 pt-4 border-t border-gray-200 text-center font-normal px-2"
                        suppressHydrationWarning
                      >
                        © {new Date().getFullYear()} Babygoo. Todos los derechos
                        reservados.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
