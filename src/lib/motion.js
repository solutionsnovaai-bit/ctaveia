import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

/**
 * As três curvas do site. Tudo que se move usa uma delas, e é isso que
 * faz o conjunto parecer uma coisa só.
 *  - saida:  chega rápido e assenta devagar (entradas, respostas a toque)
 *  - pesado: acelera e freia com peso (aberturas de tela, trocas grandes)
 *  - golpe:  passa do ponto e volta (o grau batendo na faixa)
 */
CustomEase.create('saida', '0.16, 1, 0.3, 1')
CustomEase.create('pesado', '0.76, 0, 0.24, 1')
CustomEase.create('golpe', 'M0,0 C0.2,0 0.3,1.28 0.55,1.06 0.75,0.97 0.85,1 1,1')

gsap.defaults({ ease: 'saida', duration: 0.9 })
gsap.config({ nullTargetWarn: false })

ScrollTrigger.config({ ignoreMobileResize: true })

export const movimentoReduzido = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const temMouse = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

export { gsap, ScrollTrigger, SplitText }
