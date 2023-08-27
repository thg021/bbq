import { InputHTMLAttributes, forwardRef } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  name: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, type, ...rest }, ref) => {
    return (
      <div className="flex flex-col space-y-3">
        {!!label && (
          <label className="font-bold text-xl" htmlFor={name}>
            {label}
          </label>
        )}
        <input
          className="px-4 py-3 rounded-sm placeholder:italic placeholder:text-slate-600"
          id={name}
          type={type}
          ref={ref}
          {...rest}
        />
      </div>
    )
  }
)

Input.displayName = "Input"
