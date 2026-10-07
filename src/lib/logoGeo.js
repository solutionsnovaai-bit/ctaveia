/**
 * Geometria do logotipo do CT Aveia, redesenhada em vetor a partir da arte
 * original. Tudo está no mesmo sistema de coordenadas (762 x 858), então as
 * peças se encaixam sozinhas em qualquer tamanho.
 */
export const CAIXA_LOGO = { largura: 762, altura: 858 }

/** Recorte só do triângulo, para usar o símbolo sozinho. */
export const CAIXA_SIMBOLO = { x: 91.7, y: 140, largura: 580.5, altura: 528 }

/** O símbolo é feito de duas fitas que se encaixam. */
export const SIMBOLO = {
  /** Fita de dentro: o "A" com a fenda. */
  dentro: 'M315.7 251.3 L489.1 561.6 L414.4 561.6 L317.1 387.4 L264.1 486 L333.6 486 L235.8 668 L91.7 668ZM258.1 498 L274.1 498 L204.2 628 L188.2 628Z',
  /** A mesma fita sem a fenda, para traçar o contorno. */
  dentroContorno: 'M315.7 251.3 L489.1 561.6 L414.4 561.6 L317.1 387.4 L264.1 486 L333.6 486 L235.8 668 L91.7 668Z',
  /** Fita de fora: lado direito e base. */
  fora: 'M378 140 L672.2 668 L268.6 668 L305 600.2 L550.7 600.2 L336.4 216.8Z',
}

/** Contorno externo do triângulo: ápice, base direita, base esquerda. */
export const TRIANGULO = [
  [378, 140],
  [672.2, 668],
  [91.7, 668],
]

export const LETRAS_CT = [
  'M223 0 L358 0 L338 42 L269 42 L269 123 L350 123 L330 165 L223 165Z',
  'M392 0 L533 0 L514 42 L475 42 L475 165 L428 165 L428 42 L373 42Z',
]

export const LETRAS_AVEIA = [
  'M77 691 L126 691 L195 858 L148 858 L134 819 L85 819 L96 792 L124 792 L107 741 L98 741 L49 858 L0 858Z',
  'M158 691 L207 691 L251 794 L260 794 L307 691 L354 691 L275 858 L233 858Z',
  'M370 692 L492 692 L473 728 L410 728 L410 756 L473 756 L473 790 L410 790 L410 822 L493 822 L474 858 L370 858Z',
  'M517 692 L555 692 L555 858 L517 858Z',
  'M643 691 L692 691 L761 858 L714 858 L700 819 L651 819 L662 792 L690 792 L673 741 L664 741 L615 858 L566 858Z',
]
