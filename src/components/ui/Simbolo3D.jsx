import { forwardRef, useId } from 'react'
import { CAIXA_SIMBOLO, SIMBOLO } from '../../lib/logoGeo'
import { cx } from '../../lib/util'

const caixa = `${CAIXA_SIMBOLO.x} ${CAIXA_SIMBOLO.y} ${CAIXA_SIMBOLO.largura} ${CAIXA_SIMBOLO.altura}`

/** Cor de cada camada da lateral, escurecendo conforme afunda. */
const TONS = {
  amarelo: { frente: null, perto: [215, 155, 0], longe: [86, 56, 0] },
  preto: { frente: '#0a0a09', perto: [44, 36, 6], longe: [0, 0, 0] },
}

const tom = (de, ate, t) => `rgb(${de.map((c, i) => Math.round(c + (ate[i] - c) * t)).join(' ')})`

/**
 * O símbolo com espessura de verdade: várias cópias do desenho empilhadas no
 * eixo Z. Parado de frente ele é o logo chapado; girando, aparece a lateral.
 * Quem usa gira o elemento da ref (rotationX / rotationY).
 */
export const Simbolo3D = forwardRef(function Simbolo3D(
  { camadas = 14, passo = 2.6, cor = 'amarelo', className },
  ref,
) {
  const { frente, perto, longe } = TONS[cor]
  const idGradiente = `ouro-${useId().replace(/:/g, '')}`

  return (
    <div className={cx('s3d', className)} aria-hidden="true">
      <div className="s3d-corpo" ref={ref}>
        {Array.from({ length: camadas }, (_, i) => {
          const indice = camadas - 1 - i // desenha do fundo para a frente
          const naFrente = indice === 0
          return (
            <svg
              key={indice}
              viewBox={caixa}
              className="s3d-camada"
              style={{ transform: `translateZ(${-indice * passo}px)` }}
              fill={naFrente ? frente ?? `url(#${idGradiente})` : tom(perto, longe, indice / (camadas - 1))}
              fillRule="evenodd"
            >
              {naFrente && cor === 'amarelo' && (
                <defs>
                  <linearGradient id={idGradiente} x1="0.15" y1="0" x2="0.85" y2="1">
                    <stop offset="0" stopColor="#ffe640" />
                    <stop offset="0.45" stopColor="#fdd003" />
                    <stop offset="1" stopColor="#f2b400" />
                  </linearGradient>
                </defs>
              )}
              <path d={SIMBOLO.dentro} />
              <path d={SIMBOLO.fora} />
            </svg>
          )
        })}
      </div>
    </div>
  )
})
