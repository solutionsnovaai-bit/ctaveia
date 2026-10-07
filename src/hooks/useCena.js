import { useLayoutEffect } from 'react'
import { gsap } from '../lib/motion'
import { usePalco } from './usePalco'

/**
 * Monta as animações de um bloco dentro de um gsap.context, que desfaz tudo
 * sozinho quando o componente sai. A cena só é montada depois que a tela de
 * load começa a abrir: nessa hora as fontes já chegaram, e os textos podem
 * ser medidos e quebrados em linhas sem erro.
 */
export function useCena(montar, escopo, deps = []) {
  const { fase } = usePalco()
  const pronto = fase !== 'carregando'

  useLayoutEffect(() => {
    if (!pronto || !escopo.current) return undefined
    const ctx = gsap.context((self) => montar(self), escopo)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pronto, ...deps])
}
