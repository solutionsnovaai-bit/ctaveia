import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, movimentoReduzido } from '../../lib/motion'
import { CAIXA_LOGO, LETRAS_AVEIA, LETRAS_CT, SIMBOLO, TRIANGULO } from '../../lib/logoGeo'
import { travarRolagem } from '../../lib/scroll'
import { esperar, preCarregar } from '../../lib/util'
import { usePalco } from '../../hooks/usePalco'
import { valores } from '../../data/conteudo'
import { Simbolo3D } from '../ui/Simbolo3D'
import { Faixa } from '../ui/Faixa'

/** Centro e raio do círculo inscrito no triângulo, nas coordenadas do logo. */
const INCENTRO = { x: 382, y: 496.3, raio: 171.7 }

/** O que precisa estar pronto antes de a tela abrir. */
function carregarEssencial() {
  const largo = window.matchMedia('(min-width: 900px) and (min-aspect-ratio: 1/1)').matches
  const fontes = document.fonts
    ? Promise.all([
        document.fonts.load('italic 900 1em "Saira Variable"'),
        document.fonts.load('600 1em "Saira Variable"'),
        document.fonts.load('400 1em "Geist Variable"'),
      ]).catch(() => {})
    : Promise.resolve()
  const tudo = Promise.all([fontes, preCarregar(largo ? '/img/hero-desktop.webp' : '/img/hero-mobile.webp')])
  // Rede ruim não pode prender ninguém na tela de load.
  return Promise.race([tudo, esperar(6000)])
}

/**
 * Tela de load.
 *
 * O logo é montado na frente da pessoa: o contorno do triângulo é traçado,
 * o metal ganha espessura enquanto a peça gira até ficar de frente, e as
 * letras entram por trás de máscaras. Embaixo, uma faixa preta recebe um
 * grau a cada etapa, um para cada valor do CT. O quarto grau só entra
 * quando o site está carregado de verdade.
 *
 * Na saída o triângulo vira janela: ele cresce até passar da tela e o hero
 * aparece por dentro dele.
 */
