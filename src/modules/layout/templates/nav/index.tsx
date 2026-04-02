import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Header */}
      <header className="relative h-16 mx-auto duration-200 bg-gradient-to-r from-[#0856b5] via-[#9057d4] to-[#f53fd5] shadow-lg backdrop-blur-md bg-opacity-90 border-b border-white/10">
        <nav className="content-container txt-xsmall-plus flex items-center justify-between w-full h-full text-small-regular text-white font-medium px-4 md:px-8">
          {/* Logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="h-full flex items-center hover:opacity-90 transition-opacity duration-300"
              data-testid="nav-store-link"
            >
              <img
                src="https://res.cloudinary.com/dbq3cuzer/image/upload/v1769708707/lglt_jg4uek.png"
                alt="Logo Babygoo"
                className="h-20 md:h-25 w-auto object-contain"
              />
            </LocalizedClientLink>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-x-4 md:gap-x-6 h-full">
            {/* Menu */}
            <div className="h-full flex items-center">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>

            {/* Divider */}
            <div className="hidden small:block h-6 w-px bg-white/20 mx-2"></div>

            {/* Cuenta */}
            {/*
            <div className="hidden small:flex items-center h-full">
              <LocalizedClientLink
                className="hover:text-brand-pinkSoft transition-colors duration-300 font-medium tracking-wide"
                href="/account"
                data-testid="nav-account-link"
              >
                Cuenta
              </LocalizedClientLink>
            </div>
            */}

            {/* Cart */}
            <Suspense
              fallback={
                /* Loader */
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-5 h-5 bg-white/20 rounded-full animate-pulse" />
                </div>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
