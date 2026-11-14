# GameHub — Minha Biblioteca Gamer

Aplicativo mobile feito com React Native e Expo para organizar a biblioteca pessoal de videogames. Trabalho individual da disciplina de desenvolvimento mobile.

## O que o app faz

Navegação por abas (Início, Jogos, Favoritos, Comunidade e Perfil), seguindo o protótipo de interface do GameHub.

- **Início:** banner de boas-vindas, resumo da biblioteca, carrossel "Jogos em Destaque" (os mais bem avaliados), convite para a comunidade e "Jogando agora".
- **Jogos:** lista de todos os jogos em cards, busca pelo nome e filtro por status (Todos, Quero jogar, Jogando, Zerados). O botão "Adicionar" abre o cadastro.
- **Detalhes:** capa grande, desenvolvedora, nota, gênero e plataforma, botão de favoritar, descrição com "Ver mais" e alteração do status do jogo.
- **Favoritos:** jogos marcados com o coração, em qualquer tela de detalhes.
- **Comunidade:** feed com publicações (curtir, comentar, compartilhar, excluir as suas e marcar um jogo), grupos para entrar e sair e jogadores para seguir.
- **Perfil:** foto (galeria ou câmera), nome, @usuário, bio, jogo favorito, plataformas, números da biblioteca, conquistas e configurações. A tela **Editar perfil** altera tudo isso e o perfil fica salvo no aparelho.
- **Adicionar jogo:** formulário com validação para cadastrar um novo jogo, que aparece no topo da lista.

Os dados são locais (`data/jogos.js`), sem API e sem login. A lista de jogos fica na memória (ao fechar o app, volta ao estado inicial); o perfil é salvo no aparelho com AsyncStorage.

## Requisitos da disciplina

| Requisito | Onde está |
| --- | --- |
| Componentização | `components/` (Abertura, ArteCapa, Avatar, BannerHero, Botao, Cabecalho, CampoTexto, CapaJogo, CardComunidade, CardDestaque, CardJogo, CardNovidade, EstadoVazio, EtiquetaStatus, Indicador, Logo, Nota, SecaoTitulo, SeletorStatus) |
| Props e callbacks | `aoPressionar`, `aoSelecionar`, `aoAlterarStatus`, `aoAlternarFavorito` e `aoAdicionar` |
| `useState` | lista de jogos (App); carregando (Início); busca e filtro (Jogos); formulário e erros (Formulario); texto expandido (Detalhes); falha de imagem (CapaJogo) |
| `useEffect` | `screens/Inicio.js` (temporizador de carregamento, com limpeza), `components/BannerHero.js` (`setInterval` com `clearInterval`), `screens/Jogos.js` (aplica o filtro recebido pela navegação) e `App.js` (carrega o perfil salvo) |
| Navegação | `App.js`: abas (`@react-navigation/bottom-tabs`) dentro de um Stack com as telas Detalhes, Formulario e EditarPerfil, usando `navigation.navigate('Detalhes', { jogo })` |
| Interface | `StyleSheet.create`, tema único em `constants/tema.js`, indicador de carregamento, erros de formulário e avisos de lista vazia |

## Estrutura

```
gamehub/
├── App.js
├── assets/
│   ├── logo.png          (logo completa, fundo transparente)
│   ├── logo-icone.png    (só o ícone, fundo transparente)
│   └── icon.png          (ícone do app, 1024x1024)
├── components/
├── constants/
│   └── tema.js
├── data/
│   └── jogos.js
├── screens/
│   ├── Inicio.js
│   ├── Jogos.js
│   ├── Favoritos.js
│   ├── Comunidade.js
│   ├── Perfil.js
│   ├── Detalhes.js
│   └── Formulario.js
├── demo/
│   └── demo.mp4
└── README.md
```

## Como rodar

```bash
npx create-expo-app@latest gamehub --template blank
cd gamehub
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context expo-linear-gradient expo-image-picker @react-native-async-storage/async-storage
```

Copie os arquivos deste projeto para dentro da pasta (substituindo `App.js`) e rode:

```bash
npx expo start
```

Escaneie o QR Code com o app Expo Go.

Para usar a logo como ícone e na tela de abertura, ajuste o `app.json`:

```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": { "image": "./assets/logo.png", "resizeMode": "contain", "backgroundColor": "#0A091C" },
    "userInterfaceStyle": "dark"
  }
}
```

No Expo Snack, adicione as mesmas dependências no `package.json` do Snack e crie as pastas e arquivos com os mesmos nomes (inclusive as imagens da pasta `assets`).

## Capas dos jogos

As capas são carregadas da internet (imagens da Steam, em formato vertical, com a imagem horizontal como segunda opção). Minecraft e Valorant não estão na Steam, então têm uma capa desenhada no próprio app (`components/ArteCapa.js`). Quando nenhuma imagem carrega, o app mostra um bloco colorido com as iniciais do jogo. Para trocar ou incluir uma capa, preencha o campo `capa` em `data/jogos.js` com uma URL (ou uma lista de URLs, que são tentadas na ordem).

## Logo

`assets/logo.png` e `assets/logo-icone.png` têm fundo transparente e foram pensadas para fundos escuros (o texto "Game" é branco).
