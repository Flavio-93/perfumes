const { execSync } = require('child_process');
const fs = require('fs');

console.log('Consultando Google Sheets (App_Perfumes -> Productos)...');
const raw = execSync('gsheets readonly read 18wePIjzY1T254kaGHgDzGwvvItIvNemFgry4pIY6vAE Productos!A1:E100', { encoding: 'utf8' });
const lines = raw.trim().split('\n').filter(Boolean);

const sheetMap = {};
for (let i = 1; i < lines.length; i++) {
  const parts = lines[i].split('\t');
  const code = parts[0].trim();
  const idNum = parseInt(code.replace(/^P/i, ''), 10).toString();
  const stock = parseInt(parts[4] || '0', 10);
  sheetMap[idNum] = isNaN(stock) ? 0 : stock;
}

const perfumesPath = 'src/data/perfumes.ts';
const content = fs.readFileSync(perfumesPath, 'utf8');
const perfumes = JSON.parse(content.replace('export const perfumes = ', '').replace(/;\s*$/, ''));

let inStockCount = 0;
let outOfStockCount = 0;

for (const p of perfumes) {
  if (sheetMap[p.id] !== undefined) {
    p.stock = sheetMap[p.id];
  } else {
    p.stock = 0;
  }
  if (p.stock > 0) inStockCount++;
  else outOfStockCount++;
}

const output = 'export const perfumes = ' + JSON.stringify(perfumes, null, 2) + ';\n';
fs.writeFileSync(perfumesPath, output, 'utf8');
console.log(`Stock sincronizado exitosamente: ${inStockCount} con stock, ${outOfStockCount} agotados.`);
