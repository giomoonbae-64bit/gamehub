import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espacos } from '../constants/tema';

export default function SecaoTitulo({ titulo, acao, aoPressionar, estilo }) {
  return (
    <View style={[styles.linha, estilo]}>
      <View style={styles.titulo}>
        <View style={styles.barra} />
        <Text style={styles.texto}>{titulo}</Text>
      </View>

      {acao ? (
        <Pressable
          onPress={aoPressionar}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={`${acao}: ${titulo}`}
          style={({ pressed }) => [styles.acao, pressed && styles.pressionado]}
        >
          <Text style={styles.textoAcao}>{acao}</Text>
          <Ionicons name="arrow-forward" size={14} color={cores.roxoClaro} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: espacos.md,
  },
  titulo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barra: {
    width: 4,
    height: 22,
    borderRadius: 2,
    backgroundColor: cores.roxo,
    marginRight: espacos.sm,
  },
  texto: {
    color: cores.texto,
    fontSize: 19,
    fontWeight: '700',
  },
  acao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoAcao: {
    color: cores.roxoClaro,
    fontSize: 14,
    fontWeight: '600',
    marginRight: espacos.xs,
  },
  pressionado: {
    opacity: 0.7,
  },
});
