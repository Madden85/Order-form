const API_URL = "https://script.google.com/macros/s/AKfycbygES0rnSh7YKTZAmDrrbq0pzJmBQ7M5XT3VNBlFsW5zskT2Pj7FnTm9F_4NPESsm_S/exec";
const product = document.getElementById("product");
const form = document.getElementById("form");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

function input(id, placeholder, value = "") {
    const safeValue = (value === "null" || value === null) ? "" : value;
    return `<input id="${id}" type="text" placeholder="${placeholder}" value="${safeValue}">`;
}

function getNote(p) {
    p = p.toLowerCase();
    if (p.includes("netflix")) return { emoji: "🎬 NETFLIX PREMIUM", note: `⚠️ JANGAN UBAH apa2 setting\n⚠️ JANGAN KACAU profile lain\n1️⃣ HANYA 1 SCREEN SAHAJA pada satu2 masa\np/s-Jika didapati buka lebih dari 1 screen dalam satu2 masa,PROFILE AKAN DINYAHAKTIF & TIADA REFUND` };
    if (p.includes("youtube premium own")) return { emoji: "📺 YOUTUBE PREMIUM", note: `⚠️ Enjoy youtube & youtube music premium anda 😊` };
    if (p.includes("youtube premium seller")) return { emoji: "📺 YOUTUBE PREMIUM", note: `⚠️ Jangan ubah apa2 setting\n❌Boleh log in 1 device sahaja\np/s-Jika didapati buka lebih dari 1 device, akses akan dinyahaktifkan & tiada refund` };
    if (p.includes("sooka")) return { emoji: "📡 SOOKA PREMIUM", note: `⚠️ Jangan ubah apa2 setting\n❌Boleh log in 1 device sahaja\np/s-Jika didapati buka lebih dari 1 device, akses akan dinyahaktifkan & tiada refund` };
    if (p.includes("spotify")) return { emoji: "🎧 SPOTIFY PREMIUM", note: `1) Klik link invitation yang diberikan di atas\n2) Log in account anda\n3) Sahkan alamat anda\n4) Sila inform admin semula selepas siap` };
    if (p.includes("iqiyi")) return { emoji: "🎥 IQIYI", note: `⚠️ Jangan ubah apa2 setting\n❌Boleh log in 1 device sahaja\n1️⃣ HANYA 1 screen sahaja pada satu2 masa` };
    if (p.includes("disney")) return { emoji: "🏰 DISNEY+ HOTSTAR", note: `1) Buka app Disney+ Hotstar\n2) Masukkan no phone\n3) Masukkan code dari admin\n4) Jangan ganggu profile orang lain` };
    if (p.includes("viu")) return { emoji: "📱 VIU", note: `⚠️ Jangan ubah apa2 setting\n❌Boleh log in 1 device sahaja` };
    return { emoji: "📦 ACCOUNT", note: "" };
}

function renderForm() {
    const params = new URLSearchParams(window.location.search);
    let p = product.value.toLowerCase();
    if (!p) { form.innerHTML = ""; return; }

    const tgVal = params.get("tg") || "";
    const expVal = params.get("exp") || "";
    const emailVal = params.get("email") || "";
    const passVal = params.get("pass") || "";
    const profileVal = params.get("profile") || "";
    const pinVal = params.get("pin") || "";

    let html = `${input("tg", "Username Telegram", tgVal)}${input("exp", "Expired Date", expVal)}`;

    // LOGIK DETAIL MENGIKUT PRODUK
    if (p.includes("netflix")) {
        html += `${input("email", "Email Address", emailVal)}${input("pass", "Password", passVal)}${input("profile", "Nama Profile", profileVal)}${input("pin", "Pincode", pinVal)}`;
    } else if (p.includes("youtube premium own")) {
        html += `${input("email", "Email Address (Customer)", emailVal)}`;
    } else if (p.includes("youtube premium seller")) {
        html += `${input("email", "Email Address", emailVal)}${input("pass", "Password", passVal)}`;
    } else if (p.includes("sooka")) {
        // Sooka: Detail slot mengikut Device Type (Profile slot dlm Sheets)
        html += `${input("profile", "Device Type (TV/Phone/Tablet)", profileVal)}${input("email", "Email Address", emailVal)}${input("pass", "Password", passVal)}`;
    } else if (p.includes("spotify")) {
        // Spotify: Detail slot mengikut Link Invitation (Email slot dlm Sheets)
        html += `${input("email", "Link Invitation", emailVal)}`;
    } else if (p.includes("iqiyi") || p.includes("viu")) {
        html += `${input("email", "Email Address", emailVal)}${input("pass", "Password", passVal)}`;
    } else if (p.includes("disney")) {
        // Disney: Detail slot mengikut Phone Number (Email slot dlm Sheets)
        html += `${input("email", "Phone Number", emailVal)}${input("profile", "Profile Name", profileVal)}`;
    }

    form.innerHTML = html;
}

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const urlProduct = params.get("product");
    
    if (urlProduct) {
        const decodedProduct = decodeURIComponent(urlProduct).toLowerCase().trim();
        for (let i = 0; i < product.options.length; i++) {
            const optionText = product.options[i].text.toLowerCase().trim();
            if (optionText.includes(decodedProduct) || decodedProduct.includes(optionText)) {
                product.selectedIndex = i;
                renderForm();
                break;
            }
        }
    }
};

submitBtn.onclick = generate;

function generate() {
    let p = product.value;
    if (!p) return alert("Pilih produk");
    let order = new URLSearchParams(window.location.search).get("order");
    const info = getNote(p);

    let text = `${info.emoji}\nORDER NUMBER: ${order}\n📅 Expiry: ${val("exp")}\n👤 Username: ${val("tg")}\n📧 Detail: ${val("email")}\n`;
    if (val("pass")) text += `🔑 Password: ${val("pass")}\n`;
    if (val("profile")) text += `👥 Profile/Device: ${val("profile")}\n`;
    if (val("pin")) text += `🔢 PIN: ${val("pin")}\n`;

    text += "\n" + info.note;

    result.classList.remove("hidden");
    result.innerText = text;
    navigator.clipboard.writeText(text);

    // Pastikan parameter product dihantar ke GAS semasa mode=save
    fetch(`${API_URL}?mode=save&order=${encodeURIComponent(order)}&product=${encodeURIComponent(p)}`);

    const btn = document.getElementById("openTelegram");
    btn.classList.remove("hidden");
    const botLink = `https://t.me/NumoVerifyCode_bot?start=${order}`;
    const message = `Hi 👋\nKlik link bawah untuk dapatkan maklumat akaun anda:\n${botLink}`;
    btn.href = `https://t.me/share/url?url=${encodeURIComponent(botLink)}&text=${encodeURIComponent(message)}`;
}

function val(id) { let el = document.getElementById(id); return el ? el.value : ""; }
