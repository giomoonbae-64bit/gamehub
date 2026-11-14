import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const OPCOES = { mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 };

async function lerImagem(origem) {
  const permissao =
    origem === 'camera'
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissao.granted) {
    Alert.alert(
      'Permissão necessária',
      origem === 'camera'
        ? 'Permita o acesso à câmera nas configurações do celular para tirar uma foto.'
        : 'Permita o acesso às fotos nas configurações do celular para escolher uma imagem.'
    );
    return null;
  }

  const resultado =
    origem === 'camera'
      ? await ImagePicker.launchCameraAsync(OPCOES)
      : await ImagePicker.launchImageLibraryAsync(OPCOES);

  return resultado.canceled ? null : resultado.assets[0].uri;
}

// Abre o menu "Galeria / Câmera / Remover" e devolve a nova foto por callback.
export function abrirOpcoesDeFoto({ temFoto, aoEscolher, aoRemover }) {
  const escolher = async (origem) => {
    try {
      const uri = await lerImagem(origem);
      if (uri) {
        aoEscolher(uri);
      }
    } catch (erro) {
      Alert.alert('Não foi possível abrir', 'Tente novamente em instantes.');
    }
  };

  const botoes = [
    { text: 'Escolher da galeria', onPress: () => escolher('galeria') },
    { text: 'Tirar uma foto', onPress: () => escolher('camera') },
  ];
  botoes.push(
    temFoto
      ? { text: 'Remover foto', style: 'destructive', onPress: aoRemover }
      : { text: 'Cancelar', style: 'cancel' }
  );

  Alert.alert('Foto de perfil', 'Escolha de onde vem a sua foto.', botoes, { cancelable: true });
}
