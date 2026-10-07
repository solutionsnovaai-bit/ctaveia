import { CAIXA_LOGO, CAIXA_SIMBOLO, LETRAS_AVEIA, LETRAS_CT, SIMBOLO } from '../../lib/logoGeo'

const caixaSimbolo = `${CAIXA_SIMBOLO.x} ${CAIXA_SIMBOLO.y} ${CAIXA_SIMBOLO.largura} ${CAIXA_SIMBOLO.altura}`

/** Só o triângulo. A cor vem de `currentColor`. */
export function Simbolo({ className, titulo, ...resto }) {
  return (
    <svg
      viewBox={caixaSimbolo}
      className={className}
      fill="currentColor"
      fillRule="evenodd"
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      {...resto}
    >
      <path d={SIMBOLO.dentro} />
      <path d={SIMBOLO.fora} />
    </svg>
  )
}

/** A palavra AVEIA, com as letras do logotipo. */
export function Aveia({ className, ...resto }) {
  return (
    <svg viewBox="0 691 762 167" className={className} fill="currentColor" aria-hidden="true" {...resto}>
      {LETRAS_AVEIA.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

/** Símbolo e nome lado a lado, para a barra do topo. */
export function Marca({ className }) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.62em' }}>
      <Simbolo style={{ height: '1.9em', width: 'auto', color: 'var(--color-amarelo)' }} />
      <Aveia style={{ height: '0.92em', width: 'auto', color: 'var(--color-aco)' }} />
    </span>
  )
}

/** Logotipo completo empilhado: CT, triângulo e AVEIA. */
export function LogoCompleto({ className, titulo = 'CT Aveia Jiu-Jítsu' }) {
  return (
    <svg
      viewBox={`0 0 ${CAIXA_LOGO.largura} ${CAIXA_LOGO.altura}`}
      className={className}
      role="img"
      aria-label={titulo}
    >
      <g fill="var(--color-aco)">
        {LETRAS_CT.map((d) => (
          <path key={d} d={d} />
        ))}
        {LETRAS_AVEIA.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="var(--color-amarelo)" fillRule="evenodd">
        <path d={SIMBOLO.dentro} />
        <path d={SIMBOLO.fora} />
      </g>
    </svg>
  )
}
