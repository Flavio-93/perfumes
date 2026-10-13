const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'public', 'fragarabic_images');

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
};

async function fetchProducts() {
    console.log("Iniciando la descarga de información de productos...");
    let allProducts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        try {
            const response = await fetch(`https://fragarabic.com/products.json?limit=250&page=${page}`);
            const data = await response.json();
            
            if (data.products && data.products.length > 0) {
                allProducts = allProducts.concat(data.products);
                console.log(`Página ${page}: Encontrados ${data.products.length} productos.`);
                page++;
            } else {
                hasMore = false;
            }
        } catch (err) {
            console.error("Error obteniendo products.json:", err);
            hasMore = false;
        }
    }

    console.log(`Total de productos encontrados: ${allProducts.length}`);
    
    let downloadedCount = 0;

    for (const product of allProducts) {
        if (product.images && product.images.length > 0) {
            for (let i = 0; i < product.images.length; i++) {
                const img = product.images[i];
                if (img && img.src) {
                    const ext = path.extname(img.src.split('?')[0]) || '.jpg';
                    const safeName = product.handle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                    const filename = `${safeName}_${i + 1}${ext}`;
                    const filepath = path.join(dir, filename);
                    
                    try {
                        await downloadImage(img.src, filepath);
                        downloadedCount++;
                        if (downloadedCount % 10 === 0) {
                            console.log(`Descargadas ${downloadedCount} imágenes...`);
                        }
                    } catch (err) {
                        console.error(`Error descargando ${img.src}:`, err.message);
                    }
                }
            }
        }
    }

    console.log(`¡Proceso completado! Se han descargado ${downloadedCount} imágenes en public/fragarabic_images/`);
}

fetchProducts();
