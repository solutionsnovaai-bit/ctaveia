/**
 * Dados do CT. Tudo que é contato, endereço e rede social sai daqui,
 * então trocar um número ou um link é mexer só neste arquivo.
 */
export const site = {
  nome: 'CT Aveia Jiu-Jítsu',
  nomeCurto: 'CT Aveia',
  lema: 'Juntos somos mais fortes',

  /**
   * WhatsApp do CT: só números, com 55 + DDD. Exemplo: '5511912345678'.
   * Enquanto estiver vazio, os botões de contato abrem o Direct do Instagram.
   */
  whatsapp: '',

  instagram: 'aveia.blackbelt',

  endereco: {
    rua: 'Rua Geraldo Balde Leitão, 11A',
    bairro: 'Itaim Paulista',
    cidade: 'São Paulo',
    uf: 'SP',
  },

  /** Turnos de funcionamento divulgados pelo CT. */
  turnos: [
    { nome: 'Manhã', das: '07:00', ate: '12:00' },
    { nome: 'Tarde', das: '14:00', ate: '18:00' },
    { nome: 'Noite', das: '19:00', ate: '21:00' },
  ],

  /** Fuso usado na tabela de horários e na contagem da próxima aula. */
  fuso: 'America/Sao_Paulo',
}

export const enderecoCompleto =
  `${site.endereco.rua}, ${site.endereco.bairro}, ${site.endereco.cidade}/${site.endereco.uf}`

const destino = encodeURIComponent(
  `${site.endereco.rua} - ${site.endereco.bairro}, ${site.endereco.cidade} - ${site.endereco.uf}`,
)

export const mapas = {
  incorporado: `https://www.google.com/maps?q=${destino}&z=16&output=embed`,
  google: `https://www.google.com/maps/search/?api=1&query=${destino}`,
  waze: `https://waze.com/ul?q=${destino}&navigate=yes`,
}

export const menu = [
  { id: 'modalidades', rotulo: 'Modalidades' },
  { id: 'horarios', rotulo: 'Horários' },
  { id: 'kids', rotulo: 'Projeto Kids' },
  { id: 'escudo', rotulo: 'O escudo' },
  { id: 'local', rotulo: 'Como chegar' },
]
