import { cx } from '../../lib/util'

/**
 * A faixa preta com os graus amarelos, como a da arte do CT.
 * `ativos` diz quantos graus já foram colocados; cada um entra batendo.
 */
export function Faixa({ ativos = 0, total = 4, className, style }) {
  return (
    <div className={cx('faixa', className)} style={style} aria-hidden="true">
      <div className="faixa-graus">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className="grau" data-ativo={i < ativos} />
        ))}
      </div>
    </div>
  )
}
