import { useRef } from 'react'
import { gsap, ScrollTrigger, movimentoReduzido } from '../lib/motion'
import { horaCurta, horariosDoGrupo } from '../lib/agenda'
import { canal, linkDeContato } from '../lib/contato'
import { useCena } from '../hooks/useCena'
import { useTilt } from '../hooks/useTilt'
import { modalidades } from '../data/modalidades'
import { site } from '../data/site'
import { Titulo } from '../components/ui/Titulo'
import { CardMarca } from '../components/ui/CardMarca'
import { Botao } from '../components/ui/Botao'
import { IconeCanal, IconeCheck } from '../components/ui/Icones'

const turnos = site.turnos.map((t) => `${t.nome.toLowerCase()} das ${horaCurta(t.das)} às ${horaCurta(t.ate)}`)

/** Nomes longos quebram em duas linhas; o tamanho da letra segue a maior palavra. */
function medidaDoNome(nome) {
  const quebra = nome.length > 12
  const letras = quebra ? Math.max(...nome.split(' ').map((p) => p.length)) : nome.length
  return { quebra, letras }
}

function Cartao({ modalidade, indice, total }) {
  const quadro = useRef(null)
  useTilt(quadro, { maximo: 7 })
  const horarios = horariosDoGrupo(modalidade.grupos)
  const { quebra, letras } = medidaDoNome(modalidade.nome)
  // siglas como MMA continuam em maiúsculas no meio da frase
  const nomeNaFrase = modalidade.nome === modalidade.nome.toUpperCase() ? modalidade.nome : modalidade.nome.toLowerCase()
  const mensagem = `Oi! Vi o site do CT Aveia e quero treinar ${nomeNaFrase}. Como faço para agendar uma aula experimental?`

  return (
    <article className="mod cartao" style={{ '--i': indice }}>
      <div className="mod-texto">
        <p className="mod-conta t-num" aria-hidden="true">
          {indice + 1}
          <span>/{total}</span>
        </p>

        <h3 className="t-grito mod-nome" data-quebra={quebra} style={{ '--letras': letras }}>
          {modalidade.nome}
        </h3>
        <p className="t-chamada mod-frase">{modalidade.frase}</p>

        <ul className="mod-pontos">
          {modalidade.pontos.map((p) => (
            <li key={p}>
              <IconeCheck tamanho={18} />
              {p}
            </li>
          ))}
        </ul>

        <div className="mod-horarios">
          {horarios.map((h) => (
            <p key={h.turma + h.dias}>
              <span className="mod-dias">
                {h.turma}, {h.dias.toLowerCase()}
              </span>
              <span className="mod-horas">
                {h.horas.map((hora) => (
                  <span className="t-num" key={hora}>
                    {hora}
                  </span>
                ))}
              </span>
            </p>
          ))}
          {modalidade.turnos && (
            <p>
              <span className="mod-dias">Turnos: {turnos.join(', ')}.</span>
            </p>
          )}
        </div>

        <Botao href={linkDeContato(mensagem)} icone={<IconeCanal tipo={canal.tipo} tamanho={18} />}>
          Quero treinar {nomeNaFrase}
        </Botao>
      </div>

      <div className="mod-lado">
        <div className="mod-quadro" ref={quadro}>
          <CardMarca variante={modalidade.card} className="mod-card" />
        </div>
      </div>
      <span className="mod-apaga" aria-hidden="true" />
    </article>
  )
}

export function Modalidades() {
  const raiz = useRef(null)

  useCena(() => {
    if (movimentoReduzido()) return
    const cartoes = gsap.utils.toArray('.mod')

    ScrollTrigger.matchMedia({
      // Telas grandes: os cartões empilham. O de baixo recua e escurece
      // enquanto o próximo sobe por cima dele.
      '(min-width: 900px) and (min-height: 700px)': () => {
        cartoes.slice(0, -1).forEach((cartao, i) => {
          gsap
            .timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: cartoes[i + 1],
                start: 'top bottom',
                end: `top ${104 + (i + 1) * 14}px`,
                scrub: true,
              },
            })
            .to(cartao, { scale: 0.93, rotationX: -3.5, transformPerspective: 1600, transformOrigin: '50% 0%' }, 0)
            .to(cartao.querySelector('.mod-apaga'), { opacity: 0.62 }, 0)
        })
      },
      // Telas pequenas: cada cartão levanta do chão quando entra.
      '(max-width: 899px), (max-height: 699px)': () => {
        cartoes.forEach((cartao) => {
          gsap.from(cartao, {
            y: 70,
            rotationX: 9,
            opacity: 0.4,
            transformPerspective: 1200,
            transformOrigin: '50% 100%',
            ease: 'none',
            scrollTrigger: { trigger: cartao, start: 'top 98%', end: 'top 62%', scrub: true },
          })
        })
      },
    })
  }, raiz)

  return (
    <section id="modalidades" className="mods" ref={raiz}>
      <div className="conteudo mods-topo">
        <Titulo className="t-titulo">Escolha a sua luta.</Titulo>
        <p className="t-corpo">
          Cinco modalidades no mesmo CT. Dá para fazer uma só ou combinar várias na mesma semana.
        </p>
      </div>

      <div className="conteudo mods-pilha">
        {modalidades.map((m, i) => (
          <Cartao key={m.id} modalidade={m} indice={i} total={modalidades.length} />
        ))}
      </div>
    </section>
  )
}
