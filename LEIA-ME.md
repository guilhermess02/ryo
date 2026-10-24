# Ryō

App financeiro pessoal (PWA). Mesma base do DinDin, projeto e dados 100% separados. Custo: zero.

## 1. Firebase — projeto NOVO (não usar o do DinDin)
console.firebase.google.com → Adicionar projeto → nome `ryo` → plano Spark
- Authentication → Começar → ativar **E-mail/senha**
- Firestore Database → Criar banco → modo produção → `southamerica-east1`
- Firestore → **Regras** → colar `firestore.rules` → Publicar
- Configurações do projeto → Seus apps → `</>` (Web) → copiar o `firebaseConfig` para `firebase-config.js`

## 2. GitHub — repositório NOVO
- Novo repositório público `ryo` → Add file → Upload files → **todos** os arquivos + pasta `icons`
- Settings → Pages → *Deploy from a branch* → `main` / `/ (root)` → Save
- Link: `https://guilhermess02.github.io/ryo/`

## 3. Instalar no celular
Abrir o link → Compartilhar → **Adicionar à Tela de Início**. Criar a conta dentro do app (é outra conta, separada da do DinDin).

## Por que separado não dá conflito
DinDin e Ryō ficam no mesmo domínio (`guilhermess02.github.io`). Por isso:
- Firebase: projetos diferentes → login, banco e cache local separados.
- Armazenamento local e cache do app com prefixo próprio (`ryo-`).
- Subir no DinDin o `sw.js` corrigido (pasta `patch-dindin`): o atual apaga o cache de qualquer outro app do domínio.

## Trocar as imagens
Todas ficam na pasta `icons`. Para trocar, suba no GitHub um arquivo **com o mesmo nome**, por cima do antigo:
- `emblema.png` → símbolo do topo, da tela de login e do botão do meio. Quadrado, de preferência PNG com fundo transparente, ~256×256.
- `icon-512.png` (512×512), `icon-192.png` (192×192), `apple-touch-icon.png` (180×180) → ícone na tela do celular. A mesma imagem nos três tamanhos.

No iPhone, o ícone fica guardado: depois de trocar, remova o app da tela de início e adicione de novo pelo Safari.
