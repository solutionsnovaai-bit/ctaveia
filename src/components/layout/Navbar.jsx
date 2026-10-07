import { useEffect, useRef, useState } from 'react'
import { menu } from '../../data/site'
import { canal, linkDeContato } from '../../lib/contato'
import { irPara, travarRolagem } from '../../lib/scroll'
import { usePalco } from '../../hooks/usePalco'
import { Marca } from '../ui/Logo'
import { Botao } from '../ui/Botao'
import { IconeCanal } from '../ui/Icones'
import { Menu } from './Menu'

/**
 * Barra do topo. No alto da página ela é transparente e não mostra a marca,
 * porque o logo já está no hero. Rolando, vira uma cápsula de vidro escuro,
 * some quando a pessoa desce e volta assim que ela sobe um pouco.
 */
export function Navbar() {
  const { fase } = usePalco()
  const [estado, setEstado] = useState({ rolou: false, oculta: false, marca: false, ativo: '' })
  const [aberto, setAberto] = useState(false)
  const links = useRef(null)
  const indicador = useRef(null)
  const progresso = useRef(null)

  useEffect(() => {
    let quadro = 0
    let ultimoY = window.scrollY
    let oculta = false

    const ler = () => {
      quadro = 0
      const y = window.scrollY
      const altura = window.innerHeight
      const total = document.documentElement.scrollHeight - altura

      if (Math.abs(y - ultimoY) > 6) {
        oculta = y > ultimoY && y > altura * 0.9
        ultimoY = y
      }
      if (y < 40) oculta = false

      let ativo = ''
      for (const item of menu) {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top <= altura * 0.42) ativo = item.id
      }

      if (progresso.current) {
        progresso.current.style.transform = `scaleX(${total > 0 ? Math.min(1, y / total).toFixed(4) : 0})`
      }

      setEstado((antes) => {
        const novo = { rolou: y > 40, oculta, marca: y > altura * 0.55, ativo }
        return Object.keys(novo).every((k) => novo[k] === antes[k]) ? antes : novo
      })
    }

    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(ler)
    }
    ler()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  // A pílula desliza até o link da seção que está na tela.
  useEffect(() => {
    const pilula = indicador.current
    const alvo = links.current?.querySelector(`[data-id="${estado.ativo}"]`)
    if (!pilula) return
    if (!alvo) {
      pilula.dataset.tem = 'nao'
      return
    }
    pilula.style.setProperty('--x', `${alvo.offsetLeft}px`)
    pilula.style.setProperty('--l', `${alvo.offsetWidth}px`)
    pilula.dataset.tem = 'sim'
  }, [estado.ativo, estado.marca])

  useEffect(() => {
    if (fase === 'carregando') return undefined
    travarRolagem(aberto)
    if (!aberto) return undefined
    const tecla = (e) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [aberto, fase])

  const navegar = (id) => (e) => {
    e.preventDefault()
    setAberto(false)
    // espera o menu destravar a página antes de rolar
    requestAnimationFrame(() => irPara(id))
  }

  return (
    <>
      <header
        className="nav"
        data-rolou={estado.rolou}
        data-oculta={estado.oculta && !aberto}
        data-marca={estado.marca || aberto}
        data-menu={aberto}
        data-entrou={fase !== 'carregando'}
      >
        <div className="nav-capsula">
          <a href="#topo" className="nav-marca" aria-label="CT Aveia, voltar ao início" onClick={navegar('topo')}>
            <Marca />
          </a>

          <nav className="nav-links" ref={links} aria-label="Seções do site">
            <span className="nav-indicador" ref={indicador} aria-hidden="true" />
            {menu.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-id={item.id}
                aria-current={estado.ativo === item.id ? 'true' : undefined}
                onClick={navegar(item.id)}
              >
                {item.rotulo}
              </a>
            ))}
          </nav>

          <div className="nav-lado">
            <Botao
              href={linkDeContato()}
              className="nav-cta"
              magnetico={false}
              icone={<IconeCanal tipo={canal.tipo} tamanho={17} />}
            >
              Agendar aula
            </Botao>
            <button
              type="button"
              className="nav-hamb"
              aria-expanded={aberto}
              aria-controls="menu"
              aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setAberto((a) => !a)}
            >
              <span />
              <span />
            </button>
          </div>

          <span className="nav-progresso" ref={progresso} aria-hidden="true" />
        </div>
      </header>

      <Menu aberto={aberto} navegar={navegar} />
    </>
  )
}
