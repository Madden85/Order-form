
const form = document.getElementById("form");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const product = document.getElementById("product");
const submitBtn = document.getElementById("submitBtn");

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

form.innerHTML = common;
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

result.classList.remove("hidden");
result.innerText = text;

navigator.clipboard.writeText(text);

// 🔥 SEND TO APPS SCRIPT (FINAL)
fetch("https://script.google.com/macros/s/AKfycbxl2WYo8PensBMtJeQbBjlRSI0BzVG-4uTzRWLmy8cxSot55zIz8EGmzRtg74Kyen7K/exec",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
order:order,
product:p,
username:val("tg"),
email:val("email"),
exp:val("exp")
})
});

alert("Order generated + sent!");

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
