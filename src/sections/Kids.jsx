import { useRef } from 'react'
import { gsap, movimentoReduzido } from '../lib/motion'
import { canal, linkDeContato } from '../lib/contato'
import { horariosDoGrupo } from '../lib/agenda'
import { useCena } from '../hooks/useCena'
import { kids } from '../data/conteudo'
import { Titulo } from '../components/ui/Titulo'
import { Carrossel } from '../components/ui/Carrossel'
import { revelarFotos } from '../lib/revelar'
import { Botao } from '../components/ui/Botao'
import { IconeCanal, IconeRelogio } from '../components/ui/Icones'

const MENSAGEM = 'Oi! Vi o site do CT Aveia e quero saber como funciona o Projeto Kids.'

export function Kids() {
  const raiz = useRef(null)
  const turmas = horariosDoGrupo(['kids'])

  useCena(() => {
    if (movimentoReduzido()) return

    // As faixas infantis se desenrolam uma depois da outra, da branca à verde.
    gsap.from('.kids-faixa', {
      scaleX: 0,
      transformOrigin: '0% 50%',
      duration: 1.3,
      ease: 'pesado',
      stagger: 0.11,
      scrollTrigger: { trigger: '.kids-faixas', start: 'top 82%', once: true },
    })
    gsap.from('.kids-ganho', {
      opacity: 0,
      x: -14,
      duration: 0.8,
      stagger: 0.11,
      delay: 0.55,
      scrollTrigger: { trigger: '.kids-faixas', start: 'top 82%', once: true },
    })

    revelarFotos('.kids-card')
  }, raiz)

  return (
    <section id="kids" className="kids" ref={raiz}>
      <div className="conteudo kids-grade">
        <Carrossel
          fotos={[
            { src: 'kids-professor', alt: 'Professor faixa preta ensinando um aluno do Projeto Kids no tatame', foco: '55% 55%' },
            { src: 'faixas-pro-alto', alt: 'Crianças do Projeto Kids jogando as faixas para o alto na graduação', foco: '50% 40%' },
            { src: 'graduacao-rola', alt: 'Crianças treinando jiu-jítsu no tatame durante a graduação', foco: '50% 50%' },
          ]}
          legenda="Projeto Kids"
          className="kids-card"
        />

        <div className="kids-texto">
          <Titulo className="t-titulo">{kids.titulo}</Titulo>
          <p className="t-chamada kids-chamada">{kids.chamada}</p>
          <p className="t-corpo">{kids.apoio}</p>

          <ul className="kids-faixas" aria-label="O que a criança leva do treino">
            {kids.faixas.map((f, i) => (
              <li key={f.nome} style={{ '--cor': f.cor, '--l': `${64 + i * 9}%` }}>
                <span className="kids-faixa" aria-hidden="true" />
                <span className="kids-ganho">{f.ganho}</span>
              </li>
            ))}
          </ul>
          <p className="kids-legenda">
            Branca, cinza, amarela, laranja e verde: as cores das faixas do jiu-jítsu infantil.
          </p>

          <div className="kids-pe">
            <p className="kids-turmas">
              <IconeRelogio tamanho={18} />
              {turmas.map((t) => `${t.turma}: ${t.dias.toLowerCase()}, às ${t.horas.join(' e ')}`).join('. ')}
            </p>
            <Botao href={linkDeContato(MENSAGEM)} icone={<IconeCanal tipo={canal.tipo} tamanho={18} />}>
              Falar sobre o Projeto Kids
            </Botao>
          </div>
        </div>
      </div>
    </section>
  )
}
