import { useRef } from 'react'
import { useCena } from '../hooks/useCena'
import { gsap, movimentoReduzido } from '../lib/motion'
import { Titulo } from '../components/ui/Titulo'

/** Fotos reais do CT: tatame, competição e o Projeto Kids. A ordem monta o mosaico. */
const fotos = [
  { src: 'familia-completa', alt: 'Alunos adultos e crianças do CT Aveia reunidos no tatame', legenda: 'Uma família só', forma: 'alta' },
  { src: 'podio-mundial', alt: 'Atleta do CT Aveia no lugar mais alto do pódio do Mundial', legenda: 'Ouro no Mundial', forma: 'larga' },
  { src: 'vitoria-nogi', alt: 'Atleta do CT Aveia com o braço erguido pelo árbitro após vencer a luta', legenda: 'Braço erguido' },
  { src: 'medalha', alt: 'Atleta do CT Aveia sorrindo com a medalha do campeonato', legenda: 'Medalha no peito' },
  { src: 'kids-professor', alt: 'Professor faixa preta ensinando um aluno do Projeto Kids', legenda: 'Projeto Kids', forma: 'alta' },
  { src: 'muay-thai', alt: 'Turma de muay thai e boxe em posição de guarda', legenda: 'Muay thai e boxe', forma: 'larga' },
  { src: 'equipe-faixas', alt: 'Faixas graduadas do CT Aveia em frente ao mural da academia', legenda: 'As faixas da casa' },
  { src: 'raca', alt: 'Atleta do CT Aveia comemorando depois da luta', legenda: 'Raça' },
  { src: 'kids-dupla', alt: 'Duas alunas do Projeto Kids sentadas no tatame', legenda: 'Pequenas guerreiras', forma: 'larga' },
  { src: 'formacao-tatame', alt: 'Alunos do CT Aveia em fila no início do treino', legenda: 'Começo de treino', forma: 'alta' },
  { src: 'torcida', alt: 'Equipe do CT Aveia comemorando em campeonato', legenda: 'A equipe junto' },
  { src: 'kids-faixa-branca', alt: 'Aluno do Projeto Kids de quimono azul e faixa branca', legenda: 'Primeira faixa' },
]

export function Fotos() {
  const raiz = useRef(null)

  useCena(() => {
    if (movimentoReduzido()) return
    gsap.utils.toArray('.ft-item').forEach((item) => {
      gsap.from(item, {
        y: 60,
        scale: 0.94,
        opacity: 0,
        duration: 1.1,
        ease: 'saida',
        scrollTrigger: { trigger: item, start: 'top 92%', once: true },
      })
      gsap.fromTo(
        item.querySelector('img'),
        { yPercent: -6 },
        { yPercent: 6, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
    })
  }, raiz)

  return (
    <section id="fotos" className="fotos" ref={raiz}>
      <div className="conteudo">
        <div className="ft-topo">
          <p className="ft-selo">Tatame real</p>
          <Titulo className="t-titulo">Quem veste o escudo</Titulo>
          <p className="t-corpo">
            Treino, pódio e Projeto Kids. Gente de verdade, suando no mesmo tatame.
          </p>
        </div>

        <ul className="ft-grade">
          {fotos.map((f) => (
            <li key={f.src} className="ft-item" data-forma={f.forma || 'normal'}>
              <figure>
                <img src={`/img/fotos/${f.src}.webp`} alt={f.alt} loading="lazy" decoding="async" />
                <figcaption>{f.legenda}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
