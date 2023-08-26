// import Image from "next/image"
// import peopleIcon from "../../../../public/img/people.svg"
// import moneyIcon from "../../../../public/img/money.svg"
import { Money, People } from "../svgs"

export function Card() {
  return (
    <div className="w-full flex flex-col bg-white shadow-md p-6 h-48 cursor-pointer hover:bg-yellow-400 group transform transition duration-500 hover:scale-105">
      <header className="font-extrabold text-3xl">01/12</header>
      <span className="flex-1 font-bold text-xl">Niver do GUI</span>

      <footer className="w-full flex items-center justify-between font-medium text-xl">
        <div className="flex justify-center items-center gap-3">
          <People className="group-hover:fill-black transition duration-500" />
          <span>12</span>
        </div>

        <div className="flex justify-center items-center gap-3">
          <Money className="group-hover:fill-black transition duration-500" />
          <span>R$ 140,00</span>
        </div>
      </footer>
    </div>
  )
}
