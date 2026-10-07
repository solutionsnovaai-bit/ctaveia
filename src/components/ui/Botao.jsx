import { useRef } from 'react'
import { useMagnetico } from '../../hooks/useMagnetico'
import { cx } from '../../lib/util'

/**
 * Botão do site. Vira link quando recebe `href`.
 * Variantes: primario (amarelo), fantasma (vidro escuro) e preto (para usar
 * em cima do amarelo). No mouse ele é puxado de leve pelo cursor.
 */
export function Botao({
  href,
  variante = 'primario',
  grande = false,
  magnetico = true,
  icone,
  children,
  className,
  ...resto
}) {
  const ref = useRef(null)
  useMagnetico(ref, magnetico ? 0.22 : 0)

  const classes = cx('btn', `btn-${variante}`, grande && 'btn-g', className)
  const miolo = (
    <>
      {icone}
      <span>{children}</span>
    </>
  )

  if (href) {
    const externo = /^https?:/.test(href)
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...resto}
      >
        {miolo}
      </a>
    )
  }

  return (
    <button ref={ref} type="button" className={classes} {...resto}>
      {miolo}
    </button>
  )
}
