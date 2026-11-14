const MESES = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];

export const formatarData = (diasAtras) => {
  const data = new Date();
  data.setDate(data.getDate() - diasAtras);
  return `${data.getDate()} de ${MESES[data.getMonth()]} de ${data.getFullYear()}`;
};

// Dicas e destaques ligados a jogos da biblioteca (jogoId vem de data/jogos.js).
const novidades = [
  { id: 'n1', jogoId: '18', titulo: 'Hellblade II: jogue com fones de ouvido para sentir o som em 3D', diasAtras: 0 },
  { id: 'n2', jogoId: '12', titulo: 'Resident Evil Requiem está na sua lista “Quero jogar”', diasAtras: 1 },
  { id: 'n3', jogoId: '13', titulo: 'Lost Records: Bloom & Rage conta a história em duas partes', diasAtras: 3 },
];

export default novidades;
