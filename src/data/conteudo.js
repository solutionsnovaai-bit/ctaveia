/** Textos das seções. Editar aqui muda o site sem tocar em componente. */

export const hero = {
  linhas: ['Não tenha pressa.', 'Mas não perca tempo.'],
  apoio: 'Jiu-jítsu, muay thai, boxe, MMA e preparação física no Itaim Paulista.',
  /** Segunda frase: aparece só em telas largas, para o hero do celular caber na primeira tela. */
  apoioExtra: 'Turmas para adultos e crianças, do primeiro treino à faixa preta.',
}

export const manifesto = {
  titulo: 'Mais que lutas, formamos pessoas.',
  corrido:
    'Disciplina para o corpo. Foco para a mente. Amizade para a vida. Superação para sempre.',
  apoio:
    'O CT Aveia é uma equipe em constante evolução. Quem chega encontra tatame, professor por perto e uma turma que puxa você para cima.',
}

/** Os quatro valores do escudo, um para cada grau da faixa. */
export const valores = [
  { nome: 'Disciplina', texto: 'Treino marcado é treino feito. O resultado vem de aparecer toda semana.' },
  { nome: 'Respeito', texto: 'Ao professor, ao parceiro de treino e ao adversário. Dentro e fora do tatame.' },
  { nome: 'Evolução', texto: 'A comparação é com quem você era no mês passado. Um grau de cada vez.' },
  { nome: 'Família', texto: 'Aqui treinam o pai, o filho e o amigo que veio junto. Juntos somos mais fortes.' },
]

/** Faixas do jiu-jítsu infantil, na ordem, com o que a criança leva do treino. */
export const kids = {
  titulo: 'Projeto Kids',
  chamada: 'No Projeto Kids, a família paga só a ajuda de custo.',
  apoio:
    'Criança no tatame gasta energia, aprende a ouvir e volta para casa mais confiante. O esporte ensina valores e afasta das más influências.',
  faixas: [
    { cor: '#f1eee8', nome: 'Branca', ganho: 'Disciplina' },
    { cor: '#8f9296', nome: 'Cinza', ganho: 'Respeito' },
    { cor: '#fdd003', nome: 'Amarela', ganho: 'Coordenação motora' },
    { cor: '#f08a1c', nome: 'Laranja', ganho: 'Mais confiança' },
    { cor: '#2f9e5a', nome: 'Verde', ganho: 'Um futuro melhor' },
  ],
}

/** Cards do escudo: um acabamento do logo e uma frase que já é do CT. */
export const escudos = [
  { foto: 'equipe-ct-novo', foco: '50% 55%', frase: 'Juntos somos mais fortes.' },
  { foto: 'graduacao-kids', foco: '50% 45%', frase: 'Mais que lutas, formamos pessoas.' },
  { foto: 'graduacao-cerimonia', foco: '50% 40%', frase: 'Não tenha pressa, mas não perca tempo.' },
  { foto: 'graduacao-azul', foco: '50% 45%', frase: 'Uma equipe em constante evolução.' },
  { foto: 'professor-fala', foco: '45% 40%', frase: 'Mais que luta, é um estilo de vida.' },
  { foto: 'graduacao-plateia', foco: '50% 45%', frase: 'Disciplina, respeito, evolução, família.' },
  { foto: 'cerimonia-tatame', foco: '50% 45%', frase: 'Mais saúde, mais foco, mais oportunidades.' },
  { foto: 'roda-graduacao', foco: '50% 45%', frase: 'Amizade para a vida, superação para sempre.' },
]

/** É uma sequência de verdade, por isso vai numerada no site. */
export const passos = [
  { titulo: 'Chama o CT', texto: 'Diz qual modalidade quer conhecer e o melhor período para você.' },
  { titulo: 'Marca a aula experimental', texto: 'A equipe confirma o dia, o horário e a turma certa para o seu nível.' },
  { titulo: 'Vem treinar', texto: 'Roupa de treino, garrafa de água e uns minutos de antecedência. O resto a gente mostra.' },
]

export const periodos = ['Manhã', 'Tarde', 'Noite']

export const faq = [
  {
    p: 'Nunca treinei. Posso começar?',
    r: 'Pode. Ninguém começa sabendo, e as aulas são para todas as idades. A aula experimental existe para você conhecer o espaço, os professores e o ritmo antes de decidir.',
  },
  {
    p: 'Tem aula para criança?',
    r: 'Tem. O jiu-jítsu kids treina terça e quinta, às 9h e às 17h, e o muay thai e o boxe também recebem crianças. No Projeto Kids, a família paga só a ajuda de custo.',
  },
  {
    p: 'Quanto custa?',
    r: 'Depende de quantas modalidades você quer fazer. Chama o CT, diz o que quer treinar e a equipe passa o valor na hora.',
  },
  {
    p: 'Posso fazer mais de uma modalidade?',
    r: 'Pode. Dá para treinar uma modalidade só ou combinar várias. Olha a tabela de horários, monta a sua semana e confirma com a equipe.',
  },
  {
    p: 'O que levo na primeira aula?',
    r: 'Roupa de treino confortável e água. Sobre kimono, luva e outros equipamentos, a equipe orienta quando você agendar.',
  },
]
