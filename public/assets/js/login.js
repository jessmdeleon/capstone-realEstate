document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); 

            const username = document.getElementById("username").value; 
            const password = document.getElementById("password").value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Store the token and user information 
                    localStorage.setItem("token", data.token); 
                    localStorage.setItem("currentUser", JSON.stringify({ username }));

                    alert("Login successful"); 
                    window.location.href = "account.html";  // Redirect to account page
                } else {
                    alert("Invalid username or password");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                alert("An error occurred while logging in. Please try again.");
            }
        });
    }
});
