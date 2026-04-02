const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <span className={`text-sm text-gray-500 ${className || ""}`}>
      Te contactamos para coordinar el pago
    </span>
  )
}

export default PaymentTest
