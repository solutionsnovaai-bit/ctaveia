/**
 * As modalidades do CT. `grupo` liga cada uma aos horários de horarios.js;
 * `card` é o acabamento do card de marca que acompanha a modalidade.
 */
export const modalidades = [
  {
    id: 'jiu-jitsu',
    nome: 'Jiu-jítsu',
    frase: 'A base da casa. Alavanca e técnica para controlar quem é maior e mais forte que você.',
    pontos: ['Turmas de adulto e de criança', 'Aula de manhã, no almoço e à noite', 'Do primeiro treino à faixa preta'],
    grupos: ['jiu-jitsu', 'kids'],
    card: 'ouro',
    foto: { src: 'raca', alt: 'Atleta do CT Aveia de quimono azul comemorando depois da luta', foco: '50% 30%' },
  },
  {
    id: 'muay-thai',
    nome: 'Muay thai',
    frase: 'Força, disciplina e respeito. Soco, chute, joelho e cotovelo com a Black Monkey Boxe Team.',
    pontos: ['Melhora o condicionamento físico', 'Aumenta a autoconfiança', 'Tem turma kids'],
    grupos: ['thai-mma'],
    turnos: true,
    card: 'listras',
    foto: { src: 'muay-thai', alt: 'Turma de muay thai e boxe do CT Aveia em posição de guarda', foco: '86% 45%' },
  },
  {
    id: 'boxe',
    nome: 'Boxe',
    frase: 'Guarda alta, pé leve e cabeça fria. Aulas para todas as idades com a Black Monkey Boxe Team.',
    pontos: ['Aula experimental para conhecer', 'Concentração e controle das emoções', 'Crianças também treinam'],
    grupos: [],
    turnos: true,
    card: 'amarelo',
  },
  {
    id: 'mma',
    nome: 'MMA',
    frase: 'A luta em pé e a luta de chão no mesmo treino. Para quem quer ser completo.',
    pontos: ['Trocação, queda e solo', 'Treina junto com o muay thai', 'Terça e quinta, cedo ou à noite'],
    grupos: ['thai-mma'],
    card: 'contorno',
    foto: { src: 'vitoria-nogi', alt: 'Atleta do CT Aveia com o braço erguido pelo árbitro depois de vencer', foco: '42% 35%' },
  },
  {
    id: 'preparacao-fisica',
    nome: 'Preparação física',
    frase: 'Funcional fight para aguentar o treino inteiro. E personal com treino 100% individualizado.',
    pontos: ['Fôlego e força para lutar', 'Segunda, quarta e sexta, três horários', 'Personal com horário combinado'],
    grupos: ['funcional'],
    card: 'padrao',
  },
]

/** Nomes usados no formulário da primeira aula. */
export const opcoesDeModalidade = [...modalidades.map((m) => m.nome), 'Projeto Kids', 'Personal']
