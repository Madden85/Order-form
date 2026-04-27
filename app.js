/* 🔥 AUTO FILL DARI LINK BOT */
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

/* ========================= */
const form = document.getElementById("form");
const result = document.getElementById("result");
const product = document.getElementById("product");
const submitBtn = document.getElementById("submitBtn");

const API_URL = "https://script.google.com/macros/s/AKfycbygES0rnSh7YKTZAmDrrbq0pzJmBQ7M5XT3VNBlFsW5zskT2Pj7FnTm9F_4NPESsm_S/exec";

/* ========================= */
product.onchange = renderForm;

function input(id,placeholder){
return `<input id="${id}" placeholder="${placeholder}">`;
}

/* ========================= */
/* NOTE (UNCHANGED) */
function getNote(p){
p = p.toLowerCase();

// semua note kekal sama (tak ubah langsung)
...
}

/* ========================= */
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

/* ========================= */
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

/* 🔥 SAVE TO SHEET */
fetch(`${API_URL}?mode=save` +
  `&order=${encodeURIComponent(data.order)}` +
  `&username=${encodeURIComponent(data.username)}` +
  `&email=${encodeURIComponent(data.email)}` +
  `&exp=${encodeURIComponent(data.exp)}` +
  `&pass=${encodeURIComponent(data.pass)}` +
  `&profile=${encodeURIComponent(data.profile)}` +
  `&pin=${encodeURIComponent(data.pin)}`
);

alert("Order generated + sent! ✅");

/* 🔥 OPEN TELEGRAM */
setTimeout(() => {
  window.open(`https://t.me/Numo_Acc_Generator?start=${order}`, "_blank");
}, 800);

}

function val(id){
let el=document.getElementById(id);
return el?el.value:"";
}
