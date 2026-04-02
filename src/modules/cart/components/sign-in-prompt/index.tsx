import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl border border-gray-100 p-4 small:p-6 flex flex-col small:flex-row items-start small:items-center justify-between gap-4 small:gap-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Contenido */}
      <div className="flex flex-col gap-y-1.5">
        <Heading
          level="h2"
          className="text-base small:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]"
        >
          ¿Ya tienes una cuenta?
        </Heading>
        <Text className="text-sm text-gray-500">
          Inicia sesión para una mejor experiencia.
        </Text>
      </div>

      {/* Sign in */}
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10 small:h-11 px-6 rounded-xl font-semibold text-white shadow-md transition-all duration-200 bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] hover:shadow-[0_0_20px_rgba(144,87,212,0.4)] hover:brightness-110"
            data-testid="sign-in-button"
          >
            Iniciar Sesión
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