export function Loader() {
  const { fase, setFase } = usePalco()
  const [graus, setGraus] = useState(0)
  const [fora, setFora] = useState(false)

  const raiz = useRef(null)
  const marca = useRef(null)
  const janela = useRef(null)
  const cortina = useRef(null)
  const aro = useRef(null)
  const rolo = useRef(null)

  useLayoutEffect(() => {
    travarRolagem(true)
    document.getElementById('pre')?.remove()
  }, [])

  useEffect(() => {
    const el = raiz.current
    if (!el) return undefined
    let vivo = true
    const pronto = carregarEssencial()

    const sair = () => {
      setFase('livre')
      travarRolagem(false)
      setFora(true)
    }

    if (movimentoReduzido()) {
      setGraus(4)
      pronto.then(() => {
        if (!vivo) return
        setFase('abrindo')
        gsap.to(el, { opacity: 0, duration: 0.4, ease: 'none', onComplete: sair })
      })
      return () => {
        vivo = false
      }
    }

    const ctx = gsap.context(() => {
      const camadas = gsap.utils.toArray('.s3d-camada')
      const profundidades = camadas.map((c) => Number(gsap.getProperty(c, 'z')))

      gsap.set(marca.current, { rotationY: -58, rotationX: 24, scale: 0.8, transformOrigin: '50% 58%' })
      gsap.set('.load-traco', { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.set(camadas, { opacity: 0, z: 0 })
      gsap.set('.load-ct path', { yPercent: -118 })
      gsap.set('.load-aveia path', { yPercent: 118 })
      gsap.set('.load-jiu', { opacity: 0, letterSpacing: '0.08em' })
      gsap.set('.load-jiu-fio', { scaleX: 0 })
      gsap.set('.load-pe', { opacity: 0, y: 14 })
      gsap.set('.load-halo', { opacity: 0, scale: 0.7 })

      const montar = gsap.timeline({ defaults: { ease: 'saida' } })
      montar
        // a peça gira até ficar de frente enquanto é construída
        .to(marca.current, { rotationY: 0, rotationX: 0, scale: 1, duration: 2.25, ease: 'power3.inOut' }, 0)
        // 1. contorno
        .to('.load-traco', { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut', stagger: 0.12 }, 0.05)
        // 2. o metal entra e ganha espessura
        .to(camadas, { opacity: 1, duration: 0.3, ease: 'none', stagger: { each: 0.012, from: 'end' } }, 0.78)
        .to(
          camadas,
          { z: (i) => profundidades[i], duration: 1.05, stagger: { each: 0.01, from: 'end' } },
          0.8,
        )
        .to('.load-traco', { opacity: 0, duration: 0.4, ease: 'none' }, 1.05)
        .to('.load-halo', { opacity: 0.5, scale: 1, duration: 1.2 }, 1.0)
        // 3. letras
        .to('.load-ct path', { yPercent: 0, duration: 0.95, stagger: 0.08 }, 0.5)
        .to('.load-aveia path', { yPercent: 0, duration: 0.95, stagger: 0.055 }, 0.62)
        .to('.load-jiu', { opacity: 1, letterSpacing: '0.46em', duration: 1.2 }, 1.05)
        .to('.load-jiu-fio', { scaleX: 1, duration: 1.0, ease: 'pesado' }, 1.1)
        // 4. a faixa e os três primeiros graus
        .to('.load-pe', { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .call(() => setGraus(1), null, 0.55)
        .call(() => setGraus(2), null, 1.1)
        .call(() => setGraus(3), null, 1.65)

      const abrir = () => {
        const caixa = marca.current.querySelector('.load-logo').getBoundingClientRect()
        const k = caixa.width / CAIXA_LOGO.largura
        const cx = caixa.left + INCENTRO.x * k
        const cy = caixa.top + INCENTRO.y * k
        const L = window.innerWidth
        const A = window.innerHeight
        const longe = Math.max(
          Math.hypot(cx, cy),
          Math.hypot(L - cx, cy),
          Math.hypot(cx, A - cy),
          Math.hypot(L - cx, A - cy),
        )
        const escalaFinal = (longe / (INCENTRO.raio * k)) * 1.06
        const tela = `M0 0H${L}V${A}H0Z`
        const estado = { s: 0 }

        const desenhar = () => {
          const pontos = TRIANGULO.map(
            ([x, y]) =>
              `${(cx + (x - INCENTRO.x) * k * estado.s).toFixed(1)} ${(cy + (y - INCENTRO.y) * k * estado.s).toFixed(1)}`,
          )
          const tri = `M${pontos[0]}L${pontos[1]}L${pontos[2]}Z`
          cortina.current.setAttribute('d', tela + tri)
          aro.current.setAttribute('d', tri)
        }

        janela.current.setAttribute('viewBox', `0 0 ${L} ${A}`)
        setFase('abrindo')

        gsap
          .timeline({ onComplete: sair })
          .to('.load-pe, .load-jiu-linha', { opacity: 0, y: 10, duration: 0.35, ease: 'power2.in' }, 0)
          .to(marca.current, { scale: 1.22, opacity: 0, duration: 0.55, ease: 'power2.in' }, 0.05)
          .to('.load-halo', { opacity: 0, duration: 0.4 }, 0)
          .to(estado, { s: escalaFinal, duration: 1.45, ease: 'expo.inOut', onUpdate: desenhar }, 0)
          .to(aro.current, { opacity: 0, duration: 0.5, ease: 'none' }, 0.85)
      }

      // O quarto grau depende do carregamento real.
      Promise.all([pronto, montar.then()]).then(() => {
        if (!vivo) return
        setGraus(4)
        gsap
          .timeline()
          .to('.load-halo', { opacity: 0.85, scale: 1.12, duration: 0.25, ease: 'power2.out' }, 0.1)
          .to(marca.current, { scale: 1.035, duration: 0.22, ease: 'power2.out' }, 0.1)
          .to(marca.current, { scale: 1, duration: 0.5, ease: 'power2.inOut' }, 0.32)
          .call(abrir, null, 0.72)
      })
    }, el)

    return () => {
      vivo = false
      ctx.revert()
    }
  }, [setFase])

  // A palavra do valor acompanha o grau que acabou de entrar.
  useEffect(() => {
    if (!rolo.current || movimentoReduzido()) return
    gsap.to(rolo.current, { yPercent: -25 * Math.max(0, graus - 1), duration: 0.6, ease: 'pesado' })
  }, [graus])

  if (fora) return null

  return (
    <div className="load" ref={raiz} role="status" aria-live="polite" data-fase={fase}>
      <span className="so-leitor">Carregando o site do CT Aveia Jiu-Jítsu</span>

      <svg className="load-janela" ref={janela} preserveAspectRatio="none" aria-hidden="true">
        <path ref={cortina} d="M0 0H100000V100000H0Z" fill="#000" fillRule="evenodd" />
        <path ref={aro} fill="none" stroke="var(--color-amarelo)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="load-palco" aria-hidden="true">
        <div className="load-halo" />

        <div className="load-marca" ref={marca}>
          <svg viewBox={`0 0 ${CAIXA_LOGO.largura} ${CAIXA_LOGO.altura}`} className="load-logo">
            <defs>
              <clipPath id="load-corte-ct">
                <rect x="200" y="-2" width="360" height="169" />
              </clipPath>
              <clipPath id="load-corte-aveia">
                <rect x="-10" y="689" width="782" height="171" />
              </clipPath>
            </defs>
            <g className="load-ct" clipPath="url(#load-corte-ct)" fill="var(--color-aco)">
              {LETRAS_CT.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <g className="load-aveia" clipPath="url(#load-corte-aveia)" fill="var(--color-aco)">
              {LETRAS_AVEIA.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <g fill="none" stroke="var(--color-amarelo)" strokeWidth="3" strokeLinejoin="miter">
              <path className="load-traco" d={SIMBOLO.fora} pathLength="1" />
              <path className="load-traco" d={SIMBOLO.dentroContorno} pathLength="1" />
            </g>
          </svg>
          <Simbolo3D className="load-s3d" camadas={16} passo={2.4} />
        </div>

        <p className="load-jiu-linha">
          <span className="load-jiu-fio" />
          <span className="load-jiu">Jiu-jítsu</span>
          <span className="load-jiu-fio" />
        </p>

        <div className="load-pe">
          <div className="load-valores">
            <div className="load-rolo" ref={rolo}>
              {valores.map((v) => (
                <span key={v.nome}>{v.nome}</span>
              ))}
            </div>
          </div>
          <Faixa ativos={graus} className="load-faixa" />
        </div>
      </div>
    </div>
  )
}
