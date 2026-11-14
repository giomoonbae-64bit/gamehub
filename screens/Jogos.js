import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Botao from '../components/Botao';
import CardJogo from '../components/CardJogo';
import EstadoVazio from '../components/EstadoVazio';
import SeletorStatus from '../components/SeletorStatus';
import { FILTROS_PLATAFORMA, cores, espacos, jogoEstaNaPlataforma, raios } from '../constants/tema';

const FILTROS = [
  { valor: 'Todos', rotulo: 'Todos' },
  { valor: 'Quero jogar', rotulo: 'Quero jogar' },
  { valor: 'Jogando', rotulo: 'Jogando' },
  { valor: 'Zerado', rotulo: 'Zerados' },
];

export default function Jogos({ navigation, route, jogos }) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [plataforma, setPlataforma] = useState('Todos');

  // Permite que outras telas abram a lista já filtrada (ex.: "Ver mais" em "Jogando agora").
  useEffect(() => {
    if (route.params?.filtro) {
      setFiltro(route.params.filtro);
    }
    if (route.params?.busca !== undefined) {
      setBusca(route.params.busca);
    }
  }, [route.params]);

  const termo = busca.trim().toLowerCase();

  const jogosFiltrados = jogos.filter((jogo) => {
    const combinaStatus = filtro === 'Todos' || jogo.status === filtro;
    const combinaNome = jogo.nome.toLowerCase().includes(termo);

    return combinaStatus && combinaNome && jogoEstaNaPlataforma(jogo, plataforma);
  });

  const quantidade = jogosFiltrados.length;

  const topoDaLista = (
    <View>
      <View style={styles.topo}>
        <View>
          <Text style={styles.titulo}>Jogos</Text>
          <Text style={styles.subtitulo}>
            {quantidade} {quantidade === 1 ? 'jogo' : 'jogos'} na lista
          </Text>
        </View>
        <Botao
          titulo="Adicionar"
          icone="add-circle"
          tamanho="pequeno"
          pilula
          aoPressionar={() => navigation.navigate('Formulario')}
        />
      </View>

      <View style={styles.busca}>
        <Ionicons name="search" size={20} color={cores.textoSecundario} />
        <TextInput
          style={styles.campoBusca}
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar jogo pelo nome"
          placeholderTextColor={cores.textoSecundario}
          autoCorrect={false}
          returnKeyType="search"
        />
        {busca.length > 0 ? (
          <Pressable onPress={() => setBusca('')} hitSlop={12} accessibilityLabel="Limpar busca">
            <Ionicons name="close-circle" size={20} color={cores.textoSecundario} />
          </Pressable>
        ) : null}
      </View>

      <SeletorStatus
        opcoes={FILTROS_PLATAFORMA.map((valor) => ({ valor, rotulo: valor }))}
        valor={plataforma}
        aoSelecionar={setPlataforma}
        rolavel
      />
      <SeletorStatus opcoes={FILTROS} valor={filtro} aoSelecionar={setFiltro} rolavel />
    </View>
  );

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <FlatList
        data={jogosFiltrados}
        keyExtractor={(jogo) => jogo.id}
        renderItem={({ item }) => (
          <CardJogo
            jogo={item}
            aoPressionar={() => navigation.navigate('Detalhes', { jogo: item })}
          />
        )}
        ListHeaderComponent={topoDaLista}
        ListEmptyComponent={
          <EstadoVazio
            titulo="Nenhum jogo encontrado"
            mensagem="Tente buscar por outro nome ou escolher outro filtro."
          />
        }
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.pilula,
    paddingHorizontal: espacos.md,
    marginBottom: espacos.md,
  },
  campoBusca: {
    flex: 1,
    color: cores.texto,
    fontSize: 16,
    marginHorizontal: espacos.sm,
  },
});
