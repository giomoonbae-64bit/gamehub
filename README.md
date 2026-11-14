<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=7C3AED&height=200&section=header&text=GameHub&fontSize=64&fontColor=ffffff&desc=Minha%20Biblioteca%20Gamer&descSize=22&descAlignY=68" alt="GameHub" width="100%" />

![React Native](https://img.shields.io/badge/React_Native-7C3AED?style=for-the-badge&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-0A091C?style=for-the-badge&logo=expo&logoColor=A78BFA)
![JavaScript](https://img.shields.io/badge/JavaScript-6D28D9?style=for-the-badge&logo=javascript&logoColor=white)
![React Navigation](https://img.shields.io/badge/React_Navigation-4C1D95?style=for-the-badge&logo=react&logoColor=white)

**🎮 Descubra. Jogue. Conecte-se. 🎮**

</div>

---

## 🟣 Descrição
Aplicativo mobile feito com **React Native e Expo** para organizar a biblioteca pessoal de videogames. É possível buscar e filtrar jogos, ver os detalhes de cada um, favoritar, mudar o status (*Quero jogar*, *Jogando*, *Zerado*), cadastrar novos jogos e acompanhar uma área de comunidade e perfil.

## 👾 Aluno
**Giovanna Maria Pereira** — RGM **46228888**

## 📱 Telas

| Tela | O que faz |
| :--- | :--- |
| 🏠 **Início** | Banner de boas-vindas, resumo da biblioteca, carrossel de jogos em destaque (os mais bem avaliados), novidades e "Jogando agora". |
| 🕹️ **Jogos** | Lista de todos os jogos em cards, com busca pelo nome e filtro por status. O botão "Adicionar" abre o cadastro. |
| 🔍 **Detalhes** | Capa, desenvolvedora, nota, gênero, plataforma, descrição com "Ver mais", favoritar e alteração do status. Recebe o jogo por parâmetro de navegação. |
| 💜 **Favoritos** | Jogos marcados com o coração. |
| 💬 **Comunidade** | Feed de publicações (curtir, comentar, excluir), grupos e jogadores. |
| 👤 **Perfil** | Foto, nome, bio, jogo favorito, números da biblioteca e conquistas. |
| ✏️ **Editar perfil** | Altera os dados do perfil, que ficam salvos no aparelho. |
| ➕ **Adicionar jogo** | Cadastro de novo jogo com validação dos campos. |

## 🗄️ Fonte de dados
Dados locais em JSON/objetos JavaScript (`data/jogos.js`, `data/novidades.js`, `data/comunidade.js`), sem login.

As capas dos jogos são carregadas por URL (imagens da Steam e, quando necessário, a API pública da Wikipédia: `https://en.wikipedia.org/api/rest_v1/page/summary/`). Sem internet, o app mostra um bloco colorido com as iniciais do jogo. O perfil é salvo com AsyncStorage.

## ✅ Onde estão os requisitos

| Requisito | Onde está |
| :--- | :--- |
| 🧩 **Componentes** | `components/` (19 componentes próprios, como `CardJogo`, `CapaJogo`, `Botao`, `SeletorStatus`, `EtiquetaStatus`, `CampoTexto`, `BannerHero`) |
| 📨 **Props com callback** | `CardJogo` recebe `aoPressionar`; `SeletorStatus` recebe `aoSelecionar`; `Detalhes` recebe `aoAlterarStatus` e `aoAlternarFavorito`; `Formulario` recebe `aoAdicionar`. As funções são definidas em `App.js` |
| 🧠 **useState** | Lista de jogos em `App.js`; busca e filtro em `screens/Jogos.js`; campos e erros em `screens/Formulario.js`; texto expandido em `screens/Detalhes.js` |
| ⚡ **useEffect** | `screens/Inicio.js` (temporizador de carregamento, com limpeza); `screens/Jogos.js` (aplica o filtro recebido pela navegação); `components/BannerHero.js` (`setInterval` com `clearInterval`); `App.js` (carrega o perfil salvo) |
| 🧭 **Navegação com parâmetros** | `App.js` (abas e Stack); `navigation.navigate('Detalhes', { jogo })` em `screens/Jogos.js`, `Inicio.js` e `Favoritos.js`; `navigation.navigate('Jogos', { filtro })` em `screens/Inicio.js`. Os parâmetros são lidos em `route.params` |

## 🎬 Vídeo de demonstração
▶️ **Assistir no YouTube:** [https://youtube.com/shorts/KpWruLo7eqU](https://youtube.com/shorts/KpWruLo7eqU)

📁 **Arquivo no repositório:** [`demo/demo.mp4`](demo/demo.mp4) (o GitHub não toca vídeos grandes na página; use o botão *Download*)

## 🚀 Como executar

```bash
npm install
npx expo start
```

Escaneie o QR Code com o app **Expo Go** no celular.

> 📌 Projeto criado com **Expo SDK 58**. Use a versão mais recente do app Expo Go.

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=7C3AED&height=120&section=footer" alt="" width="100%" />

</div>
