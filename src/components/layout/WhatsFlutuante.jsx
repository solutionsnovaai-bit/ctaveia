import { useRef } from 'react'
import { canal, linkDeContato } from '../../lib/contato'
import { useInercia } from '../../hooks/useInercia'
import { IconeCanal } from '../ui/Icones'

/** Balão de contato com inércia: atrasa e estica com a rolagem, sem nunca sair da tela. */
export function WhatsFlutuante() {
  const ref = useRef(null)
  useInercia(ref, { aparecerApos: 0.6, atrasoMaximo: 34, piso: 14 })

  return (
    <a
      ref={ref}
      href={linkDeContato()}
      target="_blank"
      rel="noopener noreferrer"
      className="balao"
      data-tipo={canal.tipo}
      data-visivel="nao"
      aria-label={`Chamar o CT Aveia no ${canal.nome}`}
    >
      <IconeCanal tipo={canal.tipo} tamanho={28} />
    </a>
  )
}
