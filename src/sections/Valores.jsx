import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, movimentoReduzido } from '../lib/motion'
import { limitar } from '../lib/util'
import { useCena } from '../hooks/useCena'
import { useMovimentoReduzido } from '../hooks/useMedia'
import { valores } from '../data/conteudo'
import { Faixa } from '../components/ui/Faixa'

/**
 * A faixa preta atravessa a tela e fica parada enquanto a pessoa rola.
 * A cada trecho de rolagem entra um grau e o valor correspondente.
 */
export function Valores() {
  const raiz = useRef(null)
  const [ativo, setAtivo] = useState(0)
  const reduzido = useMovimentoReduzido()

  useCena(() => {
    if (movimentoReduzido()) return

    ScrollTrigger.create({
      trigger: raiz.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setAtivo(limitar(Math.floor(self.progress * valores.length * 0.999), 0, valores.length - 1)),
    })

    // A faixa entra deslizando e segue andando devagar durante toda a seção.
    gsap.fromTo(
      '.val-faixa',
      { xPercent: -34 },
      {
        xPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: raiz.current, start: 'top 85%', end: 'top top', scrub: true },
      },
    )
    gsap.fromTo(
      '.val-faixa-miolo',
      { xPercent: 0 },
      {
        xPercent: 3,
        ease: 'none',
        scrollTrigger: { trigger: raiz.current, start: 'top top', end: 'bottom bottom', scrub: true },
      },
    )
  }, raiz)

  const graus = reduzido ? valores.length : ativo + 1

  return (
    <section className="valores" ref={raiz} aria-label="Os quatro valores do CT Aveia">
      <div className="val-fixo">
        <div className="conteudo val-grade">
          <h2 className="val-titulo">Um grau para cada valor do CT</h2>

          <div className="val-palco">
            <p className="val-conta t-num" aria-hidden="true">
              <span>{reduzido ? valores.length : ativo + 1}</span>/{valores.length}
            </p>
            <ol className="val-lista">
              {valores.map((v, i) => (
                <li
                  key={v.nome}
                  className="val-item"
                  data-pos={i === ativo ? 'ativo' : i < ativo ? 'antes' : 'depois'}
                  aria-hidden={reduzido ? undefined : i !== ativo}
                >
                  <h3 className="t-grito val-nome" style={{ '--letras': v.nome.length }}>
                    <span>{v.nome}</span>
                  </h3>
                  <p className="t-chamada val-texto">{v.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="val-faixa" aria-hidden="true">
          <div className="val-faixa-miolo">
            <Faixa ativos={graus} className="val-faixa-g" />
          </div>
        </div>
      </div>
    </section>
  )
}
