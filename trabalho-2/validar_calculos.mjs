/**
 * Suíte Automatizada de Validação Matemática e Funcional — Trabalho 2 (CAD 167 / UFMG)
 *
 * Extrai e executa diretamente o bloco <script> de trabalho-2/index.html em um contexto
 * isolado (Node vm) com mocks mínimos de DOM, garantindo que os testes validem exatamente
 * o código entregue na aplicação final.
 *
 * Execução:
 *   node trabalho-2/validar_calculos.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

// Extrai o bloco <script> principal da aplicação
const scriptMatch = html.match(/<script>\s*([\s\S]*?)<\/script>/g);
if (!scriptMatch || scriptMatch.length === 0) {
  throw new Error('Bloco <script> não encontrado em index.html');
}
const appScript = scriptMatch[scriptMatch.length - 1]
  .replace(/^<script>\s*/, '')
  .replace(/<\/script>\s*$/, '');

// Cria mock leve de DOM para permitir carregar toda a aplicação e testar fluxos de UI
function createMockElement(id = '') {
  const classes = new Set();
  const children = [];
  return {
    id,
    value: '',
    checked: true,
    readOnly: false,
    textContent: '',
    innerHTML: '',
    style: {},
    files: [],
    classList: {
      add: (...c) => c.forEach(x => classes.add(x)),
      remove: (...c) => c.forEach(x => classes.delete(x)),
      toggle: (c, force) => (force === undefined ? (classes.has(c) ? classes.delete(c) : classes.add(c)) : (force ? classes.add(c) : classes.delete(c))),
      contains: c => classes.has(c)
    },
    set className(val) {
      classes.clear();
      String(val).split(/\s+/).filter(Boolean).forEach(x => classes.add(x));
    },
    get className() {
      return Array.from(classes).join(' ');
    },
    appendChild: child => children.push(child),
    removeChild: () => {},
    addEventListener: () => {},
    focus: () => {},
    click: () => {},
    scrollIntoView: () => {},
    getContext: () => ({})
  };
}

const elements = new Map();
const defaults = {
  tmaInput: { value: '' },
  reinvestInput: { value: '' },
  syncReinvestChk: { checked: true },
  horizonA: { value: '5' },
  horizonB: { value: '5' },
  projectNameA: { value: 'Projeto A' },
  projectNameB: { value: 'Projeto B' },
  bldName: { value: 'Implantação de Plataforma SaaS' },
  bldTma: { value: '14' },
  bldYears: { value: '5' },
  bldCapex: { value: '300000' },
  bldNcg: { value: '40000' },
  bldSalvage: { value: '50000' },
  bldRevenue: { value: '260000' },
  bldGrowth: { value: '6' },
  bldTax: { value: '34' },
  bldFixedCost: { value: '55000' },
  bldVarCost: { value: '30' },
  bldTaxShieldChk: { checked: true },
  waccRf: { value: '10.50' },
  waccBeta: { value: '1.15' },
  waccRm: { value: '16.50' },
  waccKd: { value: '13.50' },
  waccTax: { value: '34.00' },
  waccWe: { value: '60.00' },
  pessFlowShock: { value: '-20' },
  pessTmaShock: { value: '2' },
  pessProb: { value: '25' },
  baseFlowShock: { value: '0' },
  baseTmaShock: { value: '0' },
  baseProb: { value: '50' },
  otimFlowShock: { value: '20' },
  otimTmaShock: { value: '-1' },
  otimProb: { value: '25' }
};

function getEl(id) {
  if (!elements.has(id)) {
    const el = createMockElement(id);
    if (defaults[id]) Object.assign(el, defaults[id]);
    elements.set(id, el);
  }
  return elements.get(id);
}

const domListeners = {};
const mockWindow = {
  addEventListener: (ev, fn) => { domListeners[ev] = fn; },
  print: () => {}
};

const mockDocument = {
  getElementById: getEl,
  querySelectorAll: () => [],
  createElement: () => createMockElement(),
  body: createMockElement('body')
};

const context = vm.createContext({
  window: mockWindow,
  document: mockDocument,
  Intl,
  Math,
  Number,
  String,
  Array,
  Blob: class {},
  URL: { createObjectURL: () => '', revokeObjectURL: () => {} },
  FileReader: class {},
  alert: msg => { throw new Error(`Alert inesperado nos testes: ${msg}`); },
  prompt: () => null,
  console
});

vm.runInContext(appScript, context);
// Dispara DOMContentLoaded e expõe estado no escopo global para asserções
if (domListeners.DOMContentLoaded) domListeners.DOMContentLoaded();
// Garante que getEl também enxergue inputs dinâmicos criados no HTML de cfInputBody
const originalRenderTabelaFluxos = context.renderTabelaFluxos;
context.renderTabelaFluxos = function (presetA = null, presetB = null) {
  originalRenderTabelaFluxos(presetA, presetB);
  const nA = context.getHorizon('A');
  const nB = context.getHorizon('B');
  if (Array.isArray(presetA)) {
    for (let t = 0; t <= nA; t++) {
      getEl(`cfA_${t}`).value = presetA[t] !== undefined ? String(presetA[t]) : '';
    }
  }
  if (Array.isArray(presetB)) {
    for (let t = 0; t <= nB; t++) {
      getEl(`cfB_${t}`).value = presetB[t] !== undefined ? String(presetB[t]) : '';
    }
  }
};

