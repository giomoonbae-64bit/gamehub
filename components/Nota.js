import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espacos } from '../constants/tema';

export default function Nota({ valor, tamanho = 14, estilo }) {
  const semNota = valor === null || valor === undefined;

  return (
    <View
      style={[styles.linha, estilo]}
      accessibilityLabel={semNota ? 'Sem nota' : `Nota ${valor.toFixed(1)}`}
    >
      <Ionicons
        name="star"
        size={tamanho}
        color={semNota ? cores.borda : cores.estrela}
      />
      <Text style={[styles.texto, { fontSize: tamanho }]}>
        {semNota ? '—' : valor.toFixed(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texto: {
    color: cores.texto,
    fontWeight: '700',
    marginLeft: espacos.xs,
  },
});
