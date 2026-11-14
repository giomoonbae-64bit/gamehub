import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import Botao from '../components/Botao';
import CampoTexto from '../components/CampoTexto';
import CapaJogo from '../components/CapaJogo';
import { PLATAFORMAS, cores, espacos, raios } from '../constants/tema';
import { abrirOpcoesDeFoto } from '../utils/foto';

const LIMITE_BIO = 120;

export default function EditarPerfil({ navigation, jogos, perfil, aoSalvarPerfil }) {
  const [rascunho, setRascunho] = useState(perfil);
  const [erros, setErros] = useState({});

  const alterar = (campo, valor) => setRascunho((atual) => ({ ...atual, [campo]: valor }));

  const alternarPlataforma = (plataforma) =>
    alterar(
      'plataformas',
      rascunho.plataformas.includes(plataforma)
        ? rascunho.plataformas.filter((item) => item !== plataforma)
        : [...rascunho.plataformas, plataforma]
    );

  const salvar = () => {
    const novosErros = {};
    const usuario = rascunho.usuario.trim().replace(/^@/, '').replace(/\s+/g, '').toLowerCase();

    if (rascunho.nome.trim().length < 2) {
      novosErros.nome = 'Digite um nome com pelo menos 2 letras.';
    }
    if (usuario.length < 3) {
      novosErros.usuario = 'O usuário precisa ter pelo menos 3 caracteres, sem espaços.';
    }
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }
    aoSalvarPerfil({ ...rascunho, nome: rascunho.nome.trim(), usuario, bio: rascunho.bio.trim() });
    navigation.goBack();
  };

  const mudarFoto = () =>
    abrirOpcoesDeFoto({
      temFoto: Boolean(rascunho.foto),
      aoEscolher: (foto) => alterar('foto', foto),
      aoRemover: () => alterar('foto', null),
    });

  return (
    <KeyboardAvoidingView style={styles.tela} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <View style={styles.foto}>
          <Pressable onPress={mudarFoto} accessibilityRole="button" accessibilityLabel="Alterar foto">
            <Avatar foto={rascunho.foto} nome={rascunho.nome} tamanho={110} />
            <View style={styles.camera}>
              <Ionicons name="camera" size={16} color={cores.texto} />
            </View>
          </Pressable>
          <Text style={styles.linkFoto} onPress={mudarFoto}>
            {rascunho.foto ? 'Trocar foto' : 'Adicionar foto'}
          </Text>
        </View>

        <CampoTexto rotulo="Nome" obrigatorio value={rascunho.nome} onChangeText={(v) => alterar('nome', v)} erro={erros.nome} maxLength={30} placeholder="Como você quer ser chamado" />
        <CampoTexto rotulo="Usuário" obrigatorio value={rascunho.usuario} onChangeText={(v) => alterar('usuario', v)} erro={erros.usuario} maxLength={20} autoCapitalize="none" autoCorrect={false} placeholder="seu_usuario" />
        <CampoTexto rotulo={`Bio (${rascunho.bio.length}/${LIMITE_BIO})`} value={rascunho.bio} onChangeText={(v) => alterar('bio', v)} multiline maxLength={LIMITE_BIO} placeholder="Conte que tipo de jogador você é" />

        <Text style={styles.secao}>Plataformas</Text>
        <View style={styles.chips}>
          {PLATAFORMAS.map((plataforma) => {
            const ativo = rascunho.plataformas.includes(plataforma);
            return (
              <Pressable
                key={plataforma}
                onPress={() => alternarPlataforma(plataforma)}
                accessibilityRole="button"
                accessibilityState={{ selected: ativo }}
                style={[styles.chip, ativo && styles.chipAtivo]}
              >
                {ativo ? <Ionicons name="checkmark" size={14} color={cores.texto} style={styles.marca} /> : null}
                <Text style={[styles.textoChip, ativo && styles.textoChipAtivo]}>{plataforma}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.secao}>Jogo favorito</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carrossel}>
          {jogos.map((jogo) => {
            const ativo = rascunho.jogoFavoritoId === jogo.id;
            return (
              <Pressable
                key={jogo.id}
                onPress={() => alterar('jogoFavoritoId', ativo ? null : jogo.id)}
                accessibilityState={{ selected: ativo }}
                accessibilityLabel={jogo.nome}
                style={[styles.opcaoJogo, ativo && styles.opcaoAtiva]}
              >
                <CapaJogo capa={jogo.capa} arte={jogo.arte} nome={jogo.nome} corCapa={jogo.corCapa} estilo={styles.miniatura} />
                {ativo ? (
                  <View style={styles.selo}>
                    <Ionicons name="checkmark" size={14} color={cores.texto} />
                  </View>
                ) : null}
                <Text style={styles.nomeOpcao} numberOfLines={2}>{jogo.nome}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Botao titulo="Salvar alterações" icone="checkmark-circle" aoPressionar={salvar} estilo={styles.salvar} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: espacos.md, paddingBottom: espacos.xl },
  foto: { alignItems: 'center', marginBottom: espacos.lg },
  camera: { position: 'absolute', right: 2, bottom: 4, width: 32, height: 32, borderRadius: 16, backgroundColor: cores.roxo, borderWidth: 3, borderColor: cores.fundo, alignItems: 'center', justifyContent: 'center' },
  linkFoto: { color: cores.roxoClaro, fontSize: 14, fontWeight: '700', marginTop: espacos.sm + 2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: espacos.md },
  chip: { flexDirection: 'row', alignItems: 'center', minHeight: 44, paddingHorizontal: espacos.md, borderRadius: raios.pilula, backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, marginRight: espacos.sm, marginBottom: espacos.sm },
  chipAtivo: { backgroundColor: cores.roxo, borderColor: cores.roxo },
  textoChip: { color: cores.textoSecundario, fontSize: 14, fontWeight: '600' },
  textoChipAtivo: { color: cores.texto },
  marca: { marginRight: 4 },
  secao: { color: cores.texto, fontSize: 14, fontWeight: '600', marginBottom: espacos.sm, marginTop: espacos.xs },
  carrossel: { marginHorizontal: -espacos.md, marginBottom: espacos.lg },
  opcaoJogo: { width: 92, marginLeft: espacos.md, padding: 4, borderRadius: raios.md, borderWidth: 2, borderColor: 'transparent' },
  opcaoAtiva: { borderColor: cores.roxo },
  miniatura: { width: '100%', height: 110, borderRadius: raios.sm },
  selo: { position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: 11, backgroundColor: cores.roxo, alignItems: 'center', justifyContent: 'center' },
  nomeOpcao: { color: cores.texto, fontSize: 11, fontWeight: '600', marginTop: 4 },
  salvar: { marginTop: espacos.sm },
});
