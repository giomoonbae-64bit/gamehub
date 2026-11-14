const BASE_STEAM = 'https://cdn.akamai.steamstatic.com/steam/apps';
const BASE_STEAM_NOVA = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps';

// Cada jogo tenta várias imagens, na ordem (jogos novos usam o endereço "novo" da Steam).
// Se nenhuma carregar, o app mostra uma capa desenhada (arte) ou o bloco com as iniciais.
const steam = (idDoApp) => ({
  capa: [
    `${BASE_STEAM_NOVA}/${idDoApp}/library_600x900.jpg`,
    `${BASE_STEAM}/${idDoApp}/library_600x900.jpg`,
    `${BASE_STEAM_NOVA}/${idDoApp}/header.jpg`,
    `${BASE_STEAM}/${idDoApp}/header.jpg`,
  ],
  hero: [
    `${BASE_STEAM_NOVA}/${idDoApp}/library_hero.jpg`,
    `${BASE_STEAM}/${idDoApp}/library_hero.jpg`,
  ],
});

const jogosIniciais = [
  {
    id: '1',
    nome: 'Uncharted 4: A Thief\'s End',
    desenvolvedora: 'Naughty Dog',
    genero: 'Ação e Aventura',
    plataforma: 'PlayStation e PC',
    status: 'Zerado',
    nota: 4.7,
    descricao:
      'Nathan Drake deixou a vida de caçador de tesouros, mas volta à ação quando seu irmão Sam reaparece. Os dois partem atrás do tesouro perdido de um famoso pirata, com muita escalada, tiroteio e quebra-cabeças.',
    ...steam(1659420),
    corCapa: '#B45309',
    favorito: false,
  },
  {
    id: '2',
    nome: 'The Last of Us Part I',
    desenvolvedora: 'Naughty Dog',
    genero: 'Ação e Sobrevivência',
    plataforma: 'PlayStation e PC',
    status: 'Zerado',
    nota: 4.8,
    descricao:
      'Em um mundo devastado por uma infecção fúngica, Joel precisa levar a jovem Ellie através dos Estados Unidos. Uma história emocionante sobre perda, proteção e laços.',
    ...steam(1888930),
    corCapa: '#365314',
    favorito: true,
  },
  {
    id: '3',
    nome: 'The Last of Us Part II',
    desenvolvedora: 'Naughty Dog',
    genero: 'Ação e Sobrevivência',
    plataforma: 'PlayStation e PC',
    status: 'Zerado',
    nota: 4.5,
    descricao:
      'Anos depois dos eventos do primeiro jogo, Ellie embarca em uma jornada intensa e perigosa, em que escolhas e consequências pesam em cada passo.',
    ...steam(2531310),
    corCapa: '#7F1D1D',
    favorito: false,
  },
  {
    id: '4',
    nome: 'Silent Hill 2',
    desenvolvedora: 'Bloober Team',
    genero: 'Survival Horror',
    plataforma: 'PlayStation e PC',
    status: 'Jogando',
    nota: 4.7,
    descricao:
      'James Sunderland recebe uma carta de sua esposa falecida e segue para a cidade de Silent Hill, coberta de névoa. Um terror psicológico atmosférico, com exploração e puzzles.',
    ...steam(2124490),
    corCapa: '#374151',
    favorito: false,
  },
  {
    id: '5',
    nome: 'Detroit: Become Human',
    desenvolvedora: 'Quantic Dream',
    genero: 'Aventura Interativa',
    plataforma: 'PlayStation e PC',
    status: 'Zerado',
    nota: 4.3,
    descricao:
      'Em um futuro onde androides fazem parte do dia a dia, acompanhe Kara, Connor e Markus. Suas escolhas mudam a história e levam a diferentes finais.',
    ...steam(1222140),
    corCapa: '#1D4ED8',
    favorito: false,
  },
  {
    id: '6',
    nome: 'Cyberpunk 2077',
    desenvolvedora: 'CD Projekt Red',
    genero: 'RPG de Ação',
    plataforma: 'PC e Console',
    status: 'Quero jogar',
    nota: 4.4,
    descricao:
      'Como V, um mercenário em Night City, você corre atrás de um implante que pode ser a chave para a imortalidade. Mundo aberto futurista, cheio de missões, escolhas e personalização.',
    ...steam(1091500),
    corCapa: '#A16207',
    favorito: false,
  },
  {
    id: '7',
    nome: 'Resident Evil 2 (Remake)',
    desenvolvedora: 'Capcom',
    genero: 'Survival Horror',
    plataforma: 'PC e Console',
    status: 'Zerado',
    nota: 4.8,
    descricao:
      'Leon e Claire chegam a Raccoon City e se veem presos entre zumbis e a delegacia da cidade, enquanto um perseguidor implacável ronda os corredores.',
    ...steam(883710),
    corCapa: '#7F1D1D',
    favorito: true,
  },
  {
    id: '8',
    nome: 'Resident Evil 3 (Remake)',
    desenvolvedora: 'Capcom',
    genero: 'Survival Horror',
    plataforma: 'PC e Console',
    status: 'Zerado',
    nota: 4.0,
    descricao:
      'Jill Valentine tenta escapar de Raccoon City, mas é perseguida sem parar pelo Nemesis. Ação intensa e ritmo acelerado.',
    ...steam(952060),
    corCapa: '#9A3412',
    favorito: false,
  },
  {
    id: '9',
    nome: 'Resident Evil 4 (Remake)',
    desenvolvedora: 'Capcom',
    genero: 'Survival Horror',
    plataforma: 'PC e Console',
    status: 'Zerado',
    nota: 4.9,
    descricao:
      'Leon é enviado a um vilarejo isolado na Europa para resgatar a filha do presidente dos EUA. Combate tenso, ótimos chefes e um ritmo difícil de largar.',
    ...steam(2050650),
    corCapa: '#991B1B',
    favorito: true,
  },
  {
    id: '10',
    nome: 'Resident Evil 7: Biohazard',
    desenvolvedora: 'Capcom',
    genero: 'Survival Horror',
    plataforma: 'PC e Console',
    status: 'Zerado',
    nota: 4.5,
    descricao:
      'Em primeira pessoa, Ethan procura sua esposa desaparecida em uma fazenda isolada na Louisiana, dominada pela perturbadora família Baker.',
    ...steam(418370),
    corCapa: '#3F6212',
    favorito: false,
  },
  {
    id: '11',
    nome: 'Resident Evil Village',
    desenvolvedora: 'Capcom',
    genero: 'Survival Horror',
    plataforma: 'PC e Console',
    status: 'Zerado',
    nota: 4.4,
    descricao:
      'Ethan Winters chega a um vilarejo europeu sombrio, dominado por figuras assustadoras, em busca de sua filha. Terror em primeira pessoa com muita ação.',
    ...steam(1196590),
    corCapa: '#581C87',
    favorito: false,
  },
  {
    id: '12',
    nome: 'Resident Evil Requiem',
    desenvolvedora: 'Capcom',
    genero: 'Survival Horror',
    plataforma: 'PC e Console',
    status: 'Quero jogar',
    nota: null,
    descricao:
      'Novo capítulo principal da franquia de terror da Capcom, lançado em 2026. Você ainda não avaliou este jogo.',
    ...steam(3764200),
    corCapa: '#7F1D1D',
    favorito: false,
  },
  {
    id: '13',
    nome: 'Lost Records: Bloom & Rage',
    desenvolvedora: 'Don\'t Nod',
    genero: 'Aventura Narrativa',
    plataforma: 'PC e Console',
    status: 'Quero jogar',
    nota: 4.2,
    descricao:
      'Um grupo de amigas revive o verão de 1995 e um segredo que as une, anos depois, através de fitas de vídeo. Uma história de amizade, memória e mistério.',
    ...steam(1902960),
    corCapa: '#BE185D',
    favorito: false,
  },
  {
    id: '14',
    nome: 'The Painscreek Killings',
    desenvolvedora: 'EQ Studios',
    genero: 'Investigação',
    plataforma: 'PC',
    status: 'Quero jogar',
    nota: 4.0,
    descricao:
      'Explore uma cidade abandonada, procure pistas e descubra quem cometeu o assassinato. Sem dicas na tela: você precisa investigar e montar o caso por conta própria.',
    ...steam(624270),
    corCapa: '#44403C',
    favorito: false,
  },
  {
    id: '15',
    nome: 'Minecraft',
    desenvolvedora: 'Mojang Studios',
    genero: 'Sandbox',
    plataforma: 'PC, Console e Mobile',
    status: 'Jogando',
    nota: 4.7,
    descricao:
      'Explore mundos gerados aleatoriamente, colete recursos, construa estruturas incríveis e sobreviva às criaturas da noite, sozinho ou com amigos.',
    capa: null,
    arte: 'minecraft',
    corCapa: '#15803D',
    favorito: false,
  },
  {
    id: '16',
    nome: 'Life Is Strange',
    desenvolvedora: 'Don\'t Nod',
    genero: 'Aventura Narrativa',
    plataforma: 'PC e Console',
    status: 'Zerado',
    nota: 4.5,
    descricao:
      'Max Caulfield descobre que pode voltar no tempo e usa o poder para tentar mudar o destino de sua amiga Chloe e da cidade de Arcadia Bay.',
    ...steam(319630),
    corCapa: '#0F766E',
    favorito: false,
  },
  {
    id: '17',
    nome: 'Hellblade: Senua\'s Sacrifice',
    desenvolvedora: 'Ninja Theory',
    genero: 'Ação e Aventura',
    plataforma: 'PC e Console',
    status: 'Zerado',
    nota: 4.4,
    descricao:
      'Senua, uma guerreira que convive com a psicose, enfrenta uma jornada sombria inspirada na mitologia nórdica. O som e a imersão são o grande destaque.',
    ...steam(414340),
    corCapa: '#1E3A8A',
    favorito: false,
  },
  {
    id: '18',
    nome: 'Senua\'s Saga: Hellblade II',
    desenvolvedora: 'Ninja Theory',
    genero: 'Ação e Aventura',
    plataforma: 'Xbox, PlayStation e PC',
    status: 'Zerado',
    nota: 4.3,
    descricao:
      'Senua segue sua jornada em paisagens dramáticas da Islândia viking. Visual impressionante e uma narrativa intensa e imersiva.',
    ...steam(2461850),
    corCapa: '#1E40AF',
    favorito: false,
  },
  {
    id: '19',
    nome: 'Valorant',
    desenvolvedora: 'Riot Games',
    genero: 'FPS Tático',
    plataforma: 'PC, PlayStation e Xbox',
    status: 'Jogando',
    nota: 4.2,
    descricao:
      'Shooter tático 5 contra 5 com agentes que possuem habilidades únicas. Exige mira precisa, estratégia e trabalho em equipe para vencer cada rodada.',
    capa: null,
    arte: 'valorant',
    corCapa: '#B91C1C',
    favorito: false,
  },
];

// Última opção automática: imagem principal do artigo do jogo na Wikipédia.
const ARTIGOS_WIKI = { '12': 'Resident Evil Requiem', '15': 'Minecraft', '19': 'Valorant' };

export default jogosIniciais.map((jogo) => {
  const capa = [].concat(jogo.capa ?? []);
  if (ARTIGOS_WIKI[jogo.id]) {
    capa.push(`wiki:${ARTIGOS_WIKI[jogo.id]}`);
  }
  return capa.length > 0 ? { ...jogo, capa } : jogo;
});
