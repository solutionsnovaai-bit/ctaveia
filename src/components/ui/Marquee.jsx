import { useEffect, useRef } from 'react'
import { gsap, movimentoReduzido } from '../../lib/motion'
import { velocidade } from '../../lib/scroll'
import { useVisivel } from '../../hooks/useVisivel'
import { cx } from '../../lib/util'

/**
 * Faixa de texto que corre sem parar. A rolagem da página empurra: rolar para
 * baixo acelera, rolar para cima inverte o sentido, e a faixa inclina junto.
 */
export function Marquee({ children, base = 60, sentido = 1, repeticoes = 6, className }) {
  const raiz = useRef(null)
  const trilho = useRef(null)
  const visivel = useVisivel(raiz, '120px')

  useEffect(() => {
    const el = trilho.current
    if (!el || !visivel || movimentoReduzido()) return undefined

    let largura = el.firstElementChild.getBoundingClientRect().width
    let x = 0
    let impulso = 0
    let ultimoY = window.scrollY

    const medir = () => {
      largura = el.firstElementChild.getBoundingClientRect().width
    }
    const ro = new ResizeObserver(medir)
    ro.observe(el.firstElementChild)

    const tick = (_, dt) => {
      const y = window.scrollY
      const delta = velocidade() || y - ultimoY
      ultimoY = y
      impulso += (delta - impulso) * 0.12
      const passo = (base + impulso * 14) * sentido * (dt / 1000)
      x -= passo
      if (largura > 0) x = ((x % largura) - largura) % largura
      el.style.transform = `translate3d(${x.toFixed(2)}px,0,0) skewX(${gsap.utils.clamp(-9, 9, -impulso * 0.22).toFixed(2)}deg)`
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
    }
  }, [visivel, base, sentido])

  return (
    <div ref={raiz} className={cx('marquee', className)} aria-hidden="true">
      <div ref={trilho} className="marquee-trilho">
        {Array.from({ length: repeticoes }, (_, i) => (
          <div key={i} className="marquee-bloco">
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
