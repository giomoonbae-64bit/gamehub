import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import Botao from '../components/Botao';
import CampoTexto from '../components/CampoTexto';
import SeletorStatus from '../components/SeletorStatus';
import { cores, espacos } from '../constants/tema';

const FORMULARIO_INICIAL = {
  nome: '',
  desenvolvedora: '',
  genero: '',
  plataforma: '',
  descricao: '',
  status: 'Quero jogar',
};

const validar = ({ nome, genero, plataforma }) => {
  const erros = {};

  if (nome.trim() === '') {
    erros.nome = 'Informe o nome do jogo.';
  }
  if (genero.trim() === '') {
    erros.genero = 'Informe o gênero do jogo.';
  }
  if (plataforma.trim() === '') {
    erros.plataforma = 'Informe a plataforma em que você joga.';
  }

  return erros;
};

export default function Formulario({ navigation, aoAdicionar }) {
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL);
  const [erros, setErros] = useState({});

  const atualizarCampo = (campo, valor) => {
    setFormulario((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  };

  const cadastrar = () => {
    const novosErros = validar(formulario);

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    const nome = formulario.nome.trim();

    aoAdicionar({
      nome,
      desenvolvedora: formulario.desenvolvedora.trim(),
      genero: formulario.genero.trim(),
      plataforma: formulario.plataforma.trim(),
      descricao: formulario.descricao.trim(),
      status: formulario.status,
    });

    setFormulario(FORMULARIO_INICIAL);
    setErros({});
    Alert.alert('Jogo cadastrado!', `${nome} foi adicionado à sua biblioteca.`);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <CampoTexto
          rotulo="Nome do jogo"
          obrigatorio
          value={formulario.nome}
          onChangeText={(texto) => atualizarCampo('nome', texto)}
          erro={erros.nome}
          placeholder="Ex.: Hollow Knight"
        />
        <CampoTexto
          rotulo="Desenvolvedora (opcional)"
          value={formulario.desenvolvedora}
          onChangeText={(texto) => atualizarCampo('desenvolvedora', texto)}
          placeholder="Ex.: Team Cherry"
        />
        <CampoTexto
          rotulo="Gênero"
          obrigatorio
          value={formulario.genero}
          onChangeText={(texto) => atualizarCampo('genero', texto)}
          erro={erros.genero}
          placeholder="Ex.: Metroidvania"
        />
        <CampoTexto
          rotulo="Plataforma"
          obrigatorio
          value={formulario.plataforma}
          onChangeText={(texto) => atualizarCampo('plataforma', texto)}
          erro={erros.plataforma}
          placeholder="Ex.: PC, PlayStation, Switch"
        />

        <Text style={styles.rotulo}>
          Status inicial <Text style={styles.asterisco}>*</Text>
        </Text>
        <SeletorStatus
          valor={formulario.status}
          aoSelecionar={(status) => atualizarCampo('status', status)}
        />

        <CampoTexto
          rotulo="Descrição (opcional)"
          value={formulario.descricao}
          onChangeText={(texto) => atualizarCampo('descricao', texto)}
          placeholder="Conte um pouco sobre o jogo"
          multiline
        />

        <Botao
          titulo="Cadastrar jogo"
          icone="checkmark-circle"
          aoPressionar={cadastrar}
          estilo={styles.botao}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: espacos.md,
    paddingBottom: espacos.xl,
  },
  rotulo: {
    color: cores.texto,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: espacos.sm,
  },
  asterisco: {
    color: cores.roxo,
  },
  botao: {
    marginTop: espacos.sm,
  },
});
