import { useRef } from 'react'
import { gsap, movimentoReduzido } from '../lib/motion'
import { irPara } from '../lib/scroll'
import { useCena } from '../hooks/useCena'
import { manifesto } from '../data/conteudo'
import { Titulo } from '../components/ui/Titulo'
import { Foto } from '../components/ui/Foto'
import { revelarFotos } from '../lib/revelar'
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

    // A foto da família abre com a cortina amarela.
    revelarFotos('.manifesto-card')
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
            <Foto
              src="familia-completa"
              alt="Alunos adultos e crianças do CT Aveia reunidos no tatame"
              legenda="Juntos somos mais fortes"
              foco="50% 62%"
              className="manifesto-card"
            />
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
