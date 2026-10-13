const fs = require('fs');

const files = fs.readdirSync('public/fragarabic_images');

const searchKeywords = ["nitro", "red", "nautica", "voyage", "rome", "imagine", "ishq", "shuyuk", "silver", "night", "out", "9pm"];

searchKeywords.forEach(kw => {
  const matches = files.filter(f => f.includes(kw));
  const prefixes = [...new Set(matches.map(f => f.replace(/_\d+\.[a-zA-Z0-9]+$/, '')))];
  console.log(`Prefixes for ${kw}:`, prefixes);
});
