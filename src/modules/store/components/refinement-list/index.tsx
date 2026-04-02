"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  "data-testid"?: string
}

const RefinementList = ({
  sortBy,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0" data-testid={dataTestId}>
      {/* Contenedor de botones */}
      <div
        className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 py-2 touch-pan-x"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        <div className="flex flex-nowrap items-center justify-start sm:justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:flex-wrap">
          <SortProducts
            sortBy={sortBy}
            setQueryParams={setQueryParams}
            data-testid={dataTestId}
          />
        </div>
      </div>
    </div>
  )
}

export default RefinementList
