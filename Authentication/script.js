let users = JSON.parse(localStorage.getItem("users")) || [];

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

function navigateWithSwipe(url) {
    const card = document.querySelector('.login-card, .register-card');
    card.style.animation = 'slideOut 0.4s ease forwards';
    
    setTimeout(() => {
        window.location.href = url;
    }, 400);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(-30px); }
    }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", function() {
    
    users = JSON.parse(localStorage.getItem("users")) || [];
    
    const activeUser = localStorage.getItem("activeUser");
    if (activeUser && (window.location.pathname.includes("login.html") || window.location.pathname.includes("register.html"))) {
        const user = JSON.parse(activeUser);
        if (user.role === "buyer") window.location.href = "marketplace.html";
        if (user.role === "seller") window.location.href = "dashboard.html";
    }
    
    if (document.getElementById("loginBtn")) {
        document.getElementById("loginBtn").onclick = function() {
            const email = document.getElementById("loginEmail").value;
            const pass = document.getElementById("loginPassword").value;
            
            users = JSON.parse(localStorage.getItem("users")) || [];
            
            const user = users.find(u => u.email === email && u.password === pass);
            
            if (user) {
                localStorage.setItem("activeUser", JSON.stringify(user));
                alert("Login successful!");
                if (user.role === "buyer") window.location.href = "marketplace.html";
                if (user.role === "seller") window.location.href = "dashboard.html";
            } else {
                alert("Wrong email or password!");
            }
        };
        
        document.getElementById("goToRegister").onclick = function(e) {
            e.preventDefault();
            navigateWithSwipe("register.html");
        };
    }
    
    if (document.getElementById("registerBtn")) {
        document.getElementById("registerBtn").onclick = function() {
            const email = document.getElementById("regEmail").value;
            const pass = document.getElementById("regPassword").value;
            const confirm = document.getElementById("confirmPassword").value;
            const terms = document.getElementById("termsCheck").checked;
            
            let role = "buyer";
            const radios = document.querySelectorAll('input[name="role"]');
            for (let r of radios) if (r.checked) role = r.value;
            
            if (!email || !pass || !confirm) {
                alert("Please fill all fields!");
                return;
            }
            
            if (!terms) {
                alert("Please accept Terms & Conditions!");
                return;
            }
            
            if (pass !== confirm) {
                alert("Passwords don't match!");
                return;
            }
            
            users = JSON.parse(localStorage.getItem("users")) || [];
            
            if (users.find(u => u.email === email)) {
                alert("Email already registered!");
                return;
            }
            
            users.push({ email, password: pass, role, trustScore: 70 });
            saveUsers();
            
            alert("Account created! Please login.");
            navigateWithSwipe("login.html");
        };
        
        document.getElementById("goToLogin").onclick = function(e) {
            e.preventDefault();
            navigateWithSwipe("login.html");
        };
    }
});
