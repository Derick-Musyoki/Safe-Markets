
document.getElementById("loginBtn").onclick = function () {

  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  
  let correctUser = "seller254";
  let correctPass = "12345";

  if (user === correctUser && pass === correctPass) {
    alert("Login successful ");

    
    window.location.href = "admin.html";

  } else {
    alert("Invalid credentials ");
  }

};

