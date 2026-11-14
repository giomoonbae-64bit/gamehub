import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BannerHero from '../components/BannerHero';
import Cabecalho from '../components/Cabecalho';
import CardComunidade from '../components/CardComunidade';
import CardDestaque from '../components/CardDestaque';
import CardJogo from '../components/CardJogo';
import CardNovidade from '../components/CardNovidade';
import EstadoVazio from '../components/EstadoVazio';
import Indicador from '../components/Indicador';
import SecaoTitulo from '../components/SecaoTitulo';
import novidades, { formatarData } from '../data/novidades';
import { cores, espacos } from '../constants/tema';

const QUANTIDADE_DESTAQUES = 6;
const QUANTIDADE_EM_ANDAMENTO = 3;

export default function Inicio({ navigation, jogos, perfil }) {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => setCarregando(false), 500);

    return () => clearTimeout(temporizador);
  }, []);

  if (carregando) {
    return (
      <SafeAreaView style={styles.tela}>
        <View style={styles.carregando}>
          <ActivityIndicator size="large" color={cores.roxo} style={styles.indicador} />
          <Text style={styles.textoCarregando}>Carregando sua biblioteca...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const contarPorStatus = (status) => jogos.filter((jogo) => jogo.status === status).length;

  const destaques = jogos
    .filter((jogo) => jogo.nota !== null)
    .sort((a, b) => b.nota - a.nota)
    .slice(0, QUANTIDADE_DESTAQUES);

  const jogosComArte = destaques.filter((jogo) => jogo.hero).slice(0, 4);
  const emAndamento = jogos.filter((jogo) => jogo.status === 'Jogando').slice(0, QUANTIDADE_EM_ANDAMENTO);
  const noticias = novidades
    .map((novidade) => ({ ...novidade, jogo: jogos.find((jogo) => jogo.id === novidade.jogoId) }))
    .filter((novidade) => novidade.jogo);

  const abrirDetalhes = (jogo) => navigation.navigate('Detalhes', { jogo });
  const abrirJogos = (filtro) => navigation.navigate('Jogos', { filtro });

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <Cabecalho
          perfil={perfil}
          notificacoes={noticias.length}
          aoBuscar={(busca) => navigation.navigate('Jogos', { busca })}
          aoPressionarSino={() => navigation.navigate('Comunidade')}
          aoPressionarPerfil={() => navigation.navigate('Perfil')}
        />

        <BannerHero jogos={jogosComArte} aoPressionar={() => abrirJogos('Todos')} aoAbrirJogo={abrirDetalhes} />

        <View style={styles.resumo}>
          <Indicador icone="library" valor={jogos.length} rotulo="Jogos" />
          <Indicador icone="play-circle" valor={contarPorStatus('Jogando')} rotulo="Jogando" />
          <Indicador icone="checkmark-circle" valor={contarPorStatus('Zerado')} rotulo="Zerados" />
        </View>

        <SecaoTitulo titulo="Jogos em Destaque" acao="Ver todos" aoPressionar={() => abrirJogos('Todos')} />
        <FlatList
          horizontal
          data={destaques}
          keyExtractor={(jogo) => jogo.id}
          renderItem={({ item }) => <CardDestaque jogo={item} aoPressionar={() => abrirDetalhes(item)} />}
          showsHorizontalScrollIndicator={false}
          style={styles.carrossel}
          contentContainerStyle={styles.carrosselConteudo}
        />

        <CardComunidade aoPressionar={() => navigation.navigate('Comunidade')} />

        <SecaoTitulo titulo="Novidades" acao="Ver mais" aoPressionar={() => navigation.navigate('Comunidade')} estilo={styles.secao} />
        {noticias.map((novidade) => (
          <CardNovidade
            key={novidade.id}
            jogo={novidade.jogo}
            titulo={novidade.titulo}
            data={formatarData(novidade.diasAtras)}
            aoPressionar={() => abrirDetalhes(novidade.jogo)}
          />
        ))}

        <SecaoTitulo titulo="Jogando agora" acao="Ver mais" aoPressionar={() => abrirJogos('Jogando')} estilo={styles.secao} />
        {emAndamento.length > 0 ? (
          emAndamento.map((jogo) => <CardJogo key={jogo.id} jogo={jogo} aoPressionar={() => abrirDetalhes(jogo)} />)
        ) : (
          <EstadoVazio icone="play-circle-outline" titulo="Nenhum jogo em andamento" mensagem="Marque um jogo como “Jogando” para vê-lo aqui." />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  carregando: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  indicador: { marginTop: espacos.lg },
  textoCarregando: { color: cores.textoSecundario, fontSize: 15, marginTop: espacos.md },
  conteudo: { padding: espacos.md, paddingBottom: espacos.xl },
  resumo: { flexDirection: 'row', marginHorizontal: -espacos.xs, marginBottom: espacos.lg },
  carrossel: { marginHorizontal: -espacos.md, marginBottom: espacos.lg },
  carrosselConteudo: { paddingHorizontal: espacos.md },
  secao: { marginTop: espacos.lg },
});
