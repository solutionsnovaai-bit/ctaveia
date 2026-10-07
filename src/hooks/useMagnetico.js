import { useEffect } from 'react'
import { gsap, movimentoReduzido, temMouse } from '../lib/motion'

/** O elemento é puxado de leve na direção do mouse e solta com efeito de mola. */
export function useMagnetico(ref, forca = 0.28) {
  useEffect(() => {
    const el = ref.current
    if (!el || movimentoReduzido() || !temMouse()) return undefined

    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'saida' })
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'saida' })

    const mover = (e) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - (r.left + r.width / 2)) * forca)
      y((e.clientY - (r.top + r.height / 2)) * forca)
    }
    const sair = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' })
    }

    el.addEventListener('pointermove', mover)
    el.addEventListener('pointerleave', sair)
    return () => {
      el.removeEventListener('pointermove', mover)
      el.removeEventListener('pointerleave', sair)
    }
  }, [ref, forca])
}
