import { useRef } from 'react'
import { gsap, movimentoReduzido } from '../lib/motion'
import { irPara } from '../lib/scroll'
import { useCena } from '../hooks/useCena'
import { manifesto } from '../data/conteudo'
import { Titulo } from '../components/ui/Titulo'
import { CardMarca } from '../components/ui/CardMarca'
import { Botao } from '../components/ui/Botao'

export function Manifesto() {
  const raiz = useRef(null)
  const frases = manifesto.corrido.match(/[^.]+\./g).map((f) => f.trim())

  useCena(() => {
    if (movimentoReduzido()) return

    // Cada palavra acende quando a rolagem passa por ela.
    gsap.fromTo(
      '.palavra',
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: '.manifesto-corrido', start: 'top 82%', end: 'bottom 48%', scrub: true },
      },
    )

    // O card do escudo abre de baixo para cima.
    gsap.from('.manifesto-card', {
      clipPath: 'inset(100% 0% 0% 0% round 26px)',
      duration: 1.5,
      ease: 'pesado',
      scrollTrigger: { trigger: '.manifesto-card', start: 'top 84%', once: true },
    })
  }, raiz)

  return (
    <section className="manifesto" ref={raiz}>
      <div className="conteudo">
        <Titulo className="t-titulo manifesto-titulo">{manifesto.titulo}</Titulo>

        <div className="manifesto-grade">
          <p className="manifesto-corrido" aria-label={manifesto.corrido}>
            {frases.map((frase) => (
              <span className="manifesto-frase" key={frase} aria-hidden="true">
                {frase.split(' ').map((p, i) => (
                  <span key={i}>
                    <span className="palavra">{p}</span>{' '}
                  </span>
                ))}
              </span>
            ))}
          </p>

          <div className="manifesto-lado">
            <CardMarca variante="completo" className="manifesto-card" />
            <p className="t-corpo">{manifesto.apoio}</p>
            <Botao
              href="#modalidades"
              variante="fantasma"
              onClick={(e) => {
                e.preventDefault()
                irPara('modalidades')
              }}
            >
              Ver as modalidades
            </Botao>
          </div>
        </div>
      </div>
    </section>
  )
}
