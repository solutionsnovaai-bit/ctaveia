import { cx } from '../../lib/util'

/** Botão de escolha (filtro, dia, opção de formulário). */
export function Chip({ ativo, children, className, ...resto }) {
  return (
    <button type="button" aria-pressed={ativo} className={cx('chip', className)} {...resto}>
      {children}
    </button>
  )
}
