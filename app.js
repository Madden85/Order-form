const API_URL = "https://script.google.com/macros/s/AKfycbygES0rnSh7YKTZAmDrrbq0pzJmBQ7M5XT3VNBlFsW5zskT2Pj7FnTm9F_4NPESsm_S/exec";
const product = document.getElementById("product");
const form = document.getElementById("form");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

function input(id, placeholder, value = "") {
    return `<input id="${id}" type="text" placeholder="${placeholder}" value="${value}">`;
}

function getNote(p) {
    p = p.toLowerCase();
    if (p.includes("netflix")) return { emoji: "🎬 NETFLIX PREMIUM", note: `⚠️ JANGAN UBAH apa2 setting\n⚠️ JANGAN KACAU profile lain\n1️⃣ HANYA 1 SCREEN SAHAJA pada satu2 masa\np/s-Jika didapati buka lebih dari 1 screen dalam satu2 masa,PROFILE AKAN DINYAHAKTIF & TIADA REFUND` };
    if (p.includes("youtube premium own")) return { emoji: "📺 YOUTUBE PREMIUM", note: `⚠️ Enjoy youtube & youtube music premium anda 😊` };
    if (p.includes("youtube premium seller")) return { emoji: "📺 YOUTUBE PREMIUM", note: `⚠️ Jangan ubah apa2 setting\n❌Boleh log in 1 device sahaja\np/s-Jika didapati buka lebih dari 1 device, akses akan dinyahaktifkan & tiada refund` };
    if (p.includes("sooka")) return { emoji: "📡 SOOKA PREMIUM", note: `⚠️ Jangan ubah apa2 setting\n❌Boleh log in 1 device sahaja\np/s-Jika didapati buka lebih dari 1 device, akses akan dinyahaktifkan & tiada refund` };
    if (p.includes("spotify")) return { emoji: "🎧 SPOTIFY PREMIUM", note: `1) Klik link invitation yang diberikan di atas\n2) Log in account anda (Sila pastikan anda bukan dalam mana2 family plan)\n3) Sahkan alamat anda - Lebuh Nipah 1\n4) Siap — biarkan muzik bermula. Lepas dah boleh join family, sila inform admin semula Hanya 1 DEVICE SAHAJA untuk 1 langganan` };
    if (p.includes("iqiyi")) return { emoji: "🎥 IQIYI", note: `⚠️ Jangan ubah apa2 setting\n❌Boleh log in 1 device sahaja\n1️⃣ HANYA 1 screen sahaja pada satu2 masap/s-Jika didapati buka lebih dari 1 screen dalam satu2 masa, profile akan dinyahaktifkan & tiada refund` };
    if (p.includes("disney")) return { emoji: "🏰 DISNEY+ HOTSTAR", note: `1) Buka app Disney+ Hotstar\n2) Masukkan no phone\n3) Masukkan code yang admin akan bagi\n4) Siap\nHanya 1 DEVICE SAHAJA untuk 1 langganan\nJangan ganggu profile orang lain` };
    if (p.includes("viu")) return { emoji: "📱 VIU", note: `⚠️ Jangan ubah apa2 setting\n❌Boleh log in 1 device sahaja\n1️⃣ HANYA 1 screen sahaja pada satu2 masa\np/s-Jika didapati buka lebih dari 1 screen dalam satu2 masa, profile akan dinyahaktifkan & tiada refund` };
    return { emoji: "📦 ACCOUNT", note: "" };
}

function renderForm() {
    const params = new URLSearchParams(window.location.search);
    let p = product.value.toLowerCase();
    if (!p) { form.innerHTML = ""; return; }

    // Ambil data dari URL untuk autofill
    const urlData = {
        tg: params.get("tg") || "",
        exp: params.get("exp") || "",
        email: params.get("email") || "",
        pass: params.get("pass") || "",
        profile: params.get("profile") || "",
        pin: params.get("pin") || "",
        link: params.get("link") || "",
        device: params.get("device") || ""
    };

    let html = `${input("tg", "Username", urlData.tg)}${input("exp", "Expired date", urlData.exp)}`;

    if (p.includes("netflix")) {
        html += `${input("email", "Email Address", urlData.email)}${input("pass", "Password", urlData.pass)}${input("profile", "Nama Profile", urlData.profile)}${input("pin", "Pincode", urlData.pin)}`;
    } else if (p.includes("youtube premium own")) {
        html += `${input("email", "Email address", urlData.email)}`;
    } else if (p.includes("youtube premium seller")) {
        html += `${input("email", "Email address", urlData.email)}${input("pass", "Password", urlData.pass)}`;
    } else if (p.includes("sooka")) {
        html += `${input("device", "Device", urlData.device)}${input("email", "Email", urlData.email)}${input("pass", "Password", urlData.pass)}`;
    } else if (p.includes("spotify")) {
        html += `${input("email", "Email", urlData.email)}${input("link", "Link", urlData.link)}`;
    } else if (p.includes("iqiyi")) {
        html += `${input("email", "Email", urlData.email)}${input("pass", "Password", urlData.pass)}`;
    } else if (p.includes("disney")) {
        html += `${input("email", "Email", urlData.email)}${input("pass", "Password", urlData.pass)}${input("profile", "Nama profile", urlData.profile)}`;
    } else if (p.includes("viu")) {
        html += `${input("email", "Email", urlData.email)}${input("pass", "Password", urlData.pass)}`;
    }

    form.innerHTML = html;
}

// Fungsi untuk auto-detect produk dari URL masa page load
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const urlProduct = params.get("product");
    if (urlProduct) {
        // Cari option yang paling hampir sama dengan nama produk dalam URL
        for (let i = 0; i < product.options.length; i++) {
            if (product.options[i].text.toLowerCase().includes(urlProduct.toLowerCase())) {
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

    let text = `${info.emoji}\nORDER NUMBER: ${order}\n👤 Username: ${val("tg")}\n📅 Expired date: ${val("exp")}\n`;
    if (val("email")) text += `📧 Email: ${val("email")}\n`;
    if (val("link")) text += `🔗 Link: ${val("link")}\n`;
    if (val("pass")) text += `🔑 Password: ${val("pass")}\n`;
    if (val("device")) text += `📱 Device: ${val("device")}\n`;
    if (val("profile")) text += `👥 Profile: ${val("profile")}\n`;
    if (val("pin")) text += `🔢 PIN: ${val("pin")}\n`;

    text += "\n" + info.note;

    result.classList.remove("hidden");
    result.innerText = text;
    navigator.clipboard.writeText(text);

    fetch(`${API_URL}?mode=save&order=${encodeURIComponent(order)}`);

    const btn = document.getElementById("openTelegram");
    btn.classList.remove("hidden");
    const botLink = `https://t.me/NumoVerifyCode_bot?start=${order}`;
    const message = `Hi 👋\nKlik link bawah untuk dapatkan akaun:\n${botLink}`;
    btn.href = `https://t.me/share/url?url=${encodeURIComponent(botLink)}&text=${encodeURIComponent(message)}`;
}

function val(id) { let el = document.getElementById(id); return el ? el.value : ""; }
