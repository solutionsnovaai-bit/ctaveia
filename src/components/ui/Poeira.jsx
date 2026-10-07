import { useEffect, useRef } from 'react'
import { movimentoReduzido } from '../../lib/motion'
import { useVisivel } from '../../hooks/useVisivel'
import { cx } from '../../lib/util'

/**
 * Pó dourado subindo devagar, o mesmo que aparece em volta do logo nas artes
 * do CT. Roda só enquanto está na tela e com a aba aberta.
 */
export function Poeira({ quantidade = 46, className }) {
  const ref = useRef(null)
  const visivel = useVisivel(ref)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || !visivel || movimentoReduzido()) return undefined
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let quadro = 0
    let antes = performance.now()

    const novo = (aoNascer) => ({
      x: Math.random(),
      y: aoNascer ? 1.05 : Math.random(),
      r: 0.5 + Math.random() * 1.7,
      v: 0.012 + Math.random() * 0.03,
      deriva: (Math.random() - 0.5) * 0.02,
      fase: Math.random() * Math.PI * 2,
      brilho: 0.25 + Math.random() * 0.6,
    })
    const graos = Array.from({ length: quantidade }, () => novo(false))

    const medir = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const ro = new ResizeObserver(medir)
    ro.observe(canvas)
    medir()

    const desenhar = (agora) => {
      const dt = Math.min(0.05, (agora - antes) / 1000)
      antes = agora
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      graos.forEach((g, i) => {
        g.y -= g.v * dt
        g.x += (g.deriva + Math.sin(agora / 1400 + g.fase) * 0.006) * dt
        if (g.y < -0.05 || g.x < -0.05 || g.x > 1.05) graos[i] = novo(true)
        // some perto do topo e nasce apagado
        const vida = Math.min(1, (1.05 - g.y) * 5) * Math.min(1, g.y * 2.2)
        const pisca = 0.7 + 0.3 * Math.sin(agora / 380 + g.fase)
        ctx.fillStyle = `rgba(253, 208, 3, ${(g.brilho * vida * pisca).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(g.x * w, g.y * h, g.r, 0, Math.PI * 2)
        ctx.fill()
      })
      quadro = requestAnimationFrame(desenhar)
    }

    const aoTrocarAba = () => {
      cancelAnimationFrame(quadro)
      if (!document.hidden) {
        antes = performance.now()
        quadro = requestAnimationFrame(desenhar)
      }
    }
    aoTrocarAba()
    document.addEventListener('visibilitychange', aoTrocarAba)

    return () => {
      cancelAnimationFrame(quadro)
      ro.disconnect()
      document.removeEventListener('visibilitychange', aoTrocarAba)
    }
  }, [visivel, quantidade])

  return <canvas ref={ref} className={cx('poeira', className)} aria-hidden="true" />
}
