import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';
import Logo from './Logo';
import { cores, espacos, raios } from '../constants/tema';

export default function Cabecalho({ perfil, aoBuscar, aoPressionarSino, aoPressionarPerfil, notificacoes = 0 }) {
  const [busca, setBusca] = useState('');

  const enviar = () => {
    aoBuscar(busca.trim());
    setBusca('');
  };

  return (
    <View style={styles.container}>
      <Logo variante="icone" largura={52} />

      <View style={styles.busca}>
        <Ionicons name="search" size={18} color={cores.textoSecundario} />
        <TextInput
          style={styles.campo}
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={enviar}
          placeholder="Buscar jogos..."
          placeholderTextColor={cores.textoSecundario}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>

      <Pressable
        onPress={aoPressionarSino}
        accessibilityRole="button"
        accessibilityLabel="Notificações"
        hitSlop={8}
        style={({ pressed }) => [styles.sino, pressed && styles.pressionado]}
      >
        <Ionicons name="notifications-outline" size={24} color={cores.texto} />
        {notificacoes > 0 ? <View style={styles.pontoSino} /> : null}
      </Pressable>

      <Pressable
        onPress={aoPressionarPerfil}
        accessibilityRole="button"
        accessibilityLabel="Abrir perfil"
        style={({ pressed }) => pressed && styles.pressionado}
      >
        <Avatar foto={perfil?.foto} nome={perfil?.nome} tamanho={42} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginBottom: espacos.md },
  busca: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.pilula,
    paddingHorizontal: espacos.md,
    marginHorizontal: espacos.sm,
  },
  campo: { flex: 1, color: cores.texto, fontSize: 15, marginLeft: espacos.sm, paddingVertical: 0 },
  sino: { marginRight: espacos.sm, padding: 2 },
  pontoSino: {
    position: 'absolute',
    top: 2,
    right: 3,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: cores.favorito,
    borderWidth: 1.5,
    borderColor: cores.fundo,
  },
  pressionado: { opacity: 0.7 },
});
