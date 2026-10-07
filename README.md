# Calculadora de Financiamento
## Trabalho Pratico 1 - Administracao Financeira | UFMG

**Instituicao:** Universidade Federal de Minas Gerais (UFMG)  
**Unidade:** Faculdade de Ciencias Economicas (FACE) / ICEX  
**Curso:** Sistemas de Informacao  
**Disciplina:** CAD 167 - Administracao Financeira  
**Professor:** Bruno Perez Ferreira  
**Aluno:** Ítalo Leal Lana Santos  
**Matricula:** 2024013893  
**Tema Central:** Valor do Dinheiro no Tempo (Time Value of Money - TVM)

---

## 1. Descricao e Estrutura da Aplicacao

Aplicacao web desenvolvida em **arquivo unico HTML** (`index.html`), inspirada na interface oficial da **Calculadora do Cidadao (Banco Central do Brasil - BACEN)** integrada a um modulo completo de **Simulacao de Amortizacao de Financiamento**:

### Etapa 1: Calculadora de Financiamento com Prestacoes Fixas (Estilo BACEN)
Permite ao usuario calcular qualquer uma das 4 variaveis fundamentais do financiamento:
1. **Nº de meses ($n$)**
2. **Taxa de juros mensal ($i$)** (resolvida via convergencia numerica de *Newton-Raphson*)
3. **Valor da prestacao ($PMT$)**
4. **Valor financiado ($PV$)**

Possui botoes **Calcular** e **Limpar**, alem de 4 cartoes clicaveis com **Exemplos de Calculo** que carregam e resolvem os cenarios instantaneamente.

### Etapa 2: Simulacao de Amortizacao de Financiamento
Apos calcular as condicoes iniciais, o sistema projeta a liquidacao do passivo:
- **Tabela Comparativa Direta (Sem Amortizacao vs Com Amortizacao):**
  - Valor financiado
  - Total a ser pago
  - Total amortizado extra
  - Total de juros pagos
  - Taxa de juros mensal
  - Quantidade de parcelas
  - Valor da primeira e da ultima parcela
  - Sistema de amortizacao (Tabela Price ou SAC)
- **Simulacao de Aporte Mensal Adicional:** Permite simular um aporte extra recorrente todo mes para calcular a reducao de parcelas/tempo e a economia financeira de juros.
- **Grafico Interativo:** Curva temporal da divida comparando a evolucao original versus amortizada.
- **Cronograma Detalhado Periodo a Periodo:** Tabela completa com Mes, Divida Inicial, Juros ($J$), Amortizacao ($A$), Aporte Extra, Parcela e Saldo Devedor.

---

## 2. Acesso e Execucao

1. **Acesso Online (GitHub Pages):**  
   [https://lealwbs.github.io/financ/](https://lealwbs.github.io/financ/)

2. **Execucao Local Direta:**  
   Abra `index.html` em qualquer navegador web moderno.

3. **Execucao via Servidor Local:**
   ```bash
   python -m http.server 8080 --directory d:\Code\financ
   ```
   Acesse: `http://localhost:8080`

---

## 3. Atendimento Rigoroso aos 4 Criterios de Avaliacao

| Criterio Avaliado | Status | Como Esta Atendido |
| :--- | :---: | :--- |
| **1. Execucao da aplicacao** | 100% | Autocontida em `index.html`, com icone favicon embutido, executando sem falhas ou dependencias locais. |
| **2. Captura de dados** | 100% | Captura flexivel das variaveis no modelo BACEN, com botoes de exemplos de calculo e aporte mensal. |
| **3. Comentarios no codigo** | 100% | Bloco `<script>` detalhadamente documentado explicando a matematica financeira (anuidade, TVM, Newton-Raphson, SAC e Price). |
| **4. Geracao de relatorios** | 100% | Relatorio comparativo direto (Sem Amortizacao vs Com Amortizacao), grafico de saldo devedor e cronograma mes a mes detalhado. |

---

## 4. Referencias Bibliograficas (CAD 167 - UFMG)

1. **BANCO CENTRAL DO BRASIL (BACEN).** *Calculadora do Cidadao: Metodologia de Financiamento com Prestacoes Fixas.*
2. **BERK, Jonathan; DEMARZO, Peter; HARFORD, Jarrad.** *Fundamentos de Financas Empresariais.* Porto Alegre: Bookman, 2010.
3. **ASSAF NETO, Alexandre.** *Financas Corporativas e Valor.* 2. ed. Sao Paulo: Atlas, 2007.
4. **GITMAN, Lawrence J.** *Principios de Administracao Financeira.* 7. ed. Sao Paulo: Addison Wesley, 2005.
