import Image from 'next/image'

export default function Home() {
  return (
    <main className="w-full 
      flex 
      flex-1 
      justify-start 
      items-center 
      flex-col 
      bg-gradient-to-t from-yellow-400 from-90% to-transparent">

      <form className="
         ">
        
        <label htmlFor="name">Email</label>
        <input id="name" type="email"  />


        <label htmlFor="password">Senha</label>
        <input id="password" type="password" />

      </form>
    </main>
  )
}
