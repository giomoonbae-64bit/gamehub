import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import jogosIniciais from './data/jogos';
import Inicio from './screens/Inicio';
import Jogos from './screens/Jogos';
import Favoritos from './screens/Favoritos';
import Comunidade from './screens/Comunidade';
import Perfil from './screens/Perfil';
import Detalhes from './screens/Detalhes';
import Formulario from './screens/Formulario';
import EditarPerfil from './screens/EditarPerfil';
import Abertura from './components/Abertura';
import { CORES_CAPA, cores } from './constants/tema';

const CHAVE_PERFIL = 'gamehub:perfil';

const perfilInicial = {
  nome: 'Jogador',
  usuario: 'jogador',
  bio: '',
  foto: null,
  plataformas: ['PC'],
  jogoFavoritoId: null,
  notificacoes: true,
};

const Stack = createNativeStackNavigator();
const Abas = createBottomTabNavigator();

const ICONES_ABAS = {
  Inicio: { ativo: 'home', inativo: 'home-outline' },
  Jogos: { ativo: 'game-controller', inativo: 'game-controller-outline' },
  Favoritos: { ativo: 'heart', inativo: 'heart-outline' },
  Comunidade: { ativo: 'people', inativo: 'people-outline' },
  Perfil: { ativo: 'person', inativo: 'person-outline' },
};

const temaNavegacao = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: cores.roxo,
    background: cores.fundo,
    card: cores.superficie,
    text: cores.texto,
    border: cores.borda,
  },
};

function NavegacaoPrincipal({ jogos, perfil, aoSalvarPerfil }) {
  return (
    <Abas.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: cores.roxoClaro,
        tabBarInactiveTintColor: cores.textoSecundario,
        tabBarLabelStyle: { fontSize: 10.5, fontWeight: '700' },
        tabBarStyle: styles.barraAbas,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={ICONES_ABAS[route.name][focused ? 'ativo' : 'inativo']}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Abas.Screen name="Inicio" options={{ title: 'Início' }}>
        {(props) => <Inicio {...props} jogos={jogos} perfil={perfil} />}
      </Abas.Screen>
      <Abas.Screen name="Jogos">
        {(props) => <Jogos {...props} jogos={jogos} />}
      </Abas.Screen>
      <Abas.Screen name="Favoritos">
        {(props) => <Favoritos {...props} jogos={jogos} />}
      </Abas.Screen>
      <Abas.Screen name="Comunidade">
        {(props) => <Comunidade {...props} jogos={jogos} perfil={perfil} />}
      </Abas.Screen>
      <Abas.Screen name="Perfil">
        {(props) => <Perfil {...props} jogos={jogos} perfil={perfil} aoSalvarPerfil={aoSalvarPerfil} />}
      </Abas.Screen>
    </Abas.Navigator>
  );
}

export default function App() {
  const [jogos, setJogos] = useState(jogosIniciais);
  const [perfil, setPerfil] = useState(perfilInicial);
  const [mostrandoAbertura, setMostrandoAbertura] = useState(true);
  const terminarAbertura = useCallback(() => setMostrandoAbertura(false), []);

  // O perfil (nome, foto, bio...) fica salvo no aparelho e volta quando o app abre de novo.
  useEffect(() => {
    let ativo = true;

    AsyncStorage.getItem(CHAVE_PERFIL)
      .then((salvo) => {
        if (ativo && salvo) {
          setPerfil({ ...perfilInicial, ...JSON.parse(salvo) });
        }
      })
      .catch(() => {});

    return () => {
      ativo = false;
    };
  }, []);

  const salvarPerfil = (novoPerfil) => {
    setPerfil(novoPerfil);
    AsyncStorage.setItem(CHAVE_PERFIL, JSON.stringify(novoPerfil)).catch(() => {});
  };

  const adicionarJogo = (dadosDoJogo) => {
    setJogos((atual) => {
      const novoJogo = {
        ...dadosDoJogo,
        id: `${Date.now()}`,
        nota: null,
        capa: null,
        favorito: false,
        corCapa: CORES_CAPA[atual.length % CORES_CAPA.length],
      };

      return [novoJogo, ...atual];
    });
  };

  const alterarStatus = (idDoJogo, novoStatus) => {
    setJogos((atual) =>
      atual.map((jogo) =>
        jogo.id === idDoJogo ? { ...jogo, status: novoStatus } : jogo
      )
    );
  };

  const alternarFavorito = (idDoJogo) => {
    setJogos((atual) =>
      atual.map((jogo) =>
        jogo.id === idDoJogo ? { ...jogo, favorito: !jogo.favorito } : jogo
      )
    );
  };

  return (
    <SafeAreaProvider>
      <View style={styles.raiz}>
      <StatusBar style="light" />
      <NavigationContainer theme={temaNavegacao}>
        <Stack.Navigator
          initialRouteName="Principal"
          screenOptions={{
            headerStyle: { backgroundColor: cores.superficie },
            headerTintColor: cores.texto,
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: cores.fundo },
          }}
        >
          <Stack.Screen name="Principal" options={{ headerShown: false }}>
            {() => <NavegacaoPrincipal jogos={jogos} perfil={perfil} aoSalvarPerfil={salvarPerfil} />}
          </Stack.Screen>

          <Stack.Screen name="Detalhes" options={{ headerShown: false }}>
            {(props) => (
              <Detalhes
                {...props}
                jogos={jogos}
                aoAlterarStatus={alterarStatus}
                aoAlternarFavorito={alternarFavorito}
              />
            )}
          </Stack.Screen>

 <Stack.Screen name="EditarPerfil" options={{ title: 'Editar perfil' }}>
            {(props) => <EditarPerfil {...props} jogos={jogos} perfil={perfil} aoSalvarPerfil={salvarPerfil} />}
          </Stack.Screen>

          <Stack.Screen name="Formulario" options={{ title: 'Adicionar jogo' }}>
            {(props) => <Formulario {...props} aoAdicionar={adicionarJogo} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      {mostrandoAbertura ? <Abertura aoTerminar={terminarAbertura} /> : null}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  barraAbas: {
    backgroundColor: cores.superficie,
    borderTopColor: cores.borda,
    height: 66,
    paddingTop: 6,
    paddingBottom: 8,
  },
});
