import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Botao from './Botao';
import { GRADIENTES, GRADIENTES_EXTRA, cores, espacos, raios } from '../constants/tema';

const INTERVALO = 6000;

export default function BannerHero({ jogos = [], aoPressionar, aoAbrirJogo }) {
  const [indice, setIndice] = useState(0);
  const [falhas, setFalhas] = useState({}); // quantas imagens já falharam por jogo
  const total = jogos.length;

  useEffect(() => {
    if (total < 2) {
      return undefined;
    }
    const temporizador = setInterval(() => setIndice((atual) => (atual + 1) % total), INTERVALO);
    return () => clearInterval(temporizador);
  }, [total, indice]);

  const jogo = jogos[indice];
  const opcoesArte = jogo ? [].concat(jogo.hero) : [];
  const mostrarArte = jogo && (falhas[jogo.id] ?? 0) < opcoesArte.length;

  return (
    <View style={styles.banner}>
      <View style={styles.camadaFundo} pointerEvents="none">
        <LinearGradient colors={GRADIENTES.destaque} style={StyleSheet.absoluteFill} />
        {mostrarArte ? (
          <Image
            key={`${jogo.id}-${falhas[jogo.id] ?? 0}`}
            source={{ uri: opcoesArte[falhas[jogo.id] ?? 0] }}
            style={styles.arte}
            resizeMode="cover"
            onError={() => setFalhas((atual) => ({ ...atual, [jogo.id]: (atual[jogo.id] ?? 0) + 1 }))}
          />
        ) : null}
        <LinearGradient
          colors={GRADIENTES_EXTRA.hero}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 1, y: 0.7 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.marca} accessibilityRole="header">
          Game<Text style={styles.marcaDestaque}>Hub</Text>
        </Text>
        <Text style={styles.titulo}>Descubra. Jogue. Conecte-se.</Text>
        <Text style={styles.descricao}>
          Seu hub completo de jogos, com recomendações, novidades e uma comunidade incrível!
        </Text>
        <Botao titulo="Explorar Jogos" iconeDireita="arrow-forward" pilula aoPressionar={aoPressionar} estilo={styles.botao} />
      </View>

      {jogo ? (
        <View style={styles.rodape}>
          <View style={styles.pontos}>
            {jogos.map((item, posicao) => (
              <Pressable
                key={item.id}
                onPress={() => setIndice(posicao)}
                hitSlop={8}
                accessibilityLabel={`Mostrar ${item.nome}`}
                style={[styles.ponto, posicao === indice && styles.pontoAtivo]}
              />
            ))}
          </View>
          <Pressable
            onPress={() => aoAbrirJogo(jogo)}
            accessibilityRole="button"
            accessibilityLabel={`Abrir ${jogo.nome}`}
            style={({ pressed }) => [styles.chipJogo, pressed && styles.pressionado]}
          >
            <Text style={styles.nomeJogo} numberOfLines={1}>{jogo.nome}</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: raios.xl,
    marginBottom: espacos.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: cores.borda,
    height: 350,
    justifyContent: 'space-between',
  },
  camadaFundo: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  arte: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  conteudo: { padding: espacos.lg - 4, paddingBottom: espacos.sm, zIndex: 2 },
  marca: {
    color: cores.texto,
    fontSize: 46,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -1.5,
  },
  marcaDestaque: { color: cores.roxo },
  titulo: { color: cores.texto, fontSize: 18, fontWeight: '800', marginTop: 2 },
  descricao: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: espacos.sm,
    marginBottom: espacos.md,
    maxWidth: 250,
  },
  botao: { alignSelf: 'flex-start' },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: espacos.lg - 4,
    paddingBottom: espacos.md,
    zIndex: 2,
  },
  pontos: { flexDirection: 'row', alignItems: 'center' },
  ponto: { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.35)', marginRight: 6 },
  pontoAtivo: { width: 20, backgroundColor: cores.roxo },
  chipJogo: {
    maxWidth: 180,
    backgroundColor: 'rgba(10,9,28,0.65)',
    borderRadius: raios.pilula,
    paddingHorizontal: espacos.md,
    paddingVertical: espacos.xs + 2,
  },
  nomeJogo: { color: cores.texto, fontSize: 13, fontWeight: '800', fontStyle: 'italic' },
  pressionado: { opacity: 0.75 },
});