function approx(actual, expected, tol = 1e-2, msg = '') {
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `${msg} | Esperado: ${expected}, Obtido: ${actual} (tol=${tol})`
  );
}

console.log('Iniciando bateria de testes de Gestão de Investimentos (CAD 167)...\n');

// -----------------------------------------------------------------------------
// TESTE 1: Projeto Convencional Padrão (Expansão Industrial)
// -----------------------------------------------------------------------------
{
  const flows = [-250000, 75000, 85000, 95000, 100000, 110000];
  const p = context.analyzeProject('Expansão Industrial', flows, 0.12, 0.12);

  approx(p.npv, 78313.6508, 0.01, 'T1 VPL a 12%');
  approx(p.irr * 100, 23.1722, 0.01, 'T1 TIR (%)');
  approx(p.mirr * 100, 18.2736, 0.01, 'T1 MTIR (%)');
  approx(p.simplePayback, 2.9474, 0.01, 'T1 Payback Simples');
  approx(p.discountedPayback, 3.7499, 0.01, 'T1 Payback Descontado');
  approx(p.pi, 1.3133, 0.001, 'T1 Índice de Lucratividade');
  approx(p.eaa, 21724.97, 0.05, 'T1 VAE');
  // Verifica identidade VPL(TIR) == 0
  approx(context.calcNPV(flows, p.irr), 0, 1e-4, 'T1 VPL(TIR) deve zerar');
  console.log('✔ Teste 1 (Projeto Convencional: VPL, TIR, MTIR, Paybacks, IL, VAE): PASSOU');
}

// -----------------------------------------------------------------------------
// TESTE 2: Conflito VPL vs TIR e Ponto de Fisher (Projeto A vs Projeto B)
// -----------------------------------------------------------------------------
{
  const flowsA = [-100000, 60000, 55000, 40000];
  const flowsB = [-200000, 50000, 100000, 160000];
  const pA = context.analyzeProject('A', flowsA, 0.10, 0.10);
  const pB = context.analyzeProject('B', flowsB, 0.10, 0.10);
  const fisher = context.calcFisherIntersection(flowsA, flowsB);

  approx(pA.npv, 30052.59, 0.05, 'T2 VPL_A');
  approx(pB.npv, 48309.54, 0.05, 'T2 VPL_B');
  assert.ok(pA.irr > pB.irr, 'T2 TIR_A deve ser maior que TIR_B (conflito de escala)');
  assert.ok(pB.npv > pA.npv, 'T2 VPL_B deve ser maior que VPL_A à TMA=10%');
  assert.ok(fisher.rate !== null && fisher.rate > 0.10, 'T2 Taxa de Fisher > TMA');
  // Na taxa de Fisher exata, VPL_A(r_F) deve ser rigorosamente igual a VPL_B(r_F)
  approx(
    context.calcNPV(flowsA, fisher.rate),
    context.calcNPV(flowsB, fisher.rate),
    1e-4,
    'T2 Igualdade VPL_A(r_F) == VPL_B(r_F) no Ponto de Fisher'
  );
  console.log(`✔ Teste 2 (Conflito VPL×TIR & Ponto de Fisher em ${(fisher.rate * 100).toFixed(2)}%): PASSOU`);
}

// -----------------------------------------------------------------------------
// TESTE 3: Vidas Úteis Diferentes — Decisão pelo VAE (Anualidade Equivalente)
// -----------------------------------------------------------------------------
{
  const eqA = context.analyzeProject('Equip A (3a)', [-120000, 62000, 62000, 62000], 0.11, 0.11);
  const eqB = context.analyzeProject('Equip B (5a)', [-180000, 60000, 60000, 60000, 60000, 60000], 0.11, 0.11);

  assert.ok(eqB.npv > eqA.npv, 'T3 VPL_B > VPL_A pelo prazo maior');
  assert.ok(eqA.eaa > eqB.eaa, 'T3 VAE_A > VAE_B revela superioridade do Equipamento A');
  approx(eqA.eaa, 12894.45, 0.5, 'T3 VAE_A');
  approx(eqB.eaa, 11297.35, 0.5, 'T3 VAE_B');
  console.log('✔ Teste 3 (Vidas Úteis Diferentes & VAE): PASSOU');
}

