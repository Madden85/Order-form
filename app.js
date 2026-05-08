const API_URL = "https://script.google.com/macros/s/AKfycbygES0rnSh7YKTZAmDrrbq0pzJmBQ7M5XT3VNBlFsW5zskT2Pj7FnTm9F_4NPESsm_S/exec";
const productEl = document.getElementById("product");
const formEl = document.getElementById("form");
const submitBtn = document.getElementById("submitBtn");

function input(id, placeholder, value = "") {
    const safeValue = (value === "null" || value === null || value === "undefined") ? "" : value;
    return `<input id="${id}" type="text" placeholder="${placeholder}" value="${safeValue}">`;
}

function renderForm() {
    const params = new URLSearchParams(window.location.search);
    let p = productEl.value;
    if (!p) { formEl.innerHTML = ""; return; }

    const tg = params.get("tg") || "";
    const exp = params.get("exp") || ""; 
    const email = params.get("email") || "";
    const pass = params.get("pass") || "";
    const profile = params.get("profile") || "";
    const pin = params.get("pin") || "";

    let html = `${input("tg", "Username Telegram", tg)}${input("exp", "Expired Date", exp)}`;

    if (p.includes("netflix")) {
        html += `${input("email", "Email Address", email)}${input("pass", "Password", pass)}${input("profile", "Nama Profile", profile)}${input("pin", "Pincode", pin)}`;
    } else if (p.includes("youtube") && p.includes("own")) {
        html += `${input("email", "Email Address (Customer)", email)}`;
    } else if (p.includes("youtube") && p.includes("seller") || p.includes("iqiyi") || p.includes("viu")) {
        html += `${input("email", "Email Address", email)}${input("pass", "Password", pass)}`;
    } else if (p.includes("sooka")) {
        html += `${input("profile", "Device Type", profile)}${input("email", "Email Address", email)}${input("pass", "Password", pass)}`;
    } else if (p.includes("spotify")) {
        html += `${input("email", "Link Invitation", email)}`;
    } else if (p.includes("disney")) {
        html += `${input("email", "Phone Number", email)}${input("profile", "Profile Name", profile)}`;
    }
    formEl.innerHTML = html;
}

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const urlProd = params.get("product");
    if (urlProd) {
        const clean = decodeURIComponent(urlProd.replace(/\+/g, ' ')).toLowerCase().trim();
        for (let i = 0; i < productEl.options.length; i++) {
            if (productEl.options[i].text.toLowerCase().includes(clean)) {
                productEl.selectedIndex = i;
                renderForm();
                break;
            }
        }
    }
    // Auto-fill values
    ["tg", "exp", "email", "pass", "profile", "pin"].forEach(id => {
        if(document.getElementById(id)) document.getElementById(id).value = params.get(id) || "";
    });
};

submitBtn.onclick = () => {
    let p = productEl.value;
    if (!p) return alert("Pilih produk");
    let order = new URLSearchParams(window.location.search).get("order");
    fetch(`${API_URL}?mode=save&order=${order}&product=${p}`);
    // Logic jena teks customer & telegram link (sama seperti kod sebelum ini)
};

function val(id) { let el = document.getElementById(id); return el ? el.value : ""; }
