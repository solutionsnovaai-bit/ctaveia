import { useEffect } from 'react'
import { temMouse } from '../lib/motion'

/**
 * Faz a borda dos cartões acender perto do mouse. Um único ouvinte na página
 * inteira atualiza a posição da luz no cartão que está embaixo do cursor.
 */
export function useBordaViva() {
  useEffect(() => {
    if (!temMouse()) return undefined
    let quadro = 0
    let evento = null

    const pintar = () => {
      quadro = 0
      const cartao = evento.target.closest?.('.cartao')
      if (!cartao) return
      const r = cartao.getBoundingClientRect()
      cartao.style.setProperty('--mx', `${evento.clientX - r.left}px`)
      cartao.style.setProperty('--my', `${evento.clientY - r.top}px`)
    }
    const mover = (e) => {
      evento = e
      if (!quadro) quadro = requestAnimationFrame(pintar)
    }

    document.addEventListener('pointermove', mover, { passive: true })
    return () => {
      cancelAnimationFrame(quadro)
      document.removeEventListener('pointermove', mover)
    }
  }, [])
}
