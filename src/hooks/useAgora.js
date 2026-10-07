import { useEffect, useState } from 'react'

/**
 * Devolve a data de agora e atualiza a cada `passo` ms, sem rodar enquanto
 * a aba está escondida. `ativo` deixa quem usa pausar quando sai da tela.
 */
export function useAgora(passo = 1000, ativo = true) {
  const [agora, setAgora] = useState(() => new Date())

  useEffect(() => {
    if (!ativo) return undefined
    let id = 0
    const bater = () => setAgora(new Date())
    const ligar = () => {
      clearInterval(id)
      if (document.hidden) return
      bater()
      id = setInterval(bater, passo)
    }
    ligar()
    document.addEventListener('visibilitychange', ligar)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', ligar)
    }
  }, [passo, ativo])

  return agora
}
