import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Botao from '../components/Botao';
import CapaJogo from '../components/CapaJogo';
import EtiquetaStatus from '../components/EtiquetaStatus';
import Nota from '../components/Nota';
import SeletorStatus from '../components/SeletorStatus';
import { cores, espacos, raios } from '../constants/tema';

const TAMANHO_DESCRICAO_CURTA = 140;

export default function Detalhes({
  navigation,
  route,
  jogos,
  aoAlterarStatus,
  aoAlternarFavorito,
}) {
  const insets = useSafeAreaInsets();
  const [expandida, setExpandida] = useState(false);

  const { jogo } = route.params;
  const jogoAtual = jogos.find((item) => item.id === jogo.id) ?? jogo;
  const {
    id,
    nome,
    desenvolvedora,
    genero,
    plataforma,
    nota,
    descricao,
    status,
    capa,
    arte,
    hero,
    corCapa,
    favorito,
  } = jogoAtual;

  const descricaoLonga = descricao.length > TAMANHO_DESCRICAO_CURTA;

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{ paddingBottom: espacos.xl + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <CapaJogo
          capa={[].concat(hero ?? [], capa ?? [])}
          arte={arte}
          nome={nome}
          corCapa={corCapa}
          estilo={styles.capa}
          grande
        />
        <LinearGradient
          colors={['rgba(10,9,28,0.6)', 'rgba(10,9,28,0)', cores.fundo]}
          locations={[0, 0.4, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View style={[styles.barraTopo, { top: insets.top + espacos.sm }]}>
          <Pressable
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            style={({ pressed }) => [styles.botaoRedondo, pressed && styles.pressionado]}
          >
            <Ionicons name="arrow-back" size={22} color={cores.texto} />
          </Pressable>

          <Pressable
            onPress={() => aoAlternarFavorito(id)}
            accessibilityRole="button"
            accessibilityLabel={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            style={({ pressed }) => [styles.botaoRedondo, pressed && styles.pressionado]}
          >
            <Ionicons
              name={favorito ? 'heart' : 'heart-outline'}
              size={22}
              color={favorito ? cores.favorito : cores.texto}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.nome}>{nome}</Text>
        {desenvolvedora ? <Text style={styles.desenvolvedora}>{desenvolvedora}</Text> : null}

        <View style={styles.linhaNota}>
          <Nota valor={nota} tamanho={18} />
          <Text style={styles.legendaNota}>
            {nota === null ? 'Você ainda não avaliou' : 'sua avaliação'}
          </Text>
        </View>

        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.textoTag}>{genero}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.textoTag}>{plataforma}</Text>
          </View>
          <EtiquetaStatus status={status} />
        </View>

        <Botao
          titulo={favorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          icone={favorito ? 'heart-outline' : 'heart'}
          variante={favorito ? 'secundario' : 'primario'}
          aoPressionar={() => aoAlternarFavorito(id)}
          estilo={styles.botaoFavorito}
        />

        <Text style={styles.secao}>Sobre o jogo</Text>
        <Text style={styles.descricao} numberOfLines={expandida ? undefined : 4}>
          {descricao.length > 0 ? descricao : 'Nenhuma descrição cadastrada para este jogo.'}
        </Text>
        {descricaoLonga ? (
          <Pressable
            onPress={() => setExpandida((atual) => !atual)}
            hitSlop={10}
            accessibilityRole="button"
            style={styles.verMais}
          >
            <Text style={styles.textoVerMais}>{expandida ? 'Ver menos' : 'Ver mais'}</Text>
            <Ionicons
              name={expandida ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={cores.roxoClaro}
            />
          </Pressable>
        ) : null}

        <Text style={styles.secao}>Status na biblioteca</Text>
        <SeletorStatus valor={status} aoSelecionar={(novo) => aoAlterarStatus(id, novo)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  capa: {
    width: '100%',
    height: 320,
  },
  barraTopo: {
    position: 'absolute',
    left: espacos.md,
    right: espacos.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoRedondo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(10,9,28,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressionado: {
    opacity: 0.7,
  },
  conteudo: {
    paddingHorizontal: espacos.md,
    marginTop: -espacos.lg,
  },
  nome: {
    color: cores.texto,
    fontSize: 28,
    fontWeight: '800',
  },
  desenvolvedora: {
    color: cores.textoSecundario,
    fontSize: 15,
    marginTop: 2,
  },
  linhaNota: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: espacos.sm + 2,
  },
  legendaNota: {
    color: cores.textoSecundario,
    fontSize: 14,
    marginLeft: espacos.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: espacos.md,
    gap: espacos.sm,
  },
  tag: {
    backgroundColor: cores.superficieClara,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.pilula,
    paddingHorizontal: espacos.md - 2,
    paddingVertical: espacos.xs + 2,
  },
  textoTag: {
    color: cores.texto,
    fontSize: 12,
    fontWeight: '600',
  },
  botaoFavorito: {
    marginTop: espacos.lg - 4,
  },
  secao: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: '700',
    marginTop: espacos.lg,
    marginBottom: espacos.sm,
  },
  descricao: {
    color: cores.textoSecundario,
    fontSize: 15,
    lineHeight: 23,
  },
  verMais: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: espacos.sm,
  },
  textoVerMais: {
    color: cores.roxoClaro,
    fontSize: 14,
    fontWeight: '600',
    marginRight: espacos.xs,
  },
});
