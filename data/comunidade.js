// Dados de exemplo da comunidade (ficam só na memória do app).
export const postsIniciais = [
  {
    id: 'p1',
    autor: { nome: 'Marina Luz', usuario: 'marinaluz' },
    texto: 'Terminei Resident Evil 4 Remake pela terceira vez. O primeiro encontro com o vilarejo continua sendo o melhor momento da franquia.',
    jogoId: '9',
    tempo: '2 h',
    curtidas: 18,
    curtiu: false,
    comentarios: [{ id: 'c1', autor: 'Caio Ventura', texto: 'O combate com a faca no modo difícil é outro nível!' }],
  },
  {
    id: 'p2',
    autor: { nome: 'Caio Ventura', usuario: 'caioventura' },
    texto: 'Alguém para uma partida de Valorant hoje à noite? Estou procurando duo para ranqueada.',
    jogoId: '19',
    tempo: '5 h',
    curtidas: 7,
    curtiu: false,
    comentarios: [],
  },
  {
    id: 'p3',
    autor: { nome: 'Bia Nakamura', usuario: 'bianakamura' },
    texto: 'Hellblade II com fones de ouvido é uma experiência que não dá para explicar. Recomendo jogar no escuro e sem distrações.',
    jogoId: '18',
    tempo: 'ontem',
    curtidas: 24,
    curtiu: false,
    comentarios: [],
  },
];

export const gruposIniciais = [
  { id: 'g1', nome: 'Survival Horror BR', descricao: 'Resident Evil, Silent Hill e tudo que dá medo.', icone: 'skull', membros: 1240, entrou: false },
  { id: 'g2', nome: 'Narrativas e Escolhas', descricao: 'Life Is Strange, Detroit, Lost Records e afins.', icone: 'book', membros: 860, entrou: false },
  { id: 'g3', nome: 'Mundo dos Blocos', descricao: 'Construções e servidores de Minecraft.', icone: 'cube', membros: 2150, entrou: false },
  { id: 'g4', nome: 'Táticos', descricao: 'Valorant e outros FPS: treinos, mira e estratégia.', icone: 'locate', membros: 970, entrou: false },
  { id: 'g5', nome: 'Zerei!', descricao: 'Compartilhe os jogos que você terminou.', icone: 'trophy', membros: 1530, entrou: false },
];

export const jogadoresIniciais = [
  { id: 'j1', nome: 'Marina Luz', usuario: 'marinaluz', joga: 'Resident Evil 4 (Remake)', seguindo: false },
  { id: 'j2', nome: 'Caio Ventura', usuario: 'caioventura', joga: 'Valorant', seguindo: false },
  { id: 'j3', nome: 'Bia Nakamura', usuario: 'bianakamura', joga: 'Senua\'s Saga: Hellblade II', seguindo: false },
  { id: 'j4', nome: 'Rafa Dutra', usuario: 'rafadutra', joga: 'Minecraft', seguindo: false },
  { id: 'j5', nome: 'Lia Matos', usuario: 'liamatos', joga: 'Lost Records: Bloom & Rage', seguindo: false },
];
