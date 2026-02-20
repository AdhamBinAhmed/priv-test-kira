// ===== Firebase =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== Config =====
const firebaseConfig = {
  apiKey: "AIzaSyAg81TG47I0VgdfuZgyxFJde2f527PE6DA",
  authDomain: "kira-4c722.firebaseapp.com",
  projectId: "kira-4c722"
};

// ===== Init =====
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

// ===== تأكد ان المستخدم مسجل =====
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // لو مش مسجل يرجع للرئيسية
    window.location.href = "index.html";
  } else {
    currentUser = user;
  }
});

// ===== حفظ البيانات =====
window.saveUserData = async function() {
  const phone = document.getElementById("phone").value;
  const gov = document.getElementById("governorate").value;
  const area = document.getElementById("area").value;
  const street = document.getElementById("street").value;
  const building = document.getElementById("building").value;

  if (!phone || !gov || !area || !street || !building) {
    alert("اكمل كل البيانات");
    return;
  }

  try {
    await setDoc(doc(db, "users", currentUser.uid), {
      name: currentUser.displayName,
      email: currentUser.email,
      phone: phone,
      governorate: gov,
      area: area,
      street: street,
      building: building
    });

    alert("تم حفظ البيانات");

    // يرجع للرئيسية
    window.location.href = "index.html";

  } catch (error) {
    alert(error.message);
  }
};

// ===== المحافظات =====
const areas = {
  cairo: ["مدينة نصر", "التجمع", "المعادي"],
  giza: ["الهرم", "فيصل", "الدقي"]
};

const govSelect = document.getElementById("governorate");
const areaSelect = document.getElementById("area");

if (govSelect) {
  govSelect.addEventListener("change", function() {
    const selected = this.value;

    areaSelect.innerHTML = '<option value="">اختر المنطقة</option>';

    if (areas[selected]) {
      areas[selected].forEach(area => {
        const option = document.createElement("option");
        option.value = area;
        option.textContent = area;
        areaSelect.appendChild(option);
      });
    }
  });
}