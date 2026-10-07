import { site } from '../data/site'
import { valores } from '../data/conteudo'
import { Marquee } from '../components/ui/Marquee'
import { Simbolo } from '../components/ui/Logo'

/**
 * Duas fitas cruzadas, como o nó de uma faixa. A da frente leva o lema do CT;
 * a de trás, os quatro valores do escudo. As duas reagem à rolagem.
 */
export function FaixaLema() {
  return (
    <section className="lema" aria-label={`${site.lema}. ${valores.map((v) => v.nome).join(', ')}.`}>
      <div className="lema-fita lema-tras">
        <Marquee base={34} sentido={-1} repeticoes={4}>
          {valores.map((v) => (
            <span className="lema-item" key={v.nome}>
              <span className="lema-palavra">{v.nome}</span>
              <span className="lema-traco" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="lema-fita lema-frente">
        <Marquee base={58} repeticoes={6}>
          <span className="lema-item">
            <span className="lema-palavra">{site.lema}</span>
            <Simbolo className="lema-simbolo" />
          </span>
        </Marquee>
      </div>
    </section>
  )
}
