import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    // Contenedor principal
    <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#0856b5] via-[#9057d4] to-[#f53fd5]">
      {/* Fondo fijo */}
      <div
        className="absolute inset-0 z-0 mix-blend-multiply bg-fixed"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dbq3cuzer/image/upload/v1773109765/bbgbg_uhmktk.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* OVERLAY */}
      <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[1px]" />

      {/* Contenido */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-[0.2em] uppercase mb-8 shadow-sm">
          Nuevos Productos
        </span>

        {/* Título */}
        <Heading
          level="h1"
          className="text-4xl md:text-6xl lg:text-7xl font-normal leading-tight mb-6 text-white drop-shadow-lg"
        >
          BIENVENIDO A <br className="hidden md:block" /> BABYGOO
        </Heading>

        {/* Descripcion */}
        <Text className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-2xl leading-relaxed drop-shadow-md">
          Descubre nuestra exclusiva selección de ropa y accesorios diseñados
          con amor, comodidad y los materiales más delicados para la piel de tu
          pequeño.
        </Text>

        {/* Botón de coleccion */}
        <LocalizedClientLink href="/store">
          <button className="group relative px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full shadow-lg hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden">
            {/* Efecto */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 scale-0 group-hover:scale-150 rounded-full" />

            <span className="relative z-10 text-base md:text-lg flex items-center gap-2 tracking-wide">
              Ver Colección
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
