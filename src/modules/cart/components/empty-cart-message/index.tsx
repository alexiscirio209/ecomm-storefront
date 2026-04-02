import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-12 small:py-24 px-4 flex flex-col justify-center items-center text-center"
      data-testid="empty-cart-message"
    >
      {/* Cart icon */}
      <div className="relative mb-6 small:mb-8">
        <div className="w-20 h-20 small:w-28 small:h-28 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 small:w-14 small:h-14 text-gray-300"
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

        {/* Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 small:w-8 small:h-8 rounded-full bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] flex items-center justify-center shadow-md animate-bounce-slow">
          <span className="text-white text-xs small:text-sm font-bold">0</span>
        </div>
      </div>

      {/* Título */}
      <Heading
        level="h1"
        className="text-2xl small:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] mb-3"
      >
        Tu carrito está vacío
      </Heading>

      {/* Mensaje */}
      <Text className="text-sm small:text-base text-gray-500 max-w-[28rem] small:max-w-[32rem] leading-relaxed mb-8">
        Parece que aún no has agregado productos. ¡Es el momento perfecto para
        descubrir nuestras novedades!
      </Text>

      {/* Botón CTA */}
      <div
        className="group relative inline-flex items-center justify-center px-8 py-3 small:px-10 small:py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f53fd5 0%, #9057d4 50%, #0856b5 100%)",
        }}
      >
        {/* Hover */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            transform: "translateX(-100%)",
          }}
        />

        {/* InteractiveLink */}
        <InteractiveLink href="/store">
          <span className="relative z-10 text-white font-bold">
            Explorar Productos
          </span>
        </InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
