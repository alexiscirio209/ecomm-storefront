import { deleteLineItem } from "@lib/data/cart"
import { clx } from "@medusajs/ui"
import { useState } from "react"
import Spinner from "@modules/common/icons/spinner"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex items-center justify-center w-6 h-6 small:w-7 small:h-7 rounded-full border border-gray-300 text-gray-400 hover:border-red-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200 cursor-pointer"
        onClick={() => handleDelete(id)}
        aria-label="Eliminar producto"
      >
        {isDeleting ? (
          <Spinner className="animate-spin w-3.5 h-3.5 small:w-4 small:h-4" />
        ) : (
          /* Ícono */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 small:w-4 small:h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
      {children && (
        <span className="ml-1.5 text-xs text-gray-400 group-hover:text-red-500 transition-colors duration-200 hidden small:inline">
          {children}
        </span>
      )}
    </div>
  )
}

export default DeleteButton
