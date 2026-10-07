# CAD 167 - Administracao Financeira | UFMG
## Trabalho Pratico 1: Simulador de Amortizacao (SAC e Tabela Price)

**Instituicao:** Universidade Federal de Minas Gerais (UFMG)  
**Unidade:** Faculdade de Ciencias Economicas (FACE) / ICEX  
**Curso:** Sistemas de Informacao  
**Disciplina:** CAD 167 - Administracao Financeira  
**Professor:** Bruno Perez Ferreira  
**Tema:** Valor do Dinheiro no Tempo (Time Value of Money - TVM)

---

## 1. Descricao do Projeto

Aplicacao desenvolvida em arquivo unico HTML (`index.html`) para calculo, analise e comparacao dos dois principais sistemas de amortizacao utilizados no Brasil:
- **SAC (Sistema de Amortizacao Constante):** Amortizacao fixa e parcelas decrescentes.
- **Tabela Price (Sistema Frances):** Parcelas fixas e amortizacao crescente.

O software demonstra na pratica o impacto do Valor do Dinheiro no Tempo na velocidade de amortizacao do saldo devedor e no volume total de juros pagos.

---

## 2. Como Executar

A aplicacao nao requer instalacao de bibliotecas ou servidores. Basta abrir o arquivo `index.html` em qualquer navegador:

1. Acesse o diretorio do projeto: `d:\Code\financ\`;
2. De um duplo clique em `index.html`.

Alternativamente, pode ser executado via servidor HTTP local:
```bash
python -m http.server 8080 --directory d:\Code\financ
```
E acessar `http://localhost:8080` no navegador.

---

## 3. Estrutura do Codigo

O projeto esta centralizado em `index.html`:
- **HTML:** Estrutura semantica para captura de dados (Valor do Financiamento, Taxa de Juros, Prazo e Sistema).
- **CSS:** Estilizacao limpa, minimalista e responsiva.
- **JavaScript:** Logica matematica financeira comentada com as formulas de equivalencia de taxas, fator de recuperacao de capital (Price) e amortizacao constante (SAC).
- **Chart.js:** Grafico comparativo da evolucao do saldo devedor ao longo do tempo.

---

## 4. Fundamentacao Teorica

### Tabela Price (Sistema Frances)
- Parcela constante calculada pela formula da anuidade:
  `PMT = PV * [i * (1 + i)^n] / [(1 + i)^n - 1]`
- Juros mensais: `J_t = SD_{t-1} * i`
- Amortizacao mensal: `A_t = PMT - J_t`
- Saldo devedor: `SD_t = SD_{t-1} - A_t`

### Sistema SAC
- Amortizacao constante: `A = PV / n`
- Juros mensais: `J_t = SD_{t-1} * i`
- Parcela decrescente: `PMT_t = A + J_t`
- Saldo devedor linear: `SD_t = SD_{t-1} - A`

---

## 5. Referencias Bibliograficas

1. **BERK, Jonathan; DEMARZO, Peter; HARFORD, Jarrad.** *Fundamentos de Financas Empresariais.* Porto Alegre: Bookman, 2010.
2. **ASSAF NETO, Alexandre.** *Financas Corporativas e Valor.* 2. ed. Sao Paulo: Atlas, 2007.
3. **GITMAN, Lawrence J.** *Principios de Administracao Financeira.* 7. ed. Sao Paulo: Addison Wesley, 2005.
