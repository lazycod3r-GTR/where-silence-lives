function check(){
  const v=document.getElementById("codeInput").value;
  document.getElementById("msg").textContent =
    v==="0399" ? location.href="cards.html" : "❌ Wrong code";
}
