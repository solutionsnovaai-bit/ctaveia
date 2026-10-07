import { useEffect, useState } from 'react'

/** Acompanha uma media query. Ex.: useMedia('(min-width: 1024px)'). */
export function useMedia(consulta) {
  const [bate, setBate] = useState(() => typeof window !== 'undefined' && window.matchMedia(consulta).matches)

  useEffect(() => {
    const mq = window.matchMedia(consulta)
    const ouvir = () => setBate(mq.matches)
    ouvir()
    mq.addEventListener('change', ouvir)
    return () => mq.removeEventListener('change', ouvir)
  }, [consulta])

  return bate
}

export const useMovimentoReduzido = () => useMedia('(prefers-reduced-motion: reduce)')
