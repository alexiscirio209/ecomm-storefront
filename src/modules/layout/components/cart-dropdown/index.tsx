"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="relative inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-100 transition-all duration-200"
            href="/cart"
            data-testid="nav-cart-link"
          >
            {/* Cart icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {/* Badge de cantidad */}
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-[9px] font-bold text-white bg-[#9057d4] rounded-full shadow-sm">
                {totalItems}
              </span>
            )}
          </LocalizedClientLink>
        </PopoverButton>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+12px)] right-0 bg-white border-0 rounded-2xl shadow-2xl w-[420px] overflow-hidden"
            data-testid="nav-cart-dropdown"
            style={{
              boxShadow: "0 25px 50px -12px rgba(144, 87, 212, 0.15)",
            }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {/* Cart icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Tu Carrito
                </h3>
                {totalItems > 0 && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                    {totalItems} {totalItems === 1 ? "producto" : "productos"}
                  </span>
                )}
              </div>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                {/* Items */}
                <div className="overflow-y-scroll max-h-[402px] px-5 py-4 space-y-4 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item, index, array) => (
                      <div
                        key={item.id}
                        className="relative group"
                        data-testid="cart-item"
                      >
                        {/* Grid */}
                        <div className="flex gap-4">
                          {/* Producto */}
                          <LocalizedClientLink
                            href={`/products/${item.product_handle}`}
                            className="flex-shrink-0"
                          >
                            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 border-2 border-gray-100 group-hover:border-[#9057d4] group-hover:shadow-lg transition-all duration-300">
                              <Thumbnail
                                thumbnail={item.thumbnail}
                                images={item.variant?.product?.images}
                                size="square"
                              />
                            </div>
                          </LocalizedClientLink>

                          {/* Info de producto */}
                          <div className="flex-1 min-w-0 flex flex-col">
                            {/* Fila 1 */}
                            <div className="flex items-start justify-between mb-1.5">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                className="text-sm font-bold text-gray-800 hover:text-[#9057d4] transition-colors duration-200 line-clamp-2 flex-1 mr-3 leading-snug"
                                data-testid="product-link"
                              >
                                {item.title}
                              </LocalizedClientLink>

                              {/* LineItemPrice */}
                              <div className="flex-shrink-0">
                                <div className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]">
                                  <LineItemPrice
                                    item={item}
                                    style="tight"
                                    currencyCode={cartState.currency_code}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Fila 2 */}
                            <div className="text-xs text-gray-500 mb-1">
                              <LineItemOptions
                                variant={item.variant}
                                data-testid="cart-item-variant"
                                data-value={item.variant}
                              />
                            </div>

                            {/* Fila 3 */}
                            <div className="flex items-center justify-between mt-auto pt-1">
                              <span
                                className="text-xs font-medium text-gray-400"
                                data-testid="cart-item-quantity"
                                data-value={item.quantity}
                              >
                                Cant: {item.quantity}
                              </span>

                              {/* Eliminar */}
                              <DeleteButton
                                id={item.id}
                                className="flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                                data-testid="cart-item-remove-button"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Divisor */}
                        {index < array.length - 1 && (
                          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
                        )}
                      </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-700">
                      Subtotal
                      <span className="font-normal text-gray-500 block text-xs">
                        (excl. impuestos)
                      </span>
                    </span>
                    <span
                      className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>

                  {/* Botón */}
                  <LocalizedClientLink href="/cart" passHref>
                    <button
                      className="w-full h-12 rounded-xl font-bold text-white transition-all duration-300 relative overflow-hidden group"
                      data-testid="go-to-cart-button"
                      style={{
                        background:
                          "linear-gradient(135deg, #f53fd5 0%, #9057d4 50%, #0856b5 100%)",
                      }}
                    >
                      {/* Glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
                          boxShadow: "inset 0 2px 8px rgba(255,255,255,0.3)",
                        }}
                      />

                      {/* Contenido */}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Ir al Carrito
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>

                      {/* Borde */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow:
                            "inset 0 0 20px rgba(255,255,255,0.4), 0 0 20px rgba(144,87,212,0.5)",
                        }}
                      />
                    </button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="p-8">
                <div className="flex flex-col items-center justify-center py-8">
                  {/* Carrito vacio */}
                  <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>

                  <p className="text-gray-500 text-sm font-medium mb-2">
                    Tu carrito está vacío
                  </p>
                  <p className="text-gray-400 text-xs text-center mb-6">
                    ¡Agrega productos para comenzar!
                  </p>

                  <LocalizedClientLink href="/store">
                    <Button
                      onClick={close}
                      className="px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-200 bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] hover:shadow-lg"
                    >
                      Explorar Productos
                    </Button>
                  </LocalizedClientLink>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
