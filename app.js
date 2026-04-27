/* 🔥 AUTO FILL FIX (TAMBAH SAHAJA) */
window.addEventListener("load", () => {

  const params = new URLSearchParams(window.location.search);

  const orderParam = params.get("order");
  const productParam = params.get("product");
  const tgParam = params.get("tg") || params.get("username");
  const expParam = params.get("exp");
  const emailParam = params.get("email");
  const passParam = params.get("pass");
  const profileParam = params.get("profile");
  const pinParam = params.get("pin");

  const orderInput = document.getElementById("orderNo");
  if (orderInput && orderParam) orderInput.value = orderParam;

  let tries = 0;

  const wait = setInterval(() => {

    const productEl = document.getElementById("product");

    if (!productEl || productEl.options.length === 0) {
      tries++;
      if (tries > 15) clearInterval(wait);
      return;
    }

    const options = Array.from(productEl.options);

    options.forEach(opt => {
      if (productParam && productParam.toLowerCase().includes(opt.text.toLowerCase())) {
        productEl.value = opt.value;
      }
    });

    renderForm();

    setTimeout(() => {
      setField("tg", tgParam);
      setField("exp", expParam);
      setField("email", emailParam);
      setField("pass", passParam);
      setField("profile", profileParam);
      setField("pin", pinParam);
    }, 200);

    clearInterval(wait);

  }, 200);
});

function setField(id, value){
  const el = document.getElementById(id);
  if(el && value) el.value = value;
}

/* ========================= */
/* ⬇️ SEMUA CODE ASAL KAU */
/* ========================= */

const form = document.getElementById("form");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const product = document.getElementById("product");
const submitBtn = document.getElementById("submitBtn");

const API_URL = "https://script.google.com/macros/s/AKfycbygES0rnSh7YKTZAmDrrbq0pzJmBQ7M5XT3VNBlFsW5zskT2Pj7FnTm9F_4NPESsm_S/exec";

product.onchange = renderForm;

function input(id,placeholder){
return `<input id="${id}" placeholder="${placeholder}">`;
}

/* 🔥 NOTE (KEKAL EXACT) */
function getNote(p){

p = p.toLowerCase();

if(p.includes("netflix")) return {
emoji: "🎬 NETFLIX",
note: `⚠️ JANGAN UBAH apa2 setting
⚠️ JANGAN KACAU profile lain
1️⃣ HANYA 1 SCREEN SAHAJA pada satu2 masa

p/s-Jika didapati buka lebih dari 1 screen dalam satu2 masa,
PROFILE AKAN DINYAHAKTIF & TIADA REFUND 

Peringatan Bermula Julai 2025 kami dari pihak NuMo ventures akan menukar password netflix secara random bagi mengelakkan acc diceroboh pihak yang tidak bertanggungjawab`
};

if(p.includes("youtube")) return {
emoji: "📺 YOUTUBE",
note: `Hanya 1 device shj dibenarkan

🔷Sila masuk youtube, tekan add account, masuk detail yg diberi dan tekan log in

🔷Selepas log in, tak boleh tukar password`
};

if(p.includes("sooka")) return {
emoji: "📡 SOOKA",
note: `⚠️ Jangan ubah apa2 setting

❌ Boleh log in 1 device sahaja

1️⃣ HANYA 1 screen sahaja pada satu2 masa

p/s-Jika didapati buka lebih dari 1 DEVICE, 
ACCESS AKAN DI NYAHAKTIF & TIADA REFUND`
};

if(p.includes("spotify")) return {
emoji: "🎧 SPOTIFY",
note: `1) Tekan TERIMA JEMPUTAN

2) DAFTAR AKAUN SPOTIFY atau LOG MASUK menggunakan akaun anda yang sedia ada
(semua muzik yang disimpan akan kekal).

3) Sahkan alamat anda - Lebuh Nipah 1

4) Siap — biarkan muzik bermula.

 Lepas dah boleh join family, sila inform admin semula

 Hanya 1 DEVICE SAHAJA untuk 1 langganan`
};

if(p.includes("iqiyi")) return {
emoji: "🎥 IQIYI",
note: `⚠️ Jangan ubah apa2 setting

❌Boleh log in 1 device sahaja

1️⃣ HANYA 1 screen sahaja pada satu2 masa

p/s-Jika didapati buka lebih dari 1 screen dalam satu2 masa, profile akan dinyahaktifkan & tiada refund`
};

if(p.includes("disney")) return {
emoji: "🏰 DISNEY+ HOTSTAR",
note: `1) Buka app Disney+ Hotstar

2) Masukkan no phone

3) Masukkan code yang admin akan bagi

4) Siap

Hanya 1 DEVICE SAHAJA untuk 1 langganan

Jangan ganggu profile orang lain`
};

if(p.includes("viu")) return {
emoji: "📱 VIU",
note: `⚠️ Jangan ubah apa2 setting

❌Boleh log in 1 device sahaja

1️⃣ HANYA 1 screen sahaja pada satu2 masa

p/s-Jika didapati buka lebih dari 1 screen dalam satu2 masa, profile akan dinyahaktifkan & tiada refund`
};

return {
emoji:"📦 ACCOUNT",
note:""
};
}

function renderForm(){
let p = product.value.toLowerCase();

if(!p){
form.innerHTML="";
return;
}

let common = `
${input("tg","Username Telegram")}
${input("exp","Expired Date")}
${input("email","Email Address")}
`;

form.innerHTML = common + `
${input("pass","Password")}
${input("profile","Nama Profile")}
${input("pin","Pincode")}
<textarea readonly>${getNote(p).note}</textarea>
`;
}

submitBtn.onclick = generate;

function generate(){

let p = product.value;
if(!p) return alert("Pilih produk");

let order = new URLSearchParams(window.location.search).get("order");

let data = {
order: order,
product: p,
username: val("tg"),
email: val("email"),
exp: val("exp"),
pass: val("pass"),
profile: val("profile"),
pin: val("pin")
};

const productInfo = getNote(p);

let text = `${productInfo.emoji}

ORDER NUMBER: ${order}

📅 Expiry: ${data.exp}
👤 Username: ${data.username}
📧 Email: ${data.email}
`;

if(data.pass) text+=`🔑 Password: ${data.pass}\n`;
if(data.profile) text+=`👥 Profile: ${data.profile}\n`;
if(data.pin) text+=`🔢 PIN: ${data.pin}\n`;

text += "\n" + productInfo.note;

result.classList.remove("hidden");
result.innerText = text;

navigator.clipboard.writeText(text);

/* 🔥 SAVE + DELAY REDIRECT (FIX) */
fetch(`${API_URL}?mode=save&order=${encodeURIComponent(order)}`)
  .then(() => {
    setTimeout(() => {
      window.location.href = `https://t.me/Numo_Acc_Generator?start=${order}`;
    }, 300);
  });

}

function val(id){
let el=document.getElementById(id);
return el?el.value:"";
}
