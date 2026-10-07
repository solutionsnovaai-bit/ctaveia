import { useEffect, useRef } from 'react'
import { enderecoCompleto, menu, site } from '../../data/site'
import { canal, linkDeContato, linkDoInstagram } from '../../lib/contato'
import { Botao } from '../ui/Botao'
import { IconeCanal, IconeInstagram } from '../ui/Icones'

/** Menu de tela cheia do celular. Entra pela direita com a borda em diagonal. */
export function Menu({ aberto, navegar }) {
  const raiz = useRef(null)

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    el.inert = !aberto
    if (aberto) el.querySelector('a')?.focus({ preventScroll: true })
  }, [aberto])

  return (
    <div id="menu" className="menu" ref={raiz} data-aberto={aberto} role="dialog" aria-modal="true" aria-label="Menu">
      <nav className="menu-links" aria-label="Seções do site">
        {menu.map((item, i) => (
          <a key={item.id} href={`#${item.id}`} style={{ '--i': i }} onClick={navegar(item.id)}>
            <span className="t-titulo">{item.rotulo}</span>
          </a>
        ))}
      </nav>

      <div className="menu-pe" style={{ '--i': menu.length }}>
        <Botao href={linkDeContato()} grande icone={<IconeCanal tipo={canal.tipo} tamanho={20} />}>
          Agendar aula experimental
        </Botao>
        <a className="menu-insta" href={linkDoInstagram} target="_blank" rel="noopener noreferrer">
          <IconeInstagram tamanho={18} />@{site.instagram}
        </a>
        <p className="menu-endereco">{enderecoCompleto}</p>
      </div>
    </div>
  )
}
