const form = document.getElementById("form");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const product = document.getElementById("product");
const submitBtn = document.getElementById("submitBtn");

/* 🔥 TELEGRAM SETUP */
const BOT_TOKEN = "8731623582:AAFE9WBUyeYg4VxQfgXPMpW7j6atjA5F-Bg";
const CHAT_ID = "310295809";

function sendTele(text){
fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
chat_id:CHAT_ID,
text:text
})
});
}

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

let order = Math.floor(10000 + Math.random()*90000);

let text = `${p.toUpperCase()}

ORDER NUMBER: ${order}

Expiry: ${val("exp")}
Username: ${val("tg")}
Email: ${val("email")}
`;

if(val("pass")) text+=`Password: ${val("pass")}\n`;
if(val("profile")) text+=`Profile name: ${val("profile")}\n`;
if(val("pin")) text+=`Pincode: ${val("pin")}\n`;
if(val("phone")) text+=`Phone: ${val("phone")}\n`;
if(val("link")) text+=`Link: ${val("link")}\n`;

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

/* AUTO COPY */
navigator.clipboard.writeText(text);

/* 🔥 AUTO SEND TELEGRAM */
sendTele(text);

fetch("https://script.google.com/macros/s/AKfycbw0Thzsxoigaf-pzi7RpSYUZRAPUSmdVrGBuzGIvT1o9AIPyJ9lRmc7pTKkXJWYTznF/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    order: order,
    product: p,
    username: val("tg"),
    email: val("email"),
    exp: val("exp")
  })
});

alert("Order generated + sent to Telegram!");

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