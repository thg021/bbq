// import Image from "next/image"
// import logo from "../../../../public/img/logo.svg"

import { Logo } from "../svgs"

interface FooterProps {
  bg?: boolean
}

export function Footer({ bg = false }: FooterProps) {
  return (
    <footer
      data-bg={bg}
      className="flex justify-center items-center bg-transparent data-[bg=true]:bg-[--background-rgb] pb-6 pt-6"
    >
      <Logo />
    </footer>
  )
}
