import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import WhatsAppButton from "@modules/common/components/whatsapp-button"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),

  authors: [{ name: "Babygoo" }],
  creator: "Babygoo",
  publisher: "Babygoo",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "es_MX",
    url: getBaseURL(),
    siteName: "Babygoo",
  },

  alternates: {
    canonical: getBaseURL(),
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="es" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
        <WhatsAppButton />
      </body>
    </html>
  )
}
