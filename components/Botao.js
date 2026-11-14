import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espacos, raios } from '../constants/tema';

export default function Botao({
  titulo,
  aoPressionar,
  variante = 'primario',
  tamanho = 'normal',
  icone,
  iconeDireita,
  pilula = false,
  desabilitado = false,
  estilo,
}) {
  const secundario = variante === 'secundario';
  const pequeno = tamanho === 'pequeno';
  const corConteudo = secundario ? cores.roxoClaro : cores.texto;

  return (
    <Pressable
      onPress={aoPressionar}
      disabled={desabilitado}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      style={({ pressed }) => [
        styles.botao,
        pequeno && styles.botaoPequeno,
        pilula && styles.pilula,
        secundario ? styles.secundario : styles.primario,
        pressed && styles.pressionado,
        desabilitado && styles.desabilitado,
        estilo,
      ]}
    >
      {icone ? (
        <Ionicons
          name={icone}
          size={pequeno ? 18 : 20}
          color={corConteudo}
          style={styles.icone}
        />
      ) : null}
      <Text
        style={[
          styles.texto,
          pequeno && styles.textoPequeno,
          secundario && styles.textoSecundario,
        ]}
      >
        {titulo}
      </Text>
      {iconeDireita ? (
        <Ionicons
          name={iconeDireita}
          size={pequeno ? 18 : 20}
          color={corConteudo}
          style={styles.iconeDireita}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    minHeight: 52,
    borderRadius: raios.md,
    paddingHorizontal: espacos.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPequeno: {
    minHeight: 40,
    paddingHorizontal: espacos.md,
  },
  pilula: {
    borderRadius: raios.pilula,
  },
  primario: {
    backgroundColor: cores.roxo,
  },
  secundario: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: cores.roxo,
  },
  pressionado: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  desabilitado: {
    opacity: 0.4,
  },
  icone: {
    marginRight: espacos.sm,
  },
  iconeDireita: {
    marginLeft: espacos.sm,
  },
  texto: {
    color: cores.texto,
    fontSize: 16,
    fontWeight: '700',
  },
  textoPequeno: {
    fontSize: 14,
  },
  textoSecundario: {
    color: cores.roxoClaro,
  },
});
