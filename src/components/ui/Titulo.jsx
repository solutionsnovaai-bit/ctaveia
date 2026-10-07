import { useRef } from 'react'
import { useCena } from '../../hooks/useCena'
import { gsap, SplitText, movimentoReduzido } from '../../lib/motion'

/**
 * Título que sobe linha por linha de trás de uma máscara quando entra na tela.
 * As linhas são refeitas sozinhas se a largura mudar.
 */
export function Titulo({ como: Tag = 'h2', className, children, atraso = 0, inicio = 'top 88%', ...resto }) {
  const ref = useRef(null)

  useCena(() => {
    if (movimentoReduzido()) return
    SplitText.create(ref.current, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'linha',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 112,
          duration: 1.15,
          ease: 'saida',
          stagger: 0.09,
          delay: atraso,
          scrollTrigger: { trigger: ref.current, start: inicio, once: true },
        }),
    })
  }, ref)

  return (
    <Tag ref={ref} className={className} {...resto}>
      {children}
    </Tag>
  )
}
