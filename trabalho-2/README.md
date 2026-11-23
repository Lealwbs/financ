# Analisador de Viabilidade de Investimentos
## Trabalho Prático 2 - Administração Financeira | UFMG

**Instituição:** Universidade Federal de Minas Gerais (UFMG)  
**Unidade:** Faculdade de Ciências Econômicas (FACE) / ICEX  
**Curso:** Sistemas de Informação  
**Disciplina:** CAD 167 - Administração Financeira  
**Professor:** Bruno Pérez Ferreira  
**Aluno:** Ítalo Leal Lana Santos  
**Matrícula:** 2024013893  
**Tema Central:** Gestão de Investimentos e Orçamento de Capital

---

## 1. Descrição e Estrutura da Aplicação

Aplicação web desenvolvida em **arquivo único HTML** (`trabalho-2/index.html`), seguindo a mesma arquitetura visual sóbria e didática do Trabalho 1, projetada para análise completa de projetos de investimento e decisões de orçamento de capital em fluxo de 2 etapas:

### Etapa 1: Captura de Dados de Investimentos (3 Módulos Integrados)
1. **Entrada Direta de Fluxos de Caixa ($FC_0 \dots FC_n$):**
   - Suporte a **Projeto Único** ou **Comparação de Projetos Mutuamente Excludentes (Projeto A vs Projeto B)**, inclusive com **horizontes (vidas úteis) distintos** ($1$ a $20$ anos).
   - Captura flexível de **TMA / Custo de Capital (% a.a.)** e **Taxa de Reinvestimento para MTIR** (sincronizada com a TMA por padrão ou personalizada).
   - Utilitários de produtividade: **Colar Série** (aceita números brasileiros ou decimais), **Preencher Anuidade Constante** e **Importação de Arquivos CSV** (1, 2 ou 3 colunas).
2. **Construtor de Orçamento de Capital (DRE Projetada $\rightarrow$ FCL):**
   - Calcula automaticamente o Fluxo de Caixa Livre a partir de *Capex*, Necessidade de Capital de Giro ($\text{NCG}$), Receita Inicial e Taxa de Crescimento, Custos Fixos e Variáveis, Depreciação Linear (*Tax Shield*), Alíquota de IR/CSLL (padrão Lucro Real 34%) e Valor Residual líquido de imposto ao fim da vida útil.
3. **Calculadora Auxiliar de TMA (WACC & CAPM):**
   - Estima o custo do capital próprio via CAPM ($K_e = R_f + \beta(R_m - R_f)$), o custo da dívida líquido de imposto ($K_d(1 - T_c)$) e o $\text{WACC}$, aplicando o resultado diretamente à TMA do projeto.
4. **4 Exemplos Práticos Clicáveis (CAD 167):**
   - *1. Expansão Industrial* (fluxo convencional padrão)
   - *2. Ponto de Fisher (A vs B)* (conflito clássico de escala entre VPL e TIR)
   - *3. Vidas Úteis Diferentes* (decisão pelo Valor Anual Equivalente — VAE)
   - *4. Orçamento Completo (DRE $\rightarrow$ FCL)* (construção incremental com impostos, depreciação e NCG)

### Etapa 2: Relatório Executivo, Gráficos e Risco
Após executar a análise, a aplicação revela o módulo de relatórios completos:
- **Parecer Executivo Automático:** Veredito claro de aceitação ou rejeição, diagnóstico automático de conflito VPL $\times$ TIR, alerta de múltiplas TIRs em fluxos não-convencionais e critério de VAE para vidas distintas.
- **Indicadores Principais (KPIs) e Tabela Comparativa Direta:** VPL, VAE, TIR, MTIR, Payback Simples, Payback Descontado, Índice de Lucratividade (IL) e Ponto de Intersecção de Fisher.
- **Gráficos Interativos (Chart.js):**
  - *Perfil do VPL ($\text{VPL} \times \text{Taxa de Desconto}$)* com marcação da TMA atual e destaque visual do **Ponto de Fisher**.
  - *Fluxos Anuais & Saldo Acumulado Descontado*, evidenciando o ponto de recuperação do Payback Descontado.
  - *Gráfico Tornado de Sensibilidade ($\pm 20\%$)* nos principais direcionadores de valor.
- **Análise de Cenários, Risco e Margem de Segurança:** Cenários *Pessimista, Base e Otimista* editáveis com cálculo de $E[\text{VPL}]$, Desvio-Padrão ($\sigma$), Coeficiente de Variação ($CV$) e tabela de **Ponto de Equilíbrio Financeiro ($\text{VPL} = 0$)**.
- **Cronograma Detalhado Ano a Ano:** Fluxo Nominal ($FC_t$), Fator $(1+k)^t$, Valor Presente ($VP_t$), Saldo Acumulado Nominal e Descontado, com alternância entre Projeto A, Projeto B e Fluxo Incremental $(A - B)$.
- **Exportação Direta:** Botões de **Imprimir / Salvar PDF** (folha `@media print` dedicada) e **Exportar CSV** (UTF-8 com BOM para Excel PT-BR).

---

## 2. Metodologia Financeira e Fórmulas Implementadas

