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
    let p = productEl.value.toLowerCase();
    if (!p) { formEl.innerHTML = ""; return; }

    let html = `${input("tg", "Telegram", params.get("tg"))}${input("exp", "Expiry", params.get("exp"))}`;

    if (p.includes("netflix")) {
        html += `${input("email", "Email", params.get("email"))}${input("pass", "Pass", params.get("pass"))}${input("profile", "Profile", params.get("profile"))}${input("pin", "PIN", params.get("pin"))}`;
    } else if (p.includes("youtube") && p.includes("own")) {
        html += `${input("email", "Email Customer", params.get("email"))}`;
    } else if (p.includes("youtube") && p.includes("seller") || p.includes("iqiyi") || p.includes("viu")) {
        html += `${input("email", "Email", params.get("email"))}${input("pass", "Pass", params.get("pass"))}`;
    } else if (p.includes("sooka")) {
        html += `${input("profile", "Device", params.get("profile"))}${input("email", "Email", params.get("email"))}${input("pass", "Pass", params.get("pass"))}`;
    } else if (p.includes("spotify")) {
        html += `${input("email", "Link Invitation", params.get("email"))}`;
    } else if (p.includes("disney")) {
        html += `${input("email", "Phone Number", params.get("email"))}${input("profile", "Profile", params.get("profile"))}`;
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
};

submitBtn.onclick = () => {
    let order = new URLSearchParams(window.location.search).get("order");
    fetch(`${API_URL}?mode=save&order=${order}&product=${productEl.value}`);
    const res = document.getElementById("result");
    res.innerText = `📦 ORDER BERJAYA\nOrder: ${order}\nExpiry: ${document.getElementById("exp").value}`;
    res.classList.remove("hidden");
    const btn = document.getElementById("openTelegram");
    btn.classList.remove("hidden");
    btn.href = `https://t.me/share/url?url=https://t.me/NumoVerifyCode_bot?start=${order}`;
};
