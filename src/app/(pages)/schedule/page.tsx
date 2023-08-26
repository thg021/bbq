import { Card } from "@/app/components/Card"
import { Bbq } from "@/app/components/svgs"

export default function Schedule() {
  return (
    <main className="w-full flex-1 flex justify-start items-center flex-col bg-slate-100">
      <div className="w-full lg:w-[64rem] flex-1 mt-[-3rem]">
        <section className="grid grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-4 px-4">
          <Card />

          <div className="flex flex-col justify-center items-center gap-2 bg-slate-100 shadow-md p-6 h-48">
            <Bbq />
            <h1 className="font-bold text-xl">Adicionar Churras</h1>
          </div>
        </section>
      </div>
    </main>
  )
}
