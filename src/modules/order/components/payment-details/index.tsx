import { Container, Heading, Text } from "@medusajs/ui"

import { isStripeLike, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <div>
      <Heading
        level="h2"
        className="flex flex-row items-center justify-center gap-x-3 mb-8"
      >
        {/* Header */}
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5] leading-tight pb-1 lg:text-2xl lg:small:text-3xl">
          Pago
        </span>
      </Heading>

      {payment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Método de Pago */}
          <div
            className="flex flex-col gap-3 w-full items-center text-center"
            data-testid="payment-method"
          >
            <Text className="text-sm font-semibold text-gray-800">
              Método de pago
            </Text>
            <div className="flex flex-col gap-1">
              <Text className="text-sm text-gray-600 leading-relaxed">
                {paymentInfoMap[payment.provider_id].title}
              </Text>
            </div>
          </div>

          {/* Detalles de Pago */}
          <div
            className="flex flex-col gap-3 w-full items-center text-center"
            data-testid="payment-amount"
          >
            <Text className="text-sm font-semibold text-gray-800">
              Detalles de pago
            </Text>
            <div className="flex flex-col gap-1">
              {/* Información de pago */}
              <Text className="text-sm text-gray-600 leading-relaxed">
                {isStripeLike(payment.provider_id) && payment.data?.card_last4
                  ? `**** **** **** ${payment.data.card_last4}`
                  : `${convertToLocale({
                      amount: payment.amount,
                      currency_code: order.currency_code,
                    })} Pagado el ${new Date(
                      payment.created_at ?? ""
                    ).toLocaleString()}`}
              </Text>
            </div>
          </div>
        </div>
      )}

      <Divider className="mt-8 border-gray-100" />
    </div>
  )
}

export default PaymentDetails
