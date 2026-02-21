import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAg81TG47I0VgdfuZgyxFJde2f527PE6DA",
  authDomain: "kira-4c722.firebaseapp.com",
  projectId: "kira-4c722",
  storageBucket: "kira-4c722.firebasestorage.app",
  messagingSenderId: "540540067705",
  appId: "1:540540067705:web:8a6a57a861db879b44d9a8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// ===== تسجيل الدخول =====
window.loginWithGoogle = function () {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "profile.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};


// ===== متابعة المستخدم =====
onAuthStateChanged(auth, (user) => {
  const btn = document.getElementById("loginBtn");

  if (!btn) return; // مهم جدا

  if (user) {
    btn.innerHTML = `
      <img src="${user.photoURL}" style="width:25px;height:25px;border-radius:50%">
      ${user.displayName}
    `;
    btn.onclick = logout;
  } else {
    btn.innerHTML = "تسجيل بجوجل";
    btn.onclick = loginWithGoogle;
  }
});


// ===== تسجيل خروج =====
window.logout = function () {
  signOut(auth).then(() => {
    location.reload();
  });
};