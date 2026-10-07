import { useEffect } from 'react'
import { ScrollTrigger } from './lib/motion'
import { encerrarRolagem, iniciarRolagem } from './lib/scroll'
import { usePalco } from './hooks/usePalco'
import { useBordaViva } from './hooks/useBordaViva'
import { Loader } from './components/layout/Loader'
import { Navbar } from './components/layout/Navbar'
import { Rodape } from './components/layout/Rodape'
import { WhatsFlutuante } from './components/layout/WhatsFlutuante'
import { Hero } from './sections/Hero'
import { FaixaLema } from './sections/FaixaLema'
import { Manifesto } from './sections/Manifesto'
import { Modalidades } from './sections/Modalidades'
import { Horarios } from './sections/Horarios'
import { Kids } from './sections/Kids'
import { Galeria } from './sections/Galeria'
import { Valores } from './sections/Valores'
import { PrimeiraAula } from './sections/PrimeiraAula'
import { Local } from './sections/Local'
import { Faq } from './sections/Faq'
import { Chamada } from './sections/Chamada'

export default function App() {
  const { fase } = usePalco()
  useBordaViva()

  useEffect(() => {
    iniciarRolagem()
    return encerrarRolagem
  }, [])

  // Com a página livre, as posições das animações de rolagem são recalculadas.
  useEffect(() => {
    if (fase !== 'livre') return undefined
    const id = setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => clearTimeout(id)
  }, [fase])

  return (
    <>
      <a href="#conteudo" className="pular">
        Pular para o conteúdo
      </a>
      <Loader />
      <Navbar />
      <main id="conteudo">
        <Hero />
        <FaixaLema />
        <Manifesto />
        <Modalidades />
        <Horarios />
        <Kids />
        <Galeria />
        <Valores />
        <PrimeiraAula />
        <Local />
        <Faq />
        <Chamada />
      </main>
      <Rodape />
      <WhatsFlutuante />
    </>
  )
}
