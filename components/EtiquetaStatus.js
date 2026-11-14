import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VISUAL_STATUS, espacos, raios } from '../constants/tema';

export default function EtiquetaStatus({ status }) {
  const { cor, icone } = VISUAL_STATUS[status];

  return (
    <View style={[styles.etiqueta, { backgroundColor: `${cor}26` }]}>
      <Ionicons name={icone} size={14} color={cor} />
      <Text style={[styles.texto, { color: cor }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  etiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: espacos.sm + 2,
    paddingVertical: espacos.xs + 2,
    borderRadius: raios.pilula,
  },
  texto: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: espacos.xs,
  },
});
