import Image from "next/image"
import logo from "../../../../public/img/logo.svg"

interface FooterProps {
  bg?: boolean
}

export function Footer({ bg }: FooterProps) {
  return (
    <footer
      data-bg={bg}
      className="flex justify-center items-center data-[bg=true]:bg-[--background-rgb] pb-6"
    >
      <Image src={logo} alt="" />
    </footer>
  )
}
