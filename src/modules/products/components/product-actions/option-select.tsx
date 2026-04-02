import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm font-semibold text-gray-700">
        Selecciona {title}
      </span>
      <div
        className="flex flex-wrap justify-start gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "relative text-sm font-medium h-9 px-4 rounded-full transition-all duration-200 flex-1 min-w-[50px] max-w-[100px] bg-white",
                {
                  "text-[#9057d4] shadow-md": v === current,
                  "border-2 border-gray-200 text-gray-600 hover:border-[#9057d4] hover:shadow-sm":
                    v !== current,
                  "opacity-50 cursor-not-allowed": disabled,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
              style={
                v === current
                  ? {
                      background: `linear-gradient(white, white) padding-box, linear-gradient(to right, #f53fd5, #9057d4, #0856b5) border-box`,
                      border: "2px solid transparent",
                    }
                  : {}
              }
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
