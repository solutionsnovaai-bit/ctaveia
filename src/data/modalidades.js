/**
 * As modalidades do CT. `grupo` liga cada uma aos horários de horarios.js;
 * `fotos` são as fotos que passam no carrossel do cartão.
 */
export const modalidades = [
  {
    id: 'jiu-jitsu',
    nome: 'Jiu-jítsu',
    frase: 'A base da casa. Alavanca e técnica para controlar quem é maior e mais forte que você.',
    pontos: ['Turmas de adulto e de criança', 'Aula de manhã, no almoço e à noite', 'Do primeiro treino à faixa preta'],
    grupos: ['jiu-jitsu', 'kids'],
    fotos: [
      { src: 'raca', alt: 'Atleta do CT Aveia de quimono azul comemorando depois da luta', foco: '50% 30%' },
      { src: 'faixa-na-cintura', alt: 'Professor amarrando a faixa nova de uma aluna na graduação', foco: '55% 30%' },
      { src: 'turma-mural', alt: 'Turma de jiu-jítsu do CT Aveia sentada no tatame em frente ao mural', foco: '50% 55%' },
    ],
  },
  {
    id: 'muay-thai',
    nome: 'Muay thai',
    frase: 'Força, disciplina e respeito. Soco, chute, joelho e cotovelo com a Black Monkey Boxe Team.',
    pontos: ['Melhora o condicionamento físico', 'Aumenta a autoconfiança', 'Tem turma kids'],
    grupos: ['thai-mma'],
    turnos: true,
    fotos: [
      { src: 'muay-thai', alt: 'Turma de muay thai e boxe do CT Aveia em posição de guarda', foco: '86% 45%' },
      { src: 'muay-cinturao', alt: 'Lutador de muay thai da Black Monkey com o cinturão de campeão', foco: '50% 30%' },
      { src: 'muay-chute', alt: 'Lutadores de muay thai treinando chute', foco: '50% 40%' },
    ],
  },
  {
    id: 'boxe',
    nome: 'Boxe',
    frase: 'Guarda alta, pé leve e cabeça fria. Aulas para todas as idades com a Black Monkey Boxe Team.',
    pontos: ['Aula experimental para conhecer', 'Concentração e controle das emoções', 'Crianças também treinam'],
    grupos: [],
    turnos: true,
    fotos: [
      { src: 'boxe-luvas', alt: 'Lutador de boxe com as luvas em guarda alta', foco: '50% 35%' },
      { src: 'muay-thai', alt: 'Aluno do CT Aveia em guarda ao lado do saco de pancada', foco: '10% 45%' },
      { src: 'boxe-kids', alt: 'Menino de luvas de boxe treinando', foco: '50% 35%' },
    ],
  },
  {
    id: 'mma',
    nome: 'MMA',
    frase: 'A luta em pé e a luta de chão no mesmo treino. Para quem quer ser completo.',
    pontos: ['Trocação, queda e solo', 'Treina junto com o muay thai', 'Terça e quinta, cedo ou à noite'],
    grupos: ['thai-mma'],
    fotos: [
      { src: 'vitoria-nogi', alt: 'Atleta do CT Aveia com o braço erguido pelo árbitro depois de vencer', foco: '42% 35%' },
      { src: 'atleta-ct', alt: 'Atleta do CT Aveia de punho cerrado em frente ao símbolo do CT', foco: '50% 45%' },
    ],
  },
  {
    id: 'preparacao-fisica',
    nome: 'Preparação física',
    frase: 'Funcional fight para aguentar o treino inteiro. E personal com treino 100% individualizado.',
    pontos: ['Fôlego e força para lutar', 'Segunda, quarta e sexta, três horários', 'Personal com horário combinado'],
    grupos: ['funcional'],
    fotos: [
      { src: 'andre-ct', alt: 'Professor do CT Aveia de braços cruzados em frente ao símbolo do CT', foco: '18% 58%' },
      { src: 'equipe-uniformizada', alt: 'Equipe do CT Aveia uniformizada, de braços cruzados em frente ao símbolo do CT', foco: '14% 80%' },
    ],
  },
]

/** Nomes usados no formulário da primeira aula. */
export const opcoesDeModalidade = [...modalidades.map((m) => m.nome), 'Projeto Kids', 'Personal']
