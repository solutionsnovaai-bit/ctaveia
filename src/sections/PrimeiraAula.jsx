import { useId, useState } from 'react'
import { opcoesDeModalidade } from '../data/modalidades'
import { passos, periodos } from '../data/conteudo'
import { canal, copiar, linkDeContato, montarMensagem } from '../lib/contato'
import { Titulo } from '../components/ui/Titulo'
import { Chip } from '../components/ui/Chip'
import { Botao } from '../components/ui/Botao'
import { IconeCanal } from '../components/ui/Icones'

/**
 * Como funciona a primeira aula e um montador de mensagem: a pessoa escolhe
 * as opções, vê a mensagem pronta e envia para o CT com um toque.
 */
export function PrimeiraAula() {
  const idNome = useId()
  const [nome, setNome] = useState('')
  const [paraQuem, setParaQuem] = useState('mim')
  const [modalidade, setModalidade] = useState(opcoesDeModalidade[0])
  const [periodo, setPeriodo] = useState(periodos[2])
  const [aviso, setAviso] = useState('')

  const mensagem = montarMensagem({ nome, paraQuem, modalidade, periodo })

  const enviar = async (e) => {
    e.preventDefault()
    if (canal.aceitaTexto) {
      window.open(linkDeContato(mensagem), '_blank', 'noopener')
      return
    }
    // O Direct do Instagram não aceita texto pronto: a mensagem vai copiada.
    const copiou = await copiar(mensagem)
    setAviso(
      copiou
        ? 'Mensagem copiada. É só colar na conversa com o CT que abriu no Instagram.'
        : 'Não deu para copiar sozinho. Selecione a mensagem acima, copie e cole na conversa com o CT.',
    )
    window.open(linkDeContato(), '_blank', 'noopener')
  }

  return (
    <section id="primeira-aula" className="aula">
      <div className="conteudo aula-grade">
        <div className="aula-lado">
          <Titulo className="t-titulo">Sua primeira aula</Titulo>
          <ol className="aula-passos">
            {passos.map((p, i) => (
              <li key={p.titulo}>
                <span className="aula-numero t-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="t-chamada">{p.titulo}</h3>
                  <p className="t-corpo">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <form className="cartao aula-form" onSubmit={enviar}>
          <h3 className="t-chamada aula-form-titulo">Monte sua mensagem</h3>

          <div className="campo">
            <label htmlFor={idNome}>Seu nome</label>
            <input
              id={idNome}
              type="text"
              autoComplete="given-name"
              placeholder="Como o CT chama você"
              value={nome}
              maxLength={40}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <fieldset className="campo">
            <legend>A aula é para quem?</legend>
            <div className="campo-opcoes">
              <Chip ativo={paraQuem === 'mim'} onClick={() => setParaQuem('mim')}>
                Para mim
              </Chip>
              <Chip ativo={paraQuem === 'filho'} onClick={() => setParaQuem('filho')}>
                Para meu filho
              </Chip>
            </div>
          </fieldset>

          <fieldset className="campo">
            <legend>Modalidade</legend>
            <div className="campo-opcoes">
              {opcoesDeModalidade.map((m) => (
                <Chip key={m} ativo={modalidade === m} onClick={() => setModalidade(m)}>
                  {m}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="campo">
            <legend>Melhor período</legend>
            <div className="campo-opcoes">
              {periodos.map((p) => (
                <Chip key={p} ativo={periodo === p} onClick={() => setPeriodo(p)}>
                  {p}
                </Chip>
              ))}
            </div>
          </fieldset>

          <div className="aula-previa">
            <p className="aula-previa-rotulo">Sua mensagem</p>
            <p className="aula-balao" aria-live="polite">
              {mensagem}
            </p>
          </div>

          <Botao type="submit" grande className="aula-enviar" icone={<IconeCanal tipo={canal.tipo} tamanho={20} />}>
            {canal.aceitaTexto ? 'Enviar no WhatsApp' : 'Copiar e abrir o Instagram'}
          </Botao>
          <p className="aula-aviso" role="status">
            {aviso}
          </p>
        </form>
      </div>
    </section>
  )
}
