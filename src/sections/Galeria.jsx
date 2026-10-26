import { useEffect, useRef, useState } from 'react'
import { gsap, movimentoReduzido, temMouse } from '../lib/motion'
import { limitar } from '../lib/util'
import { useVisivel } from '../hooks/useVisivel'
import { escudos } from '../data/conteudo'
import { Titulo } from '../components/ui/Titulo'
import { Simbolo } from '../components/ui/Logo'
import { IconeChevron } from '../components/ui/Icones'

/**
 * Carrossel em arco com as fotos do CT e as frases do escudo. A rolagem horizontal é a nativa do navegador (dedo no
 * celular, trackpad ou arrasto com o mouse no computador); o código só lê a
 * posição e gira cada card conforme a distância dele até o centro.
 * Sozinho, ele vai passando sem parar. A lista vem três vezes para a volta
 * emendar; quando a pessoa mexe, ele espera um pouco e volta a andar.
 */
const N = escudos.length
const cards = [...escudos, ...escudos, ...escudos]

export function Galeria() {
  const raiz = useRef(null)
  const trilho = useRef(null)
  const cursor = useRef(null)
  const visivel = useVisivel(raiz, '100px')
  const [atual, setAtual] = useState(N + 1)
  const posicionado = useRef(false)
  const pausaAte = useRef(0)
  const segurar = (ms = 3500) => {
    pausaAte.current = performance.now() + ms
  }

  // Giro 3D de cada card conforme a posição.
  useEffect(() => {
    const el = trilho.current
    if (!el || !visivel) return undefined
    const itens = [...el.querySelectorAll('.gal-item')]
    const semMovimento = movimentoReduzido()
    let quadro = 0

    const pintar = () => {
      quadro = 0
      const meio = el.scrollLeft + el.clientWidth / 2
      let perto = 0
      let menor = Infinity
      itens.forEach((item, i) => {
        const d = (item.offsetLeft + item.offsetWidth / 2 - meio) / item.offsetWidth
        if (Math.abs(d) < menor) {
          menor = Math.abs(d)
          perto = i
        }
        if (semMovimento) return
        const t = limitar(d, -2.2, 2.2)
        const corpo = item.firstElementChild
        corpo.style.transform =
          `perspective(1100px) translate3d(${(-t * 5).toFixed(2)}%,0,${(-Math.abs(t) * 70).toFixed(1)}px) ` +
          `rotateY(${(-t * 21).toFixed(2)}deg)`
        corpo.style.setProperty('--foco', (1 - Math.min(1, Math.abs(d))).toFixed(3))
        corpo.style.setProperty('--giro', t.toFixed(3))
      })
      setAtual(perto)
    }

    const pedir = () => {
      if (!quadro) quadro = requestAnimationFrame(pintar)
    }
    // Na primeira vez, começa no segundo card da cópia do meio: tem card dos dois lados.
    if (!posicionado.current && itens[N + 1]) {
      posicionado.current = true
      el.scrollLeft = itens[N + 1].offsetLeft + itens[N + 1].offsetWidth / 2 - el.clientWidth / 2
    }
    pintar()
    el.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir)
    return () => {
      cancelAnimationFrame(quadro)
      el.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
    }
  }, [visivel])

  // Passando sozinho. Para enquanto a pessoa arrasta, rola ou usa as setas.
  useEffect(() => {
    const el = trilho.current
    if (!el || !visivel || movimentoReduzido()) return undefined
    let quadro = 0
    let antes = performance.now()
    let pos = el.scrollLeft

    const passo = (agora) => {
      quadro = requestAnimationFrame(passo)
      const dt = Math.min(0.05, (agora - antes) / 1000)
      antes = agora
      if (agora < pausaAte.current || el.dataset.arrastando) {
        delete el.dataset.auto
        pos = el.scrollLeft
        return
      }
      el.dataset.auto = 'sim'
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft
      const itens = el.querySelectorAll('.gal-item')
      const volta = itens[N].offsetLeft - itens[0].offsetLeft
      const centro = itens[N].offsetLeft + itens[N].offsetWidth / 2 - el.clientWidth / 2
      pos += (el.clientWidth < 700 ? 60 : 90) * dt
      if (pos >= centro + volta / 2) pos -= volta
      if (pos < centro - volta / 2) pos += volta
      el.scrollLeft = pos
    }
    quadro = requestAnimationFrame(passo)

    const parar = () => segurar()
    const opcao = { passive: true }
    el.addEventListener('pointerdown', parar, opcao)
    el.addEventListener('wheel', parar, opcao)
    el.addEventListener('touchstart', parar, opcao)
    el.addEventListener('keydown', parar)
    return () => {
      cancelAnimationFrame(quadro)
      delete el.dataset.auto
      el.removeEventListener('pointerdown', parar, opcao)
      el.removeEventListener('wheel', parar, opcao)
      el.removeEventListener('touchstart', parar, opcao)
      el.removeEventListener('keydown', parar)
    }
  }, [visivel])

  // No computador: arrastar com o mouse, com embalo ao soltar, e o disco "arraste".
  useEffect(() => {
    const el = trilho.current
    if (!el || !temMouse()) return undefined
    let arrastando = false
    let inicioX = 0
    let inicioScroll = 0
    let ultimoX = 0
    let embalo = 0
    let moveu = false
    const cx = cursor.current && gsap.quickTo(cursor.current, 'x', { duration: 0.35, ease: 'saida' })
    const cy = cursor.current && gsap.quickTo(cursor.current, 'y', { duration: 0.35, ease: 'saida' })

    const baixar = (e) => {
      if (e.button !== 0) return
      arrastando = true
      moveu = false
      inicioX = ultimoX = e.clientX
      inicioScroll = el.scrollLeft
      embalo = 0
      gsap.killTweensOf(el)
      el.dataset.arrastando = 'sim'
    }
    const mover = (e) => {
      const r = el.getBoundingClientRect()
      cx?.(e.clientX - r.left)
      cy?.(e.clientY - r.top)
      if (!arrastando) return
      const dx = e.clientX - inicioX
      if (Math.abs(dx) > 4) moveu = true
      embalo = e.clientX - ultimoX
      ultimoX = e.clientX
      el.scrollLeft = inicioScroll - dx
    }
    const soltar = () => {
      if (!arrastando) return
      arrastando = false
      // leva até o card mais próximo do ponto onde o embalo pararia
      const itens = [...el.querySelectorAll('.gal-item')]
      const destino = el.scrollLeft - embalo * 14 + el.clientWidth / 2
      const alvo = itens.reduce((a, b) =>
        Math.abs(b.offsetLeft + b.offsetWidth / 2 - destino) < Math.abs(a.offsetLeft + a.offsetWidth / 2 - destino) ? b : a,
      )
      gsap.to(el, {
        scrollLeft: alvo.offsetLeft + alvo.offsetWidth / 2 - el.clientWidth / 2,
        duration: 0.9,
        ease: 'saida',
        onComplete: () => {
          delete el.dataset.arrastando
        },
      })
    }
    const clicar = (e) => {
      if (moveu) e.preventDefault()
    }

    el.addEventListener('pointerdown', baixar)
    window.addEventListener('pointermove', mover)
    window.addEventListener('pointerup', soltar)
    el.addEventListener('click', clicar, true)
    return () => {
      el.removeEventListener('pointerdown', baixar)
      window.removeEventListener('pointermove', mover)
      window.removeEventListener('pointerup', soltar)
      el.removeEventListener('click', clicar, true)
    }
  }, [])

  const irAte = (indice) => {
    const el = trilho.current
    const item = el?.querySelectorAll('.gal-item')[limitar(indice, 0, cards.length - 1)]
    if (!item) return
    segurar()
    const x = item.offsetLeft + item.offsetWidth / 2 - el.clientWidth / 2
    if (movimentoReduzido()) el.scrollLeft = x
    else {
      el.dataset.arrastando = 'sim'
      gsap.to(el, {
        scrollLeft: x,
        duration: 0.9,
        ease: 'saida',
        overwrite: true,
        onComplete: () => {
          delete el.dataset.arrastando
        },
      })
    }
  }

  return (
    <section id="escudo" className="galeria" ref={raiz}>
      <div className="conteudo gal-topo">
        <div>
          <Titulo className="t-titulo">O escudo do CT</Titulo>
          <p className="t-corpo">Graduação, tatame cheio e as frases que guiam quem treina aqui.</p>
        </div>
        <div className="gal-controles">
          <p className="gal-conta t-num" aria-live="polite">
            <span>{String((atual % N) + 1).padStart(2, '0')}</span>/{String(N).padStart(2, '0')}
          </p>
          <button type="button" className="gal-seta" aria-label="Card anterior" onClick={() => irAte(atual - 1)}>
            <IconeChevron tamanho={22} style={{ rotate: '180deg' }} />
          </button>
          <button
            type="button"
            className="gal-seta"
            aria-label="Próximo card"
            onClick={() => irAte(atual + 1)}
          >
            <IconeChevron tamanho={22} />
          </button>
        </div>
      </div>

      <div className="gal-janela">
        <div
          className="gal-trilho"
          ref={trilho}
          tabIndex={0}
          role="region"
          aria-label="Fotos e frases do CT Aveia. Use as setas do teclado para passar."
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault()
              irAte(atual + 1)
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              irAte(atual - 1)
            }
          }}
        >
          {cards.map((e, i) => (
            <div className="gal-item" key={`${e.foto}-${i}`} data-atual={i === atual} aria-hidden={i < N || i >= 2 * N || undefined}>
              <div className="gal-corpo">
                <figure className="gal-card gal-foto">
                  <img
                    src={`/img/fotos/${e.foto}.webp`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    style={{ objectPosition: e.foco }}
                  />
                  <Simbolo className="gal-foto-selo" />
                  <figcaption className="gal-foto-frase">{e.frase}</figcaption>
                </figure>
              </div>
            </div>
          ))}
        </div>
        <div className="gal-cursor" ref={cursor} aria-hidden="true">
          <span>Arraste</span>
        </div>
      </div>
    </section>
  )
}
