/**
 * Tabela de horários do CT, igual à divulgada no Instagram.
 * Dias: 1 = segunda ... 6 = sábado. Para mudar um horário, edite a linha.
 */
export const DIAS = [
  { id: 1, curto: 'Seg', nome: 'Segunda' },
  { id: 2, curto: 'Ter', nome: 'Terça' },
  { id: 3, curto: 'Qua', nome: 'Quarta' },
  { id: 4, curto: 'Qui', nome: 'Quinta' },
  { id: 5, curto: 'Sex', nome: 'Sexta' },
  { id: 6, curto: 'Sáb', nome: 'Sábado' },
]

export const GRUPOS = [
  { id: 'todas', rotulo: 'Todas' },
  { id: 'jiu-jitsu', rotulo: 'Jiu-jítsu' },
  { id: 'kids', rotulo: 'Kids' },
  { id: 'thai-mma', rotulo: 'Muay thai e MMA' },
  { id: 'funcional', rotulo: 'Funcional' },
]

const SEG_QUA_SEX = [1, 3, 5]
const TER_QUI = [2, 4]
const SAB = [6]

export const AULAS = [
  { grupo: 'jiu-jitsu', turma: 'Jiu-jítsu', publico: 'Adulto', dias: SEG_QUA_SEX, hora: '12:00' },
  { grupo: 'jiu-jitsu', turma: 'Jiu-jítsu', publico: 'Adulto', dias: TER_QUI, hora: '21:00' },
  { grupo: 'jiu-jitsu', turma: 'Jiu-jítsu', publico: 'Adulto', dias: SAB, hora: '07:00' },

  { grupo: 'kids', turma: 'Jiu-jítsu kids', publico: 'Crianças', dias: TER_QUI, hora: '09:00' },
  { grupo: 'kids', turma: 'Jiu-jítsu kids', publico: 'Crianças', dias: TER_QUI, hora: '17:00' },

  { grupo: 'thai-mma', turma: 'Muay thai e MMA', publico: 'Adulto', dias: TER_QUI, hora: '07:00' },
  { grupo: 'thai-mma', turma: 'Muay thai e MMA', publico: 'Adulto', dias: TER_QUI, hora: '19:00' },

  { grupo: 'funcional', turma: 'Funcional fight', publico: 'Treino físico', dias: SEG_QUA_SEX, hora: '07:00' },
  { grupo: 'funcional', turma: 'Funcional fight', publico: 'Treino físico', dias: SEG_QUA_SEX, hora: '17:00' },
  { grupo: 'funcional', turma: 'Funcional fight', publico: 'Treino físico', dias: SEG_QUA_SEX, hora: '20:00' },
]
