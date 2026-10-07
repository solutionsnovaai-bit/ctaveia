import { useRef } from 'react'
import { gsap, movimentoReduzido, temMouse } from '../lib/motion'
import { canal, linkDeContato, linkDoInstagram } from '../lib/contato'
import { useCena } from '../hooks/useCena'
import { site } from '../data/site'
import { Titulo } from '../components/ui/Titulo'
import { Botao } from '../components/ui/Botao'
import { Simbolo3D } from '../components/ui/Simbolo3D'
import { IconeCanal, IconeInstagram } from '../components/ui/Icones'

/** Fechamento em amarelo, com o símbolo em 3D que gira com a rolagem e o mouse. */
export function Chamada() {
  const raiz = useRef(null)
  const simbolo = useRef(null)

  useCena(() => {
    if (movimentoReduzido()) return
    const peca = simbolo.current

    // A rolagem dá a volta na peça.
    gsap.fromTo(
      peca,
      { rotationY: -62, rotationX: 16 },
      {
        rotationY: 24,
        rotationX: -6,
        ease: 'none',
        scrollTrigger: { trigger: raiz.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    )

    // O mouse inclina o conjunto por cima do giro da rolagem.
    if (temMouse()) {
      const caixa = peca.parentElement
      const gx = gsap.quickTo(caixa, 'rotationY', { duration: 0.9, ease: 'saida' })
      const gy = gsap.quickTo(caixa, 'rotationX', { duration: 0.9, ease: 'saida' })
      gsap.set(caixa, { transformStyle: 'preserve-3d' })
      const mover = (e) => {
        const r = raiz.current.getBoundingClientRect()
        gx(((e.clientX - r.left) / r.width - 0.5) * 26)
        gy((0.5 - (e.clientY - r.top) / r.height) * 18)
      }
      const sair = () => {
        gx(0)
        gy(0)
      }
      raiz.current.addEventListener('pointermove', mover)
      raiz.current.addEventListener('pointerleave', sair)
      return () => {
        raiz.current?.removeEventListener('pointermove', mover)
        raiz.current?.removeEventListener('pointerleave', sair)
      }
    }
    return undefined
  }, raiz)

  return (
    <section className="chamada sobre-amarelo" ref={raiz}>
      <div className="conteudo chamada-grade">
        <div className="chamada-texto">
          <Titulo className="t-mega">O tatame está te esperando.</Titulo>
          <p className="chamada-apoio">
            Marca a aula experimental, vem conhecer o CT e sente o treino antes de decidir.
          </p>
          <div className="chamada-acoes">
            <Botao href={linkDeContato()} variante="preto" grande icone={<IconeCanal tipo={canal.tipo} tamanho={20} />}>
              Agendar aula experimental
            </Botao>
            {canal.tipo === 'whatsapp' && (
              <Botao href={linkDoInstagram} variante="tinta" grande icone={<IconeInstagram tamanho={20} />}>
                @{site.instagram}
              </Botao>
            )}
          </div>
        </div>

        <div className="chamada-peca">
          <Simbolo3D ref={simbolo} cor="preto" camadas={22} passo={3.2} className="chamada-s3d" />
        </div>
      </div>
    </section>
  )
}
