import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CapaJogo from './CapaJogo';
import Nota from './Nota';
import { cores, espacos, raios } from '../constants/tema';

export default function CardDestaque({ jogo, aoPressionar }) {
  const { nome, genero, nota, capa, arte, corCapa } = jogo;

  return (
    <Pressable
      onPress={aoPressionar}
      accessibilityRole="button"
      accessibilityLabel={`Abrir detalhes de ${nome}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressionado]}
    >
      <View>
        <CapaJogo capa={capa} arte={arte} nome={nome} corCapa={corCapa} estilo={styles.capa} />
        <LinearGradient colors={['transparent', 'rgba(20,18,49,1)']} style={styles.sombra} />
        <Nota valor={nota} tamanho={12} estilo={styles.nota} />
      </View>

      <View style={styles.rodape}>
        <Text style={styles.nome} numberOfLines={1}>{nome}</Text>
        <View style={styles.pilula}>
          <Text style={styles.textoPilula} numberOfLines={1}>{genero}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 156,
    marginRight: espacos.md,
    backgroundColor: cores.superficie,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    overflow: 'hidden',
  },
  pressionado: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  capa: { width: 156, height: 196 },
  sombra: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 70 },
  nota: {
    position: 'absolute',
    top: espacos.sm,
    right: espacos.sm,
    backgroundColor: 'rgba(10,9,28,0.75)',
    borderRadius: raios.pilula,
    paddingHorizontal: espacos.sm,
    paddingVertical: espacos.xs,
  },
  rodape: { padding: espacos.sm + 2, paddingTop: 2 },
  nome: { color: cores.texto, fontSize: 14, fontWeight: '800' },
  pilula: {
    alignSelf: 'flex-start',
    maxWidth: '100%',
    backgroundColor: 'rgba(119,64,245,0.35)',
    borderRadius: raios.sm,
    paddingHorizontal: espacos.sm + 2,
    paddingVertical: 3,
    marginTop: espacos.xs + 2,
  },
  textoPilula: { color: '#E4DAFF', fontSize: 11, fontWeight: '800' },
});
