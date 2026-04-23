const form = document.getElementById("form");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const product = document.getElementById("product");
const submitBtn = document.getElementById("submitBtn");

const API_URL = "https://script.google.com/macros/s/AKfycbxdkQpoguov3ZGCzwmURh_ECMJfEpSDj0ci-q9nV_F75Z_VECsJVgpnscQflfIteNzR_w/exec";

const BOT_TOKEN = "8731623582:AAE_IaGXrywbwfAi91ehZEVnMgohLdpr2Ms";
const CHAT_ID = "310295809";

function sendTele(text){
fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({chat_id:CHAT_ID,text:text})
});
}

product.onchange = ()=>{
form.innerHTML = `
<input id="tg" placeholder="Username">
<input id="email" placeholder="Email">
<input id="exp" placeholder="Expiry">
<input id="phone" placeholder="Phone">
`;
};

submitBtn.onclick = ()=>{
let order = Math.floor(10000 + Math.random()*90000);

let data = {
order: order,
product: product.value,
username: document.getElementById("tg").value,
email: document.getElementById("email").value,
exp: document.getElementById("exp").value,
phone: document.getElementById("phone").value
};

let text = `ORDER: ${data.order}
Product: ${data.product}
Username: ${data.username}
Email: ${data.email}
Expiry: ${data.exp}
Phone: ${data.phone}`;

result.classList.remove("hidden");
result.innerText = text;

fetch(API_URL,{method:"POST",body: JSON.stringify(data)});

sendTele(text);

navigator.clipboard.writeText(text);

alert("SUCCESS");

copyBtn.classList.remove("hidden");
};
