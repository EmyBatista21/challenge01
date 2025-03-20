const fs = require("fs");
const path = require("path");
//Normalizar titulo
function normalizeTitle(title) {
  return title
    .toLowerCase() 
    .replace(/[^a-z0-9\s]/g, "") 
    .replace(/\s+/g, " ") 
    .split(" ") 
    .sort() 
    .join(" "); 
}

// Categorizar os produtos
function categorizeProducts(products) {
  const categories = {};

  products.forEach((product) => {
    const normalizedTitle = normalizeTitle(product.title);

    if (!categories[normalizedTitle]) {
      categories[normalizedTitle] = {
        category: product.title, 
        count: 0,
        products: [],
      };
    }

    categories[normalizedTitle].count++;
    categories[normalizedTitle].products.push({
      title: product.title,
      supermarket: product.supermarket,
    });
  });

  return Object.values(categories);
}

//Carregar o data
const dataPath = path.join(__dirname, "..", "data", "data01.json");
fs.readFile(dataPath, "utf8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);
    return;
  }

  try {
    const products = JSON.parse(data);
    const categorizedProducts = categorizeProducts(products);

    console.log(JSON.stringify(categorizedProducts, null, 2));
  } catch (error) {
    console.error("Erro ao processar o JSON:", error);
  }
});