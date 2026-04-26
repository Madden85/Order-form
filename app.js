/* 🔥 AUTO FILL DARI LINK BOT - ORIGINAL KEEP */
window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);

  const orderParam = params.get("order");
  const productParam = params.get("product");
  const tgParam = params.get("tg");
  const expParam = params.get("exp");
  const emailParam = params.get("email");
  const passParam = params.get("pass");
  const profileParam = params.get("profile");
  const pinParam = params.get("pin");
  const phoneParam = params.get("phone");
  const linkParam = params.get("link");
  const deviceParam = params.get("device");

  if (orderParam) {
    const orderInput = document.getElementById("orderNo");
    if (orderInput) orderInput.value = orderParam;
  }

  if (productParam) {
    product.value = productParam;
    renderForm();

    setTimeout(() => {
      setField("tg", tgParam);
      setField("exp", expParam);
      setField("email", emailParam);
      setField("pass", passParam);
      setField("profile", profileParam);
      setField("pin", pinParam);
      setField("phone", phoneParam);
      setField("link", linkParam);
      setField("device", deviceParam);
    }, 300);
  }
});

function setField(id, value){
  const el = document.getElementById(id);
  if(el && value) el.value = value;
}

/* 🔥 ORIGINAL VAR */
const form = document.getElementById("form");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const product = document.getElementById("product");
const submitBtn = document.getElementById("submitBtn");

/* 🔥 API BACKEND (GANTI DENGAN API KAU) */
const API_URL = "https://script.google.com/macros/s/AKfycbygES0rnSh7YKTZAmDrrbq0pzJmBQ7M5XT3VNBlFsW5zskT2Pj7FnTm9F_4NPESsm_S/exec";

/* 🔥 BOT LINK (GANTI BOT KAU) */
const BOT_LINK = "https://t.me/NumoVerifyCode_bot";

/* ========================= */
product.onchange = renderForm;

function input(id,placeholder){
return `<input id="${id}" placeholder="${placeholder}">`;
}

/* 🔥 FORM ORIGINAL (TAK UBAH) */
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

if(p.includes("netflix")){
form.innerHTML = common + `
${input("pass","Password")}
${input("profile","Nama Profile")}
${input("pin","Pincode")}
<textarea readonly>
⚠️ JANGAN UBAH apa2 setting
⚠️ JANGAN KACAU profile lain
1️⃣ HANYA 1 SCREEN SAHAJA pada satu2 masa

p/s-Jika didapati buka lebih dari 1 screen dalam satu2 masa,PROFILE AKAN DINYAHAKTIF & TIADA REFUND ❗️Peringatan Bermula Julai 2025 kami dari pihak NuMo ventures akan menukar password netflix secara RANDOM bagi mengelakkan acc diceroboh pihak yang tidak bertanggungjawab
</textarea>`;
}

/* 👉 PRODUCT LAIN TAK UBAH (KEEP ASAL KAU) */
}

/* ========================= */
/* 🔥 GENERATE + AUTO FLOW */
submitBtn.onclick = generate;

function generate(){

let p = product.value;
if(!p) return alert("Pilih produk");

let order = new URLSearchParams(window.location.search).get("order") || Math.floor(10000 + Math.random()*90000);

let data = {
order: order,
product: p,
username: val("tg"),
email: val("email"),
exp: val("exp"),
phone: val("phone"),
pass: val("pass"),
profile: val("profile"),
pin: val("pin"),
link: val("link")
};

/* 🔥 TEXT ORIGINAL */
let text = `${p.toUpperCase()}

ORDER NUMBER: ${order}

Expiry: ${data.exp}
Username: ${data.username}
Email: ${data.email}
`;

if(data.pass) text+=`Password: ${data.pass}\n`;
if(data.profile) text+=`Profile name: ${data.profile}\n`;
if(data.pin) text+=`Pincode: ${data.pin}\n`;
if(data.phone) text+=`Phone: ${data.phone}\n`;
if(data.link) text+=`Link: ${data.link}\n`;

let note = document.querySelector("textarea")?.value || "";
text += "\n\n" + note;

text += `

-------------------------------------

GENERATE CODE atau VERIFY EMAIL anda sendiri disini

❗PENTING❗ Sila gunakan order number yang diberikan di atas 👆 

https://https://numoverifycode2.netlify.app/
`;

/* OUTPUT */
result.classList.remove("hidden");
result.innerText = text;

/* COPY */
navigator.clipboard.writeText(text);

/* 🔥 SEND DATA KE GOOGLE SHEET */
fetch(API_URL,{
method:"POST",
body: JSON.stringify(data)
});

/* ALERT */
alert("Order generated + sent! ✅");

copyBtn.classList.remove("hidden");

copyBtn.onclick = ()=>{
navigator.clipboard.writeText(text);
alert("Copied!");
};

/* =============================== */
/* 🔥 AUTO OPEN TELEGRAM BOT */
/* =============================== */
setTimeout(() => {
  window.open(`${BOT_LINK}?start=${order}`, "_blank");
}, 800);

}

/* ========================= */
function val(id){
let el=document.getElementById(id);
return el?el.value:"";
}
