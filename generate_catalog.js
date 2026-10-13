const fs = require('fs');
const path = require('path');

const userList = [
  { name: "9 AM", price: "105.00", search: "9am_afnan_eau_de_parfum_para_mujer", brand: "AFNAN" },
  { name: "9 PM Clásico", price: "120.00", search: "9pm_afnan_eau_de_parfum_para_hombre", brand: "AFNAN" },
  { name: "Yara Pink Clásico", price: "115.00", search: "yara_lattafa_eau_de_parfum_para_mujer", brand: "LATTAFA" },
  { name: "Amber Oud Gold Edition 120ml", price: "185.00", search: "amber_oud_gold_edition_al_haramain_eau_de_parfum_unisex", brand: "AL HARAMAIN" },
  { name: "Yum Yum", price: "150.00", search: "yum_pistachio|yum_yum", brand: "ARMAF" },
  { name: "Khamrah Dukhan", price: "130.00", search: "khamrah_dukhan_lattafa_eau_de_parfum_para_hombre", brand: "LATTAFA" },
  { name: "Khamrah Qahwa", price: "125.00", search: "khamrah_qahwa_lattafa_eau_de_parfum_unisex", brand: "LATTAFA" },
  { name: "Nitro Red", price: "130.00", search: "nitro_red", brand: "DUMONT" },
  { name: "Nautica Voyage", price: "90.00", search: "nautica", brand: "NAUTICA" },
  { name: "Asad Elixir", price: "135.00", search: "asad_elixir_lattafa_eau_de_parfum_para_hombre", brand: "LATTAFA" },
  { name: "Eclaire", price: "125.00", search: "eclaire_lattafa|eclaire_banoffi", brand: "LATTAFA" },
  { name: "Vulcan Feu", price: "155.00", search: "vulcan_feu", brand: "FRENCH AVENUE" },
  { name: "Hawas Fire", price: "155.00", search: "hawas_fire_rasasi_eau_de_parfum_para_hombre", brand: "RASASI" },
  { name: "Hawas Atlantis", price: "155.00", search: "hawas_atlantis|hawas_black", brand: "RASASI" },
  { name: "Khamrah Clásico", price: "125.00", search: "khamrah_lattafa_eau_de_parfum_unisex", brand: "LATTAFA" },
  { name: "Atheeri", price: "140.00", search: "atheeri", brand: "LATTAFA" },
  { name: "Rome Imagine", price: "120.00", search: "rome_imagine|imagine", brand: "MAISON ALHAMBRA" },
  { name: "Odyssey Aqua", price: "130.00", search: "odyssey_aqua_edition_armaf_eau_de_parfum_para_hombre", brand: "ARMAF" },
  { name: "Yara Elixir", price: "130.00", search: "yara_elixir_lattafa_eau_de_parfum_para_mujer", brand: "LATTAFA" },
  { name: "Dúo Eclaire", price: "135.00", search: "eclaire", brand: "LATTAFA" },
  { name: "Island Bliss", price: "150.00", search: "island_bliss", brand: "ARMAF" },
  { name: "Island Breeze", price: "150.00", search: "island_breeze|island", brand: "ARMAF" },
  { name: "Art of Universe Set", price: "180.00", search: "art_of_universe", brand: "LATTAFA" },
  { name: "Nebras Women", price: "120.00", search: "nebras_lattafa", brand: "LATTAFA" },
  { name: "Hawas Diva", price: "155.00", search: "hawas_diva_rasasi_eau_de_parfum", brand: "RASASI" },
  { name: "Asad Bourbon", price: "125.00", search: "asad_bourbon_lattafa_eau_de_parfum_para_hombre", brand: "LATTAFA" },
  { name: "Club de Nuit MALEKA", price: "140.00", search: "club_de_nuit_maleka|club_de_nuit_bling", brand: "ARMAF" },
  { name: "Hawas Ice", price: "155.00", search: "hawas_ice_rasasi_eau_de_parfum_para_hombre", brand: "RASASI" },
  { name: "Hawas Tropical", price: "155.00", search: "hawas_tropical_rasasi_eau_de_parfum_para_hombre", brand: "RASASI" },
  { name: "Mandarin Sky Elixir", price: "140.00", search: "odyssey_mandarin_sky_elixir_armaf_eau_de_parfum", brand: "ARMAF" },
  { name: "Odyssey Go Mango", price: "140.00", search: "odyssey_go_mango_armaf_eau_de_parfum", brand: "ARMAF" },
  { name: "Liquid Brun", price: "150.00", search: "liquid_brun", brand: "FRENCH AVENUE" },
  { name: "Veneno Black", price: "170.00", search: "veneno_black|veneno_bianco", brand: "FRENCH AVENUE" },
  { name: "Her Confession", price: "145.00", search: "her_confession", brand: "LATTAFA" },
  { name: "Club de Nuit Women", price: "125.00", search: "club_de_nuit_woman", brand: "ARMAF" },
  { name: "Amber Oud Aqua Dubai", price: "190.00", search: "amber_oud_aqua_dubai_al_haramain_extrait_de_parfum_unisex", brand: "AL HARAMAIN" },
  { name: "Odyssey Candee", price: "115.00", search: "odyssey_candee_armaf_eau_de_parfum_para_mujer", brand: "ARMAF" },
  { name: "Hawas Malibu", price: "155.00", search: "hawas_malibu_rasasi_eau_de_parfum", brand: "RASASI" },
  { name: "Sublime", price: "120.00", search: "badee_al_oud_sublime", brand: "LATTAFA" },
  { name: "Hayaati", price: "95.00", search: "hayaati_al_maleky", brand: "LATTAFA" },
  { name: "The Kingdom", price: "115.00", search: "the_kingdom", brand: "LATTAFA" },
  { name: "Odyssey Mega", price: "110.00", search: "odyssey_mega_armaf_eau_de_parfum_para_hombre", brand: "ARMAF" },
  { name: "Angham", price: "140.00", search: "angham", brand: "LATTAFA" },
  { name: "Ishq Al Shuyuk Silver", price: "130.00", search: "ishq", brand: "LATTAFA" },
  { name: "Yuor Touch Intense", price: "125.00", search: "eternal_touch|touch", brand: "MAISON ALHAMBRA" },
  { name: "Urban man elixir", price: "140.00", search: "club_de_nuit_urban_man_elixir", brand: "ARMAF" },
  { name: "9pm Night Out", price: "170.00", search: "9pm_night_out_afnan_extrait_de_parfum", brand: "AFNAN" },
  { name: "Odyssey Mandarin Sky", price: "120.00", search: "odyssey_mandarin_sky_armaf_eau_de_parfum_para_hombre", brand: "ARMAF" },
  { name: "Dúo Yara Pink", price: "125.00", search: "yara_lattafa_eau_de_parfum_para_mujer", brand: "LATTAFA" },
  { name: "9 AM Dive", price: "120.00", search: "9am_dive_afnan_eau_de_parfum_para_hombre", brand: "AFNAN" }
];

