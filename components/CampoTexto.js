import { StyleSheet, Text, TextInput, View } from 'react-native';
import { cores, espacos, raios } from '../constants/tema';

export default function CampoTexto({
  rotulo,
  value,
  onChangeText,
  erro,
  obrigatorio = false,
  multiline = false,
  ...resto
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>
        {rotulo}
        {obrigatorio ? <Text style={styles.asterisco}> *</Text> : null}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.multilinha, erro && styles.inputErro]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={cores.textoSecundario}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...resto}
      />
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: espacos.md,
  },
  rotulo: {
    color: cores.texto,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: espacos.sm,
  },
  asterisco: {
    color: cores.roxo,
  },
  input: {
    minHeight: 50,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.md,
    paddingHorizontal: espacos.md,
    color: cores.texto,
    fontSize: 16,
  },
  multilinha: {
    minHeight: 110,
    paddingTop: espacos.md,
  },
  inputErro: {
    borderColor: cores.erro,
  },
  erro: {
    color: cores.erro,
    fontSize: 13,
    marginTop: espacos.xs,
  },
});
