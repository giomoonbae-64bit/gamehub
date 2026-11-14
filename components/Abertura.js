import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';
import Logo from './Logo';
import { cores, espacos } from '../constants/tema';

// Tela de abertura: a logo aparece com um zoom suave e some em seguida.
export default function Abertura({ aoTerminar }) {
  const escala = useRef(new Animated.Value(0.8)).current;
  const entrada = useRef(new Animated.Value(0)).current;
  const saida = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animacao = Animated.sequence([
      Animated.parallel([
        Animated.timing(entrada, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(escala, { toValue: 1, duration: 700, easing: Easing.out(Easing.back(1.4)), useNativeDriver: true }),
      ]),
      Animated.delay(900),
      Animated.timing(saida, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]);

    animacao.start(({ finished }) => {
      if (finished) {
        aoTerminar();
      }
    });

    return () => animacao.stop();
  }, [aoTerminar, entrada, escala, saida]);

  return (
    <Animated.View style={[styles.tela, { opacity: saida }]}>
      <Animated.View style={{ opacity: entrada, transform: [{ scale: escala }], alignItems: 'center' }}>
        <Logo largura={240} />
        <Text style={styles.frase}>Descubra. Jogue. Conecte-se.</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tela: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: cores.fundo,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  frase: { color: cores.textoSecundario, fontSize: 14, marginTop: espacos.md },
});
