import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white py-4 sm:py-6 lg:py-12">
      <div
        className="content-container w-full px-4 sm:px-6"
        data-testid="cart-container"
      >
        {cart?.items?.length ? (
          <>
            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-x-8 xl:gap-x-12">
              {/* Columna Izquierda */}
              <div className="lg:col-span-7 flex flex-col gap-y-4 sm:gap-y-6 w-full">
                {/* Items del Carrito */}
                <div className="w-full lg:pr-4">
                  <ItemsTemplate cart={cart ?? undefined} />
                </div>

                {/* SignIn Prompt */}
                {/*
                {!customer && (
                  <div className="bg-white rounded-none sm:rounded-2xl shadow-sm border-0 sm:border border-gray-100 p-0 sm:p-5 lg:p-6">
                    <SignInPrompt />
                  </div>
                )}
                */}
              </div>

              {/* Columna Derecha */}
              <div className="hidden lg:col-span-5 lg:block">
                <div className="sticky top-8 z-10">
                  {cart && cart.region && (
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6 lg:p-8">
                      <Summary cart={cart as any} />
                    </div>
                  )}
                </div>
              </div>

              {/* Resumen en Móvil */}
              <div className="lg:hidden w-full pt-6 mt-4 border-t border-gray-200">
                {cart && cart.region && <Summary cart={cart as any} />}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
