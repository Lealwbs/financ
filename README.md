# CAD 167 - Administracao Financeira | UFMG
## Trabalho Pratico 1: Calculadora Completa de Financiamento (SAC e Tabela Price)

**Instituicao:** Universidade Federal de Minas Gerais (UFMG)  
**Unidade:** Faculdade de Ciencias Economicas (FACE) / ICEX  
**Curso:** Sistemas de Informacao  
**Disciplina:** CAD 167 - Administracao Financeira  
**Professor:** Bruno Perez Ferreira  
**Aluno:** Ítalo Leal Lana Santos  
**Matricula:** 2024013893  
**Tema Central:** Valor do Dinheiro no Tempo (Time Value of Money - TVM)

---

## 1. Descricao da Aplicacao

Aplicacao desenvolvida em **arquivo unico HTML** (`index.html`), projetada como uma **calculadora universal de financiamento** capaz de resolver qualquer uma das variaveis centrais de um contrato de credito no regime de juros compostos:

- **Valor da Parcela ($PMT$):** Dados Valor do Bem, Entrada, Taxa e Prazo.
- **Valor do Bem / Financiado ($PV$):** Dados Parcela Pretendida, Entrada, Taxa e Prazo.
- **Taxa de Juros ($i$ / TIR):** Dados Valor Financiado, Parcela e Prazo (via Newton-Raphson).
- **Prazo de Pagamento ($n$):** Dados Valor Financiado, Parcela e Taxa (via deducao logaritmica).

O sistema tambem contempla:
- **Tabela SAC e Tabela Price:** Cronogramas detalhados com alternador de abas e confrontacao direta de custos.
- **Simulacao de Amortizacao Mensal Extra:** Permite definir um aporte adicional mensal para calcular a reducao exata de meses/anos e a economia nominal de juros pagos ao banco.
- **Cenarios Didaticos:** Botoes sucintos sem poluicao de valores (*Exemplo de Aula*, *Financiamento Imobiliario*, *Credito Veicular* e *Emprestimo Pessoal*).

---

## 2. Acesso e Execucao

1. **Online (GitHub Pages):**  
   [https://lealwbs.github.io/financ/](https://lealwbs.github.io/financ/)

2. **Execucao Local Direta:**  
   Abra `index.html` em qualquer navegador.

3. **Execucao via Servidor Local:**
   ```bash
   python -m http.server 8080 --directory d:\Code\financ
   ```
   Acesse: `http://localhost:8080`

---

## 3. Atendimento Rigoroso aos 4 Criterios de Avaliacao

| Criterio Avaliado | Status | Implementacao no Codigo |
| :--- | :---: | :--- |
| **1. Execucao da aplicacao** | 100% | Codigo 100% autocontido em `index.html`, executavel em qualquer navegador sem compiladores ou dependencias locais. |
| **2. Captura de dados** | 100% | Captura flexivel das variaveis ($PV$, Entrada, $PMT$, $i$, $n$), aporte mensal extra, e 4 cenarios didaticos clicaveis. |
| **3. Comentarios no codigo** | 100% | Bloco `<script>` detalhadamente documentado explicando a matematica financeira de cada equacao e algoritmo. |
| **4. Geracao de relatorios** | 100% | Resumo executivo com KPIs, comparativo direto SAC vs Price, calculo de economia por amortizacao mensal, grafico interativo e tabelas completas mes a mes. |

---

## 4. Fundamentacao Matematica

### 1. Parcela na Tabela Price (Anuidade Uniforme)
$$PMT = PV \cdot \frac{i(1 + i)^n}{(1 + i)^n - 1}$$

### 2. Valor Presente (Capacidade de Financiamento)
$$PV = PMT \cdot \frac{(1 + i)^n - 1}{i(1 + i)^n}$$

### 3. Prazo em Meses
$$n = \frac{-\ln\left(1 - \frac{PV \cdot i}{PMT}\right)}{\ln(1 + i)}$$

### 4. Taxa de Juros (TIR via Newton-Raphson)
$$f(i) = PV - PMT \cdot \frac{1 - (1 + i)^{-n}}{i} = 0 \implies i_{k+1} = i_k - \frac{f(i_k)}{f'(i_k)}$$

### 5. Sistema de Amortizacao Constante (SAC)
$$A = \frac{PV}{n}, \quad J_t = SD_{t-1} \cdot i, \quad PMT_t = A + J_t, \quad SD_t = SD_{t-1} - A$$

---

## 5. Referencias Bibliograficas (CAD 167 - UFMG)

1. **BERK, Jonathan; DEMARZO, Peter; HARFORD, Jarrad.** *Fundamentos de Financas Empresariais.* Porto Alegre: Bookman, 2010.
2. **ASSAF NETO, Alexandre.** *Financas Corporativas e Valor.* 2. ed. Sao Paulo: Atlas, 2007.
3. **GITMAN, Lawrence J.** *Principios de Administracao Financeira.* 7. ed. Sao Paulo: Addison Wesley, 2005.
