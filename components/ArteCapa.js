import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Capas desenhadas em código para jogos que não têm imagem pública estável (Minecraft e Valorant).

const TERRA = ['#8B5A2B', '#7A4E25', '#9A6633', '#6F4620'];

function Minecraft({ largura }) {
  const bloco = Math.max(largura / 8, 8);
  const linhas = [0, 1, 2];

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.ceu}>
        <View style={[styles.nuvem, { left: '10%', top: '12%', width: bloco * 2.2, height: bloco * 0.7 }]} />
        <View style={[styles.nuvem, { right: '8%', top: '26%', width: bloco * 1.6, height: bloco * 0.6 }]} />
        <Text
          style={[styles.titulo, { fontSize: Math.max(largura * 0.15, 11), letterSpacing: largura * 0.006 }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          MINECRAFT
        </Text>
      </View>
      <View style={{ height: bloco * 0.5, backgroundColor: '#5DA130' }} />
      {linhas.map((linha) => (
        <View key={linha} style={styles.linhaTerra}>
          {Array.from({ length: 8 }).map((_, coluna) => (
            <View
              key={coluna}
              style={{ flex: 1, backgroundColor: TERRA[(linha * 3 + coluna * 5) % TERRA.length] }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function Valorant({ largura }) {
  const lado = largura * 0.62;

  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient colors={['#FF4655', '#8C1B2B', '#1A0A12']} style={StyleSheet.absoluteFill} />
      <View style={[styles.valorFaixa, { width: lado, height: largura * 0.2, left: largura * 0.06, top: '18%', transform: [{ rotate: '62deg' }] }]} />
      <View style={[styles.valorFaixa, { width: lado, height: largura * 0.2, right: largura * 0.06, top: '18%', transform: [{ rotate: '-62deg' }] }]} />
      <Text
        style={[styles.valorTitulo, { fontSize: Math.max(largura * 0.15, 11) }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        VALORANT
      </Text>
    </View>
  );
}

export default function ArteCapa({ tipo }) {
  const [largura, setLargura] = useState(120);

  return (
    <View style={StyleSheet.absoluteFill} onLayout={(e) => setLargura(e.nativeEvent.layout.width)}>
      {tipo === 'minecraft' ? <Minecraft largura={largura} /> : <Valorant largura={largura} />}
    </View>
  );
}

const styles = StyleSheet.create({
  ceu: { flex: 1, backgroundColor: '#7EC0EE', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  nuvem: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.85)' },
  titulo: {
    color: '#E6E6E6',
    fontWeight: '900',
    textShadowColor: '#3A3A3A',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  linhaTerra: { flex: 1, flexDirection: 'row' },
  valorFaixa: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.14)' },
  valorTitulo: {
    position: 'absolute',
    bottom: '12%',
    alignSelf: 'center',
    color: '#FFFFFF',
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 1,
  },
});
