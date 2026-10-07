import { createContext, useContext, useMemo, useState } from 'react'

/**
 * Fase do site:
 *  - carregando: a tela de load está fechada na frente de tudo
 *  - abrindo:    a tela de load começou a abrir; o hero entra junto
 *  - livre:      a tela de load saiu e a página rola
 */
const Palco = createContext({ fase: 'livre', setFase: () => {} })

export function PalcoProvider({ children }) {
  const [fase, setFase] = useState('carregando')
  const valor = useMemo(() => ({ fase, setFase }), [fase])
  return <Palco.Provider value={valor}>{children}</Palco.Provider>
}

export const usePalco = () => useContext(Palco)
