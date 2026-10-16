// Muthoni's Beauty — sample catalogue. Replace these sample items, prices and photos with your real stock.
const products = [
  {name:'Everyday Glow Palette',category:'Makeup',price:1850,tag:'Glow favourite',image:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80',alt:'Makeup palette and beauty products'},
  {name:'Soft Matte Lip Colour',category:'Makeup',price:950,tag:'Everyday essential',image:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=80',alt:'Lipstick beauty product'},
  {name:'Dew Drop Face Serum',category:'Skincare',price:2200,tag:'Skin first',image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80',alt:'Skincare bottle and cream'},
  {name:'Daily Moisture Cream',category:'Skincare',price:1650,tag:'Daily ritual',image:'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80',alt:'Skincare cream'},
  {name:'Amber Bloom Fragrance',category:'Fragrance',price:3200,tag:'Little luxury',image:'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80',alt:'Elegant perfume bottle'},
  {name:'Soft Oud Eau de Parfum',category:'Fragrance',price:4500,tag:'Signature scent',image:'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80',alt:'Perfume bottle in warm light'},
  {name:'The Beauty Blender Set',category:'Accessories',price:750,tag:'Makeup tool',image:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',alt:'Beauty makeup tools'},
  {name:'Everyday Brush Set',category:'Accessories',price:1400,tag:'Your routine, refined',image:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80',alt:'Makeup brushes and cosmetics'}
];
const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('productSearch');
let activeCategory = 'All';
const formatPrice = value => `KSh ${value.toLocaleString('en-KE')}`;
function renderProducts(){
  const term = searchInput.value.trim().toLowerCase();
  const visible = products.filter(p => (activeCategory === 'All' || p.category === activeCategory) && `${p.name} ${p.category} ${p.tag}`.toLowerCase().includes(term));
  if(!visible.length){grid.innerHTML='<p class="no-results">No products found. Try another search or ask us on WhatsApp.</p>';return;}
  grid.innerHTML = visible.map(p => `<article class="product-card"><div class="product-photo-wrap"><img class="product-photo" src="${p.image}" alt="${p.alt}" loading="lazy"><span class="product-tag">${p.tag}</span></div><div class="product-info"><span class="product-category">${p.category}</span><h3 class="product-name">${p.name}</h3><div class="product-bottom"><span class="product-price">${formatPrice(p.price)}</span><button class="ask-product" type="button" data-product="${p.name}">Ask about this ↗</button></div></div></article>`).join('');
  grid.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
    const product = products.find(p => p.name === button.dataset.product);
    const message = `Hello Muthoni's Beauty! I'd like to ask about ${product.name} (${formatPrice(product.price)}). Is it available?`;
    window.open(`https://wa.me/254705869985?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }));
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
  renderProducts();
}));
searchInput.addEventListener('input', renderProducts);
document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', () => {
  activeCategory = link.dataset.categoryLink;
  document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item.dataset.filter === activeCategory));
  renderProducts();
}));
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = open ? '×' : '☰';
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Open navigation'); menuToggle.textContent='☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();
renderProducts();
