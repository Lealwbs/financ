# Análise de Viabilidade de Investimentos
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

Aplicação web desenvolvida em **arquivo único HTML** (`trabalho-2/index.html`), seguindo um fluxo simples e direto em 2 etapas para análise de viabilidade econômica de projetos de investimento:

### Etapa 1: Captura de Dados
- Permite analisar um **Projeto Único** ou comparar **Projeto A vs Projeto B** (inclusive com horizontes/vidas úteis distintas de 1 a 15 anos).
- Captura a **TMA (% a.a.)**, os nomes dos projetos e os fluxos de caixa anuais ($FC_0, FC_1, \dots, FC_n$).
- Conta com botões **Analisar** e **Limpar**, além de **4 cartões clicáveis com Exemplos**:
  1. **Expansão Industrial** (projeto convencional viável)
  2. **Ponto de Fisher (A vs B)** (conflito clássico de escala entre VPL e TIR)
  3. **Vidas Úteis Diferentes** (decisão pelo Valor Anual Equivalente — VAE)
  4. **Projeto Inviável** (saldo nominal positivo, mas VPL negativo à TMA de 15% a.a.)

### Etapa 2: Relatório de Viabilidade Econômica
Após clicar em **Analisar** (ou carregar um exemplo), a aplicação exibe:
- **Parecer Executivo Automático:** Veredito claro de aceitação/rejeição ou escolha entre A e B (destacando conflitos VPL $\times$ TIR, vidas úteis diferentes e múltiplas raízes em fluxos não-convencionais).
- **Indicadores Principais:** VPL, TIR, MTIR, Payback Simples, Payback Descontado, Índice de Lucratividade (IL) e Valor Anual Equivalente (VAE).
- **Tabela Comparativa Direta:** Critério a critério (e com o **Ponto de Fisher** na comparação A vs B).
- **Gráficos Interativos (Chart.js):**
  - *Perfil do VPL ($\text{VPL} \times \text{Taxa de Desconto}$)* com marcação da TMA e do Ponto de Fisher.
  - *Fluxos Anuais & Saldo Acumulado Descontado* indicando a recuperação do investimento.
- **Cronograma Detalhado Período a Período:** Tabela ano a ano com Fluxo Nominal, Fator $(1+k)^t$, Valor Presente, Saldos Acumulados (Nominal e Descontado) e alternância entre Projeto A, Projeto B e Fluxo Incremental $(A - B)$.
- **Exportação:** Botões de **Exportar CSV** e **Imprimir / PDF**.

---

## 2. Acesso e Execução

1. **Acesso Online (GitHub Pages):**  
   [https://lealwbs.github.io/financ/trabalho-2/](https://lealwbs.github.io/financ/trabalho-2/)

2. **Execução Local Direta:**  
   Abra `trabalho-2/index.html` em qualquer navegador web moderno.

3. **Execução via Servidor Local:**
   ```bash
   python3 -m http.server 8080
   ```
   Acesse: `http://localhost:8080/trabalho-2/`

4. **Validação Matemática (Node.js):**
   ```bash
   node trabalho-2/validar_calculos.mjs
   ```

---

## 3. Atendimento Rigoroso aos 4 Critérios de Avaliação

| Critério Avaliado | Status | Como Está Atendido |
| :--- | :---: | :--- |
| **1. Execução da aplicação** | 100% | Autocontida em `trabalho-2/index.html`, com favicon SVG embutido, zero dependências de build e fallback seguro offline. |
| **2. Captura de dados** | 100% | Entrada direta para Projeto Único ou A vs B com prazos configuráveis, TMA e 4 cartões de exemplos práticos clicáveis. |
| **3. Comentários no código** | 100% | Bloco `<script>` documentado em português explicando VPL, TIR (Bisseção + Newton-Raphson), MTIR, Payback, IL, VAE e Ponto de Fisher. |
| **4. Geração de relatórios** | 100% | Parecer executivo, tabela comparativa, 2 gráficos interativos, cronograma ano a ano detalhado e exportação para PDF/CSV. |

---

## 4. Referências Bibliográficas (CAD 167 - UFMG)

1. **BERK, Jonathan; DEMARZO, Peter; HARFORD, Jarrad.** *Fundamentos de Finanças Empresariais.* Porto Alegre: Bookman, 2010.
2. **ASSAF NETO, Alexandre.** *Finanças Corporativas e Valor.* 2. ed. São Paulo: Atlas, 2007.
3. **GITMAN, Lawrence J.** *Princípios de Administração Financeira.* 7. ed. São Paulo: Addison Wesley, 2005.
4. **ROSS, Stephen A.; WESTERFIELD, Randolph W.; JAFFE, Jeffrey F.** *Administração Financeira: Corporate Finance.* 2. ed. São Paulo: Atlas, 2002.