// -----------------------------------------------------------------------------
// TESTE 4: Construtor de Orçamento de Capital (DRE -> FCO -> FCL)
// -----------------------------------------------------------------------------
{
  const built = context.buildCapitalBudgetingSchedule({
    years: 5,
    capex: 300000,
    ncg: 40000,
    salvage: 50000,
    revenue1: 260000,
    growthRate: 0.06,
    fixedCost: 55000,
    varCostPct: 0.30,
    taxRate: 0.34,
    fullTaxShield: true
  });

  // FCL_0 = -(300.000 + 40.000) = -340.000
  approx(built.cashFlows[0], -340000, 0.01, 'T4 FCL_0');
  // Ano 1: Receita 260k, Var 78k, Fixo 55k -> EBITDA = 127k, Dep = 60k, EBIT = 67k
  // IR = 34% * 67k = 22.780 -> NOPAT = 44.220 -> FCO = 44.220 + 60.000 = 104.220
  approx(built.cashFlows[1], 104220, 0.01, 'T4 FCL_1');
  // Ano 5 inclui retorno de NCG (40k) + Valor Residual líquido de IR (50k * 0.66 = 33k) = +73k sobre FCO_5
  const row5 = built.rows[5];
  approx(row5.capexNcgVr, 73000, 0.01, 'T4 Recuperação NCG + VR pós-IR no Ano 5');
  approx(row5.fcl, row5.fco + 73000, 0.01, 'T4 FCL_5');
  console.log('✔ Teste 4 (Construtor de Orçamento de Capital DRE -> FCL): PASSOU');
}

// -----------------------------------------------------------------------------
// TESTE 5: Fluxo Não-Convencional com Múltiplas TIRs & Casos de Borda
// -----------------------------------------------------------------------------
{
  // Polinômio clássico com raízes exatas em 10% e 20%: -100 + 230/(1+r) - 132/(1+r)^2 = 0
  const nonConv = [-100, 230, -132];
  const irrNC = context.calcIRR(nonConv);
  assert.equal(irrNC.isNonConventional, true, 'T5 Deve detectar fluxo não-convencional');
  assert.equal(irrNC.allRoots.length, 2, 'T5 Deve encontrar exatamente 2 TIRs reais');
  approx(irrNC.allRoots[0] * 100, 10.0, 1e-4, 'T5 Primeira raiz (10%)');
  approx(irrNC.allRoots[1] * 100, 20.0, 1e-4, 'T5 Segunda raiz (20%)');

  // Fluxo sem mudança de sinal -> sem TIR
  const noSignChange = [-100, -50, -20];
  const irrNone = context.calcIRR(noSignChange);
  assert.equal(irrNone.primary, null, 'T5 Sem mudança de sinal -> TIR null');
  assert.equal(context.calcPayback(noSignChange), null, 'T5 Projeto sem retorno -> Payback null');

  // Fluxo com TMA = 0% e retorno insuficiente (TIR negativa)
  const negIrrFlows = [-100, 30, 30];
  const pNeg = context.analyzeProject('Negativo', negIrrFlows, 0, 0);
  approx(pNeg.npv, -40, 1e-6, 'T5 VPL a 0%');
  approx(pNeg.eaa, -20, 1e-6, 'T5 VAE a 0%');
  assert.ok(pNeg.irr < 0, 'T5 TIR negativa quando soma < investimento');
  approx(context.calcNPV(negIrrFlows, pNeg.irr), 0, 1e-4, 'T5 VPL(TIR negativa) == 0');

  // Parser de números PT-BR e ISO
  approx(context.parseLocaleNumber('R$ -250.000,50'), -250000.5, 1e-6, 'T5 Parser PT-BR com R$');
  approx(context.parseLocaleNumber('1,250.75'), 1250.75, 1e-6, 'T5 Parser EN-US');
  approx(context.parseLocaleNumber('1.000.000'), 1000000, 1e-6, 'T5 Parser milhar sem decimal');

  console.log('✔ Teste 5 (Fluxos Não-Convencionais, Múltiplas TIRs, Casos de Borda & Parser): PASSOU');
}

// -----------------------------------------------------------------------------
// TESTE 6: Integração WACC/CAPM e Fluxo Completo de UI (4 Exemplos + Alternâncias)
// -----------------------------------------------------------------------------
{
  const wacc = context.recalcularWacc();
  // Rf=10.5, Beta=1.15, Rm=16.5 => Ke = 17.4%; Kd=13.5, Tc=34% => Kd_liq = 8.91%; E/V=60% => WACC = 14.004%
  approx(wacc, 14.004, 0.01, 'T6 WACC padrão');

  // Executa todos os 4 presets de UI e interações
  ['padrao', 'fisher', 'vidas', 'orcamento'].forEach(ex => {
    context.carregarExemplo(ex);
    assert.equal(getEl('reportSection').style.display, 'block', `T6 Relatório exibido para exemplo ${ex}`);
  });

  context.carregarExemplo('fisher');
  context.trocarProjetoRisco('B');
  context.trocarCronogramaVisivel('DIFF');
  context.aplicarWaccComoTMA();
  context.limparFormulario();
  assert.equal(getEl('reportSection').style.display, 'none', 'T6 Limpar formulário oculta relatório');
  console.log('✔ Teste 6 (Integração WACC/CAPM, 4 Presets e Controles de UI): PASSOU');
}

console.log('\nTodos os testes passaram com 100% de precisão!');
