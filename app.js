/* 🔥 AUTO FILL DARI LINK BOT - ROBUST VERSION */
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
    const normalized = productParam.toLowerCase();

    if (normalized === "netflix" || normalized.includes("netflix")) {
      selectProductByText("Netflix premium private profile");
    } else if (normalized === "yt-own" || normalized.includes("own")) {
      selectProductByText("Youtube Premium Own email");
    } else if (normalized === "yt-seller" || normalized.includes("seller")) {
      selectProductByText("Youtube premium seller email");
    } else if (normalized.includes("sooka")) {
      selectProductByText("Sooka premium");
    } else if (normalized.includes("spotify")) {
      selectProductByText("Spotify premium");
    } else if (normalized.includes("iqiyi")) {
      selectProductByText("iqiyi premium");
    } else if (normalized.includes("disney")) {
      selectProductByText("disney+ hotstar");
    } else if (normalized.includes("viu")) {
      selectProductByText("viu premium");
    } else {
      product.value = productParam;
    }

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

function selectProductByText(text){
  const options = Array.from(product.options);
  const found = options.find(opt => opt.text.trim().toLowerCase() === text.trim().toLowerCase());
  if(found) product.value = found.value || found.text;
}


const form = document.getElementById("form");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const product = document.getElementById("product");
const submitBtn = document.getElementById("submitBtn");

/* 🔥 API BACKEND (SECURE) */
const API_URL = "https://script.google.com/macros/s/AKfycbwlMAT73jeOpJOOxIq6sljN927-amrf0R3QTX7OjHdR0ElYVVm_G5P31HSc2lp9eOBv/exec";

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
1️⃣ HANYA 1 SCREEN SAHAJA pada satu2 masa

p/s-Jika didapati buka lebih dari 1 screen dalam satu2 masa,PROFILE AKAN DINYAHAKTIF & TIADA REFUND ❗️Peringatan Bermula Julai 2025 kami dari pihak NuMo ventures akan menukar password netflix secara RANDOM bagi mengelakkan acc diceroboh pihak yang tidak bertanggungjawab
</textarea>`;
}

else if(p.includes("own")){
form.innerHTML = common;
}

else if(p.includes("seller")){
form.innerHTML = common + `
${input("pass","Password")}
<textarea readonly>
Note
Hanya 1 device shj dibenarkan🚫

🔷Sila masuk youtube, tekan add account, masuk detail yg diberi dan tekan log in

🔷Selepas log in, tak boleh tukar password
</textarea>`;
}

else if(p.includes("sooka")){
form.innerHTML = common + `
${input("pass","Password")}
<textarea readonly>
Note
⚠️ Jangan ubah apa2 setting

❌Boleh log in 1 device sahaja

1️⃣ HANYA 1 screen sahaja pada satu2 masa

p/s-Jika didapati buka lebih dari 1 DEVICE, Access akan dinyahaktifkan & tiada refund
</textarea>`;
}

else if(p.includes("spotify")){
form.innerHTML = common + `
${input("link","Link Invitation")}
<textarea readonly>
Note
1)Tekan link yang diberi dan tekan TERIMA JEMPUTAN

2)DAFTAR AKAUN SPOTIFY atau LOG MASUK menggunakan akaun anda yang sedia ada

3)Sahkan alamat anda - Lebuh Nipah 1

4)Siap — biarkan muzik bermula.

 Lepas dah boleh join family, sila inform admin semula

 Hanya 1 DEVICE SAHAJA untuk 1 langganan
</textarea>`;
}

else if(p.includes("iqiyi")){
form.innerHTML = common + `
${input("pass","Password")}
<textarea readonly>
Note
⚠️ Jangan ubah apa2 setting

❌Boleh log in 1 device sahaja

1️⃣ HANYA 1 screen sahaja pada satu2 masa

p/s-Jika didapati buka lebih dari 1 screen dalam satu2 masa, profile akan dinyahaktifkan & tiada refund
</textarea>`;
}

else if(p.includes("disney")){
form.innerHTML = common + `
${input("profile","Nama Profile")}
${input("phone","Phone Number")}
<textarea readonly>
Note
1)Buka app Disney+ Hotstar

2)Masukkan no phone

3)Masukkan code yang admin akan bagi

4)Siap

Hanya 1 DEVICE SAHAJA untuk 1 langganan

JANGAN GANGGU PROFILE ORANG LAIN
</textarea>`;
}

else if(p.includes("viu")){
form.innerHTML = common + `
${input("pass","Password")}
<textarea readonly>
Note
⚠️ Jangan ubah apa2 setting

❌Boleh log in 1 device sahaja

1️⃣ HANYA 1 screen sahaja pada satu2 masa

p/s-Jika didapati buka lebih dari 1 screen dalam satu2 masa, profile akan dinyahaktifkan & tiada refund
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
phone: val("phone"),
pass: val("pass"),
profile: val("profile"),
pin: val("pin"),
link: val("link")
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
if(data.phone) text+=`Phone: ${data.phone}\n`;
if(data.link) text+=`Link: ${data.link}\n`;

let note = document.querySelector("textarea")?.value || "";
text += "\n\n" + note;

text += `

-------------------------------------

GENERATE CODE atau VERIFY EMAIL anda sendiri disini

❗PENTING❗ Sila gunakan order number yang diberikan di atas 👆 

https://numoverifycode.netlify.app/
`;

/* OUTPUT */
result.classList.remove("hidden");
result.innerText = text;

/* COPY */
navigator.clipboard.writeText(text);

/* 🔥 SEND TO BACKEND */
fetch(API_URL,{
method:"POST",
body: JSON.stringify(data)
});

alert("Order generated + sent! ✅");

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

// ===============================
// AUTO FILL DARI LINK
// ===============================
const urlParams = new URLSearchParams(window.location.search);

window.onload = function () {

  const params = new URLSearchParams(window.location.search);

  const productParam = params.get("product");
  const pin = params.get("pin");
  const exp = params.get("exp");

  // tunggu page fully ready
  setTimeout(() => {

    const select = document.getElementById("product");

    if(productParam && select){

      // force pilih Netflix
      for(let i=0; i<select.options.length; i++){
        if(select.options[i].text.toLowerCase().includes(productParam)){
          select.selectedIndex = i;
        }
      }

      // trigger form render
      renderForm();

      // tunggu form keluar dulu
      setTimeout(()=>{

        const pinInput = document.getElementById("pin");
        const expInput = document.getElementById("exp");

        if(pinInput) pinInput.value = pin || "";
        if(expInput) expInput.value = exp || "";

      }, 500);
    }

  }, 300);

};
