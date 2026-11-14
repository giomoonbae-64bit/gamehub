import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ArteCapa from './ArteCapa';
import { cores, espacos } from '../constants/tema';

// Itens "wiki:Título" na lista de capas buscam a imagem principal do artigo na Wikipédia.
const CACHE_WIKI = {};

async function buscarCapaWiki(titulo) {
  if (CACHE_WIKI[titulo] !== undefined) {
    return CACHE_WIKI[titulo];
  }
  try {
    const resposta = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`
    );
    const dados = await resposta.json();
    const original = dados.originalimage;
    const usarOriginal = original && original.width <= 1600;
    CACHE_WIKI[titulo] = (usarOriginal ? original.source : dados.thumbnail?.source ?? original?.source) ?? null;
  } catch (erro) {
    CACHE_WIKI[titulo] = null;
  }
  return CACHE_WIKI[titulo];
}

const gerarIniciais = (nome) =>
  nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((palavra) => palavra[0].toUpperCase())
    .join('');

// `capa` pode ser uma URL ou uma lista de URLs: se uma falhar, tenta a próxima.
export default function CapaJogo({ capa, arte, nome, corCapa, estilo, grande = false }) {
  const [indiceFalha, setIndiceFalha] = useState(0);
  const candidatas = (Array.isArray(capa) ? capa : [capa]).filter(Boolean);
  const atual = candidatas[indiceFalha];
  const ehWiki = typeof atual === 'string' && atual.startsWith('wiki:');
  const [urlWiki, setUrlWiki] = useState(null);

  useEffect(() => {
    if (!ehWiki) {
      return undefined;
    }
    let ativo = true;
    setUrlWiki(null);
    buscarCapaWiki(atual.slice(5)).then((url) => {
      if (!ativo) {
        return;
      }
      if (url) {
        setUrlWiki(url);
      } else {
        setIndiceFalha((anterior) => anterior + 1);
      }
    });
    return () => {
      ativo = false;
    };
  }, [atual, ehWiki]);

  const urlAtual = ehWiki ? urlWiki : atual;
  const fonte = typeof urlAtual === 'number' ? urlAtual : { uri: urlAtual };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: corCapa ?? cores.superficieClara },
        estilo,
      ]}
    >
      {urlAtual ? (
        <Image
          key={String(urlAtual)}
          source={fonte}
          style={styles.imagem}
          resizeMode="cover"
          accessibilityLabel={`Capa de ${nome}`}
          onError={() => setIndiceFalha((atual) => atual + 1)}
        />
      ) : arte ? (
        <ArteCapa tipo={arte} />
      ) : (
        <View style={styles.fallback}>
          <LinearGradient
            colors={['rgba(255,255,255,0.18)', 'rgba(0,0,0,0.4)']}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons
            name="game-controller"
            size={grande ? 56 : 30}
            color="rgba(255,255,255,0.85)"
          />
          <Text style={[styles.iniciais, grande && styles.iniciaisGrande]}>
            {gerarIniciais(nome)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iniciais: {
    color: cores.texto,
    fontSize: 20,
    fontWeight: '800',
    marginTop: espacos.xs,
    letterSpacing: 1,
  },
  iniciaisGrande: {
    fontSize: 32,
    marginTop: espacos.sm,
  },
});
