import { Pressable, StyleSheet, Text, View } from 'react-native';
import CapaJogo from './CapaJogo';
import { cores, espacos, raios } from '../constants/tema';

export default function CardNovidade({ jogo, titulo, data, aoPressionar }) {
  return (
    <Pressable
      onPress={aoPressionar}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      style={({ pressed }) => [styles.linha, pressed && styles.pressionado]}
    >
      <CapaJogo
        capa={[].concat(jogo.hero ?? [], jogo.capa ?? [])}
        arte={jogo.arte}
        nome={jogo.nome}
        corCapa={jogo.corCapa}
        estilo={styles.imagem}
      />
      <View style={styles.textos}>
        <Text style={styles.titulo} numberOfLines={3}>{titulo}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.lg,
    padding: espacos.sm + 2,
    marginBottom: espacos.sm + 2,
  },
  pressionado: { opacity: 0.8 },
  imagem: { width: 96, height: 76, borderRadius: raios.md },
  textos: { flex: 1, marginLeft: espacos.md },
  titulo: { color: cores.texto, fontSize: 14, fontWeight: '700', lineHeight: 19 },
  data: { color: cores.textoSecundario, fontSize: 12, marginTop: espacos.xs + 2 },
});
