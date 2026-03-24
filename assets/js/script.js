let cart = [];
const db = {
    suplementos: [
        { name: "Iso Whey Protein Nataly", price: 55.00, img: "https://images.unsplash.com/photo-1593095191341-f19702812036?w=400" },
        { name: "Creatina Monohidratada", price: 29.00, img: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=400" },
        { name: "Fat Burner Elite", price: 39.00, img: "https://images.unsplash.com/photo-1584017945366-b97b0e35a630?w=400" },
        { name: "Multivitamínico Nataly", price: 15.00, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400" }
    ],
    ropa: [
        { name: "Leggings Elite Black", price: 35.00, img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400" },
        { name: "Top Pro Fitness", price: 25.00, img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400" },
        { name: "Shorts de Compresión", price: 22.00, img: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400" },
        { name: "Polera Dry-Fit Elite", price: 18.00, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400" }
    ],
    accesorios: [
        { name: "Shaker SaludVital", price: 10.00, img: "https://images.unsplash.com/photo-1594736224114-15c45d390b76?w=400" },
        { name: "Mat de Yoga Premium", price: 22.00, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400" },
        { name: "Bandas de Resistencia", price: 15.00, img: "https://images.unsplash.com/photo-1517438476312-10d79c67750d?w=400" }
    ]
};

const recetas = [
    { 
        title: "Bowl de Avena & Proteína Nataly", 
        likes: 142, 
        img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500",
        info: "Ingredientes: 1 scoop de Iso Whey, 50g de avena, 200ml de leche vegetal. Preparación: Calentar la leche con la avena, retirar y mezclar la proteína hasta espesar. Decorar con plátano."
    },
    { 
        title: "Smoothie de Recuperación Pro", 
        likes: 89, 
        img: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=500",
        info: "Ingredientes: 1 scoop de Creatina, puñado de espinacas, 1 taza de piña. Preparación: Licuar todo con agua bien fría para una recuperación muscular inmediata post-entreno."
    }
];

function loadMuro() {
    const muro = document.getElementById('muro-recetas');
    muro.innerHTML = "";
    recetas.forEach(r => {
        muro.innerHTML += `
            <div class="recipe-card" style="margin-bottom:30px; background:#1a1a1a; border-radius:15px; overflow:hidden;">
                <img src="${r.img}" style="width:100%; height:250px; object-fit:cover;">
                <div class="recipe-info" style="padding:20px; text-align:left;">
                    <h4 style="color:#2ecc71; margin-bottom:10px;">${r.title}</h4>
                    <p style="font-size:0.9rem; color:#ccc; line-height:1.4; margin-bottom:15px;">${r.info}</p>
                    <div style="color:#888; font-size:0.8rem; display:flex; gap:15px;">
                        <span onclick="this.style.color='red'; this.innerHTML='❤️ Liked'" style="cursor:pointer;">❤️ ${r.likes} Likes</span>
                        <span>💬 12 Comentarios</span>
                    </div>
                </div>
            </div>`;
    });
}

function showCategory(cat) {
    const viewer = document.getElementById('product-display');
    const list = document.getElementById('product-list');
    document.getElementById('cat-title').innerText = "Viendo " + cat.toUpperCase();
    list.innerHTML = "";
    db[cat].forEach(p => {
        list.innerHTML += `
            <div class="prod-card" style="background:#fff; padding:15px; border-radius:10px; text-align:center;">
                <img src="${p.img}" style="width:100%; height:160px; object-fit:contain;">
                <h4 style="margin:10px 0; font-size:0.9rem;">${p.name}</h4>
                <p>$${p.price.toFixed(2)}</p>
                <button class="btn-buy" onclick="addToCart('${p.name}', ${p.price})" style="background:#000; color:#fff; width:100%; border:none; padding:8px; border-radius:5px; cursor:pointer; margin-top:10px; font-weight:bold;">AÑADIR</button>
            </div>`;
    });
    viewer.style.display = "block";
    viewer.scrollIntoView({ behavior: 'smooth' });
}

function addToCart(name, price) {
    cart.push({ name, price });
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('shopping-cart').classList.add('active');
    updateCart();
}

function updateCart() {
    const items = document.getElementById('cart-items');
    const total = document.getElementById('total-price');
    items.innerHTML = "";
    let sum = 0;
    cart.forEach(item => {
        sum += item.price;
        items.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee;"><span>${item.name}</span><strong>$${item.price.toFixed(2)}</strong></div>`;
    });
    total.innerText = "$" + sum.toFixed(2);
}

function toggleCart() { document.getElementById('shopping-cart').classList.toggle('active'); }
function closeCategory() { document.getElementById('product-display').style.display = 'none'; }

function checkout() {
    let msg = "Hola Nataly! Quiero estos productos: ";
    cart.forEach(i => msg += "\n- " + i.name);
    window.open("https://wa.me/56959530948?text=" + encodeURIComponent(msg));
}

window.onload = loadMuro;
