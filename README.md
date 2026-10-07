# Calculadora de Financiamento
## Trabalho Prático 1 - Administração Financeira | UFMG

**Instituição:** Universidade Federal de Minas Gerais (UFMG)  
**Unidade:** Faculdade de Ciências Econômicas (FACE) / ICEX  
**Curso:** Sistemas de Informação  
**Disciplina:** CAD 167 - Administração Financeira  
**Professor:** Bruno Pérez Ferreira  
**Aluno:** Ítalo Leal Lana Santos  
**Matrícula:** 2024013893  
**Tema Central:** Valor do Dinheiro no Tempo (Time Value of Money - TVM)

---

## 1. Descrição e Estrutura da Aplicação

Aplicação web desenvolvida em **arquivo único HTML** (`index.html`), inspirada na interface oficial da **Calculadora do Cidadão (Banco Central do Brasil - BACEN)** integrada a um módulo completo de **Simulação de Amortização de Financiamento**:

### Etapa 1: Calculadora de Financiamento com Prestações Fixas (Estilo BACEN)
Permite ao usuário calcular qualquer uma das 4 variáveis fundamentais do financiamento:
1. **Nº de meses ($n$)**
2. **Taxa de juros mensal ($i$)** (resolvida via convergência numérica de *Newton-Raphson*)
3. **Valor da prestação ($PMT$)**
4. **Valor financiado ($PV$)**

Possui botões **Calcular** e **Limpar**, seletores rápidos (pills e botões por linha) para definir qual variável calcular, e 4 cartões clicáveis com **Exemplos de Cálculo** oficiais do BACEN que carregam e resolvem os cenários instantaneamente.

### Etapa 2: Simulação de Amortização de Financiamento
Após calcular as condições iniciais, o sistema projeta a liquidação do passivo:
- **Quadro Fixo de Impacto da Amortização Extra:** Painel estável com métricas de economia em juros, tempo economizado e novo prazo de quitação.
- **Tabela Comparativa Direta (Sem amortização vs Com amortização):**
  - Valor financiado
  - Total a ser pago
  - Total amortizado extra
  - Total de juros pagos
  - Taxa de juros mensal
  - Quantidade de parcelas
  - Valor da primeira e da última parcela
  - Sistema de amortização (Tabela Price ou SAC)
- **Simulação de Aporte Mensal Adicional:** Permite simular um aporte extra recorrente todo mês para calcular a redução de parcelas/tempo e a economia financeira de juros.
- **Gráfico Interativo:** Curva temporal da dívida comparando a evolução original versus amortizada.
- **Cronograma Detalhado Período a Período:** Tabela completa com Mês, Dívida Inicial, Juros ($J$), Amortização ($A$), Aporte Extra, Parcela e Saldo Devedor.

---

## 2. Acesso e Execução

1. **Acesso Online (GitHub Pages):**  
   [https://lealwbs.github.io/financ/](https://lealwbs.github.io/financ/)

2. **Execução Local Direta:**  
   Abra `index.html` em qualquer navegador web moderno.

3. **Execução via Servidor Local:**
   ```bash
   python -m http.server 8080 --directory d:\Code\financ
   ```
   Acesse: `http://localhost:8080`

---

## 3. Atendimento Rigoroso aos 4 Critérios de Avaliação

| Critério Avaliado | Status | Como Está Atendido |
| :--- | :---: | :--- |
| **1. Execução da aplicação** | 100% | Autocontida em `index.html`, com ícone favicon embutido, executando sem falhas ou dependências locais. |
| **2. Captura de dados** | 100% | Captura flexível das variáveis no modelo BACEN, com botões de exemplos de cálculo e aporte mensal. |
| **3. Comentários no código** | 100% | Bloco `<script>` detalhadamente documentado explicando a matemática financeira (anuidade, TVM, Newton-Raphson, SAC e Price). |
| **4. Geração de relatórios** | 100% | Relatório comparativo direto (Sem Amortização vs Com Amortização), gráfico de saldo devedor e cronograma mês a mês detalhado. |

---

## 4. Referências Bibliográficas (CAD 167 - UFMG)

1. **BANCO CENTRAL DO BRASIL (BACEN).** *Calculadora do Cidadão: Metodologia de Financiamento com Prestações Fixas.*
2. **BERK, Jonathan; DEMARZO, Peter; HARFORD, Jarrad.** *Fundamentos de Finanças Empresariais.* Porto Alegre: Bookman, 2010.
3. **ASSAF NETO, Alexandre.** *Finanças Corporativas e Valor.* 2. ed. São Paulo: Atlas, 2007.
4. **GITMAN, Lawrence J.** *Princípios de Administração Financeira.* 7. ed. São Paulo: Addison Wesley, 2005.
