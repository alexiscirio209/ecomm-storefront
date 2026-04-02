import { Dialog, Transition } from "@headlessui/react"
import { Button, clx } from "@medusajs/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)

  return (
    <>
      {/* Barra inferior */}
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-50", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
        >
          <div
            className="bg-white/95 backdrop-blur-md flex flex-col gap-y-3 justify-center items-center text-large-regular p-4 h-auto w-full border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
            data-testid="mobile-actions"
          >
            {/* Título y precio */}
            <div className="flex flex-col items-center gap-y-1 w-full">
              <div className="flex items-center gap-x-2 text-sm text-gray-700">
                <span
                  className="font-medium truncate"
                  data-testid="mobile-title"
                >
                  {product.title}
                </span>
              </div>

              {selectedPrice ? (
                <div className="flex items-center gap-x-2">
                  {selectedPrice.price_type === "sale" && (
                    <p className="text-sm text-gray-400 line-through">
                      {selectedPrice.original_price}
                    </p>
                  )}
                  <span
                    className={clx(
                      "text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]",
                      {
                        "text-ui-fg-interactive":
                          selectedPrice.price_type === "sale",
                      }
                    )}
                  >
                    {selectedPrice.calculated_price}
                  </span>
                  {selectedPrice.price_type === "sale" && (
                    <span className="text-xs font-bold text-[#f53fd5] bg-[#f53fd5]/10 px-2 py-0.5 rounded-full">
                      -{selectedPrice.percentage_diff}%
                    </span>
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>

            {/* Botones */}
            <div
              className={clx("grid grid-cols-2 w-full gap-x-3", {
                "!grid-cols-1": isSimple,
              })}
            >
              {!isSimple && (
                <Button
                  onClick={open}
                  variant="secondary"
                  className="w-full h-12 rounded-xl border-2 border-[#9057d4] text-[#9057d4] font-semibold hover:bg-[#9057d4]/10 transition-colors"
                  data-testid="mobile-actions-button"
                >
                  <div className="flex items-center justify-between w-full px-2">
                    <span className="truncate text-sm">
                      {variant
                        ? Object.values(options).join(" / ")
                        : "Seleccionar"}
                    </span>
                    <ChevronDown />
                  </div>
                </Button>
              )}
              <Button
                onClick={handleAddToCart}
                disabled={!inStock || !variant}
                className={clx(
                  "w-full h-12 rounded-xl font-bold text-white shadow-lg transition-all duration-200",
                  "bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]",
                  "hover:opacity-90 hover:shadow-xl hover:scale-[1.02]",
                  "active:scale-[0.98]",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                )}
                isLoading={isAdding}
                data-testid="mobile-cart-button"
              >
                {!variant
                  ? "Elige una opcion"
                  : !inStock
                  ? "Elige una opcion"
                  : "Agregar al Carrito"}
              </Button>
            </div>
          </div>
        </Transition>
      </div>

      {/* Modal de variantes */}
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-end justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-full"
              >
                <Dialog.Panel
                  className="w-full h-auto max-h-[80vh] transform overflow-hidden text-left flex flex-col gap-y-3 bg-white rounded-t-3xl shadow-2xl"
                  data-testid="mobile-actions-modal"
                >
                  {/* Header modal */}
                  <div className="w-full flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]">
                      Seleccionar Opciones
                    </h3>
                    <button
                      onClick={close}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex justify-center items-center transition-colors"
                      data-testid="close-modal-button"
                    >
                      <X />
                    </button>
                  </div>

                  {/* Contenido modal */}
                  <div className="bg-white px-6 py-8 overflow-y-auto">
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-6">
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title ?? ""}
                                disabled={optionsDisabled}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
