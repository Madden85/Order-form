// UPDATED APP.JS (AUTO OPEN TELEGRAM + CLEAN FLOW)

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
    }, 300);
  }
});

function setField(id, value){
  const el = document.getElementById(id);
  if(el && value) el.value = value;
}

const form = document.getElementById("form");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const product = document.getElementById("product");
const submitBtn = document.getElementById("submitBtn");

const API_URL = "PASTE_API_URL_KAU";

product.onchange = renderForm;

function input(id,placeholder){
  return `<input id="${id}" placeholder="${placeholder}">`;
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

if(p.includes("netflix")){
form.innerHTML = common + `
${input("pass","Password")}
${input("profile","Nama Profile")}
${input("pin","Pincode")}
<textarea readonly>
⚠️ JANGAN UBAH apa2 setting
⚠️ JANGAN KACAU profile lain
1️⃣ HANYA 1 SCREEN SAHAJA
</textarea>`;
}
}

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
pass: val("pass"),
profile: val("profile"),
pin: val("pin")
};

let text = `${p.toUpperCase()}

ORDER NUMBER: ${order}

Expiry: ${data.exp}
Username: ${data.username}
Email: ${data.email}
`;

if(data.pass) text+=`Password: ${data.pass}\n`;
if(data.profile) text+=`Profile name: ${data.profile}\n`;
if(data.pin) text+=`Pincode: ${data.pin}\n`;

let note = document.querySelector("textarea")?.value || "";
text += "\n\n" + note;

result.classList.remove("hidden");
result.innerText = text;

navigator.clipboard.writeText(text);

fetch(API_URL,{
method:"POST",
body: JSON.stringify(data)
});

// AUTO OPEN TELEGRAM
const botLink = "https://t.me/NAMA_BOT_KAU";
setTimeout(() => {
  window.open(`${botLink}?start=${order}`, "_blank");
}, 800);

alert("Order generated + opened Telegram ✅");

copyBtn.classList.remove("hidden");

copyBtn.onclick = ()=>{
navigator.clipboard.writeText(text);
alert("Copied!");
};
}

function val(id){
let el=document.getElementById(id);
return el?el.value:"";
}
