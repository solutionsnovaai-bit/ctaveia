import { site } from '../data/site'

/**
 * Canal de contato do site. Com o número do WhatsApp preenchido em
 * data/site.js, todo botão abre a conversa já com a mensagem escrita.
 * Sem número, os botões abrem o Direct do Instagram do CT.
 */
const numero = site.whatsapp.replace(/\D/g, '')

export const canal = numero
  ? { tipo: 'whatsapp', nome: 'WhatsApp', aceitaTexto: true }
  : { tipo: 'instagram', nome: 'Instagram', aceitaTexto: false }

export const MENSAGEM_PADRAO = 'Oi! Vi o site do CT Aveia e quero agendar uma aula experimental.'

export function linkDeContato(mensagem = MENSAGEM_PADRAO) {
  if (canal.tipo === 'whatsapp') {
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
  }
  return `https://ig.me/m/${site.instagram}`
}

export const linkDoInstagram = `https://www.instagram.com/${site.instagram}/`

/** "de jiu-jítsu", "de MMA", "no Projeto Kids", "com personal". */
function comPreposicao(modalidade) {
  if (modalidade === 'Projeto Kids') return 'no Projeto Kids'
  if (modalidade === 'Personal') return 'com personal'
  const ehSigla = modalidade === modalidade.toUpperCase()
  return `de ${ehSigla ? modalidade : modalidade.toLowerCase()}`
}

/** Monta a mensagem do formulário da primeira aula. */
export function montarMensagem({ nome, paraQuem, modalidade, periodo }) {
  const quem = nome.trim() ? `Oi! Aqui é ${nome.trim()}.` : 'Oi!'
  const aula = `Quero agendar uma aula experimental ${comPreposicao(modalidade)}`
  const alvo = paraQuem === 'filho' ? `${aula} para meu filho` : aula
  return `${quem} ${alvo}, de preferência no período da ${periodo.toLowerCase()}. Vi o site do CT Aveia.`
}

/** Copia um texto e responde se deu certo (usado quando o canal não aceita texto pronto). */
export async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto)
    return true
  } catch {
    return false
  }
}
