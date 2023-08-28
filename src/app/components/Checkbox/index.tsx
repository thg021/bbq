import { InputHTMLAttributes } from "react"

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  disabled?: boolean
  defaultChecked?: boolean
  id: string
  label: string
}

export function Checkbox(props: CheckboxProps) {
  return (
    <div className="flex-1 flex justify-start items-center gap-2">
      <input
        className="
        peer appearance-none shrink-0 w-6 h-6 border-2 border-[#998220] rounded-full  bg-white
        focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
        checked:bg-[#FFD836] checked:border-0
        disabled:border-steel-400 disabled:bg-steel-400
        transition duration-200
      "
        type="checkbox"
        {...props}
      />
      <label htmlFor={props.id} className="font-bold text-xl">
        {props.label}
      </label>
    </div>
  )
}
