import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from '../components/Avatar';
import Botao from '../components/Botao';
import EstadoVazio from '../components/EstadoVazio';
import SeletorStatus from '../components/SeletorStatus';
import { gruposIniciais, jogadoresIniciais, postsIniciais } from '../data/comunidade';
import { GRADIENTES, cores, espacos, raios } from '../constants/tema';

const ABAS = [
  { valor: 'feed', rotulo: 'Feed' },
  { valor: 'grupos', rotulo: 'Grupos' },
  { valor: 'jogadores', rotulo: 'Jogadores' },
];

const LIMITE_POST = 280;

export default function Comunidade({ navigation, jogos, perfil }) {
  const [aba, setAba] = useState('feed');
  const [posts, setPosts] = useState(postsIniciais);
  const [grupos, setGrupos] = useState(gruposIniciais);
  const [jogadores, setJogadores] = useState(jogadoresIniciais);

  const [texto, setTexto] = useState('');
  const [jogoMarcado, setJogoMarcado] = useState(null);
  const [comentandoId, setComentandoId] = useState(null);
  const [comentario, setComentario] = useState('');

  const nomeDoPerfil = perfil.nome.trim() || 'Jogador';
  const meuAutor = { nome: nomeDoPerfil, usuario: perfil.usuario, meu: true };
  const gruposDoUsuario = grupos.filter((grupo) => grupo.entrou).length;
  const seguindo = jogadores.filter((jogador) => jogador.seguindo).length;
  const meusPosts = posts.filter((post) => post.autor.meu).length;

  const publicar = () => {
    const limpo = texto.trim();
    if (limpo.length === 0) {
      return;
    }
    setPosts((atual) => [
      { id: `p${Date.now()}`, autor: meuAutor, texto: limpo, jogoId: jogoMarcado, tempo: 'agora', curtidas: 0, curtiu: false, comentarios: [] },
      ...atual,
    ]);
    setTexto('');
    setJogoMarcado(null);
  };

  const alternarCurtida = (id) =>
    setPosts((atual) =>
      atual.map((post) =>
        post.id === id ? { ...post, curtiu: !post.curtiu, curtidas: post.curtidas + (post.curtiu ? -1 : 1) } : post
      )
    );

  const comentar = (id) => {
    const limpo = comentario.trim();
    if (limpo.length === 0) {
      return;
    }
    setPosts((atual) =>
      atual.map((post) =>
        post.id === id
          ? { ...post, comentarios: [...post.comentarios, { id: `c${Date.now()}`, autor: nomeDoPerfil, texto: limpo }] }
          : post
      )
    );
    setComentario('');
  };

  const excluir = (id) =>
    Alert.alert('Excluir publicação?', 'Essa ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => setPosts((atual) => atual.filter((post) => post.id !== id)) },
    ]);

  const compartilhar = (post) =>
    Share.share({ message: `${post.autor.nome} no GameHub: ${post.texto}` }).catch(() => {});

  const alternarGrupo = (id) =>
    setGrupos((atual) =>
      atual.map((grupo) =>
        grupo.id === id ? { ...grupo, entrou: !grupo.entrou, membros: grupo.membros + (grupo.entrou ? -1 : 1) } : grupo
      )
    );

  const alternarSeguir = (id) =>
    setJogadores((atual) => atual.map((jogador) => (jogador.id === id ? { ...jogador, seguindo: !jogador.seguindo } : jogador)));

  const abrirJogo = (jogoId) => {
    const jogo = jogos.find((item) => item.id === jogoId);
    if (jogo) {
      navigation.navigate('Detalhes', { jogo });
    }
  };

  const renderCompositor = () => (
    <View style={styles.cartao}>
      <View style={styles.linhaAutor}>
        <Avatar foto={perfil.foto} nome={nomeDoPerfil} tamanho={40} />
        <TextInput
          style={styles.campoPost}
          value={texto}
          onChangeText={setTexto}
          placeholder="Compartilhe uma conquista ou chame alguém para jogar..."
          placeholderTextColor={cores.textoSecundario}
          multiline
          maxLength={LIMITE_POST}
        />
      </View>

      <Text style={styles.legendaCampo}>Marcar um jogo (opcional)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {jogos.slice(0, 12).map((jogo) => {
          const ativo = jogoMarcado === jogo.id;
          return (
            <Pressable
              key={jogo.id}
              onPress={() => setJogoMarcado(ativo ? null : jogo.id)}
              accessibilityState={{ selected: ativo }}
              style={[styles.chip, ativo && styles.chipAtivo]}
            >
              <Text style={[styles.textoChip, ativo && styles.textoChipAtivo]} numberOfLines={1}>{jogo.nome}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.rodapeCompositor}>
        <Text style={styles.contador}>{texto.length}/{LIMITE_POST}</Text>
        <Botao titulo="Publicar" icone="paper-plane" tamanho="pequeno" pilula desabilitado={texto.trim().length === 0} aoPressionar={publicar} />
      </View>
    </View>
  );

  const renderPost = (post) => {
    const jogo = jogos.find((item) => item.id === post.jogoId);
    const aberto = comentandoId === post.id;
    const foto = post.autor.meu ? perfil.foto : null;

    return (
      <View key={post.id} style={styles.cartao}>
        <View style={styles.linhaAutor}>
          <Avatar foto={foto} nome={post.autor.nome} tamanho={40} destaque={Boolean(post.autor.meu)} />
          <View style={styles.dadosAutor}>
            <Text style={styles.nomeAutor}>{post.autor.nome}</Text>
            <Text style={styles.tempo}>{post.tempo}</Text>
          </View>
          {post.autor.meu ? (
            <Pressable onPress={() => excluir(post.id)} hitSlop={10} accessibilityLabel="Excluir publicação">
              <Ionicons name="trash-outline" size={20} color={cores.textoSecundario} />
            </Pressable>
          ) : null}
        </View>

        <Text style={styles.textoPost}>{post.texto}</Text>

        {jogo ? (
          <Pressable onPress={() => abrirJogo(jogo.id)} style={styles.etiquetaJogo} accessibilityRole="button">
            <Ionicons name="game-controller" size={14} color={cores.roxoClaro} />
            <Text style={styles.textoEtiqueta} numberOfLines={1}>{jogo.nome}</Text>
          </Pressable>
        ) : null}

        <View style={styles.acoes}>
          <Pressable onPress={() => alternarCurtida(post.id)} style={styles.acao} accessibilityLabel="Curtir">
            <Ionicons name={post.curtiu ? 'heart' : 'heart-outline'} size={22} color={post.curtiu ? cores.favorito : cores.textoSecundario} />
            <Text style={[styles.textoAcao, post.curtiu && { color: cores.favorito }]}>{post.curtidas}</Text>
          </Pressable>
          <Pressable onPress={() => { setComentandoId(aberto ? null : post.id); setComentario(''); }} style={styles.acao} accessibilityLabel="Comentários">
            <Ionicons name="chatbubble-outline" size={20} color={aberto ? cores.roxoClaro : cores.textoSecundario} />
            <Text style={[styles.textoAcao, aberto && { color: cores.roxoClaro }]}>{post.comentarios.length}</Text>
          </Pressable>
          <Pressable onPress={() => compartilhar(post)} style={styles.acao} accessibilityLabel="Compartilhar">
            <Ionicons name="share-social-outline" size={20} color={cores.textoSecundario} />
          </Pressable>
        </View>

        {aberto ? (
          <View style={styles.comentarios}>
            {post.comentarios.map((item) => (
              <View key={item.id} style={styles.comentario}>
                <Text style={styles.autorComentario}>{item.autor}</Text>
                <Text style={styles.textoComentario}>{item.texto}</Text>
              </View>
            ))}
            <View style={styles.novoComentario}>
              <TextInput
                style={styles.campoComentario}
                value={comentario}
                onChangeText={setComentario}
                placeholder="Escreva um comentário"
                placeholderTextColor={cores.textoSecundario}
                onSubmitEditing={() => comentar(post.id)}
                returnKeyType="send"
              />
              <Pressable onPress={() => comentar(post.id)} hitSlop={8} accessibilityLabel="Enviar comentário">
                <Ionicons name="send" size={20} color={comentario.trim() ? cores.roxoClaro : cores.borda} />
              </Pressable>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <KeyboardAvoidingView style={styles.tela} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text style={styles.titulo}>Comunidade</Text>
          <Text style={styles.subtitulo}>Jogar é melhor em boa companhia.</Text>

          <LinearGradient colors={GRADIENTES.comunidade} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.resumo}>
            {[
              { valor: gruposDoUsuario, rotulo: 'Grupos' },
              { valor: seguindo, rotulo: 'Seguindo' },
              { valor: meusPosts, rotulo: 'Publicações' },
            ].map((item) => (
              <View key={item.rotulo} style={styles.itemResumo}>
                <Text style={styles.valorResumo}>{item.valor}</Text>
                <Text style={styles.rotuloResumo}>{item.rotulo}</Text>
              </View>
            ))}
          </LinearGradient>

          <SeletorStatus opcoes={ABAS} valor={aba} aoSelecionar={setAba} />

          {aba === 'feed' ? (
            <View>
              {renderCompositor()}
              {posts.length > 0 ? posts.map(renderPost) : (
                <EstadoVazio icone="chatbubbles-outline" titulo="Nenhuma publicação" mensagem="Escreva a primeira publicação acima." />
              )}
            </View>
          ) : null}

          {aba === 'grupos'
            ? grupos.map((grupo) => (
                <View key={grupo.id} style={[styles.cartao, styles.linhaItem]}>
                  <View style={styles.iconeGrupo}>
                    <Ionicons name={grupo.icone} size={22} color={cores.roxoClaro} />
                  </View>
                  <View style={styles.dadosAutor}>
                    <Text style={styles.nomeAutor}>{grupo.nome}</Text>
                    <Text style={styles.descricaoItem}>{grupo.descricao}</Text>
                    <Text style={styles.tempo}>{grupo.membros.toLocaleString('pt-BR')} membros</Text>
                  </View>
                  <Botao
                    titulo={grupo.entrou ? 'Participando' : 'Entrar'}
                    variante={grupo.entrou ? 'secundario' : 'primario'}
                    tamanho="pequeno"
                    pilula
                    aoPressionar={() => alternarGrupo(grupo.id)}
                  />
                </View>
              ))
            : null}

          {aba === 'jogadores'
            ? jogadores.map((jogador) => (
                <View key={jogador.id} style={[styles.cartao, styles.linhaItem]}>
                  <Avatar nome={jogador.nome} tamanho={44} />
                  <View style={styles.dadosAutor}>
                    <Text style={styles.nomeAutor}>{jogador.nome}</Text>
                    <Text style={styles.tempo}>@{jogador.usuario}</Text>
                    <Text style={styles.descricaoItem} numberOfLines={1}>Jogando: {jogador.joga}</Text>
                  </View>
                  <Botao
                    titulo={jogador.seguindo ? 'Seguindo' : 'Seguir'}
                    variante={jogador.seguindo ? 'secundario' : 'primario'}
                    tamanho="pequeno"
                    pilula
                    aoPressionar={() => alternarSeguir(jogador.id)}
                  />
                </View>
              ))
            : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: espacos.md, paddingBottom: espacos.xl },
  titulo: { color: cores.texto, fontSize: 30, fontWeight: '800' },
  subtitulo: { color: cores.textoSecundario, fontSize: 14, marginTop: 2, marginBottom: espacos.md },
  resumo: { flexDirection: 'row', borderRadius: raios.xl, borderWidth: 1, borderColor: cores.borda, paddingVertical: espacos.md, marginBottom: espacos.md },
  itemResumo: { flex: 1, alignItems: 'center' },
  valorResumo: { color: cores.texto, fontSize: 24, fontWeight: '800' },
  rotuloResumo: { color: 'rgba(255,255,255,0.75)', fontSize: 12 },
  cartao: { backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: raios.lg, padding: espacos.md, marginBottom: espacos.md },
  linhaAutor: { flexDirection: 'row', alignItems: 'center' },
  linhaItem: { flexDirection: 'row', alignItems: 'center' },
  dadosAutor: { flex: 1, marginHorizontal: espacos.md - 4 },
  nomeAutor: { color: cores.texto, fontSize: 15, fontWeight: '700' },
  tempo: { color: cores.textoSecundario, fontSize: 12, marginTop: 1 },
  descricaoItem: { color: cores.textoSecundario, fontSize: 13, lineHeight: 18, marginVertical: 2 },
  iconeGrupo: { width: 46, height: 46, borderRadius: 23, backgroundColor: cores.superficieClara, alignItems: 'center', justifyContent: 'center' },
  campoPost: { flex: 1, color: cores.texto, fontSize: 15, minHeight: 44, marginLeft: espacos.sm + 2, paddingTop: 10 },
  legendaCampo: { color: cores.textoSecundario, fontSize: 12, marginTop: espacos.sm, marginBottom: espacos.sm },
  chip: { maxWidth: 170, paddingHorizontal: espacos.md - 2, paddingVertical: 8, borderRadius: raios.pilula, backgroundColor: cores.superficieClara, borderWidth: 1, borderColor: cores.borda, marginRight: espacos.sm },
  chipAtivo: { backgroundColor: cores.roxo, borderColor: cores.roxo },
  textoChip: { color: cores.textoSecundario, fontSize: 12, fontWeight: '600' },
  textoChipAtivo: { color: cores.texto },
  rodapeCompositor: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: espacos.md - 4 },
  contador: { color: cores.textoSecundario, fontSize: 12 },
  textoPost: { color: cores.texto, fontSize: 15, lineHeight: 22, marginTop: espacos.md - 4 },
  etiquetaJogo: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'rgba(119,64,245,0.22)', borderRadius: raios.pilula, paddingHorizontal: espacos.sm + 4, paddingVertical: 5, marginTop: espacos.sm + 2, maxWidth: '100%' },
  textoEtiqueta: { color: '#E4DAFF', fontSize: 12, fontWeight: '700', marginLeft: 6 },
  acoes: { flexDirection: 'row', alignItems: 'center', marginTop: espacos.md - 2, borderTopWidth: 1, borderTopColor: cores.borda, paddingTop: espacos.sm + 2 },
  acao: { flexDirection: 'row', alignItems: 'center', marginRight: espacos.lg },
  textoAcao: { color: cores.textoSecundario, fontSize: 13, fontWeight: '600', marginLeft: 6 },
  comentarios: { marginTop: espacos.sm + 2 },
  comentario: { backgroundColor: cores.superficieClara, borderRadius: raios.md, padding: espacos.sm + 4, marginBottom: espacos.sm },
  autorComentario: { color: cores.roxoClaro, fontSize: 12, fontWeight: '700' },
  textoComentario: { color: cores.texto, fontSize: 14, marginTop: 2 },
  novoComentario: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.fundo, borderWidth: 1, borderColor: cores.borda, borderRadius: raios.pilula, paddingHorizontal: espacos.md, minHeight: 42 },
  campoComentario: { flex: 1, color: cores.texto, fontSize: 14, marginRight: espacos.sm },
});
