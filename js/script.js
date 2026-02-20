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

<script type="module">

// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// إعداداتك
const firebaseConfig = {
  apiKey: "AIzaSyAg81TG47I0VgdfuZgyxFJde2f527PE6DA",
  authDomain: "kira-4c722.firebaseapp.com",
  projectId: "kira-4c722",
  storageBucket: "kira-4c722.firebasestorage.app",
  messagingSenderId: "540540067705",
  appId: "1:540540067705:web:8a6a57a861db879b44d9a8",
  measurementId: "G-WT8BN01H5D"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// تسجيل بجوجل
window.loginWithGoogle = function() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      let phone = prompt("اكتب رقم التليفون");

      if (phone) {
        setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          phone: phone
        });

        alert("تم تسجيل الدخول");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

</script>

