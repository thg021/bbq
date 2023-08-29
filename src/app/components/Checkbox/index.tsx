import { InputHTMLAttributes, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  disabled?: boolean
  id: string
  label: string
}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props: CheckboxProps, ref) => {
    return (
      <>
        <input
          ref={ref}
          className={twMerge(
            "peer appearance-none shrink-0 w-6 h-6 border-2 border-[#998220] rounded-full  bg-white focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100 checked:bg-[#FFD836] checked:border-0 disabled:border-steel-400 disabled:bg-steel-400 transition duration-200 cursor-pointer",
            props.className
          )}
          type="checkbox"
          {...props}
        />
        <label htmlFor={props.id} className="font-bold text-xl">
          {props.label}
        </label>
      </>
    )
  }
)
Checkbox.displayName = "Checkbox"
