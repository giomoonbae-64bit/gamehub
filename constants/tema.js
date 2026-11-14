export const cores = {
  fundo: '#0A091C',
  superficie: '#141231',
  superficieClara: '#1D1A45',
  borda: '#2B2757',
  roxo: '#7740F5',
  roxoEscuro: '#5B2BE0',
  roxoClaro: '#A78BFA',
  texto: '#FFFFFF',
  textoSecundario: '#A19EC4',
  erro: '#F87171',
  estrela: '#FBBF24',
  favorito: '#F472B6',
};

export const GRADIENTES = {
  destaque: ['#4A2BC0', '#1B1250'],
  comunidade: ['#33208A', '#17113F'],
};

export const espacos = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const raios = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 26,
  pilula: 999,
};

export const STATUS_LISTA = ['Quero jogar', 'Jogando', 'Zerado'];

export const OPCOES_STATUS = STATUS_LISTA.map((status) => ({
  valor: status,
  rotulo: status,
}));

export const VISUAL_STATUS = {
  'Quero jogar': { cor: '#FBBF24', icone: 'bookmark' },
  Jogando: { cor: '#38BDF8', icone: 'play-circle' },
  Zerado: { cor: '#34D399', icone: 'checkmark-circle' },
};

export const CORES_CAPA = [
  '#6D28D9',
  '#1D4ED8',
  '#0F766E',
  '#B45309',
  '#BE185D',
  '#4338CA',
];

export const PLATAFORMAS = ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile'];

export const FILTROS_PLATAFORMA = ['Todos', 'PC', 'PlayStation', 'Xbox'];

// "Console" nos dados significa que o jogo está em PlayStation e Xbox.
export const jogoEstaNaPlataforma = (jogo, plataforma) => {
  if (plataforma === 'Todos') {
    return true;
  }
  const texto = jogo.plataforma.toLowerCase();
  const alvo = plataforma.toLowerCase();
  const ehConsole = alvo === 'playstation' || alvo === 'xbox';

  return texto.includes(alvo) || (ehConsole && texto.includes('console'));
};

export const GRADIENTES_EXTRA = {
  hero: ['rgba(8,6,28,0.97)', 'rgba(38,18,105,0.82)', 'rgba(8,6,28,0.1)'],
  capaPerfil: ['#5B2BE0', '#2A1478', '#0A091C'],
};
