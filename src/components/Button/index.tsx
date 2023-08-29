import { ComponentProps } from "react"
import { VariantProps, tv } from "tailwind-variants"

const button = tv({
  base: "relative rounded px-5 py-2.5 text-black font-bold  overflow-hidden group transition-all ease-out duration-300 hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-400",
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
    text: string
  }

export function Button({ text, variant, ...rest }: ButtonProps) {
  return (
    <button type="submit" className={button({ variant })} {...rest}>
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative">{text}</span>
    </button>
  )
}
