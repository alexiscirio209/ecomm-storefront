import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      {/* Móvil */}
      <div className="lg:hidden">
        <div className="px-4 py-6 flex flex-col gap-y-6">
          {/* Formulario */}
          <div>
            <PaymentWrapper cart={cart}>
              <CheckoutForm cart={cart} customer={customer} />
            </PaymentWrapper>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#f53fd5]/30 via-[#9057d4]/30 to-[#0856b5]/30" />

          {/* Resumen */}
          <div>
            <CheckoutSummary cart={cart} />
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 lg:grid-cols-5 content-container gap-x-8 xl:gap-x-12 py-12">
          {/* Formulario */}
          <div className="lg:col-span-3">
            <PaymentWrapper cart={cart}>
              <CheckoutForm cart={cart} customer={customer} />
            </PaymentWrapper>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 z-10">
              <CheckoutSummary cart={cart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
