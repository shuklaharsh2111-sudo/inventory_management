function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

function showLogin() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const role = document.getElementById("registerRole").value;
    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                role
            })
        });
        const data = await response.json();
        if (data.success) {
            alert("Registration Successful!");
            document.getElementById("registerForm").reset();
            setTimeout(() => {
                showLogin();
            }, 500);
        }
        else {
            alert("Registration Failed!\n\n" + data.message);
        }
    } catch (error) {
        console.error("Registration Error:", error);
        alert("Server Connection Failed!\n\nPlease try again later.");
    }
});

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = data.redirect;
        
        }
        else {
            alert("Login Failed!\n\n" + data.message);
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Server Connection Failed!\n\nPlease try again later.");
    }
});