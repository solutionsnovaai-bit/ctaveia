import { useEffect } from 'react'
import { gsap, movimentoReduzido, temMouse } from '../lib/motion'

/**
 * Inclina um elemento em 3D na direção do mouse e devolve ao lugar na saída.
 * O brilho acompanha pelas variáveis --luz-x e --luz-y (em %).
 */
export function useTilt(ref, { maximo = 9, escala = 1.02 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || movimentoReduzido() || !temMouse()) return undefined

    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'saida' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'saida' })
    gsap.set(el, { transformPerspective: 1100, transformStyle: 'preserve-3d' })

    const mover = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      ry((x - 0.5) * 2 * maximo)
      rx((0.5 - y) * 2 * maximo)
      el.style.setProperty('--luz-x', `${(x * 100).toFixed(1)}%`)
      el.style.setProperty('--luz-y', `${(y * 100).toFixed(1)}%`)
    }
    const entrar = () => gsap.to(el, { scale: escala, duration: 0.6 })
    const sair = () => {
      rx(0)
      ry(0)
      gsap.to(el, { scale: 1, duration: 0.8 })
    }

    el.addEventListener('pointermove', mover)
    el.addEventListener('pointerenter', entrar)
    el.addEventListener('pointerleave', sair)
    return () => {
      el.removeEventListener('pointermove', mover)
      el.removeEventListener('pointerenter', entrar)
      el.removeEventListener('pointerleave', sair)
      gsap.set(el, { clearProps: 'transform' })
    }
  }, [ref, maximo, escala])
}
