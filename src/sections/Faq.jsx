import { useId, useState } from 'react'
import { faq } from '../data/conteudo'
import { canal, linkDeContato } from '../lib/contato'
import { Titulo } from '../components/ui/Titulo'
import { IconeMais } from '../components/ui/Icones'

export function Faq() {
  const base = useId()
  const [aberta, setAberta] = useState(0)

  return (
    <section className="faq">
      <div className="conteudo faq-grade">
        <div className="faq-lado">
          <Titulo className="t-titulo">Antes de vir</Titulo>
          <p className="t-corpo">
            Ficou outra dúvida?{' '}
            <a className="faq-link" href={linkDeContato('Oi! Vi o site do CT Aveia e tenho uma dúvida.')} target="_blank" rel="noopener noreferrer">
              Pergunta para o CT no {canal.nome}
            </a>
            .
          </p>
        </div>

        <div className="faq-lista">
          {faq.map((item, i) => {
            const aberto = aberta === i
            return (
              <div className="faq-item" key={item.p} data-aberto={aberto}>
                <h3>
                  <button
                    type="button"
                    id={`${base}-p-${i}`}
                    aria-expanded={aberto}
                    aria-controls={`${base}-r-${i}`}
                    onClick={() => setAberta(aberto ? -1 : i)}
                  >
                    <span>{item.p}</span>
                    <span className="faq-sinal" aria-hidden="true">
                      <IconeMais tamanho={20} />
                    </span>
                  </button>
                </h3>
                <div className="faq-corpo" id={`${base}-r-${i}`} role="region" aria-labelledby={`${base}-p-${i}`}>
                  <div>
                    <p className="t-corpo">{item.r}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
