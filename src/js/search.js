// search.js
export function filterData(products, query) {
  const lower = query.toLowerCase();

  return products.filter(item =>
    item.Name.toLowerCase().includes(lower) ||
    item.DescriptionHtmlSimple.toLowerCase().includes(lower)
  );
}