1. **Valor Presente Líquido (VPL):**
   $$\text{VPL}(k) = \sum_{t=0}^{n} \frac{FC_t}{(1+k)^t}$$
2. **Taxa Interna de Retorno (TIR):** Raiz(es) real(is) $r > -1$ de $\text{VPL}(r) = 0$, obtida(s) por varredura de domínio combinada com método híbrido **Bisseção + Newton-Raphson**, tratando inclusive fluxos não-convencionais com múltiplas raízes (Regra dos Sinais de Descartes).
3. **TIR Modificada (MTIR):**
   $$\text{MTIR} = \left(\frac{\sum_{t=0}^{n} \max(0, FC_t)\,(1+k_{\text{reinv}})^{n-t}}{\sum_{t=0}^{n} \frac{\max(0, -FC_t)}{(1+k_{\text{fin}})^t}}\right)^{\frac{1}{n}} - 1$$
4. **Payback Simples e Descontado:** Período fracionário exato de recuperação definitiva do capital investido por interpolação linear sobre o saldo acumulado nominal ou descontado à TMA.
5. **Índice de Lucratividade (IL):** $\text{IL} = \frac{VP(\text{Fluxos futuros})}{|FC_0|} = 1 + \frac{\text{VPL}}{|FC_0|}$ (para $FC_0 < 0$).
6. **Valor Anual Equivalente (VAE / EAA):**
   $$\text{VAE} = \text{VPL} \times \frac{k}{1 - (1+k)^{-n}}$$
7. **Ponto de Fisher:** Taxa de desconto $r_F$ onde $\text{VPL}_A(r_F) = \text{VPL}_B(r_F)$, calculada como a TIR do fluxo incremental $(FC_A - FC_B)$.
8. **Orçamento de Capital (FCL):**
   $$FCO_t = (\text{Receita}_t - \text{Custos}_t - \text{Dep}_t)(1 - T_c) + \text{Dep}_t$$

---

## 3. Acesso, Execução e Validação

1. **Acesso Online (GitHub Pages):**  
   - Trabalho 2: [https://lealwbs.github.io/financ/trabalho-2/](https://lealwbs.github.io/financ/trabalho-2/)  
   - Trabalho 1 (mantido intacto na raiz): [https://lealwbs.github.io/financ/](https://lealwbs.github.io/financ/)

2. **Execução Local Direta:**  
   Abra `trabalho-2/index.html` em qualquer navegador web moderno (Chrome, Firefox, Edge, Safari).

3. **Execução via Servidor Local:**
   ```bash
   python3 -m http.server 8080
   ```
   Acesse: `http://localhost:8080/trabalho-2/`

4. **Execução da Suíte de Validação Matemática (Node.js):**
   ```bash
   node trabalho-2/validar_calculos.mjs
   ```
   Executa 6 blocos de verificação diretamente contra o código-fonte de `trabalho-2/index.html` (projeto padrão, Ponto de Fisher, vidas úteis distintas, DRE $\rightarrow$ FCL, múltiplas TIRs e integração WACC/CAPM).

---

## 4. Atendimento Rigoroso aos 4 Critérios de Avaliação

| Critério Avaliado | Status | Como Está Atendido |
| :--- | :---: | :--- |
| **1. Execução da aplicação** | 100% | Autocontida em `trabalho-2/index.html` com favicon SVG embutido, zero dependências de build, tratamento de casos de borda e fallback seguro offline. |
| **2. Captura de dados** | 100% | 3 modos integrados de entrada (Fluxos Diretos A/B, Construtor DRE $\rightarrow$ FCL e Calculadora WACC/CAPM), colagem rápida em lote, importação CSV e 4 exemplos práticos clicáveis. |
| **3. Comentários no código** | 100% | Todo o HTML, CSS e bloco `<script>` documentados em português, explicando cada fórmula financeira, método numérico (Bisseção + Newton-Raphson) e regra de decisão. |
| **4. Geração de relatórios** | 100% | Parecer executivo automático, tabela comparativa A vs B, 3 gráficos interativos (Perfil VPL/Fisher, Fluxos/Payback e Tornado), análise de cenários, ponto de equilíbrio, cronograma anual e exportação para PDF e CSV. |

---

## 5. Referências Bibliográficas (CAD 167 - UFMG)

1. **BERK, Jonathan; DEMARZO, Peter; HARFORD, Jarrad.** *Fundamentos de Finanças Empresariais.* Porto Alegre: Bookman, 2010.
2. **ASSAF NETO, Alexandre.** *Finanças Corporativas e Valor.* 2. ed. São Paulo: Atlas, 2007.
3. **GITMAN, Lawrence J.** *Princípios de Administração Financeira.* 7. ed. São Paulo: Addison Wesley, 2005.
4. **ROSS, Stephen A.; WESTERFIELD, Randolph W.; JAFFE, Jeffrey F.** *Administração Financeira: Corporate Finance.* 2. ed. São Paulo: Atlas, 2002.
5. **BREALEY, Richard A.; MYERS, Stewart C.; ALLEN, Franklin.** *Princípios de Finanças Corporativas.* São Paulo: McGraw-Hill, 2008.
6. **DAMODARAN, Aswath.** *Finanças Corporativas: Teoria e Prática.* 2. ed. Porto Alegre: Bookman, 2004.
