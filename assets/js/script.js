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
            loginButton.addEventListener("click", function() {
                loginContainer.classList.toggle("active");
            });
        }

        const loginForm = document.getElementById("login-form");
        if (loginForm) {
            loginForm.addEventListener("submit", function (event){
                event.preventDefault(); 

                const username = document.getElementById("username").value; 
                const password = document.getElementById("password").value;

                let users = JSON.parse(localStorage.getItem("users")) || [];

                const user = users.find(user => user.username === username && user.password === password);
                
                if (user) {
                    alert("Login successful");

                    localStorage.setItem("currentUser", JSON.stringify(user));

                    window.location.href = "account.html"; 
                } else {
                    alert("Invalid username or password");
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

    // Sign-up form submission handling
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
    
            const fullName = document.getElementById("signup-full-name").value;
            const username = document.getElementById("signup-username").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
            const confirmPassword = document.getElementById("signup-confirm-password").value;
            const bedrooms = document.getElementById("bedrooms").value;
            const petFriendly = document.getElementById("pet-friendly").value;
            const familyType = document.getElementById("family-type").value;
    
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Retrieve existing users from localStorage or initialize an empty array 
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if username already exists 
            const userExists = users.some(user => user.username === username); 
            if (userExists) {
                alert("Username already exists. Please choose another one."); 
                return; 
            }
    
            // Create new user object 
            const newUser = {
                fullName,
                username,
                email,
                password,
                bedrooms,
                petFriendly,
                familyType,
                favorites: []
            };
            users.push(newUser); 
            localStorage.setItem("users", JSON.stringify(users)); 

            alert(`Sign-up successful! Welcome, ${fullName}!`); 
            signupForm.reset();

            window.location.href = "login.html";
        });
    }

    // Logout functionality 
    const logoutButton = document.getElementById("logoutButton"); 
    if (logoutButton) {
        logoutButton.addEventListener("click", function(){
            localStorage.removeItem("currentUser"); 
            alert("You have been logged out"); 
            window.location.href = "index.html";
        });
    }

    // Video play button handling
    const playBtn = document.querySelector(".play-btn");
    if (playBtn) {
        playBtn.addEventListener("click", function () {
            alert("Playing video...");
        });
    }
  
    // Dynamically generate property cards
    const propertyList = document.querySelector('.property-list');
    const properties = [
        // Example properties data (should be replaced with actual data)
        {img: 'assets/img/buy4.jpg', title: 'Modern Family First Home', price: '$500,000', location: 'Atlanta, Georgia', beds: 4, baths: 3, sqft: 2500},
        {img: 'assets/img/buyTownhome3.jpg', title: 'Townhome Villa', price: '$750,000', location: 'Alpharetta, Georgia', beds: 3, baths: 2, sqft: 1510}
    ];
  
    if (propertyList && properties.length > 0) {
        properties.forEach(property => {
            const propertyCard = `
                <div class="card">
                    <div class="card-banner">
                        <figure class="img-holder" style="--width: 585; --height: 390">
                            <img src="${property.img}" width="585" height="390" alt="${property.title}" class="img-cover">
                        </figure>
                        <span class="badge label-medium">New</span>
                        <button class="icon-btn fav-btn" aria-label="add to favorite" data-toggle-btn>
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
    
            propertyList.insertAdjacentHTML('beforeend', propertyCard);
        });
    }
});
