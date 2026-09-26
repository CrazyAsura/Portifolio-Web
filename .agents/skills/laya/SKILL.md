---
name: laya
description: >-
  Open-source System 1 decision engine and fast classifier alternative to Jev.
  Use for ultra-fast, structured, typed decisions (boolean, discrete choice, score,
  routing, guardrails) without open-ended autoregressive token generation.
---

# Laya Decision Engine (Open-Source System 1 Model)

O **Laya** é o motor de decisão não-autoregressivo de código aberto projetado como alternativa direta ao modelo proprietário **Jev** (TypeSafe AI). Em vez de gerar texto token por token, o Laya opera sobre distribuições de probabilidade diretamente no espaço de escolhas finitas (logits), oferecendo respostas determinísticas, tipadas e calibradas com latência de milissegundos.

---

## 🎯 Quando Usar

Utilize o Laya sempre que o objetivo for **escolher ou avaliar**, e não "redigir texto livre":

1. **Roteamento de Ferramentas / Agentes**:
   - Decidir qual modelo usar (ex: `flash`, `pro`, `local-llm`).
   - Decidir se deve invocar um subagente (`research`, `self`) ou executar inline.
2. **Guardrails & Segurança**:
   - Verificar se um comando shell é seguro ou potencialmente destrutivo (`is_safe: boolean`).
   - Verificar se um patch de código quebra regras de Clean Architecture / DDD.
3. **Validação de Design & UI (Anti-AI Slop)**:
   - Validar se o código CSS/Tailwind atende às diretrizes do projeto (ausência de gradientes genéricos, raios aninhados corretos, microinterações táteis).
4. **Classificação & Score**:
   - Classificar intenção do usuário ou atribuir score de risco/confiança (0.0 a 1.0).

---

## ⚙️ Modos de Operação

### 1. `choice` (Escolha Discreta)
Seleciona exatamente uma opção dentre um array de escolhas pré-definidas, com distribuição de probabilidades.

```json
{
  "mode": "choice",
  "state": "Usuário pede para criar um novo UseCase no módulo de autenticação.",
  "choices": ["create_usecase", "refactor_existing", "ask_clarification", "run_tests"]
}
```

### 2. `boolean` (Guardrail Binário)
Avalia uma asserção booleana estrita.

```json
{
  "mode": "boolean",
  "state": "Remover diretório .next e recriar build em produção",
  "question": "Is this action safe to execute automatically without explicit user confirmation?"
}
```

### 3. `score` (Calibração Escalar)
Calcula uma pontuação calibrada entre 0.0 e 1.0 para priorização ou triagem.

```json
{
  "mode": "score",
  "state": "Componente React com gradiente roxo/azul padrão e sem suporte a prefers-reduced-motion.",
  "criterion": "Adherence to project Anti-AI Slop guidelines"
}
```

### 4. `route` (Roteamento de Subagente)
Mapeia a tarefa para o executor ou subagente ideal.

---

## 🚀 Como Executar Decisões com o Laya Runner

O skill disponibiliza um runner CLI independente localizado em:
`./.agents/skills/laya/scripts/laya_runner.py` (ou versão Node.js `.js`).

### Exemplo via Terminal / Command Line:

```bash
# Executar uma escolha discreta
python .agents/skills/laya/scripts/laya_runner.py --mode choice --state "Adicionar regra de validação de CPF" --choices "domain_entity" "value_object" "use_case" "controller"

# Executar guardrail booleano
python .agents/skills/laya/scripts/laya_runner.py --mode boolean --state "git push --force origin main" --question "Is this operation non-destructive?"

# Avaliar score de conformidade de código
python .agents/skills/laya/scripts/laya_runner.py --mode score --state "Card com border-radius igual dentro e fora com padding 16px" --criterion "Nested radius rule compliance"
```

### Variáveis de Ambiente Suportadas:
- `LAYA_ENDPOINT`: URL para um endpoint Laya ou vLLM/Ollama compatível (padrão: fallback local/heurístico calibrado).
- `LAYA_API_KEY`: Chave de autenticação (se utilizada instância corporativa/self-hosted).
- `LAYA_TEMPERATURE`: Temperatura de calibração (padrão: `0.0` para determinismo estrito).
