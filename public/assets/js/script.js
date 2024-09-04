document.addEventListener("DOMContentLoaded", function () {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    // Update header with account link if logged in
    const accountLinkContainer = document.getElementById("account-link-container");
    const signupLink = document.getElementById("signupLink");

    if (currentUser) {
        accountLinkContainer.innerHTML = `
            <a href="account.html" class="btn btn-fill label-medium">My Account</a>
            <button id="logoutButton" class="btn btn-outline label-medium">Logout</button>
        `;

        if (signupLink) {
            signupLink.style.display = 'none'; // Hide signup link if logged in
        }

        const logoutButton = document.getElementById("logoutButton");
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("token");
            alert("You have been logged out");
            window.location.href = "index.html";
        });
    } else {
        accountLinkContainer.innerHTML = `
            <button id="loginButton" class="btn btn-fill label-medium">Login</button>
            <a href="signup.html" class="btn-link label-medium">Sign Up</a>
            <div id="loginContainer" class="login-container">
                <form id="login-form" class="login-form">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                    <button type="submit" class="btn btn-fill label-medium">Login</button>
                </form>
            </div>
        `;

        const loginButton = document.getElementById("loginButton");
        const loginContainer = document.getElementById("loginContainer");

        if (loginButton) {
            loginButton.addEventListener("click", function () {
                loginContainer.classList.toggle("active");
            });
        }

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
                        window.location.href = "account.html";
                    } else {
                        alert("Invalid username or password");
                    }
                } catch (error) {
                    console.error("Error logging in:", error);
                    alert("An error occurred while logging in. Please try again.");
                }
            });
        }
    }

    // Favorite button toggle functionality
    const favButtons = document.querySelectorAll("[data-toggle-btn]");
  
    favButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            if (currentUser) {
                button.classList.toggle("active");

                const propertyTitle = button.closest('.card').querySelector('.card-title').textContent;
                const property = properties.find(prop => prop.title === propertyTitle);

                if (!currentUser.favorites) {
                    currentUser.favorites = [];
                }

                if (button.classList.contains("active")) {
                    currentUser.favorites.push(property);
                } else {
                    currentUser.favorites = currentUser.favorites.filter(fav => fav.title !== property.title);
                }

                // Save updated user data
                let users = JSON.parse(localStorage.getItem("users")) || [];
                const userIndex = users.findIndex(user => user.username === currentUser.username);
                users[userIndex] = currentUser;
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
            } else {
                alert("Please log in to save favorites.");
            }
        });
    });

    // Ensure the favorite buttons are updated based on the user's favorites
    if (currentUser && currentUser.favorites) {
        favButtons.forEach(function (button) {
            const propertyTitle = button.closest('.card').querySelector('.card-title').textContent;
            if (currentUser.favorites.some(fav => fav.title === propertyTitle)) {
                button.classList.add("active");
            }
        });
    }

    // Display user's favorite properties in the account page
    const favoritesList = document.querySelector('.favorites-list');
    if (favoritesList && currentUser && currentUser.favorites) {
        currentUser.favorites.forEach(property => {
            const propertyCard = `
                <div class="card">
                    <div class="card-banner">
                        <figure class="img-holder" style="--width: 585; --height: 390">
                            <img src="${property.img}" width="585" height="390" alt="${property.title}" class="img-cover">
                        </figure>
                        <span class="badge label-medium">Favorite</span>
                        <button class="icon-btn fav-btn active" aria-label="remove from favorite" data-toggle-btn>
                            <span class="material-symbols-rounded" aria-hidden="true">favorite</span>
                        </button>
                    </div>
                    <div class="card-content">
                        <span class="title-large">${property.price}</span>
                        <h3><a href="#" class="title-small card-title">${property.title}</a></h3>
                        <address class="body-medium card-text">
                            ${property.location}
                        </address>
                        <div class="card-meta-list">
                            <div class="meta-item">
                                <span class="material-symbols-rounded meta-icon" aria-hidden="true">bed</span>
                                <span class="meta-text label-medium">${property.beds} Beds</span>
                            </div>
                            <div class="meta-item">
                                <span class="material-symbols-rounded meta-icon" aria-hidden="true">bathroom</span>
                                <span class="meta-text label-medium">${property.baths} Bath</span>
                            </div>
                            <div class="meta-item">
                                <span class="material-symbols-rounded meta-icon" aria-hidden="true">straighten</span>
                                <span class="meta-text label-medium">${property.sqft} sqft</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            favoritesList.insertAdjacentHTML('beforeend', propertyCard);
        });
    }

    // Handle the search form submission
    const searchForm = document.querySelector(".search-bar");
    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const wantTo = searchForm.querySelector('select[name="want-to"]').value;
            const propertyType = searchForm.querySelector('select[name="property-type"]').value;
            const location = searchForm.querySelector('input[name="location"]').value;

            // Construct search query
            let searchQuery = `?want-to=${encodeURIComponent(wantTo)}&property-type=${encodeURIComponent(propertyType)}&location=${encodeURIComponent(location)}`;

            // Redirect to a search results page or process the search
            window.location.href = `search-results.html${searchQuery}`;
        });
    }

    // Navbar toggle functionality
    const navToggleBtn = document.querySelector("[data-nav-toggler]");
    const header = document.querySelector("[data-header]");
    const navbar = document.querySelector("[data-navbar]");
  
    if (navToggleBtn && header && navbar) {
        navToggleBtn.addEventListener("click", function () {
            header.classList.toggle("active");
            navbar.classList.toggle("active");
        });

        // Close the navbar when clicking outside of it
        document.addEventListener("click", function (event) {
            if (!navToggleBtn.contains(event.target) && !navbar.contains(event.target)) {
                header.classList.remove("active");
                navbar.classList.remove("active");
            }
        });
    }
});
