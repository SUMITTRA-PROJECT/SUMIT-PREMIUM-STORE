const productList = document.getElementById("product-list");
const cartCountEl = document.getElementById("cartCount");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const ratingStars = document.getElementById("ratingStars");

let cart = 0;
let selectedRating = 0;
let allProducts = [];

const categories = ["Food","Digital","VIP","Lifestyle","Others"];

/* Generate 500 Products */
for(let i=1;i<=500;i++){
  const category = categories[i % categories.length];
  const rating = Math.floor(Math.random()*5)+1;

  allProducts.push({
    id:i,
    name:`Premium Product ${i}`,
    price:(i*7)%500 + 99,
    category,
    rating,
    img:`https://picsum.photos/400/300?random=${i}`
  });
}

renderProducts(allProducts);

function renderProducts(products){
  productList.innerHTML="";
  products.forEach(p=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <img src="${p.img}" onclick="openModal('${p.img}','${p.name}')">
      <h4>${p.name}</h4>
      <div class="stars">${"★".repeat(p.rating)}</div>
      <p class="price">$${p.price}</p>
      <div class="actions">
        <button onclick="addToCart()">🛒</button>
        <button>💳</button>
      </div>
    `;
    productList.appendChild(card);
  });
}

function addToCart(){
  cart++;
  cartCountEl.innerText=cart;
}

function searchProduct(){
  const value=document.getElementById("searchInput").value.toLowerCase();
  const filtered=allProducts.filter(p=>p.name.toLowerCase().includes(value));
  renderProducts(filtered);
}

function filterCategory(cat){
  if(cat==="All"){
    renderProducts(allProducts);
  }else{
    renderProducts(allProducts.filter(p=>p.category===cat));
  }
}

function goHome(){
  window.scrollTo({top:0,behavior:"smooth"});
}

/* Modal + Rating */
function openModal(img,title){
  modal.style.display="flex";
  modalImg.src=img;
  modalTitle.innerText=title;
  modalDesc.innerText="High quality premium product from Sumit Premium Store.";
  loadStars();
}
function closeModal(){
  modal.style.display="none";
  selectedRating=0;
}
function loadStars(){
  ratingStars.innerHTML="";
  for(let i=1;i<=5;i++){
    const s=document.createElement("span");
    s.innerHTML="★";
    s.onclick=()=>setRating(i);
    ratingStars.appendChild(s);
  }
}
function setRating(r){
  selectedRating=r;
  [...ratingStars.children].forEach((s,i)=>{
    s.classList.toggle("active",i<r);
  });
}
function submitReview(){
  if(selectedRating===0){
    alert("Please give rating");
    return;
  }
  alert("Thanks for your review!");
  closeModal();
}
