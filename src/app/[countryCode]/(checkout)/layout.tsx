import Nav from "@modules/layout/templates/nav"
import Footer from "@modules/layout/templates/footer"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white relative small:min-h-screen">
      {/* Navbar */}
      <Nav />

      {/* Checkout */}
      <main className="relative" data-testid="checkout-container">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
