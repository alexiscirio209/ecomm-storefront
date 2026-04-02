import { Radio as RadioGroupOption } from "@headlessui/react"
import { Text, clx } from "@medusajs/ui"
import React, { useContext, useMemo, type JSX } from "react"

import Radio from "@modules/common/components/radio"

import { isManual } from "@lib/constants"
import SkeletonCardDetails from "@modules/skeletons/components/skeleton-card-details"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import PaymentTest from "../payment-test"
import { StripeContext } from "../payment-wrapper/stripe-wrapper"

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
  children?: React.ReactNode
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  children,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development"

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        "flex flex-col gap-y-2 text-small-regular cursor-pointer py-4 px-5 border rounded-xl mb-4 hover:shadow-md transition-shadow",
        {
          "border-[#0856b5] bg-[#0856b5]/5":
            selectedPaymentOptionId === paymentProviderId,
          "border-gray-200 bg-white":
            selectedPaymentOptionId !== paymentProviderId,
        },
        "lg:py-4 lg:px-8 lg:mb-2 lg:hover:shadow-borders-interactive-with-active lg:bg-gradient-to-br lg:from-gray-50/50 lg:to-white lg:border-gray-100"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4 lg:gap-x-5">
          <Radio checked={selectedPaymentOptionId === paymentProviderId} />
          <Text
            className={clx(
              "text-base-regular text-gray-700",
              "lg:text-base-regular"
            )}
          >
            {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
          </Text>
          {isManual(paymentProviderId) && isDevelopment && (
            <PaymentTest className="hidden small:block" />
          )}
        </div>
        <span className="justify-self-end text-ui-fg-base">
          {paymentInfoMap[paymentProviderId]?.icon}
        </span>
      </div>
      {isManual(paymentProviderId) && isDevelopment && (
        <PaymentTest className="small:hidden text-[10px] mt-2" />
      )}
      {children}
    </RadioGroupOption>
  )
}

export default PaymentContainer

export const StripeCardContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  setCardBrand,
  setError,
  setCardComplete,
}: Omit<PaymentContainerProps, "children"> & {
  setCardBrand: (brand: string) => void
  setError: (error: string | null) => void
  setCardComplete: (complete: boolean) => void
}) => {
  const stripeReady = useContext(StripeContext)

  // CardElement
  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          fontSize: "16px",
          lineHeight: "1.8",
          letterSpacing: "0.5px",
          padding: "14px 16px",
          "::placeholder": {
            color: "rgb(107 114 128)",
            opacity: "1",
          },
        },
        invalid: {
          color: "#dc2626",
          iconColor: "#dc2626",
        },
      },
      classes: {
        // Móvil y Desktop
        base: "w-full bg-white border border-gray-200 rounded-md px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0856b5]/20 focus:border-[#0856b5] transition-all duration-200",
      },
      // Ocultar código postal
      hidePostalCode: true,
    }
  }, [])

  return (
    <PaymentContainer
      paymentProviderId={paymentProviderId}
      selectedPaymentOptionId={selectedPaymentOptionId}
      paymentInfoMap={paymentInfoMap}
      disabled={disabled}
    >
      {selectedPaymentOptionId === paymentProviderId &&
        (stripeReady ? (
          <div className="my-4 transition-all duration-150 ease-in-out">
            <Text className="txt-medium-plus text-ui-fg-base mb-3 text-sm font-semibold">
              Ingrese los datos de su tarjeta:
            </Text>

            {/* CardElement */}
            <div className="w-full">
              <CardElement
                options={useOptions as StripeCardElementOptions}
                onChange={(e) => {
                  setCardBrand(
                    e.brand &&
                      e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                  )
                  setError(e.error?.message || null)
                  setCardComplete(e.complete)
                }}
              />
            </div>

            {/* Texto de ayuda */}
            <p className="text-xs text-gray-500 mt-2 lg:hidden">
              Los campos se llenan horizontalmente
            </p>
          </div>
        ) : (
          <SkeletonCardDetails />
        ))}
    </PaymentContainer>
  )
}
