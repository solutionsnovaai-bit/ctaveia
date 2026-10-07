import { useId } from 'react'
import { CAIXA_LOGO, LETRAS_AVEIA, LETRAS_CT, SIMBOLO, TRIANGULO } from '../../lib/logoGeo'
import { cx } from '../../lib/util'
import { Simbolo } from './Logo'
import { Faixa } from './Faixa'

/** Caixa do símbolo com folga para a espessura do relevo (que desce para a direita). */
const CAIXA_RELEVO = '76 124 640 588'
const CAMADAS = 9

function Pecas() {
  return (
    <>
      <path d={SIMBOLO.dentro} />
      <path d={SIMBOLO.fora} />
    </>
  )
}

/** O símbolo em relevo: cópias deslocadas fazem a lateral, a da frente leva o brilho. */
function Relevo({ tom = 'ouro', className }) {
  const id = `relevo-${useId().replace(/:/g, '')}`
  const lateral = tom === 'ouro' ? ['#8a5f00', '#3d2a00'] : ['#000000', '#000000']

  return (
    <svg viewBox={CAIXA_RELEVO} className={className} fillRule="evenodd" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#fff07a" />
          <stop offset="0.38" stopColor="#fdd003" />
          <stop offset="1" stopColor="#e9a900" />
        </linearGradient>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={lateral[0]} />
          <stop offset="1" stopColor={lateral[1]} />
        </linearGradient>
      </defs>
      {Array.from({ length: CAMADAS }, (_, i) => {
        const n = CAMADAS - i
        return (
          <g
            key={n}
            transform={`translate(${n * 2.6} ${n * 3.4})`}
            fill={`url(#${id}-l)`}
            opacity={tom === 'ouro' ? 1 : 0.16}
          >
            <Pecas />
          </g>
        )
      })}
      <g fill={tom === 'ouro' ? `url(#${id})` : '#0a0a09'}>
        <Pecas />
      </g>
    </svg>
  )
}

/** Logotipo completo. `tinta` pinta tudo de uma cor só (para fundo amarelo). */
function Completo({ tinta, className }) {
  return (
    <svg viewBox={`-8 -8 ${CAIXA_LOGO.largura + 16} ${CAIXA_LOGO.altura + 16}`} className={className} aria-hidden="true">
      <g fill={tinta ?? 'var(--color-aco)'}>
        {[...LETRAS_CT, ...LETRAS_AVEIA].map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill={tinta ?? 'var(--color-amarelo)'} fillRule="evenodd">
        <Pecas />
      </g>
    </svg>
  )
}

/** O desenho de construção do símbolo: contorno, lados prolongados e círculo inscrito. */
function Contorno({ className }) {
  const [topo, direita, esquerda] = TRIANGULO
  const prolongar = ([x1, y1], [x2, y2], quanto = 0.34) => {
    const dx = (x2 - x1) * quanto
    const dy = (y2 - y1) * quanto
    return `M${x1 - dx} ${y1 - dy}L${x2 + dx} ${y2 + dy}`
  }
  return (
    <svg viewBox="-10 60 784 700" className={className} fill="none" aria-hidden="true">
      <g stroke="rgb(255 255 255 / 0.13)" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
        <path d={prolongar(topo, direita)} />
        <path d={prolongar(direita, esquerda)} />
        <path d={prolongar(esquerda, topo)} />
        <circle cx="382" cy="496.3" r="171.7" />
        <circle cx="382" cy="496.3" r="3" fill="rgb(255 255 255 / 0.4)" stroke="none" />
      </g>
      <g stroke="var(--color-amarelo)" strokeWidth="5" strokeLinejoin="miter">
        <path d={SIMBOLO.dentroContorno} />
        <path d={SIMBOLO.fora} />
      </g>
    </svg>
  )
}

const ARTES = {
  ouro: () => <Relevo className="marca-arte" />,
  amarelo: () => <Relevo tom="preto" className="marca-arte" />,
  completo: () => <Completo className="marca-arte marca-arte-alta" />,
  tinta: () => <Completo tinta="#0a0a09" className="marca-arte marca-arte-alta" />,
  contorno: () => <Contorno className="marca-arte marca-arte-larga" />,
  padrao: () => (
    <div className="marca-grade">
      {Array.from({ length: 20 }, (_, i) => (
        <Simbolo key={i} data-aceso={i === 9} />
      ))}
    </div>
  ),
  faixa: () => (
    <>
      <Relevo className="marca-arte marca-arte-menor" />
      <Faixa ativos={4} className="marca-faixa" />
    </>
  ),
  listras: () => (
    <div className="marca-placa">
      <Simbolo />
    </div>
  ),
}

/**
 * Card de marca: o logo do CT em um acabamento, com uma frase opcional.
 * Substitui as fotos do site. Variantes: ouro, amarelo, completo, tinta,
 * contorno, padrao, faixa e listras.
 */
export function CardMarca({ variante = 'ouro', frase, className, ...resto }) {
  const Arte = ARTES[variante] ?? ARTES.ouro
  return (
    <div className={cx('marca', `marca-${variante}`, className)} data-frase={Boolean(frase)} {...resto}>
      <Arte />
      {frase && <p className="marca-texto">{frase}</p>}
      <span className="marca-brilho" aria-hidden="true" />
    </div>
  )
}
