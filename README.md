# CAD 167 - Administracao Financeira | UFMG
## Trabalho Pratico 1: Simulador Avancado de Amortizacao (SAC e Tabela Price)

**Instituicao:** Universidade Federal de Minas Gerais (UFMG)  
**Unidade:** Faculdade de Ciencias Economicas (FACE) / ICEX  
**Curso:** Sistemas de Informacao  
**Disciplina:** CAD 167 - Administracao Financeira  
**Professor:** Bruno Perez Ferreira  
**Aluno:** Ítalo Leal Lana Santos  
**Matricula:** 2024013893  
**Tema Central:** Valor do Dinheiro no Tempo (Time Value of Money - TVM)

---

## 1. Descricao e Modos de Calculo

Aplicacao desenvolvida em **arquivo unico HTML** (`index.html`) para analise quantitativa aprofundada de fluxos de caixa e sistemas de amortizacao (SAC e Tabela Price). 

A aplicacao oferece tres objetivos de calculo integrados:
1. **Calcular Parcela e Cronograma (Direto):** Informa-se Valor do Bem, Entrada, Taxa e Prazo; o sistema calcula o $PMT$, $A_t$, $J_t$ e $SD_t$.
2. **Capacidade de Financiamento (Reverso por Parcela):** Informa-se a parcela pretendida que cabe no orcamento do tomador; o sistema calcula o Valor Presente maximo financiável ($PV$).
3. **Descobrir Taxa Implicita / Custo Efetivo (TIR via Newton-Raphson):** Informa-se o valor financiado e a parcela cobrada pelo banco; o sistema deduz a taxa real de juros contratual via convergencia numerica.

Parametros complementares de mercado:
- **Entrada Inicial (Down Payment):** Abatimento automatico do principal financiado.
- **Custo Efetivo Total (CET):** Inclusao de taxas mensais operacionais e seguros (ex: MIP/DFI).
- **Taxa de Juros Real (Equacao de Fisher):** Desconto da inflacao anual projetada (IPCA) sobre a taxa nominal.

---

## 2. Acesso e Execucao

A aplicacao e 100% autonoma, responsiva e nao requer instalacao:

1. **Acesso Online (GitHub Pages):**  
   [https://lealwbs.github.io/financ/](https://lealwbs.github.io/financ/)

2. **Execucao Local Direta:**  
   Basta abrir `index.html` em qualquer navegador web.

3. **Execucao via Servidor Local:**
   ```bash
   python -m http.server 8080 --directory d:\Code\financ
   ```
   Acesse: `http://localhost:8080`

---

## 3. Atendimento Rigoroso aos 4 Criterios de Avaliacao

| Criterio Avaliado | Implementacao no Projeto |
| :--- | :--- |
| **1. Execucao da aplicacao** | Funciona perfeitamente em arquivo unico (`index.html`), sem falhas de carregamento ou erros de console. |
| **2. Captura de dados** | Captura dinamica multidirecional ($PV$, $PMT$, $i$, $n$), com selecao de sistema (SAC ou Price), entrada, taxas mensais e inflacao, alem de 3 cenarios rapidos clicaveis. |
| **3. Comentarios no codigo** | Bloco `<script>` detalhadamente comentado com as formulas de TVM, deducao do FRC (Price), amortizacao linear (SAC), algoritmo de Newton-Raphson para TIR e equacao de Fisher. |
| **4. Geracao de relatorios** | Produz relatorio sintetico com indicadores financeiros chave ($PMT_1$, $PMT_n$, desembolso total, juros totais, CET e taxa real), demonstrativo comparativo com diferenca nominal de juros, parecer analitico, grafico temporal de amortizacao e tabela completa mes a mes. |

---

## 4. Fundamentacao Matematica e Formulas

### Tabela Price (Sistema Frances de Anuidade Uniforme)
- Fator de Recuperacao de Capital (FRC):
  $$PMT = PV \cdot \frac{i(1 + i)^n}{(1 + i)^n - 1}$$
- Juros mensais: $J_t = SD_{t-1} \cdot i$
- Amortizacao mensal crescente: $A_t = PMT - J_t$
- Saldo devedor: $SD_t = SD_{t-1} - A_t$

### Sistema de Amortizacao Constante (SAC)
- Amortizacao constante:
  $$A = \frac{PV}{n}$$
- Juros mensais decrescentes: $J_t = SD_{t-1} \cdot i$
- Parcela decrescente: $PMT_t = A + J_t + \text{taxas}$
- Saldo devedor linear: $SD_t = SD_{t-1} - A$

### Taxa Interna de Retorno (TIR) via Newton-Raphson
Para resolver a taxa implicita $i$ dada a parcela $PMT$:
$$f(i) = PV - PMT \cdot \frac{1 - (1 + i)^{-n}}{i} = 0$$
Iteracao numerica:
$$i_{k+1} = i_k - \frac{f(i_k)}{f'(i_k)}$$

### Taxa de Juros Real (Equacao de Fisher)
$$(1 + i_{nominal}) = (1 + r_{real})(1 + \pi) \implies r_{real} = \frac{1 + i_{nominal}}{1 + \pi} - 1$$

---

## 5. Referencias Bibliograficas (Programa Oficial CAD 167)

1. **BERK, Jonathan; DEMARZO, Peter; HARFORD, Jarrad.** *Fundamentos de Financas Empresariais.* Porto Alegre: Bookman, 2010.
2. **ASSAF NETO, Alexandre.** *Financas Corporativas e Valor.* 2. ed. Sao Paulo: Atlas, 2007.
3. **GITMAN, Lawrence J.** *Principios de Administracao Financeira.* 7. ed. Sao Paulo: Addison Wesley, 2005.
