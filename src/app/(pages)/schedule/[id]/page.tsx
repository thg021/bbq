import Image from "next/image"
import peopleIcon from "../../../../../public/img/people.svg"
import moneyIcon from "../../../../../public/img/money.svg"

export default function Details() {
  return (
    <main className="w-full flex-1 flex justify-start items-center flex-col bg-slate-100">
      <div className="w-full lg:w-[64rem] flex-1 mt-[-3rem]">
        <div className="flex flex-col bg-white shadow-md p-6 mx-4">
          <header className="flex justify-between">
            <div>
              <h2 className="font-extrabold text-[1.75rem]">01/12</h2>
              <h1 className="font-bold text-[2.25rem]">Níver do Gui</h1>
            </div>
            <div className="flex flex-col justify-around items-start">
              <div className="flex justify-center items-center gap-3">
                <Image src={peopleIcon} alt="" />
                <span className="font-medium text-[1.312rem]">12</span>
              </div>

              <div className="flex justify-center items-center gap-3">
                <Image src={moneyIcon} alt="" />
                <span className="font-medium text-[1.312rem]">R$ 140,00</span>
              </div>
            </div>
          </header>
        </div>
      </div>
    </main>
  )
}
