# Sistema de Sessão com Expiração de 12 Horas

## 📋 Visão Geral

O app agora possui um sistema de sessão que expira **a cada 12 horas**, em vez de expirar ao fechar ou recarregar o navegador. Isso melhora a segurança enquanto oferece conveniência.

## ⚙️ Como Funciona

### 1️⃣ Primeiro Acesso (ou sessão expirada)
- Usuário abre o app
- Digita o PIN (Milena ou Convidado)
- Sistema armazena `sessionStart` no localStorage
- App carrega normalmente

### 2️⃣ Reabrindo o App (mesma sessão)
- Usuário abre o app novamente
- Sistema verifica: `Date.now() - sessionStart < 12 horas?`
- ✅ Se SIM: entra direto no app (sem pedir PIN)
- ❌ Se NÃO: pede PIN novamente

### 3️⃣ Expiração Automática
- A cada 1 minuto, o app verifica se a sessão expirou
- Se expirou: faz logout automático e pede PIN novamente
- Mensagem: "⏰ Sua sessão expirou. Faça login novamente."

## 🔐 Dados Armazenados

No `localStorage`:
- `sessionStart` — timestamp de quando o PIN foi validado (em ms)
- `sessionRole` — role do usuário logado (milena ou guest)

## 📱 Comportamentos

### Cenário 1: Terminal abierto hace 6 horas
1. Usuário fecha o app
2. Abre novamente após 6 horas
3. Sistema detecta: 6h < 12h ✅
4. **Entra direto no app** (sem pedir PIN)
5. Sessioninício é renovada? **NÃO** — continua do mesmo timestamp original

### Cenário 2: Terminal abierto hace 13 horas
1. Usuário fecha o app
2. Abre novamente após 13 horas
3. Sistema detecta: 13h > 12h ❌
4. **Pede PIN novamente**
5. Após digitar PIN: novo `sessionStart` é criado

### Cenário 3: Botão "Sair da sessão"
- Usuário pode clicar em ⚙️ Configurações → 🚪 Sair da sessão
- Limpa `sessionStart` e `sessionRole` do localStorage
- Volta para tela de PIN
- Próxima reabertura do app pede PIN

## 🔧 Código Principal

### Funções de Sessão

```javascript
// Salva o timestamp de início
setSessionStart() 
  // localStorage.setItem('sessionStart', Date.now())

// Verifica se sessão é válida (<12h)
isSessionValid()
  // return Date.now() - getSessionStart() < 12*3600*1000

// Calcula tempo restante
getSessionTimeRemaining()
  // retorna ms até expiração, ou 0 se expirou

// Limpa a sessão
clearSession()
  // Remove sessionStart e sessionRole do localStorage

// Faz logout
logoutSession()
  // clearSession() + volta para PIN screen
```

### Fluxo de Inicialização

```
init()
├─ Carrega configurações (PINs, etc)
├─ Valida PINs existem?
│  └─ NÃO → initSetup() [primeira vez]
│  └─ SIM → continua...
├─ Sessão anterior válida?
│  └─ SIM → enterAppFromSession() [vai direto pro app]
│  └─ NÃO → initPin() [pede PIN]
```

## ⏱️ Constante Configurável

```javascript
const SESSION_DURATION = 12 * 3600 * 1000; // 12 horas em ms
```

Para alterar para outra duração:
- 1 hora: `1 * 3600 * 1000`
- 6 horas: `6 * 3600 * 1000`
- 24 horas: `24 * 3600 * 1000`
- 7 dias: `7 * 24 * 3600 * 1000`

## 🚀 Próximas Ideias (Opcional)

### Renovação Automática
Se quiser que a sessão se renove a cada vez que o usuário interagir:
```javascript
function touchSession() {
  setSessionStart(); // Renova o tempo a cada clique
}
// Adicionar em qualquer botão importante
document.addEventListener('click', touchSession);
```

### Mostrar Tempo Restante
Exibir contador visual do tempo de sessão:
```javascript
function showSessionTime() {
  const remaining = getSessionTimeRemaining();
  const hours = Math.floor(remaining / 3600000);
  const mins = Math.floor((remaining % 3600000) / 60000);
  console.log(`Sessão expira em: ${hours}h ${mins}m`);
}
```

### Aviso de Expiração Próxima
Se passar 11h 30m, avisar que vai expirar em breve

## ✅ Testes

- ✅ Digitar PIN → entra no app
- ✅ Fechar app → reabrir em <12h → entra direto
- ✅ Fechar app → reabrir em >12h → pede PIN
- ✅ Clicar "Sair da sessão" → volta para PIN screen
- ✅ Sessão expirada durante uso → logout automático
