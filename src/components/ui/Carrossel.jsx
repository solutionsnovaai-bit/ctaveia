import { useEffect, useRef, useState } from 'react'
import { gsap, movimentoReduzido } from '../../lib/motion'
import { useVisivel } from '../../hooks/useVisivel'
import { cx } from '../../lib/util'

/**
 * Fotos que passam sozinhas, com as barrinhas de story no topo. A próxima foto
 * entra por cima com uma cortina da direita e desce do zoom. Para quando sai
 * da tela ou quando o mouse está em cima; um toque passa para a próxima.
 * A moldura é a mesma da Foto, então a revelação (revelarFotos) vale aqui também.
 */
export function Carrossel({ fotos, className, segundos = 4, legenda, carregar = 'lazy' }) {
  const raiz = useRef(null)
  const visivel = useVisivel(raiz, '0px')
  const [atual, setAtual] = useState(0)
  const ctl = useRef({ atual: 0, camada: 1, barra: null, parado: false, ir: null })
  const varias = fotos.length > 1

  useEffect(() => {
    const el = raiz.current
    if (!el || !varias) return undefined
    const c = ctl.current
    const reduzido = movimentoReduzido()

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.car-slide', el)
      const barras = gsap.utils.toArray('.car-barra-cheia', el)
      gsap.set(slides, { clipPath: 'inset(0% 0% 0% 100%)' })
      gsap.set(slides[0], { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 1 })

      const encher = (i) => {
        c.barra?.kill()
        barras.forEach((b, k) => gsap.set(b, { scaleX: k < i ? 1 : 0 }))
        if (reduzido) return
        c.barra = gsap.fromTo(
          barras[i],
          { scaleX: 0 },
          { scaleX: 1, duration: segundos, ease: 'none', paused: c.parado, onComplete: () => c.ir((i + 1) % slides.length) },
        )
      }

      c.ir = (i) => {
        const antes = slides[c.atual]
        const depois = slides[i]
        if (i === c.atual) return
        c.atual = i
        setAtual(i)
        c.camada += 1
        if (reduzido) {
          gsap.set(depois, { clipPath: 'inset(0% 0% 0% 0%)', zIndex: c.camada })
          gsap.set(antes, { clipPath: 'inset(0% 0% 0% 100%)' })
        } else {
          gsap.set(depois, { zIndex: c.camada })
          gsap.fromTo(
            depois,
            { clipPath: 'inset(0% 0% 0% 100%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.05,
              ease: 'pesado',
              onComplete: () => gsap.set(antes, { clipPath: 'inset(0% 0% 0% 100%)', xPercent: 0, scale: 1 }),
            },
          )
          gsap.fromTo(depois, { scale: 1.2, xPercent: 6 }, { scale: 1, xPercent: 0, duration: 1.5, ease: 'saida' })
          gsap.to(antes, { xPercent: -10, scale: 1.04, duration: 1.05, ease: 'pesado' })
        }
        encher(i)
      }

      encher(0)
    }, el)

    return () => {
      ctx.revert()
      c.barra = null
      c.atual = 0
      c.camada = 1
    }
  }, [varias, segundos, fotos.length])

  // Fora da tela (ou com o mouse em cima), a barra para de encher.
  useEffect(() => {
    const c = ctl.current
    c.parado = !visivel
    if (visivel) c.barra?.resume()
    else c.barra?.pause()
  }, [visivel])

  const pausar = (sim) => {
    const c = ctl.current
    if (!visivel) return
    c.parado = sim
    if (sim) c.barra?.pause()
    else c.barra?.resume()
  }

  return (
    <figure
      ref={raiz}
      className={cx('foto carrossel', className)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && pausar(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && pausar(false)}
      onClick={() => varias && ctl.current.ir?.((ctl.current.atual + 1) % fotos.length)}
    >
      <div className="foto-mascara">
        <div className="foto-img">
          {fotos.map((f, i) => (
            <img
              key={f.src + i}
              className="car-slide"
              src={`/img/fotos/${f.src}.webp`}
              alt={f.alt}
              aria-hidden={i !== atual}
              loading={i === 0 ? carregar : 'lazy'}
              decoding="async"
              draggable={false}
              style={f.foco ? { objectPosition: f.foco } : undefined}
            />
          ))}
        </div>
      </div>
      <span className="foto-cortina" aria-hidden="true" />
      {varias && (
        <div className="car-barras" aria-hidden="true">
          {fotos.map((f, i) => (
            <span className="car-barra" key={f.src + i}>
              <span className="car-barra-cheia" />
            </span>
          ))}
        </div>
      )}
      {legenda && <figcaption className="foto-legenda">{legenda}</figcaption>}
      {varias && (
        <span className="so-leitor" aria-live="polite">
          Foto {atual + 1} de {fotos.length}
        </span>
      )}
    </figure>
  )
}
