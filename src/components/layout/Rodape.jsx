import { mapas, menu, site } from '../../data/site'
import { canal, linkDeContato, linkDoInstagram } from '../../lib/contato'
import { irPara } from '../../lib/scroll'
import { horaCurta } from '../../lib/agenda'
import { Aveia, Simbolo } from '../ui/Logo'

export function Rodape() {
  const ir = (id) => (e) => {
    e.preventDefault()
    irPara(id)
  }

  return (
    <footer className="rodape">
      <div className="conteudo">
        <div className="rodape-grade">
          <div className="rodape-marca">
            <Simbolo className="rodape-simbolo" titulo="CT Aveia Jiu-Jítsu" />
            <p className="t-chamada">{site.lema}.</p>
          </div>

          <div>
            <h2 className="rodape-titulo">Onde fica</h2>
            <address className="rodape-texto">
              {site.endereco.rua}
              <br />
              {site.endereco.bairro}, {site.endereco.cidade}/{site.endereco.uf}
            </address>
            <a className="rodape-link" href={mapas.google} target="_blank" rel="noopener noreferrer">
              Abrir no mapa
            </a>
          </div>

          <div>
            <h2 className="rodape-titulo">Funcionamento</h2>
            <ul className="rodape-texto">
              {site.turnos.map((t) => (
                <li key={t.nome}>
                  {t.nome}: {horaCurta(t.das)} às {horaCurta(t.ate)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="rodape-titulo">Fale com o CT</h2>
            <ul className="rodape-texto">
              <li>
                <a className="rodape-link" href={linkDoInstagram} target="_blank" rel="noopener noreferrer">
                  @{site.instagram}
                </a>
              </li>
              {canal.tipo === 'whatsapp' && (
                <li>
                  <a className="rodape-link" href={linkDeContato()} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="rodape-titulo">No site</h2>
            <ul className="rodape-texto">
              {menu.map((item) => (
                <li key={item.id}>
                  <a className="rodape-link" href={`#${item.id}`} onClick={ir(item.id)}>
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Aveia className="rodape-nome" />

        <div className="rodape-base">
          <p>
            © {new Date().getFullYear()} {site.nome}
          </p>
          <a href="#topo" className="rodape-link" onClick={ir('topo')}>
            Voltar ao topo
          </a>
        </div>
      </div>
    </footer>
  )
}
