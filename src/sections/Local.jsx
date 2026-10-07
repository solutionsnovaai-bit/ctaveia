import { useRef, useState } from 'react'
import { mapas, site } from '../data/site'
import { useVisivel } from '../hooks/useVisivel'
import { Titulo } from '../components/ui/Titulo'
import { Botao } from '../components/ui/Botao'
import { IconePin, IconeRota } from '../components/ui/Icones'

export function Local() {
  const quadro = useRef(null)
  // O mapa só é baixado quando a seção está chegando na tela.
  const perto = useVisivel(quadro, '600px')
  const [carregar, setCarregar] = useState(false)
  const [ativo, setAtivo] = useState(false)
  if (perto && !carregar) setCarregar(true)

  return (
    <section id="local" className="local">
      <div className="conteudo local-grade">
        <div className="local-texto">
          <Titulo className="t-titulo">Como chegar</Titulo>

          <address className="t-chamada local-endereco">
            {site.endereco.rua}
            <br />
            {site.endereco.bairro}, {site.endereco.cidade}/{site.endereco.uf}
          </address>

          <dl className="local-turnos">
            {site.turnos.map((t) => (
              <div key={t.nome}>
                <dt>{t.nome}</dt>
                <dd className="t-num">
                  {t.das} <span>às</span> {t.ate}
                </dd>
              </div>
            ))}
          </dl>

          <div className="local-acoes">
            <Botao href={mapas.google} icone={<IconePin tamanho={18} />}>
              Abrir no Google Maps
            </Botao>
            <Botao href={mapas.waze} variante="fantasma" icone={<IconeRota tamanho={18} />}>
              Ir pelo Waze
            </Botao>
          </div>
        </div>

        <div
          className="local-mapa cartao"
          ref={quadro}
          data-ativo={ativo}
          onPointerLeave={() => setAtivo(false)}
        >
          {carregar && (
            <iframe
              title={`Mapa: ${site.endereco.rua}, ${site.endereco.bairro}`}
              src={mapas.incorporado}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              tabIndex={ativo ? 0 : -1}
            />
          )}
          {/* Sem isso o mapa prende a rolagem da página quando o dedo passa por cima. */}
          {!ativo && (
            <button type="button" className="local-ativar" onClick={() => setAtivo(true)}>
              <span>Tocar para mexer no mapa</span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
