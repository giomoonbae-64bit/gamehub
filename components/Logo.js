import { Image } from 'react-native';

const IMAGENS = {
  completa: { fonte: require('../assets/logo.png'), proporcao: 916 / 718 },
  icone: { fonte: require('../assets/logo-icone.png'), proporcao: 916 / 544 },
};

export default function Logo({ variante = 'completa', largura = 160, estilo }) {
  const { fonte, proporcao } = IMAGENS[variante];

  return (
    <Image
      source={fonte}
      style={[{ width: largura, aspectRatio: proporcao }, estilo]}
      resizeMode="contain"
      accessibilityLabel="Logo do GameHub"
    />
  );
}
