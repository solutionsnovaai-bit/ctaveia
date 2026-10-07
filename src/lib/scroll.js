import Lenis from 'lenis'
import { gsap, ScrollTrigger, movimentoReduzido } from './motion'

let lenis = null
let aoTick = null

/**
 * Rolagem suave. No computador o Lenis interpola a roda do mouse; no celular
 * a rolagem continua sendo a nativa do aparelho, que já é suave e não briga
 * com o dedo. O ScrollTrigger lê a mesma posição nos dois casos.
 */
export function iniciarRolagem() {
  if (lenis || movimentoReduzido()) return lenis

  lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
  })

  lenis.on('scroll', ScrollTrigger.update)
  aoTick = (tempo) => lenis.raf(tempo * 1000)
  gsap.ticker.add(aoTick)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function encerrarRolagem() {
  if (!lenis) return
  gsap.ticker.remove(aoTick)
  lenis.destroy()
  lenis = null
}

export const rolagem = () => lenis

/** Trava a página enquanto a tela de load ou o menu estão abertos. */
export function travarRolagem(travar) {
  document.documentElement.classList.toggle('travado', travar)
  if (!lenis) return
  if (travar) lenis.stop()
  else lenis.start()
}

/** Leva até uma seção pelo id, descontando a altura da barra do topo. */
export function irPara(id, { imediato = false } = {}) {
  const alvo = typeof id === 'string' ? document.getElementById(id) : id
  if (!alvo) return
  const desconto = id === 'topo' ? 0 : -72
  if (lenis) {
    lenis.scrollTo(alvo, { offset: desconto, duration: imediato ? 0 : 1.5, easing: (t) => 1 - Math.pow(1 - t, 4), force: true })
  } else {
    const y = alvo.getBoundingClientRect().top + window.scrollY + desconto
    window.scrollTo({ top: y, behavior: movimentoReduzido() || imediato ? 'auto' : 'smooth' })
  }
}

/** Velocidade atual da rolagem em px por quadro (0 quando parado). */
export const velocidade = () => (lenis ? lenis.velocity : 0)
