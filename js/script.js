function scrollToContact() {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth"
  });
}

// Fade In عند تحميل الصفحة
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}

// Fade Out عند الانتقال
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    if (this.href.includes("#")) return;

    e.preventDefault();
    const target = this.href;

    document.body.classList.remove("loaded");
    document.body.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = target;
    }, 400);
  });
});

const toggleBtn = document.getElementById("themeToggle");

// تحميل الوضع المحفوظ
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  }
});


// Accordion
const accBtns = document.querySelectorAll(".accordion-btn");

accBtns.forEach(btn => {
  btn.addEventListener("click", function () {

    const content = this.nextElementSibling;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {

      // يقفل أي قائمة مفتوحة
      document.querySelectorAll(".accordion-content").forEach(item => {
        item.style.maxHeight = null;
      });

      content.style.maxHeight = content.scrollHeight + "px";
    }

  });
});
let cart = [];

function addToCart(name, price) {
  cart.push({name, price});
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";

  cart.forEach(item => {
    cartItems.innerHTML += `<p>${item.name} - ${item.price} جنيه</p>`;
  });

  cartCount.textContent = cart.length;
}

function toggleCart() {
  const box = document.getElementById("cartBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

