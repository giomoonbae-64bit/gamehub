import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OPCOES_STATUS, cores, espacos, raios } from '../constants/tema';

export default function SeletorStatus({
  valor,
  aoSelecionar,
  opcoes = OPCOES_STATUS,
  rolavel = false,
}) {
  const chips = opcoes.map((opcao) => {
    const ativo = opcao.valor === valor;

    return (
      <Pressable
        key={opcao.valor}
        onPress={() => aoSelecionar(opcao.valor)}
        accessibilityRole="button"
        accessibilityState={{ selected: ativo }}
        style={({ pressed }) => [
          styles.chip,
          ativo && styles.chipAtivo,
          pressed && styles.chipPressionado,
        ]}
      >
        <Text style={[styles.texto, ativo && styles.textoAtivo]}>{opcao.rotulo}</Text>
      </Pressable>
    );
  });

  // Em listas de filtro, os chips ficam em uma única linha que rola na horizontal.
  if (rolavel) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.rolagem}
        contentContainerStyle={styles.rolagemConteudo}
      >
        {chips}
      </ScrollView>
    );
  }

  return <View style={styles.linha}>{chips}</View>;
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rolagem: {
    marginHorizontal: -espacos.md,
  },
  rolagemConteudo: {
    paddingHorizontal: espacos.md,
  },
  chip: {
    minHeight: 44,
    paddingHorizontal: espacos.md,
    justifyContent: 'center',
    borderRadius: raios.pilula,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    marginRight: espacos.sm,
    marginBottom: espacos.sm,
  },
  chipAtivo: {
    backgroundColor: cores.roxo,
    borderColor: cores.roxo,
  },
  chipPressionado: {
    opacity: 0.75,
  },
  texto: {
    color: cores.textoSecundario,
    fontSize: 14,
    fontWeight: '600',
  },
  textoAtivo: {
    color: cores.texto,
  },
});
