import { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  name: string
}

export function Input({ label, name, type, ...rest }: InputProps) {
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
        {...rest}
      />
    </div>
  )
}
