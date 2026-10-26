import { gsap } from './motion'

/**
 * Revelação das fotos: a cortina amarela sobe e cobre a moldura, a foto
 * aparece por trás e a cortina sai pelo topo enquanto a imagem desce do zoom.
 * Depois disso a imagem fica em parallax, presa à rolagem.
 * Chamar dentro de um useCena, para tudo ser desfeito sozinho.
 */
export function revelarFotos(alvos, { inicio = 'top 86%', atraso = () => 0, parallax = 9 } = {}) {
  gsap.utils.toArray(alvos).forEach((foto, i) => {
    const mascara = foto.querySelector('.foto-mascara')
    const img = foto.querySelector('.foto-img')
    const cortina = foto.querySelector('.foto-cortina')
    const legenda = foto.querySelector('.foto-legenda')

    const espera = atraso(i, foto)
    const tl = gsap.timeline({ scrollTrigger: { trigger: foto, start: inicio, once: true } })
    // a espera entra como um trecho vazio: o ScrollTrigger toca a timeline do zero
    if (espera) tl.to({}, { duration: espera })
    tl.fromTo(cortina, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.6, ease: 'pesado', immediateRender: true })
      .fromTo(mascara, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.01 })
      .set(cortina, { transformOrigin: '50% 0%' })
      .to(cortina, { scaleY: 0, duration: 0.75, ease: 'pesado' })
      .fromTo(img, { scale: 1.32 }, { scale: 1, duration: 1.6, ease: 'saida' }, '<')
      .from(legenda, { yPercent: 120, opacity: 0, duration: 0.8 }, '<0.35')

    if (parallax) {
      gsap.fromTo(
        img,
        { yPercent: -parallax },
        {
          yPercent: parallax,
          ease: 'none',
          scrollTrigger: { trigger: foto, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }
  })
}