const imagesDir = path.join(__dirname, 'public', 'fragarabic_images');
let files = [];
try {
  files = fs.readdirSync(imagesDir);
} catch (e) {
  console.log("No images folder found, continuing with empty files list.");
}

const perfumesData = userList.map((item, index) => {
  const searchParts = item.search.split('|');
  
  let matchedFiles = [];
  for (const file of files) {
    const fileLower = file.toLowerCase();
    
    // Excluir "muestra" para el catálogo
    if (fileLower.includes('muestra')) continue;

    const isMatch = searchParts.some(part => fileLower.includes(part));
    
    if (isMatch) {
      matchedFiles.push(file);
    }
  }

  let gallery = [];
  let mainImage = "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop";
  
  if (matchedFiles.length > 0) {
    matchedFiles.sort();
    
    const firstMatch = matchedFiles[0];
    const prefix = firstMatch.replace(/_\d+\.[a-zA-Z0-9]+$/, ''); 
    
    const exactMatches = matchedFiles.filter(f => f.startsWith(prefix + '_'));
    exactMatches.sort((a, b) => {
      const numA = parseInt(a.match(/_(\d+)\./)?.[1] || "0");
      const numB = parseInt(b.match(/_(\d+)\./)?.[1] || "0");
      return numA - numB;
    });

    if (exactMatches.length > 0) {
      gallery = exactMatches.map(f => `/fragarabic_images/${f}`);
      mainImage = gallery[0];
    } else {
      gallery = [`/fragarabic_images/${firstMatch}`];
      mainImage = gallery[0];
    }
  } else {
    gallery = [mainImage];
  }

  return {
    id: (index + 1).toString(),
    brand: item.brand,
    name: item.name,
    type: "EAU DE PARFUM",
    notes: ["EXCLUSIVO", "PREMIUM"],
    price: `S/. ${item.price}`,
    image: mainImage,
    gallery: gallery,
    tag: index < 5 ? "TOP VENTAS" : (index % 4 === 0 ? "NOVEDAD" : ""),
    description: `Descubre la esencia exclusiva de ${item.name} por ${item.brand}. Una fragancia diseñada para dejar una huella inolvidable, con una estela duradera y notas premium.`
  };
});

const fileContent = `export const perfumes = ${JSON.stringify(perfumesData, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'perfumes.ts'), fileContent);

console.log(`¡Catálogo generado con ${perfumesData.length} productos y sus marcas correspondientes!`);
