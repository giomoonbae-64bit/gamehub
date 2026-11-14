import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../constants/tema';

const iniciaisDe = (nome) =>
  (nome ?? '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((palavra) => palavra[0].toUpperCase())
    .join('');

export default function Avatar({ foto, nome, tamanho = 44, destaque = true, estilo }) {
  const iniciais = iniciaisDe(nome);

  return (
    <View
      style={[
        styles.base,
        { width: tamanho, height: tamanho, borderRadius: tamanho / 2 },
        destaque && styles.destaque,
        estilo,
      ]}
      accessibilityLabel={nome ? `Foto de ${nome}` : 'Foto de perfil'}
    >
      {foto ? (
        <Image source={{ uri: foto }} style={styles.imagem} />
      ) : iniciais ? (
        <Text style={[styles.iniciais, { fontSize: tamanho * 0.38 }]}>{iniciais}</Text>
      ) : (
        <Ionicons name="person" size={tamanho * 0.5} color={cores.roxoClaro} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: cores.superficieClara,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  destaque: {
    borderWidth: 2,
    borderColor: cores.roxo,
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  iniciais: {
    color: cores.roxoClaro,
    fontWeight: '800',
  },
});
