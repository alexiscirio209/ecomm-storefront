import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      {/* Título */}
      <Text className="txt-compact-small-plus text-ui-fg-muted text-center w-full text-xs sm:text-sm">
        {title}
      </Text>

      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        {/* Botones */}
        <div className="flex flex-nowrap items-center justify-start sm:justify-center gap-2 sm:gap-3 w-full -mx-2 px-2 sm:mx-0 sm:px-0 py-2">
          {items?.map((i) => (
            <div
              key={i.value}
              className={clx(
                "flex gap-x-2 items-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-gray-200 hover:border-gray-300 transition-all cursor-pointer min-h-[48px] sm:min-h-0 shrink-0 whitespace-nowrap touch-manipulation",
                {
                  "border-[#9057d4] bg-[#9057d4]/10 shadow-sm":
                    i.value === value,
                }
              )}
              onClick={() => handleChange(i.value)}
              role="button"
              tabIndex={0}
            >
              <RadioGroup.Item
                checked={i.value === value}
                className="hidden peer"
                id={i.value}
                value={i.value}
              />
              <Label
                htmlFor={i.value}
                className={clx(
                  "!txt-compact-small !transform-none whitespace-nowrap text-xs sm:text-sm font-medium select-none pointer-events-none",
                  {
                    "text-[#9057d4] font-semibold": i.value === value,
                    "text-ui-fg-subtle": i.value !== value,
                  }
                )}
                data-testid="radio-label"
                data-active={i.value === value}
              >
                {i.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
