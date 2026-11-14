import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { GRADIENTES, cores, espacos, raios } from '../constants/tema';

const MEMBROS = ['ML', 'CV', 'BN', 'RD'];

export default function CardComunidade({ aoPressionar }) {
  return (
    <Pressable
      onPress={aoPressionar}
      disabled={!aoPressionar}
      accessibilityRole="button"
      accessibilityLabel="Entrar na comunidade"
      style={({ pressed }) => pressed && styles.pressionado}
    >
      <LinearGradient
        colors={GRADIENTES.comunidade}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.icone}>
          <Ionicons name="people" size={36} color={cores.roxoClaro} />
        </View>

        <View style={styles.textos}>
          <Text style={styles.titulo}>Faça parte da nossa comunidade!</Text>
          <Text style={styles.descricao}>
            Converse, compartilhe suas conquistas e encontre outros jogadores.
          </Text>
          <View style={styles.rodape}>
            <View style={styles.membros}>
              {MEMBROS.map((iniciais, posicao) => (
                <View key={iniciais} style={[styles.membro, posicao > 0 && styles.sobreposto]}>
                  <Text style={styles.iniciais}>{iniciais}</Text>
                </View>
              ))}
            </View>
            {aoPressionar ? (
              <View style={styles.botao}>
                <Text style={styles.textoBotao}>Entrar na comunidade</Text>
                <Ionicons name="arrow-forward" size={15} color={cores.texto} />
              </View>
            ) : null}
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressionado: { opacity: 0.85 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: raios.xl,
    padding: espacos.md,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  icone: { width: 62, height: 62, borderRadius: 31, backgroundColor: 'rgba(119,64,245,0.28)', alignItems: 'center', justifyContent: 'center', marginRight: espacos.md },
  textos: { flex: 1 },
  titulo: { color: cores.texto, fontSize: 17, fontWeight: '800', lineHeight: 22 },
  descricao: { color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 18, marginTop: espacos.xs },
  rodape: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: espacos.md - 2 },
  membros: { flexDirection: 'row' },
  membro: { width: 28, height: 28, borderRadius: 14, backgroundColor: cores.superficieClara, borderWidth: 2, borderColor: '#2A1B77', alignItems: 'center', justifyContent: 'center' },
  sobreposto: { marginLeft: -9 },
  iniciais: { color: cores.roxoClaro, fontSize: 9, fontWeight: '800' },
  botao: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.roxo, borderRadius: raios.pilula, paddingHorizontal: espacos.md - 2, paddingVertical: 7 },
  textoBotao: { color: cores.texto, fontSize: 12, fontWeight: '800', marginRight: 5 },
});
