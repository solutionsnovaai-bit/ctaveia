import { useEffect, useRef } from 'react'
import { gsap, movimentoReduzido, temMouse } from '../../lib/motion'
import { useVisivel } from '../../hooks/useVisivel'
import { cx } from '../../lib/util'

/**
 * Faixa de fotos que passa sem parar dentro da moldura, como uma esteira.
 * A lista vai duplicada para a volta emendar sem salto. Fora da tela a faixa
 * para; com o mouse em cima ela desacelera. A moldura é a mesma da Foto, então
 * a revelação (revelarFotos) vale aqui também.
 */
export function Carrossel({ fotos, className, segundos = 2.4, sentido = 1, legenda, carregar = 'lazy' }) {
  const raiz = useRef(null)
  const trilho = useRef(null)
  const anim = useRef(null)
  const visivel = useVisivel(raiz, '120px')
  const visivelAgora = useRef(false)
  const varias = fotos.length > 1
  const lista = varias ? [...fotos, ...fotos] : fotos

  useEffect(() => {
    const el = trilho.current
    if (!el || !varias || movimentoReduzido()) return undefined
    let tween = null

    const montar = () => {
      const progresso = tween ? tween.progress() : 0
      tween?.kill()
      const volta = el.children[fotos.length].offsetLeft - el.children[0].offsetLeft
      if (!volta) return
      tween = gsap.fromTo(
        el,
        { x: sentido > 0 ? 0 : -volta },
        { x: sentido > 0 ? -volta : 0, duration: fotos.length * segundos, ease: 'none', repeat: -1 },
      )
      tween.progress(progresso)
      if (!visivelAgora.current) tween.pause()
      anim.current = tween
    }

    montar()
    const ro = new ResizeObserver(montar)
    ro.observe(el.parentElement)
    return () => {
      ro.disconnect()
      tween?.kill()
      anim.current = null
      gsap.set(el, { clearProps: 'x' })
    }
  }, [varias, fotos.length, segundos, sentido])

  useEffect(() => {
    visivelAgora.current = visivel
    if (!anim.current) return
    if (visivel) anim.current.resume()
    else anim.current.pause()
  }, [visivel])

  const ritmo = (valor) => {
    if (anim.current && temMouse()) gsap.to(anim.current, { timeScale: valor, duration: 0.6, ease: 'saida' })
  }

  return (
    <figure
      ref={raiz}
      className={cx('foto carrossel', className)}
      data-varias={varias}
      onPointerEnter={() => ritmo(0.25)}
      onPointerLeave={() => ritmo(1)}
    >
      <div className="foto-mascara">
        <div className="foto-img">
          <div className="car-trilho" ref={trilho}>
            {lista.map((f, i) => (
              <img
                key={f.src + i}
                className="car-slide"
                src={`/img/fotos/${f.src}.webp`}
                alt={i < fotos.length ? f.alt : ''}
                aria-hidden={i >= fotos.length || undefined}
                loading={i === 0 ? carregar : 'lazy'}
                decoding="async"
                draggable={false}
                style={f.foco ? { objectPosition: f.foco } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
      <span className="foto-cortina" aria-hidden="true" />
      {legenda && <figcaption className="foto-legenda">{legenda}</figcaption>}
    </figure>
  )
}
