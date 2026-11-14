import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espacos, raios } from '../constants/tema';

export default function Indicador({ icone, valor, rotulo }) {
  return (
    <View style={styles.container}>
      <Ionicons name={icone} size={22} color={cores.roxo} />
      <Text style={styles.valor}>{valor}</Text>
      <Text style={styles.rotulo}>{rotulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderRadius: raios.md,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingVertical: espacos.md,
    marginHorizontal: espacos.xs,
  },
  valor: {
    color: cores.texto,
    fontSize: 22,
    fontWeight: '800',
    marginTop: espacos.xs,
  },
  rotulo: {
    color: cores.textoSecundario,
    fontSize: 12,
  },
});
