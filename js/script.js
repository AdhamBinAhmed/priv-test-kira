function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// Fade In
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

function toggleMenu() {
  const menu = document.getElementById("sideMenu") || document.getElementById("menu");
  if (menu) menu.classList.toggle("active");
}

// ===============================
// SAFE LINKS (FIX ERROR)
// ===============================
document.querySelectorAll("a").forEach(link => {
  if (link) {
    link.addEventListener("click", function (e) {

      if (!this.href || this.href.includes("#")) return;

      e.preventDefault();
      const target = this.href;

      document.body.classList.remove("loaded");
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = target;
      }, 400);
    });
  }
});

// ===============================
// THEME BUTTON FIX
// ===============================
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// ===============================
// ACCORDION FIX
// ===============================
const accBtns = document.querySelectorAll(".accordion-btn");

accBtns.forEach(btn => {
  if (btn) {
    btn.addEventListener("click", function () {

      const content = this.nextElementSibling;
      if (!content) return;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {

        document.querySelectorAll(".accordion-content").forEach(item => {
          item.style.maxHeight = null;
        });

        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
});

// ===============================
// CART SYSTEM
// ===============================
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");

  if (!cartItems || !cartCount) return;

  cartItems.innerHTML = "";

  if (cart.length > 0) {
    const lastItem = cart[cart.length - 1];
    cartItems.innerHTML = `<p>${lastItem.name} - ${lastItem.price} جنيه</p>`;
  }

  cartCount.textContent = cart.length;
}

function toggleCart() {
  const box = document.getElementById("cartBox");
  if (box) {
    box.style.display = box.style.display === "block" ? "none" : "block";
  }
}

function toggleDetails() {
  const details = document.getElementById("cart-details");
  if (!details) return;

  if (details.style.display === "block") {
    details.style.display = "none";
  } else {
    showDetails();
    details.style.display = "block";
  }
}

function showDetails() {
  const details = document.getElementById("cart-details");
  if (!details) return;

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

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
  showDetails();
}

// ===============================
// USER
// ===============================
let currentUser = localStorage.getItem("user") || null;

// ===============================
// LOAD + ANIMATION
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const elements = document.querySelectorAll(".animate");
  const cards = document.querySelectorAll(".product-card");
  const images = document.querySelectorAll("img");
  const buttons = document.querySelectorAll(".btn");
  const header = document.querySelector(".main-header");

  // Fade animation
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

  // Image animation
  images.forEach(img => {
    if (!img) return;

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

  // Buttons animation
  buttons.forEach(btn => {
    if (!btn) return;

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

  // Cards animation
  cards.forEach((card, index) => {
    if (!card) return;

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

  // Navbar scroll
  window.addEventListener("scroll", () => {
    if (header) {
      header.style.transform = `translateY(${Math.min(window.scrollY, 50)}px)`;
    }
  });

});

// ===============================
// MENU FIX (FINAL)
// ===============================
window.toggleMenu = function () {
  const menu = document.getElementById("sideMenu");
  if (!menu) return;

  if (menu.style.left === "0px") {
    menu.style.left = "-100%";
  } else {
    menu.style.left = "0px";
  }
};

// ===============================
// SMOOTH SCROLL FIX
// ===============================
document.querySelectorAll("a").forEach(link => {
  if (link) {
    link.addEventListener("click", function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        document.querySelector(this.hash)?.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  }
});

// ===============================
// LOADER FIX FINAL
// ===============================
function hideLoader() {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.opacity = "0";
    loader.style.transition = "1s";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
  // ===== Lightbox =====
const images = document.querySelectorAll(".gallery img, .our-work img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("closeBtn");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

// قفل
closeBtn.onclick = () => {
  lightbox.style.display = "none";
};

// قفل لما تدوس بره الصورة
lightbox.onclick = (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
};
}

document.addEventListener("DOMContentLoaded", hideLoader);
setTimeout(hideLoader, 1500);
