
// Sample product data
const products = [
  {
    id: 1,
    title: "Modern Wooden Chair",
    price: 129.99,
    image: "https://i.etsystatic.com/30457381/r/il/e10354/4169856402/il_570xN.4169856402_4wo1.jpg",
  },
  {
    id: 2,
    title: "Stylish Lamp",
    price: 59.49,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Cozy Sofa",
    price: 499.0,
    image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Minimalist Desk",
    price: 299.89,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    title: "Decorative Vase",
    price: 39.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSarocjWas7zojTrWt6JnBF2qppkzjP5DXLlw&s",
  },
  {
    id: 6,
    title: "Abstract Wall Art",
    price: 79.5,
    image: "https://www.jiomart.com/images/product/original/rvmcce7h5k/random-golden-blue-abstract-art-canvas-painting-set-of-5-for-living-room-bedroom-office-wall-d-cor-wall-art-product-images-orvmcce7h5k-p604124403-0-202308270254.jpg?im=Resize=(420,420)",
  }
];

// Cart state
let cart = {};

// Elements
const productGrid = document.getElementById("product-grid");
const cartToggleBtn = document.getElementById("cart-toggle");
const cartSidebar = document.getElementById("cart-sidebar");
const cartContent = document.getElementById("cart-content");
const cartCloseBtn = document.getElementById("cart-close");
const cartCountElem = document.getElementById("cart-count");
const contactForm = document.getElementById("contact-form");

// Format price as currency
function formatPrice(price) {
  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// Render product cards in grid
function renderProducts() {
  productGrid.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.tabIndex = 0;
    card.setAttribute("aria-label", `${product.title}, price ${formatPrice(product.price)}`);

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy" />
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">${formatPrice(product.price)}</div>
        <button type="button" class="btn-add-cart" aria-label="Add ${product.title} to cart" data-product-id="${product.id}">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Update cart counter in header
function updateCartCount() {
  const count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
  cartCountElem.textContent = count;
}

// Render cart contents in sidebar
function renderCart() {
  cartContent.innerHTML = "";
  const items = Object.values(cart);

  if (items.length === 0) {
    cartContent.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    return;
  }

  items.forEach(({ product, quantity }) => {
    const itemElem = document.createElement("div");
    itemElem.className = "cart-item";

    itemElem.innerHTML = `
      <img src="${product.image}" alt="${product.title}" loading="lazy" />
      <div class="cart-item-details">
        ${product.title} <div class="cart-item-quantity">× ${quantity}</div>
      </div>
      <button type="button" class="cart-item-remove" aria-label="Remove ${product.title} from cart" data-product-id="${product.id}">&times;</button>
    `;

    cartContent.appendChild(itemElem);
  });
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  if (cart[productId]) {
    cart[productId].quantity += 1;
  } else {
    cart[productId] = { product, quantity: 1 };
  }

  updateCartCount();
  renderCart();
}

// Remove product from cart
function removeFromCart(productId) {
  if (!cart[productId]) return;

  delete cart[productId];

  updateCartCount();
  renderCart();
}

// Toggle cart sidebar visibility
function toggleCart() {
  const isOpen = cartSidebar.getAttribute("aria-hidden") === "false";
  cartSidebar.setAttribute("aria-hidden", isOpen ? "true" : "false");
  if (!isOpen) {
    cartSidebar.focus();
  }
}

// Handle clicks on product grid (delegate add to cart button clicks)
productGrid.addEventListener("click", (ev) => {
  const btn = ev.target.closest(".btn-add-cart");
  if (!btn) return;

  const productId = parseInt(btn.dataset.productId, 10);
  addToCart(productId);
});

// Handle clicks on cart sidebar remove buttons
cartContent.addEventListener("click", (ev) => {
  const btn = ev.target.closest(".cart-item-remove");
  if (!btn) return;

  const productId = parseInt(btn.dataset.productId, 10);
  removeFromCart(productId);
});

// Handle cart toggle button click
cartToggleBtn.addEventListener("click", toggleCart);

// Handle cart sidebar close button click
cartCloseBtn.addEventListener("click", () => {
  cartSidebar.setAttribute("aria-hidden", "true");
});

// Close cart sidebar on Escape key press
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cartSidebar.getAttribute("aria-hidden") === "false") {
    cartSidebar.setAttribute("aria-hidden", "true");
    cartToggleBtn.focus();
  }
});

// Handle contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Simple feedback alert and reset form
  alert("Thank you for your message! We will get back to you soon.");
  contactForm.reset();
});

// Initial render
renderProducts();
updateCartCount();
renderCart();

