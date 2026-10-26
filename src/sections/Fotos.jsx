import { useRef } from 'react'
import { useCena } from '../hooks/useCena'
import { gsap, ScrollTrigger, movimentoReduzido } from '../lib/motion'
import { revelarFotos } from '../lib/revelar'
import { Foto } from '../components/ui/Foto'

const lema = ['Disciplina.', 'Respeito.', 'Evolução.', 'Família.']

/** O mosaico: cada foto tem a sua área na grade (ver .ft-grade no CSS). */
const fotos = [
  { src: 'podio-mundial', area: 'a', alt: 'Atleta do CT Aveia no lugar mais alto do pódio do Mundial', legenda: 'Ouro no Mundial', foco: '50% 18%' },
  { src: 'medalha', area: 'b', alt: 'Atleta do CT Aveia sorrindo com a medalha do campeonato', legenda: 'Medalha no peito', foco: '50% 25%' },
  { src: 'kids-dupla', area: 'c', alt: 'Duas alunas do Projeto Kids sentadas no tatame', legenda: 'Pequenas guerreiras', foco: '50% 40%' },
  { src: 'formacao-tatame', area: 'd', alt: 'Alunos do CT Aveia em fila no início do treino', legenda: 'Começo de treino', foco: '55% 60%' },
  { src: 'kids-faixa-branca', area: 'e', alt: 'Aluno do Projeto Kids de quimono azul e faixa branca', legenda: 'Primeira faixa', foco: '50% 18%' },
  { src: 'torcida', area: 'f', alt: 'Equipe do CT Aveia comemorando em campeonato', legenda: 'A equipe junto', foco: '50% 40%' },
  { src: 'festa-ct', area: 'g', alt: 'Alunos do CT Aveia com a camiseta do centro de treinamento', legenda: 'Vestindo o CT', foco: '50% 30%' },
]

export function Fotos() {
  const raiz = useRef(null)

  useCena(() => {
    if (movimentoReduzido()) return

    // Abertura: a foto da equipe sai de uma janela pequena e toma a tela inteira.
    const abrir = (scrollTrigger) =>
      gsap
        .timeline({ defaults: { ease: 'none' }, scrollTrigger })
        .fromTo(
          '.ft-janela',
          { clipPath: 'inset(17% 23% 17% 23% round 40px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1 },
          0,
        )
        .fromTo('.ft-janela-img', { scale: 1.3, transformOrigin: '50% 28%' }, { scale: 1, duration: 1 }, 0)
        .fromTo('.ft-janela-sombra', { opacity: 0.15 }, { opacity: 1, duration: 0.8 }, 0.2)
        .to('.ft-abre-titulo', { scale: 1.5, opacity: 0, filter: 'blur(10px)', duration: 0.5 }, 0.12)
        .fromTo(
          '.ft-lema-linha > span',
          { yPercent: 115 },
          { yPercent: 0, duration: 0.35, stagger: 0.09, ease: 'saida' },
          0.62,
        )

    ScrollTrigger.matchMedia({
      '(min-width: 900px)': () =>
        abrir({ trigger: '.ft-palco', start: 'top top', end: '+=140%', scrub: 0.6, pin: true, anticipatePin: 1 }),
      // no celular também prende, mas por menos tempo, para não cansar o dedo
      '(max-width: 899px)': () =>
        abrir({ trigger: '.ft-palco', start: 'top top', end: '+=95%', scrub: 0.5, pin: true, anticipatePin: 1 }),
    })

    // O texto do mosaico sobe, e as fotos abrem com a cortina, uma coluna depois da outra.
    gsap.from('.ft-intro > *', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      scrollTrigger: { trigger: '.ft-intro', start: 'top 85%', once: true },
    })
    revelarFotos('.ft-item', {
      inicio: 'top 90%',
      atraso: (_, el) => (el.offsetLeft / Math.max(1, el.parentElement.clientWidth)) * 0.35,
    })
  }, raiz)

  return (
    <section id="fotos" className="fotos" ref={raiz}>
      <div className="ft-palco">
        <div className="ft-janela">
          <img
            className="ft-janela-img"
            src="/img/fotos/equipe-faixas.webp"
            alt="Faixas graduadas do CT Aveia em frente ao mural amarelo da academia"
            loading="lazy"
            decoding="async"
          />
          <span className="ft-janela-sombra" aria-hidden="true" />
          <p className="ft-lema t-grito" aria-label={lema.join(' ')}>
            {lema.map((p) => (
              <span className="ft-lema-linha" key={p} aria-hidden="true">
                <span>{p}</span>
              </span>
            ))}
          </p>
        </div>
        <div className="ft-abre-titulo">
          <p className="ft-selo">Tatame real</p>
          <h2 className="t-titulo">Quem veste o escudo</h2>
        </div>
      </div>

      <div className="conteudo ft-corpo">
        <div className="ft-intro">
          <p className="t-chamada">Pódio, treino e Projeto Kids.</p>
          <p className="t-corpo">Gente de verdade, suando no mesmo tatame. É assim que o CT cresce: junto.</p>
        </div>

        <ul className="ft-grade">
          {fotos.map((f) => (
            <li key={f.src} className="ft-item" style={{ gridArea: f.area }}>
              <Foto src={f.src} alt={f.alt} foco={f.foco} legenda={f.legenda} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
