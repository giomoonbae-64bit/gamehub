import { Pressable, ScrollView, StyleSheet, Switch, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from '../components/Avatar';
import Botao from '../components/Botao';
import CapaJogo from '../components/CapaJogo';
import SecaoTitulo from '../components/SecaoTitulo';
import { GRADIENTES_EXTRA, cores, espacos, raios } from '../constants/tema';
import { abrirOpcoesDeFoto } from '../utils/foto';

const calcularNotaMedia = (jogos) => {
  const notas = jogos.filter((jogo) => jogo.nota !== null).map((jogo) => jogo.nota);
  if (notas.length === 0) {
    return '—';
  }
  return (notas.reduce((total, nota) => total + nota, 0) / notas.length).toFixed(1);
};

export default function Perfil({ navigation, jogos, perfil, aoSalvarPerfil }) {
  const zerados = jogos.filter((jogo) => jogo.status === 'Zerado').length;
  const favoritos = jogos.filter((jogo) => jogo.favorito).length;
  const avaliados = jogos.filter((jogo) => jogo.nota !== null).length;
  const generos = new Set(jogos.map((jogo) => jogo.genero)).size;
  const jogoFavorito = jogos.find((jogo) => jogo.id === perfil.jogoFavoritoId);
  const nome = perfil.nome.trim() || 'Jogador';

  const conquistas = [
    { id: 'c1', icone: 'library', titulo: 'Colecionador', dica: '10 jogos', atual: jogos.length, meta: 10 },
    { id: 'c2', icone: 'trophy', titulo: 'Finalizador', dica: '5 zerados', atual: zerados, meta: 5 },
    { id: 'c3', icone: 'heart', titulo: 'Apaixonado', dica: '3 favoritos', atual: favoritos, meta: 3 },
    { id: 'c4', icone: 'star', titulo: 'Crítico', dica: '10 notas', atual: avaliados, meta: 10 },
    { id: 'c5', icone: 'compass', titulo: 'Eclético', dica: '5 gêneros', atual: generos, meta: 5 },
  ];

  const mudarFoto = () =>
    abrirOpcoesDeFoto({
      temFoto: Boolean(perfil.foto),
      aoEscolher: (foto) => aoSalvarPerfil({ ...perfil, foto }),
      aoRemover: () => aoSalvarPerfil({ ...perfil, foto: null }),
    });

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={GRADIENTES_EXTRA.capaPerfil} style={styles.capa} />

        <View style={styles.identidade}>
          <Pressable onPress={mudarFoto} accessibilityRole="button" accessibilityLabel="Alterar foto de perfil">
            <Avatar foto={perfil.foto} nome={nome} tamanho={108} estilo={styles.avatar} />
            <View style={styles.camera}>
              <Ionicons name="camera" size={16} color={cores.texto} />
            </View>
          </Pressable>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.usuario}>@{perfil.usuario || 'jogador'}</Text>
          <Text style={[styles.bio, !perfil.bio && styles.bioVazia]}>
            {perfil.bio || 'Adicione uma bio para contar que tipo de jogador você é.'}
          </Text>

          <View style={styles.botoes}>
            <Botao titulo="Editar perfil" icone="create-outline" tamanho="pequeno" pilula aoPressionar={() => navigation.navigate('EditarPerfil')} />
            <Botao titulo="Adicionar jogo" icone="add" variante="secundario" tamanho="pequeno" pilula aoPressionar={() => navigation.navigate('Formulario')} estilo={styles.botaoSecundario} />
          </View>
        </View>

        <View style={styles.estatisticas}>
          {[
            { valor: jogos.length, rotulo: 'Jogos' },
            { valor: favoritos, rotulo: 'Favoritos' },
            { valor: zerados, rotulo: 'Zerados' },
            { valor: calcularNotaMedia(jogos), rotulo: 'Nota média' },
          ].map((item, posicao) => (
            <View key={item.rotulo} style={[styles.estatistica, posicao > 0 && styles.divisor]}>
              <Text style={styles.valor}>{item.valor}</Text>
              <Text style={styles.rotulo}>{item.rotulo}</Text>
            </View>
          ))}
        </View>

        <SecaoTitulo titulo="Jogo favorito" />
        {jogoFavorito ? (
          <Pressable onPress={() => navigation.navigate('Detalhes', { jogo: jogoFavorito })} style={styles.cartaoJogo} accessibilityRole="button">
            <CapaJogo capa={jogoFavorito.capa} arte={jogoFavorito.arte} nome={jogoFavorito.nome} corCapa={jogoFavorito.corCapa} estilo={styles.capaJogo} />
            <View style={styles.textosJogo}>
              <Text style={styles.nomeJogo} numberOfLines={2}>{jogoFavorito.nome}</Text>
              <Text style={styles.generoJogo}>{jogoFavorito.genero}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={cores.textoSecundario} />
          </Pressable>
        ) : (
          <Pressable onPress={() => navigation.navigate('EditarPerfil')} style={styles.vazio}>
            <Ionicons name="add-circle-outline" size={22} color={cores.roxoClaro} />
            <Text style={styles.textoVazio}>Escolha o seu jogo favorito</Text>
          </Pressable>
        )}

        <SecaoTitulo titulo="Plataformas" estilo={styles.secao} />
        {perfil.plataformas.length > 0 ? (
          <View style={styles.chips}>
            {perfil.plataformas.map((plataforma) => (
              <View key={plataforma} style={styles.chip}>
                <Text style={styles.textoChip}>{plataforma}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.bioVazia}>Nenhuma plataforma escolhida.</Text>
        )}

        <SecaoTitulo titulo="Conquistas" estilo={styles.secao} />
        <View style={styles.grade}>
          {conquistas.map((item) => {
            const liberada = item.atual >= item.meta;
            return (
              <View key={item.id} style={[styles.conquista, !liberada && styles.bloqueada]}>
                <View style={[styles.iconeConquista, liberada && styles.iconeLiberado]}>
                  <Ionicons name={liberada ? item.icone : 'lock-closed'} size={22} color={liberada ? cores.texto : cores.textoSecundario} />
                </View>
                <Text style={styles.tituloConquista}>{item.titulo}</Text>
                <Text style={styles.dicaConquista}>
                  {liberada ? 'Conquistada' : `${Math.min(item.atual, item.meta)}/${item.meta}`}
                </Text>
              </View>
            );
          })}
        </View>

        <SecaoTitulo titulo="Configurações" estilo={styles.secao} />
        <View style={styles.lista}>
          <View style={styles.itemLista}>
            <Ionicons name="notifications-outline" size={22} color={cores.roxoClaro} />
            <Text style={styles.textoItem}>Notificações</Text>
            <Switch
              value={perfil.notificacoes}
              onValueChange={(valor) => aoSalvarPerfil({ ...perfil, notificacoes: valor })}
              trackColor={{ false: cores.borda, true: cores.roxo }}
              thumbColor={cores.texto}
            />
          </View>
          <Pressable
            style={[styles.itemLista, styles.semBorda]}
            onPress={() => Alert.alert('GameHub', 'Descubra. Jogue. Conecte-se.\nVersão 1.1')}
            accessibilityRole="button"
          >
            <Ionicons name="information-circle-outline" size={22} color={cores.roxoClaro} />
            <Text style={styles.textoItem}>Sobre o GameHub</Text>
            <Ionicons name="chevron-forward" size={18} color={cores.textoSecundario} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { paddingBottom: espacos.xl },
  capa: { height: 130 },
  identidade: { alignItems: 'center', marginTop: -54, paddingHorizontal: espacos.md },
  avatar: { borderWidth: 4, borderColor: cores.fundo, backgroundColor: cores.superficieClara },
  camera: { position: 'absolute', right: 2, bottom: 4, width: 32, height: 32, borderRadius: 16, backgroundColor: cores.roxo, borderWidth: 3, borderColor: cores.fundo, alignItems: 'center', justifyContent: 'center' },
  nome: { color: cores.texto, fontSize: 24, fontWeight: '800', marginTop: espacos.sm + 2 },
  usuario: { color: cores.roxoClaro, fontSize: 14, fontWeight: '600', marginTop: 2 },
  bio: { color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 20, textAlign: 'center', marginTop: espacos.sm + 2, maxWidth: 320 },
  bioVazia: { color: cores.textoSecundario, fontStyle: 'italic' },
  botoes: { flexDirection: 'row', marginTop: espacos.md },
  botaoSecundario: { marginLeft: espacos.sm },
  estatisticas: { flexDirection: 'row', backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: raios.lg, paddingVertical: espacos.md, marginHorizontal: espacos.md, marginVertical: espacos.lg },
  estatistica: { flex: 1, alignItems: 'center' },
  divisor: { borderLeftWidth: 1, borderLeftColor: cores.borda },
  valor: { color: cores.texto, fontSize: 22, fontWeight: '800' },
  rotulo: { color: cores.textoSecundario, fontSize: 12, marginTop: 2 },
  secao: { marginTop: espacos.lg },
  cartaoJogo: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: raios.lg, padding: espacos.sm + 4, marginHorizontal: espacos.md },
  capaJogo: { width: 60, height: 80, borderRadius: raios.md },
  textosJogo: { flex: 1, marginHorizontal: espacos.md },
  nomeJogo: { color: cores.texto, fontSize: 16, fontWeight: '700' },
  generoJogo: { color: cores.roxoClaro, fontSize: 13, fontWeight: '600', marginTop: 2 },
  vazio: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderStyle: 'dashed', borderColor: cores.borda, borderRadius: raios.lg, padding: espacos.md, marginHorizontal: espacos.md },
  textoVazio: { color: cores.roxoClaro, fontSize: 14, fontWeight: '600', marginLeft: espacos.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: espacos.md, gap: espacos.sm },
  chip: { backgroundColor: 'rgba(119,64,245,0.25)', borderRadius: raios.pilula, paddingHorizontal: espacos.md, paddingVertical: 7 },
  textoChip: { color: '#E4DAFF', fontSize: 13, fontWeight: '700' },
  grade: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: espacos.md - 4 },
  conquista: { width: '33.33%', alignItems: 'center', paddingHorizontal: 4, marginBottom: espacos.md },
  bloqueada: { opacity: 0.55 },
  iconeConquista: { width: 52, height: 52, borderRadius: 26, backgroundColor: cores.superficieClara, alignItems: 'center', justifyContent: 'center' },
  iconeLiberado: { backgroundColor: cores.roxo },
  tituloConquista: { color: cores.texto, fontSize: 13, fontWeight: '700', marginTop: espacos.sm },
  dicaConquista: { color: cores.textoSecundario, fontSize: 11, marginTop: 1 },
  lista: { backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: raios.lg, marginHorizontal: espacos.md },
  itemLista: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: espacos.md, minHeight: 56, borderBottomWidth: 1, borderBottomColor: cores.borda },
  semBorda: { borderBottomWidth: 0 },
  textoItem: { flex: 1, color: cores.texto, fontSize: 15, fontWeight: '600', marginLeft: espacos.md - 2 },
});
