import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    <div className="w-full pb-6 sm:pb-8">
      {/* Header */}
      <div className="pb-4 sm:pb-6 lg:pb-8 flex items-center justify-center px-4 lg:px-0 lg:pt-8">
        <Heading className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f53fd5] via-[#9057d4] to-[#0856b5]">
          Tus Productos
        </Heading>
      </div>

      {/* Vista Móvil */}
      <div className="small:hidden flex flex-col gap-4 px-4">
        {items
          ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                    type="full"
                    view="mobile"
                  />
                )
              })
          : repeat(5).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
      </div>

      {/* Desktop */}
      <div className="hidden small:block relative overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white">
        {/* Contenido */}
        <div className="relative overflow-x-auto">
          <Table>
            {/* Header */}
            <Table.Header>
              <Table.Row className="text-gray-700 text-xs small:text-sm font-extrabold uppercase tracking-wider">
                <Table.HeaderCell className="w-[40%] text-center py-5 px-4 small:px-6 bg-white">
                  Producto
                </Table.HeaderCell>
                <Table.HeaderCell className="w-[20%] text-center py-5 px-4 small:px-6 bg-white">
                  Cantidad
                </Table.HeaderCell>
                <Table.HeaderCell className="hidden small:table-cell w-[15%] text-center py-5 px-4 small:px-6 bg-white">
                  Precio
                </Table.HeaderCell>
                <Table.HeaderCell className="w-[25%] text-center py-5 px-4 small:px-6 bg-white">
                  Total
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {/* Body */}
            <Table.Body className="bg-white">
              {items
                ? items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => {
                      return (
                        <Item
                          key={item.id}
                          item={item}
                          currencyCode={cart?.currency_code}
                          type="full"
                          view="desktop"
                        />
                      )
                    })
                : repeat(5).map((i) => {
                    return <SkeletonLineItem key={i} />
                  })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default ItemsTemplate
