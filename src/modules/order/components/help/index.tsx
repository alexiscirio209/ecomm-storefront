import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-4">
      {/* Título */}
      <Heading
        level="h2"
        className="flex flex-row items-center justify-center gap-x-3 mb-8"
      >
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-tight pb-1 lg:text-2xl lg:small:text-3xl">
          ¡Gracias por confiar en nosotros!
        </span>
      </Heading>

      {/* Subtítulo */}
      <Text className="text-gray-600 text-center -mt-4 mb-6">
        ¿Qué te gustaría hacer ahora?
      </Text>

      {/* CTA */}
      <div className="flex flex-col small:flex-row gap-4 justify-center items-center">
        {/* Home */}
        <LocalizedClientLink
          href="/"
          className="w-full small:w-auto px-8 py-3 rounded-xl font-semibold text-[#9057d4] border-2 border-[#9057d4] hover:bg-[#9057d4] hover:text-white transition-all duration-300 text-center"
        >
          Ir al Inicio
        </LocalizedClientLink>

        {/* Productos */}
        <LocalizedClientLink
          href="/store"
          className="w-full small:w-auto px-8 py-3 rounded-xl font-semibold text-[#9057d4] border-2 border-[#9057d4] hover:bg-[#9057d4] hover:text-white transition-all duration-300 text-center"
        >
          Ver Productos
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Help
