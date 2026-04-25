// AUTO FILL FROM LINK
window.addEventListener("load", () => {

  const params = new URLSearchParams(window.location.search);

  const order = params.get("order");
  const product = params.get("product");
  const pin = params.get("pin");
  const exp = params.get("exp");

  if(product === "netflix"){
    document.getElementById("product").value = "netflix";
    renderForm();

    setTimeout(() => {
      setField("pin", pin);
      setField("exp", exp);
    }, 300);
  }

});

const form = document.getElementById("form");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const product = document.getElementById("product");
const submitBtn = document.getElementById("submitBtn");

function setField(id, value){
  const el = document.getElementById(id);
  if(el && value) el.value = value;
}

product.onchange = renderForm;

function input(id,placeholder){
return `<input id="${id}" placeholder="${placeholder}">`;
}

function renderForm(){

let p = product.value;

if(!p){
form.innerHTML="";
return;
}

if(p === "netflix"){
form.innerHTML = `
${input("tg","Username Telegram")}
${input("exp","Expiry Date")}
${input("email","Email")}
${input("pass","Password")}
${input("profile","Profile")}
${input("pin","Pincode")}
`;
}

}

submitBtn.onclick = generate;

function generate(){

let p = product.value;
if(!p) return alert("Pilih produk");

let order = new URLSearchParams(window.location.search).get("order") 
            || Math.floor(10000 + Math.random()*90000);

let data = {
order,
product:p,
username: val("tg"),
email: val("email"),
exp: val("exp"),
pass: val("pass"),
profile: val("profile"),
pin: val("pin")
};

let text = `NETFLIX

ORDER NUMBER: ${order}

Expiry: ${data.exp}
Username: ${data.username}
Email: ${data.email}
Password: ${data.pass}
Profile: ${data.profile}
Pincode: ${data.pin}
`;

result.classList.remove("hidden");
result.innerText = text;

navigator.clipboard.writeText(text);

// OPEN TELEGRAM CUSTOMER
let user = data.username.replace("@","");
window.open(`https://t.me/${user}?text=${encodeURIComponent(text)}`);

alert("DONE ✅");

}

function val(id){
let el=document.getElementById(id);
return el?el.value:"";
}
