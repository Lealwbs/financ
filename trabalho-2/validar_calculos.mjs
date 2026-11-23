/**
 * Suíte Automatizada de Validação Matemática e Funcional — Trabalho 2 (CAD 167 / UFMG)
 *
 * Extrai e executa diretamente o bloco <script> de trabalho-2/index.html em um contexto
 * isolado (Node vm) com mocks mínimos de DOM.
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
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

const scriptMatch = html.match(/<script>\s*([\s\S]*?)<\/script>/g);
if (!scriptMatch || scriptMatch.length === 0) {
  throw new Error('Bloco <script> não encontrado em index.html');
}
const appScript = scriptMatch[scriptMatch.length - 1]
  .replace(/^<script>\s*/, '')
  .replace(/<\/script>\s*$/, '');

function createMockElement(id = '') {
  const classes = new Set();
  return {
    id,
    value: '',
    textContent: '',
    innerHTML: '',
    style: {},
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
    appendChild: () => {},
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
  horizonA: { value: '5' },
  horizonB: { value: '5' },
  projectNameA: { value: 'Projeto A' },
  projectNameB: { value: 'Projeto B' }
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
const context = vm.createContext({
  window: { addEventListener: (ev, fn) => { domListeners[ev] = fn; }, print: () => {} },
  document: {
    getElementById: getEl,
    querySelectorAll: () => [],
    createElement: () => createMockElement(),
    body: createMockElement('body')
  },
  Intl,
  Math,
  Number,
  String,
  Array,
  Blob: class {},
  URL: { createObjectURL: () => '', revokeObjectURL: () => {} },
  alert: msg => { throw new Error(`Alert inesperado nos testes: ${msg}`); },
  console
});

vm.runInContext(appScript, context);
if (domListeners.DOMContentLoaded) domListeners.DOMContentLoaded();

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

console.log('Iniciando testes do Trabalho 2 (versão simplificada)...\n');

// Teste 1: Projeto Convencional (Expansão Industrial)
{
  const flows = [-250000, 75000, 85000, 95000, 100000, 110000];
  const p = context.analyzeProject('Expansão Industrial', flows, 0.12);
  approx(p.npv, 78313.6508, 0.01, 'T1 VPL');
  approx(p.irr * 100, 23.1722, 0.01, 'T1 TIR (%)');
  approx(p.mirr * 100, 18.2736, 0.01, 'T1 MTIR (%)');
  approx(p.simplePayback, 2.9474, 0.01, 'T1 Payback Simples');
  approx(p.discountedPayback, 3.7499, 0.01, 'T1 Payback Descontado');
  approx(p.pi, 1.3133, 0.001, 'T1 IL');
  approx(p.eaa, 21724.97, 0.05, 'T1 VAE');
  console.log('✔ Teste 1 (Projeto Convencional): PASSOU');
}

// Teste 2: Conflito VPL x TIR e Ponto de Fisher
{
  const flowsA = [-100000, 60000, 55000, 40000];
  const flowsB = [-200000, 50000, 100000, 160000];
  const pA = context.analyzeProject('A', flowsA, 0.10);
  const pB = context.analyzeProject('B', flowsB, 0.10);
  const fisher = context.calcFisherIntersection(flowsA, flowsB);

  assert.ok(pA.irr > pB.irr, 'T2 TIR_A > TIR_B');
  assert.ok(pB.npv > pA.npv, 'T2 VPL_B > VPL_A');
  approx(context.calcNPV(flowsA, fisher.rate), context.calcNPV(flowsB, fisher.rate), 1e-4, 'T2 Ponto de Fisher');
  console.log(`✔ Teste 2 (Ponto de Fisher em ${(fisher.rate * 100).toFixed(2)}%): PASSOU`);
}

// Teste 3: Vidas Úteis Diferentes (VAE)
{
  const eqA = context.analyzeProject('A', [-120000, 62000, 62000, 62000], 0.11);
  const eqB = context.analyzeProject('B', [-180000, 60000, 60000, 60000, 60000, 60000], 0.11);
  assert.ok(eqB.npv > eqA.npv, 'T3 VPL_B > VPL_A');
  assert.ok(eqA.eaa > eqB.eaa, 'T3 VAE_A > VAE_B');
  console.log('✔ Teste 3 (Vidas Úteis Diferentes & VAE): PASSOU');
}

// Teste 4: Projeto Inviável & Múltiplas TIRs
{
  const inv = context.analyzeProject('Inviável', [-150000, 45000, 45000, 45000, 45000], 0.15);
  assert.ok(inv.totalNominal > 0, 'T4 Saldo nominal positivo');
  assert.ok(inv.npv < 0, 'T4 VPL negativo à TMA de 15%');
  assert.ok(inv.irr < 0.15, 'T4 TIR < TMA');
  assert.equal(inv.discountedPayback, null, 'T4 Payback descontado não recupera');

  const irrNC = context.calcIRR([-100, 230, -132]);
  assert.equal(irrNC.isNonConventional, true, 'T4 Fluxo não-convencional detectado');
  assert.equal(irrNC.allRoots.length, 2, 'T4 2 raízes detectadas');
  approx(irrNC.allRoots[0] * 100, 10.0, 1e-4, 'T4 Raiz 10%');
  approx(irrNC.allRoots[1] * 100, 20.0, 1e-4, 'T4 Raiz 20%');
  console.log('✔ Teste 4 (Projeto Inviável & Múltiplas TIRs): PASSOU');
}

// Teste 5: Execução dos 4 Exemplos de UI e Controles
{
  ['padrao', 'fisher', 'vidas', 'inviavel'].forEach(ex => {
    context.carregarExemplo(ex);
    assert.equal(getEl('reportSection').style.display, 'block', `T5 Relatório visível para ${ex}`);
  });
  context.carregarExemplo('fisher');
  context.trocarCronogramaVisivel('B');
  context.trocarCronogramaVisivel('DIFF');
  context.limparFormulario();
  assert.equal(getEl('reportSection').style.display, 'none', 'T5 Limpar oculta relatório');
  console.log('✔ Teste 5 (4 Exemplos e Controles de UI): PASSOU');
}

console.log('\nTodos os testes passaram com 100% de precisão!');
