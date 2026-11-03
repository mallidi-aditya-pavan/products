"use strict";

// Edit this array to add, update, or remove products.
const products = [
  {
    number: 1001,
    name: "Everyday Wireless Headphones",
    description: "Comfy over-ear sound for commutes, focus time, and everything between.",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Wireless headphones in a warm studio setting",
    amazonSearch: "wireless over ear headphones",
    label: "Everyday favorite"
  },
  {
    number: 1002,
    name: "Minimal Desk Lamp",
    description: "A clean-lined little light that makes late nights feel a touch easier.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Minimal modern desk lamp on a table",
    amazonSearch: "minimal modern desk lamp",
    label: "Small upgrade"
  },
  {
    number: 1003,
    name: "Compact Instant Camera",
    description: "Pocket-sized snapshots for keeping the good bits off your camera roll.",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Compact camera ready to capture a moment",
    amazonSearch: "compact instant camera",
    label: "Weekend pick"
  },
  {
    number: 1004,
    name: "Canvas Daily Tote",
    description: "An easy-carry canvas bag with room for the things you actually need.",
    category: "Style",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Structured everyday tote bag",
    amazonSearch: "canvas everyday tote bag",
    label: "On the go"
  },
  {
    number: 1005,
    name: "Portable Bluetooth Speaker",
    description: "A compact speaker for bringing a little soundtrack wherever you land.",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Portable speaker with a simple modern design",
    amazonSearch: "portable bluetooth speaker",
    label: "Sound good"
  },
  {
    number: 1006,
    name: "Stoneware Coffee Set",
    description: "Simple, tactile mugs that make the first cup feel like a small ritual.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Ceramic mug and coffee set on a table",
    amazonSearch: "stoneware ceramic coffee mug set",
    label: "Slow mornings"
  },
  {
    number: 1007,
    name: "Classic Everyday Watch",
    description: "A versatile, pared-back watch made for your everyday rotation.",
    category: "Style",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Classic wristwatch with a clean dial",
    amazonSearch: "classic minimalist everyday wrist watch",
    label: "Wear on repeat"
  },
  {
    number: 1008,
    name: "Soft Knit Throw",
    description: "A cozy layer for reading corners, movie nights, and slow Sundays.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Soft throw blanket in a calm living room",
    amazonSearch: "soft knit throw blanket",
    label: "Home comfort"
  }
];

// Replace this with your Amazon Associates tracking ID before publishing.
const affiliateTag = "YOUR_ASSOCIATE_TAG";
const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const categoryButtons = [...document.querySelectorAll(".category-button")];
let activeCategory = "All";

function makeAmazonLink(searchTerm) {
  const url = new URL("https://www.amazon.com/s");
  url.searchParams.set("k", searchTerm);
  url.searchParams.set("tag", affiliateTag);
  return url.href;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query)
      || String(product.number).includes(query);
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  productGrid.innerHTML = visibleProducts.map((product, index) => `
    <article class="product-card" style="animation-delay:${Math.min(index * 45, 180)}ms">
      <div class="product-visual">
        <img class="product-image" src="${product.image}" alt="${product.imageAlt}" loading="lazy">
        <span class="product-category">${product.category}</span>
      </div>
      <div class="product-info">
        <div class="product-meta"><span>${product.label}</span><span class="product-number">No. ${product.number}</span></div>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <a class="buy-button" href="${makeAmazonLink(product.amazonSearch)}" target="_blank" rel="sponsored noopener noreferrer" aria-label="Buy ${product.name} on Amazon">
          <span>Buy Now</span><span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  `).join("");

  const total = visibleProducts.length;
  resultsCount.textContent = query || activeCategory !== "All"
    ? `Showing ${total} ${total === 1 ? "find" : "finds"}`
    : `Showing all ${total} finds`;
  emptyState.hidden = total !== 0;
  productGrid.hidden = total === 0;
}

function updateCategoryCounts() {
  document.querySelectorAll("[data-count]").forEach((count) => {
    const category = count.dataset.count;
    count.textContent = category === "All"
      ? products.length
      : products.filter((product) => product.category === category).length;
  });
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    categoryButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);
document.querySelector("#clear-search").addEventListener("click", () => {
  searchInput.value = "";
  activeCategory = "All";
  categoryButtons.forEach((button) => {
    const isActive = button.dataset.category === "All";
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
  searchInput.focus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
updateCategoryCounts();
renderProducts();