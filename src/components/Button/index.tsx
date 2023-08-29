import { ComponentProps, ElementType } from "react"
import { VariantProps, tv } from "tailwind-variants"

const button = tv({
  base: "relative flex items-center  rounded px-5 py-2.5 text-black font-bold  overflow-hidden group transition-all ease-out duration-300 hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-400",
  variants: {
    variant: {
      primary: "bg-yellow-500 ",
      secondary: "bg-white "
    }
  },
  defaultVariants: {
    variant: "primary"
  }
})
export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    text?: string
    icon?: ElementType
  }

export function Button({
  text,
  variant,
  className,
  icon: Icon,
  ...rest
}: ButtonProps) {
  return (
    <button type="submit" className={button({ variant, className })} {...rest}>
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      {Icon && <Icon className="w-6 fill-red-500 group-hover:fill-white" />}
      {text && <span className="relative pr-2">{text}</span>}
    </button>
  )
}
