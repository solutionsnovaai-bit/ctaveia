import { useRef } from 'react'
import { gsap, movimentoReduzido, temMouse } from '../lib/motion'
import { irPara } from '../lib/scroll'
import { canal, linkDeContato } from '../lib/contato'
import { horaCurta, proximaAula, quando } from '../lib/agenda'
import { useCena } from '../hooks/useCena'
import { useAgora } from '../hooks/useAgora'
import { hero } from '../data/conteudo'
import { Botao } from '../components/ui/Botao'
import { IconeCanal } from '../components/ui/Icones'
import { Poeira } from '../components/ui/Poeira'

/** Linha viva do hero: qual é a próxima aula a partir de agora. */
function ProximaAula() {
  const agora = useAgora(30000)
  const proxima = proximaAula(agora)
  if (!proxima) return null
  const { aula, salto, dia } = proxima

  return (
    <a
      href="#horarios"
      className="hero-proxima"
      onClick={(e) => {
        e.preventDefault()
        irPara('horarios')
      }}
    >
      <span className="hero-pulso" aria-hidden="true" />
      <span className="hero-proxima-rotulo">Próxima aula</span>
      <span className="hero-proxima-valor">
        {aula.turma}, {quando(salto, dia)} às {horaCurta(aula.hora)}
      </span>
    </a>
  )
}

export function Hero() {
  const raiz = useRef(null)

  useCena(() => {
    if (movimentoReduzido()) return

    const imagem = raiz.current.querySelector('.hero-quadro')
    const coluna = raiz.current.querySelector('.hero-coluna')
    const textos = gsap.utils.toArray('.hero-texto')

    // Entrada: acontece enquanto a tela de load abre a janela triangular.
    gsap
      .timeline({ defaults: { ease: 'saida' } })
      .from(imagem, { scale: 1.1, duration: 2.6 }, 0)
      .from(textos, { yPercent: 115, duration: 1.25, stagger: 0.12 }, 0.5)
      .call(() => textos.forEach((t) => t.setAttribute('data-glitch', '')), null, 1.35)
      .call(() => textos.forEach((t) => t.removeAttribute('data-glitch')), null, 1.85)
      .from('.hero-entra', { opacity: 0, y: 22, duration: 1.1, stagger: 0.1 }, 0.95)

    // Saída pela rolagem: a foto afunda e o texto sobe mais rápido que ela.
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: raiz.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      .to('.hero-fundo', { yPercent: 9 }, 0)
      .to('.hero-sombra', { opacity: 1 }, 0)
      .to(coluna, { y: -90, opacity: 0 }, 0)

    // No computador a foto acompanha o mouse de leve, como se tivesse fundo.
    if (temMouse()) {
      const fx = gsap.quickTo(imagem, 'x', { duration: 1.2, ease: 'saida' })
      const fy = gsap.quickTo(imagem, 'y', { duration: 1.2, ease: 'saida' })
      const mover = (e) => {
        fx((e.clientX / window.innerWidth - 0.5) * -18)
        fy((e.clientY / window.innerHeight - 0.5) * -12)
      }
      raiz.current.addEventListener('pointermove', mover)
      return () => raiz.current?.removeEventListener('pointermove', mover)
    }
    return undefined
  }, raiz)

  return (
    <section id="topo" className="hero" ref={raiz} aria-label="CT Aveia Jiu-Jítsu">
      <div className="hero-fundo">
        <div className="hero-quadro">
          <picture>
            <source media="(min-width: 900px) and (min-aspect-ratio: 1/1)" srcSet="/img/hero-desktop.webp" />
            <img
              className="hero-img"
              src="/img/hero-mobile.webp"
              alt="Logotipo do CT Aveia Jiu-Jítsu em metal dourado, sobre o tatame preto com faixa amarela e um kimono preto"
              fetchpriority="high"
              decoding="sync"
              draggable="false"
            />
          </picture>
        </div>
      </div>
      <div className="hero-veu" aria-hidden="true" />
      <div className="hero-sombra" aria-hidden="true" />
      <Poeira className="hero-poeira" quantidade={38} />

      <div className="conteudo hero-conteudo">
        <div className="hero-coluna">
          <h1 className="hero-titulo" aria-label={hero.linhas.join(' ')}>
            {hero.linhas.map((linha, i) => (
              <span className="hero-linha" key={linha} aria-hidden="true">
                <span className={`hero-texto${i === 1 ? ' hero-amarelo' : ''}`} data-texto={linha}>
                  {linha}
                </span>
              </span>
            ))}
          </h1>

          <p className="t-corpo hero-apoio hero-entra">
            {hero.apoio} <span className="hero-apoio-extra">{hero.apoioExtra}</span>
          </p>

          <div className="hero-acoes hero-entra">
            <Botao href={linkDeContato()} grande icone={<IconeCanal tipo={canal.tipo} tamanho={20} />}>
              Agendar aula experimental
            </Botao>
            <Botao
              href="#horarios"
              variante="fantasma"
              grande
              onClick={(e) => {
                e.preventDefault()
                irPara('horarios')
              }}
            >
              Ver horários
            </Botao>
          </div>

          <div className="hero-entra">
            <ProximaAula />
          </div>
        </div>
      </div>
    </section>
  )
}
