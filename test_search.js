const fs = require('fs');
const files = fs.readdirSync('public/fragarabic_images');

const findPrefixes = (keyword) => {
  const matches = files.filter(f => f.includes(keyword) && !f.includes('muestra'));
  const prefixes = [...new Set(matches.map(f => f.replace(/_\d+\.[a-zA-Z0-9]+$/, '')))];
  console.log(`Prefixes for ${keyword}:`, prefixes);
}

findPrefixes('9am');
findPrefixes('yara');
findPrefixes('amber_oud');
findPrefixes('asad');
findPrefixes('hawas');
findPrefixes('odyssey');
findPrefixes('nautica');
findPrefixes('khamrah');
