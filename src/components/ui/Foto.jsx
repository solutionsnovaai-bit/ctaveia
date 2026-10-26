import { cx } from '../../lib/util'

/**
 * Foto real do CT dentro de uma moldura arredondada. A imagem é um pouco
 * maior que a moldura para ter folga no parallax, e a cortina amarela é a
 * que passa por cima na hora da revelação (ver revelarFotos).
 */
export function Foto({ src, alt, foco, legenda, className, carregar = 'lazy' }) {
  return (
    <figure className={cx('foto', className)}>
      <div className="foto-mascara">
        <img
          className="foto-img"
          src={`/img/fotos/${src}.webp`}
          alt={alt}
          loading={carregar}
          decoding="async"
          style={foco ? { objectPosition: foco } : undefined}
        />
      </div>
      <span className="foto-cortina" aria-hidden="true" />
      {legenda && <figcaption className="foto-legenda">{legenda}</figcaption>}
    </figure>
  )
}
