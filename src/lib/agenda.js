import { AULAS, DIAS } from '../data/horarios'
import { site } from '../data/site'

const MIN_DIA = 24 * 60

const partes = new Intl.DateTimeFormat('en-GB', {
  timeZone: site.fuso,
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

const DIA_DA_SEMANA = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }

/** Dia da semana e hora de agora em São Paulo, onde quer que o visitante esteja. */
export function agoraNoCT(data = new Date()) {
  const p = Object.fromEntries(partes.formatToParts(data).map((x) => [x.type, x.value]))
  const hora = Number(p.hour) % 24
  return { dia: DIA_DA_SEMANA[p.weekday], minutos: hora * 60 + Number(p.minute), segundos: Number(p.second) }
}

export const emMinutos = (hora) => {
  const [h, m] = hora.split(':').map(Number)
  return h * 60 + m
}

/** Aulas de um dia, em ordem de horário, com filtro opcional por grupo. */
export function aulasDoDia(dia, grupo = 'todas') {
  return AULAS.filter((a) => a.dias.includes(dia) && (grupo === 'todas' || a.grupo === grupo)).sort(
    (a, b) => emMinutos(a.hora) - emMinutos(b.hora),
  )
}

/** Horários de um grupo, agrupados por conjunto de dias: "Seg, qua e sex" -> ["07:00", ...]. */
export function horariosDoGrupo(grupos) {
  const mapa = new Map()
  AULAS.filter((a) => grupos.includes(a.grupo)).forEach((a) => {
    const chave = `${a.turma}|${a.dias.join('')}`
    if (!mapa.has(chave)) mapa.set(chave, { turma: a.turma, dias: nomeDosDias(a.dias), horas: [] })
    mapa.get(chave).horas.push(a.hora)
  })
  return [...mapa.values()]
}

export function nomeDosDias(dias) {
  const nomes = dias.map((d) => DIAS.find((x) => x.id === d).curto.toLowerCase())
  const texto = nomes.length > 1 ? `${nomes.slice(0, -1).join(', ')} e ${nomes.at(-1)}` : nomes[0]
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

/**
 * Próxima aula a partir de agora. Devolve a aula, em quantos dias ela cai
 * (0 = hoje) e quantos segundos faltam.
 */
export function proximaAula(data = new Date()) {
  const { dia, minutos, segundos } = agoraNoCT(data)
  for (let salto = 0; salto < 8; salto += 1) {
    const diaAlvo = ((dia - 1 + salto) % 7) + 1
    const candidatas = aulasDoDia(diaAlvo).filter((a) => salto > 0 || emMinutos(a.hora) > minutos)
    if (candidatas.length) {
      const aula = candidatas[0]
      const faltam = (salto * MIN_DIA + emMinutos(aula.hora) - minutos) * 60 - segundos
      return { aula, dia: diaAlvo, salto, faltam }
    }
  }
  return null
}

/** "hoje", "amanhã" ou o nome do dia. */
export function quando(salto, dia) {
  if (salto === 0) return 'hoje'
  if (salto === 1) return 'amanhã'
  return DIAS.find((d) => d.id === dia)?.nome.toLowerCase() ?? ''
}

export function relogio(segundosTotais) {
  const s = Math.max(0, Math.floor(segundosTotais))
  const hh = Math.floor(s / 3600)
  const mm = Math.floor((s % 3600) / 60)
  const ss = s % 60
  return [hh, mm, ss].map((n) => String(n).padStart(2, '0'))
}

/** "em 2 h 10" ou "em 35 min", para a lista do dia. */
export function faltaCurta(minutos) {
  if (minutos < 60) return `em ${minutos} min`
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  return m ? `em ${h} h ${String(m).padStart(2, '0')}` : `em ${h} h`
}

export const horaCurta = (hora) => hora.replace(/^0/, '').replace(':00', 'h').replace(':', 'h')
