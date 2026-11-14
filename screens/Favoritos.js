import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Botao from '../components/Botao';
import CardJogo from '../components/CardJogo';
import EstadoVazio from '../components/EstadoVazio';
import { cores, espacos } from '../constants/tema';

export default function Favoritos({ navigation, jogos }) {
  const favoritos = jogos.filter((jogo) => jogo.favorito);
  const quantidade = favoritos.length;

  const topoDaLista = (
    <View style={styles.topo}>
      <Text style={styles.titulo}>Favoritos</Text>
      <Text style={styles.subtitulo}>
        {quantidade} {quantidade === 1 ? 'jogo favorito' : 'jogos favoritos'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <FlatList
        data={favoritos}
        keyExtractor={(jogo) => jogo.id}
        renderItem={({ item }) => (
          <CardJogo
            jogo={item}
            aoPressionar={() => navigation.navigate('Detalhes', { jogo: item })}
          />
        )}
        ListHeaderComponent={topoDaLista}
        ListEmptyComponent={
          <View>
            <EstadoVazio
              icone="heart-outline"
              titulo="Nenhum favorito ainda"
              mensagem="Toque no coração na página de um jogo para guardá-lo aqui."
            />
            <Botao
              titulo="Explorar jogos"
              iconeDireita="arrow-forward"
              pilula
              aoPressionar={() => navigation.navigate('Jogos', { filtro: 'Todos' })}
              estilo={styles.botaoVazio}
            />
          </View>
        }
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  lista: {
    padding: espacos.md,
    paddingBottom: espacos.xl,
  },
  topo: {
    marginBottom: espacos.md,
  },
  titulo: {
    color: cores.texto,
    fontSize: 30,
    fontWeight: '800',
  },
  subtitulo: {
    color: cores.textoSecundario,
    fontSize: 14,
    marginTop: 2,
  },
  botaoVazio: {
    alignSelf: 'center',
    marginTop: espacos.md,
  },
});
