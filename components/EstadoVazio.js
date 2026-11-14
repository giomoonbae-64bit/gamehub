import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espacos } from '../constants/tema';

export default function EstadoVazio({ icone = 'search', titulo, mensagem }) {
  return (
    <View style={styles.container}>
      <Ionicons name={icone} size={48} color={cores.borda} />
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: espacos.xl,
    paddingHorizontal: espacos.lg,
  },
  titulo: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: '700',
    marginTop: espacos.md,
    textAlign: 'center',
  },
  mensagem: {
    color: cores.textoSecundario,
    fontSize: 14,
    marginTop: espacos.xs,
    textAlign: 'center',
  },
});
