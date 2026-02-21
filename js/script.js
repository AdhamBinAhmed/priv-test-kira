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

function getCartKey() {
  return "cart_" + currentUser;
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";

  if (cart.length > 0) {
    const lastItem = cart[cart.length - 1];
    cartItems.innerHTML = `<p>${lastItem.name} - ${lastItem.price} جنيه</p>`;
  }

  cartCount.textContent = cart.length;
}

// فتح وإغلاق الكارت
function toggleCart() {
  const box = document.getElementById("cartBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

// عرض التفاصيل
function toggleDetails() {
  const details = document.getElementById("cart-details");

  if (details.style.display === "block") {
    details.style.display = "none";
  } else {
    showDetails();
    details.style.display = "block";
  }
}

// عرض كل المنتجات
function showDetails() {
  const details = document.getElementById("cart-details");

  details.innerHTML = "";

  cart.forEach((item, index) => {
    details.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - ${item.price} جنيه</span>
        <button class="delete-btn" onclick="removeItem(${index})">حذف</button>
      </div>
    `;
  });
}

// حذف منتج
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
  showDetails();
}

let currentUser = localStorage.getItem("user") || null;

function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("active");
}

// ===============================
// تحميل الصفحة
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // ===== عناصر الانيميشن =====
  const elements = document.querySelectorAll(".animate");
  const cards = document.querySelectorAll(".product-card");
  const images = document.querySelectorAll("img");
  const buttons = document.querySelectorAll(".btn");
  const header = document.querySelector(".main-header");


  // ===============================
  // Fade + Slide Animation
  // ===============================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateElement(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));


  function animateElement(el) {
    let y = 50;
    let opacity = 0;

    el.style.transform = "translateY(50px)";
    el.style.opacity = "0";

    const anim = setInterval(() => {
      y -= 2;
      opacity += 0.05;

      el.style.transform = `translateY(${y}px)`;
      el.style.opacity = opacity;

      if (opacity >= 1) clearInterval(anim);
    }, 16);
  }


  // ===============================
  // Image Zoom Animation
  // ===============================
  images.forEach(img => {
    img.style.transform = "scale(0.8)";
    img.style.opacity = "0";

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let scale = 0.8;
        let opacity = 0;

        const anim = setInterval(() => {
          scale += 0.02;
          opacity += 0.05;

          img.style.transform = `scale(${scale})`;
          img.style.opacity = opacity;

          if (scale >= 1) clearInterval(anim);
        }, 16);

        obs.unobserve(img);
      }
    });

    obs.observe(img);
  });


  // ===============================
  // Button Bounce Animation
  // ===============================
  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      let scale = 1;

      const anim = setInterval(() => {
        scale += 0.05;
        btn.style.transform = `scale(${scale})`;

        if (scale >= 1.2) {
          clearInterval(anim);

          const back = setInterval(() => {
            scale -= 0.05;
            btn.style.transform = `scale(${scale})`;

            if (scale <= 1) clearInterval(back);
          }, 16);
        }
      }, 16);
    });
  });


  // ===============================
  // Cards Slide Animation
  // ===============================
  cards.forEach((card, index) => {
    card.style.opacity = "0";

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {

        let x = index % 2 === 0 ? -100 : 100;
        let opacity = 0;

        const anim = setInterval(() => {
          x *= 0.9;
          opacity += 0.05;

          card.style.transform = `translateX(${x}px)`;
          card.style.opacity = opacity;

          if (opacity >= 1) clearInterval(anim);
        }, 16);

        obs.unobserve(card);
      }
    });

    obs.observe(card);
  });


  // ===============================
  // Navbar Animation on Scroll
  // ===============================
  window.addEventListener("scroll", () => {
    let scroll = window.scrollY;

    if (header) {
      header.style.transform = `translateY(${Math.min(scroll, 50)}px)`;
    }
  });

});


// ===============================
// Menu Toggle
// ===============================
window.toggleMenu = function () {
  const menu = document.getElementById("sideMenu");

  if (menu.style.left === "0px") {
    menu.style.left = "-100%";
  } else {
    menu.style.left = "0px";
  }
};


// ===============================
// Smooth Scroll (اختياري)
// ===============================
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function(e) {
    if (this.hash !== "") {
      e.preventDefault();
      document.querySelector(this.hash)?.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
