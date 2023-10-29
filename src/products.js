let PRODUCTS = [];
function fetchProductsFromAPI() {
    return fetch('http://localhost:8080/week2/api/v1/products')
        .then(response => response.json());
}
try {
    const apiData = await fetchProductsFromAPI();
    PRODUCTS = apiData.map(item => ({
        id: item.id,
        productName: item.name,
        price: item.price,
        productImage: item.productImages[0].path,
        description: item.description,
        unit : item.unit,
    }));
} catch (error) {
    console.error('Error loading products:', error);
}
export { PRODUCTS };