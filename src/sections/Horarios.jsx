import { useMemo, useRef, useState } from 'react'
import { DIAS, GRUPOS, AULAS } from '../data/horarios'
import { site } from '../data/site'
import { agoraNoCT, aulasDoDia, emMinutos, faltaCurta, horaCurta, proximaAula, quando, relogio } from '../lib/agenda'
import { linkDeContato } from '../lib/contato'
import { useAgora } from '../hooks/useAgora'
import { useVisivel } from '../hooks/useVisivel'
import { Titulo } from '../components/ui/Titulo'
import { Chip } from '../components/ui/Chip'

/** Cartão preto com a contagem regressiva para a próxima aula. */
function Proxima({ agora }) {
  const proxima = proximaAula(agora)
  if (!proxima) return null
  const { aula, salto, dia, faltam } = proxima
  const [hh, mm, ss] = relogio(faltam)

  return (
    <aside className="prox" aria-label="Próxima aula">
      <p className="prox-rotulo">
        <span className="prox-ponto" aria-hidden="true" />
        Próxima aula
      </p>
      <p className="prox-turma">{aula.turma}</p>
      <p className="prox-quando">
        {aula.publico}, {quando(salto, dia)} às {aula.hora}
      </p>
      <p className="prox-relogio t-num" role="timer" aria-label={`Começa em ${hh} horas e ${mm} minutos`}>
        <span>{hh}</span>
        <i>:</i>
        <span>{mm}</span>
        <i>:</i>
        <span className="prox-seg">{ss}</span>
      </p>
    </aside>
  )
}

export function Horarios() {
  const raiz = useRef(null)
  const visivel = useVisivel(raiz, '200px')
  const agora = useAgora(1000, visivel)
  const { dia: hoje, minutos } = agoraNoCT(agora)
  const temAulaHoje = hoje <= 5

  const [dia, setDia] = useState(temAulaHoje ? hoje : 1)
  const [grupo, setGrupo] = useState('todas')

  const aulas = useMemo(() => aulasDoDia(dia, grupo), [dia, grupo])
  const nomeDoDia = DIAS.find((d) => d.id === dia).nome
  const nomeDoGrupo = GRUPOS.find((g) => g.id === grupo).rotulo.toLowerCase()

  // Quando o filtro esvazia o dia, o site aponta os dias que têm aquela turma.
  const diasComAula = useMemo(
    () => DIAS.filter((d) => AULAS.some((a) => a.grupo === grupo && a.dias.includes(d.id))),
    [grupo],
  )

  return (
    <section id="horarios" className="horarios sobre-amarelo" ref={raiz}>
      <div className="conteudo">
        <div className="hor-topo">
          <div>
            <Titulo className="t-titulo">Tabela de horários</Titulo>
            <p className="hor-apoio">
              De segunda a sexta, de manhã cedo até a noite. Toque em uma aula para pedir a sua vaga.
            </p>
          </div>
          <Proxima agora={agora} />
        </div>

        <div className="hor-controles">
          <div className="hor-dias" role="group" aria-label="Dia da semana">
            {DIAS.map((d) => (
              <Chip key={d.id} ativo={d.id === dia} className="hor-dia" onClick={() => setDia(d.id)}>
                <span className="hor-dia-curto" aria-hidden="true">
                  {d.curto}
                </span>
                <span className="so-leitor">{d.nome}</span>
                {temAulaHoje && d.id === hoje && <span className="hor-hoje">hoje</span>}
              </Chip>
            ))}
          </div>
          <div className="hor-grupos" role="group" aria-label="Modalidade">
            {GRUPOS.map((g) => (
              <Chip key={g.id} ativo={g.id === grupo} onClick={() => setGrupo(g.id)}>
                {g.rotulo}
              </Chip>
            ))}
          </div>
        </div>

        {aulas.length > 0 ? (
          <ol className="hor-lista" key={`${dia}-${grupo}`} aria-label={`Aulas de ${nomeDoDia.toLowerCase()}`}>
            {aulas.map((a, i) => {
              const inicio = emMinutos(a.hora)
              const ehHoje = temAulaHoje && dia === hoje
              const passou = ehHoje && inicio <= minutos
              const mensagem = `Oi! Vi o site do CT Aveia e quero ir na aula de ${a.turma.toLowerCase()} de ${nomeDoDia.toLowerCase()} às ${a.hora}. Tem vaga para aula experimental?`
              return (
                <li key={a.turma + a.hora} style={{ '--i': i }}>
                  <a
                    className="hor-linha"
                    data-passou={passou}
                    href={linkDeContato(mensagem)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="hor-hora t-num">{a.hora}</span>
                    <span className="hor-turma">{a.turma}</span>
                    <span className="hor-publico">{a.publico}</span>
                    <span className="hor-status">
                      {passou ? 'já começou' : ehHoje ? faltaCurta(inicio - minutos) : nomeDoDia.toLowerCase()}
                    </span>
                    <span className="hor-pedir" aria-hidden="true">
                      Pedir vaga
                    </span>
                  </a>
                </li>
              )
            })}
          </ol>
        ) : (
          <div className="hor-vazio" key={`${dia}-${grupo}-vazio`}>
            <p>
              Não tem aula de {nomeDoGrupo} na {nomeDoDia.toLowerCase()}. Essa turma treina em outros dias:
            </p>
            <div className="hor-vazio-dias">
              {diasComAula.map((d) => (
                <Chip key={d.id} ativo={false} onClick={() => setDia(d.id)}>
                  Ver {d.nome.toLowerCase()}
                </Chip>
              ))}
            </div>
          </div>
        )}

        <div className="hor-notas">
          <p>
            <strong>Boxe e muay thai com a Black Monkey Boxe Team.</strong> Treinos nos três turnos do CT:{' '}
            {site.turnos.map((t) => `${t.nome.toLowerCase()} das ${horaCurta(t.das)} às ${horaCurta(t.ate)}`).join(', ')}.
          </p>
          <p>
            <strong>Personal.</strong> Treino 100% individualizado, com horário combinado direto com a equipe.
          </p>
          <p>Os horários podem mudar em feriados. Antes de vir pela primeira vez, confirme com o CT.</p>
        </div>
      </div>
    </section>
  )
}
