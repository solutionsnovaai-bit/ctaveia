import { useEffect } from 'react'
import { limitar } from '../lib/util'
import { movimentoReduzido } from '../lib/motion'

/**
 * Balão com inércia: a rolagem acumula velocidade, o balão atrasa, gira,
 * estica e volta com efeito de mola.
 *
 * Duas travas impedem que ele suma da tela:
 *  1. o atraso nunca passa de `atrasoMaximo`;
 *  2. a descida é cortada antes de o balão chegar a `piso` px da borda de
 *     baixo, seja qual for a velocidade. O CSS pode trocar o piso com --piso.
 */
export function useInercia(ref, { aparecerApos = 0.45, atrasoMaximo = 34, piso = 14 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const mostrar = (sim) => {
      el.dataset.visivel = sim ? 'sim' : 'nao'
    }

    if (movimentoReduzido()) {
      const simples = () => mostrar(window.scrollY > window.innerHeight * aparecerApos)
      simples()
      window.addEventListener('scroll', simples, { passive: true })
      return () => window.removeEventListener('scroll', simples)
    }

    let ultimoY = window.scrollY
    let velocidade = 0
    let desvio = 0
    let giro = 0
    let quadro = 0
    let visivel = false
    let folga = 60

    const medirFolga = () => {
      const estilo = getComputedStyle(el)
      const base = parseFloat(estilo.bottom) || 0
      const pisoCss = parseFloat(estilo.getPropertyValue('--piso')) || piso
      folga = Math.max(0, base - pisoCss)
    }

    const aoRolar = () => {
      const y = window.scrollY
      velocidade += y - ultimoY
      ultimoY = y
      const quer = y > window.innerHeight * aparecerApos
      if (quer !== visivel) {
        visivel = quer
        mostrar(quer)
      }
    }

    const girar = () => {
      velocidade *= 0.86
      const alvo = limitar(velocidade * 0.85, -atrasoMaximo, atrasoMaximo)
      desvio += (alvo - desvio) * 0.14
      giro += (desvio * 0.5 - giro) * 0.12

      const entrada = visivel ? 0 : 26
      const y = Math.min(entrada + desvio, folga)
      const aperto = 1 - Math.min(0.12, Math.abs(desvio) / 340)

      el.style.transform =
        `translate3d(0,${y.toFixed(2)}px,0) rotate(${giro.toFixed(2)}deg) ` +
        `scaleY(${(1 / aperto).toFixed(3)}) scaleX(${aperto.toFixed(3)})`
      quadro = requestAnimationFrame(girar)
    }

    medirFolga()
    aoRolar()
    quadro = requestAnimationFrame(girar)
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', medirFolga)

    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', medirFolga)
    }
  }, [ref, aparecerApos, atrasoMaximo, piso])
}
