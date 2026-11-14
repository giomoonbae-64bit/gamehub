import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CapaJogo from './CapaJogo';
import EtiquetaStatus from './EtiquetaStatus';
import Nota from './Nota';
import { cores, espacos, raios } from '../constants/tema';

export default function CardJogo({ jogo, aoPressionar }) {
  const { nome, genero, plataforma, status, nota, capa, arte, corCapa, favorito } = jogo;

  return (
    <Pressable
      onPress={aoPressionar}
      accessibilityRole="button"
      accessibilityLabel={`Abrir detalhes de ${nome}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressionado]}
    >
      <CapaJogo capa={capa} arte={arte} nome={nome} corCapa={corCapa} estilo={styles.capa} />

      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={2}>
          {nome}
        </Text>
        <Text style={styles.detalhe} numberOfLines={1}>
          {genero}
        </Text>
        <View style={styles.linhaPlataforma}>
          <Ionicons name="hardware-chip-outline" size={14} color={cores.textoSecundario} />
          <Text style={styles.plataforma} numberOfLines={1}>
            {plataforma}
          </Text>
        </View>
        <EtiquetaStatus status={status} />
      </View>

      <View style={styles.lateral}>
        <Nota valor={nota} />
        {favorito ? (
          <Ionicons
            name="heart"
            size={18}
            color={cores.favorito}
            accessibilityLabel="Favorito"
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacos.sm + 4,
    marginBottom: espacos.md,
  },
  pressionado: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
  capa: {
    width: 76,
    height: 100,
    borderRadius: raios.md,
  },
  info: {
    flex: 1,
    marginHorizontal: espacos.md,
  },
  nome: {
    color: cores.texto,
    fontSize: 17,
    fontWeight: '700',
  },
  detalhe: {
    color: cores.roxoClaro,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  linhaPlataforma: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: espacos.xs,
    marginBottom: espacos.sm,
  },
  plataforma: {
    flex: 1,
    color: cores.textoSecundario,
    fontSize: 13,
    marginLeft: espacos.xs,
  },
  lateral: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: espacos.xs,
  },
});
