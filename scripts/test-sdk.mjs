#!/usr/bin/env node
/**
 * SDK unit-ish checks (Node environment without a browser DOM).
 * Validates that the SDK file exposes the expected public API surface when evaluated.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import vm from 'vm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sdkPath = path.join(__dirname, '../js/sdk/welrent-sdk.js');
const source = fs.readFileSync(sdkPath, 'utf8');

const window = {
  location: { hostname: 'localhost', origin: 'http://localhost:3000' },
  screenX: 0,
  screenY: 0,
  outerWidth: 1280,
  outerHeight: 800,
  addEventListener() {},
  open() { return { closed: false, close() {}, focus() {} }; },
};
const localStorage = {
  _d: {},
  getItem(k) { return this._d[k] ?? null; },
  setItem(k, v) { this._d[k] = String(v); },
  removeItem(k) { delete this._d[k]; },
};

const sandbox = { window, localStorage, console, fetch: async () => ({ ok: true, json: async () => ({}) }) };
sandbox.self = window;
vm.createContext(sandbox);
vm.runInContext(source, sandbox);

const failures = [];
if (!sandbox.window.WelrentAuth) failures.push('WelrentAuth missing');
if (typeof sandbox.window.WelrentAuth.login !== 'function') failures.push('WelrentAuth.login missing');
if (typeof sandbox.window.WelrentAuth.logout !== 'function') failures.push('WelrentAuth.logout missing');
if (typeof sandbox.window.WelrentAuth.onAuthStateChanged !== 'function') failures.push('onAuthStateChanged missing');
if (!sandbox.window.WelrentContracts) failures.push('WelrentContracts missing');
if (typeof sandbox.window.WelrentContracts.create !== 'function') failures.push('WelrentContracts.create missing');
if (typeof sandbox.window.WelrentContracts.list !== 'function') failures.push('WelrentContracts.list missing');
if (!sandbox.window.WelrentAPI) failures.push('WelrentAPI missing');
if (typeof sandbox.window.WelrentAPI.search !== 'function') failures.push('WelrentAPI.search missing');

if (failures.length) {
  console.error('SDK tests failed:', failures);
  process.exit(1);
}

console.log('✅ WelrentAuth + WelrentContracts + WelrentAPI SDK surface OK');
