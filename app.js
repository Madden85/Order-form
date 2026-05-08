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

    if (p === "netflix") {
        html += `${input("email", "Email", email)}${input("pass", "Password", pass)}${input("profile", "Profile Name", profile)}${input("pin", "PIN", pin)}`;
    } else if (p === "youtube_own") {
        html += `${input("email", "Email Customer", email)}`;
    } else if (p === "youtube_seller" || p === "iqiyi" || p === "viu") {
        html += `${input("email", "Email", email)}${input("pass", "Password", pass)}`;
    } else if (p === "sooka") {
        html += `${input("profile", "Device Type", profile)}${input("email", "Email", email)}${input("pass", "Password", pass)}`;
    } else if (p === "spotify") {
        html += `${input("email", "Link Invitation", email)}`;
    } else if (p === "disney") {
        html += `${input("email", "Phone Number", email)}${input("profile", "Profile Name", profile)}`;
    }
    formEl.innerHTML = html;
}

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const rawProd = params.get("product");
    if (rawProd) {
        const cleanProd = decodeURIComponent(rawProd.replace(/\+/g, ' ')).toLowerCase().trim();
        if (cleanProd.includes("netflix")) productEl.value = "netflix";
        else if (cleanProd.includes("youtube") && cleanProd.includes("own")) productEl.value = "youtube_own";
        else if (cleanProd.includes("youtube") && cleanProd.includes("seller")) productEl.value = "youtube_seller";
        else if (cleanProd.includes("sooka")) productEl.value = "sooka";
        else if (cleanProd.includes("spotify")) productEl.value = "spotify";
        else if (cleanProd.includes("iqiyi")) productEl.value = "iqiyi";
        else if (cleanProd.includes("disney")) productEl.value = "disney";
        else if (cleanProd.includes("viu")) productEl.value = "viu";
        renderForm();
    }
};

submitBtn.onclick = () => {
    let order = new URLSearchParams(window.location.search).get("order");
    fetch(`${API_URL}?mode=save&order=${order}`);
    document.getElementById("result").innerText = `✅ ORDER SAVED: ${order}`;
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("openTelegram").classList.remove("hidden");
    document.getElementById("openTelegram").href = `https://t.me/share/url?url=https://t.me/NumoVerifyCode_bot?start=${order}`;
};
