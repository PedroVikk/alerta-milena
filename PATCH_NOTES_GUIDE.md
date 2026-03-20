# 📝 Guia: Como Adicionar Novidades

## Estrutura do Patch Notes

Os patch notes estão no array `PATCH_NOTES` dentro de `index.html` (linha ~431).

### Formato de um Patch

```javascript
{
  version: '1.2.0',           // Versão semântica
  date: '25 de março, 2026',  // Data legível
  items: [
    '✨ Feature 1 adicionada',
    '🐛 Bug X corrigido',
    '⚡ Performance melhorada'
  ]
}
```

## Exemplo: Adicionando v1.2.0

### Passo 1️⃣ - Abrir `index.html`

### Passo 2️⃣ - Localizar Array `PATCH_NOTES`

```javascript
const PATCH_NOTES=[
  {
    version:'1.1.0',
    date:'20 de março, 2026',
    items:[...
```

### Passo 3️⃣ - Adicionar NOVO PATCH NO INÍCIO

```javascript
const PATCH_NOTES=[
  {
    version:'1.2.0',
    date:'25 de março, 2026',
    items:[
      '🗣️ Novo sistema de mensagens diretas',
      '📊 Dashboard com estatísticas de remédios',
      '🔔 Notificações personalizáveis',
      '🎨 Novo tema opcional'
    ]
  },
  {
    version:'1.1.0',
    // ... resto do código
```

## Emojis Recomendados

| Tipo | Emoji |
|------|-------|
| Recurso novo | ✨ 🎉 🆕 |
| Correção | 🐛 ✅ 🔧 |
| Segurança | 🔐 🛡️ |
| Performance | ⚡ 🚀 |
| UI/UX | 🎨 👁️ |
| Sistema | ⚙️ 🔄 |
| Sessão/Autenticação | 🛑 🚪 ⏰ |
| Histórico | 📋 📝 |

## Exemplo de Novidades Cosméticas

```javascript
{
  version:'1.1.1',
  date:'22 de março, 2026',
  items:[
    '🎨 Ajustes visuais na paleta de cores',
    '📐 Melhor espaçamento em dispositivos pequenos',
    '🎭 Novo ícone da aplicação'
  ]
}
```

## Exemplo de Patch Corretivo

```javascript
{
  version:'1.0.1',
  date:'21 de março, 2026',
  items:[
    '🐛 Corrigido bug no check-in de próxima dose',
    '✅ Notificações de remédios agora funcionam em iOS',
    '🔧 Melhorada responsividade em telas grandes'
  ]
}
```

## Versioning (Semântico)

- **1.0.0** — Versão inicial
- **1.1.0** — Novo recurso / melhorias
- **1.1.1** — Correção de bugs
- **1.2.0** — Mais novos recursos
- **2.0.0** — Mudanças grandes/breaking changes

## Dica Importante ⚠️

Sempre adicione **novos patches no INÍCIO** do array, não no final!

```javascript
// ❌ ERRADO - adicionar ao final
const PATCH_NOTES=[
  { version:'1.1.0', ... },
  { version:'1.0.0', ... },
  { version:'1.2.0', ... }  // Versão mais recente no final?
]

// ✅ CERTO - adicionar no início
const PATCH_NOTES=[
  { version:'1.2.0', ... },  // Mais recente no início
  { version:'1.1.0', ... },
  { version:'1.0.0', ... }
]
```

## Como o Usuário Acessa

1. Abre o app
2. Toca em ⚙️ **Config.**
3. Toca em **📝 Novidades e Melhorias**
4. Ve um modal com lista de versões

## CSS Aplicado

Os cards já têm estilo bonito:
- `.patch-card` — card geral com bordas
- `.patch-version` — título azul com "🔖 v1.1.0"
- `.patch-date` — subtítulo em cinza com emoji 📅
- `.patch-item` — cada item com ✓ de checklist

Nenhum CSS adicional necessário!

---

**Última atualização**: 20 de março, 2026
**Quando adicionar**: Sempre que uma melhor for feita ao app
