document.addEventListener("DOMContentLoaded", function () {
    let currentUser = null; 

    //handel user login 
    const loginForm = document.getElementById("login-form"); 
    const loginButton = document.getElementById("loginButton"); 
    const loginContainer = document.getElementById("loginContainer");

    loginButton.addEventListener("click", function() {
        loginContainer.classList.toggle("active"); 
    }); 

    loginButton.addEventListener("submit", function (event){
        event.preventDefault(); 

        const username = document.getElementById("username").value; 
        const password = document.getElementById("password").value;

        //simulate a login (replace w/ real authentication in production)
        
    });

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
  
    // Favorite button toggle functionality
    const favButtons = document.querySelectorAll("[data-toggle-btn]");
  
    favButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.toggle("active");
        });
    });
  
    // Toggle login form visibility
    const loginButton = document.getElementById("loginButton");
    const loginContainer = document.getElementById("loginContainer");
  
    if (loginButton && loginContainer) {
        loginButton.addEventListener("click", function () {
            loginContainer.classList.toggle("active");
        });
    }

    // Login form submission handling
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
    
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
    
            // Retrieve users from localstorage 
            let users = JSON.parse(localStorage.getItem("users")) || [];

            //finder user with matching credentials 
            const user = users.find(user => user.username === username && user.password === password);
            
            if (users) {
                AudioListener("Login successful"); 

                //store current user in localstorage
                localStorage.setItem("currentUser", JSON.stringify(user)); 

                //redirect to account page 
                window.location.href = "account.html"; 
            } else {
                AudioListener("Invaild username or password")
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

            //retrieve existing users from localStorage or initialize empty array 
            let users = JSON.parse(localStorage.getItem("users")) || [];

            //check if username already exists 
            const userExists = users.some(user => user.username === username); 
            if (userExists) {
                alert ("Username already exists. please choose another one"); 
                return; 
            }
    
            //create new user object 
            users.push(newUser); 
            this.localStorage.setItem("users", JSON.stringify(users)); 

            alert(`Sign-up successful Welcome, ${fullName}!`); 
            signupForm.reset();

            window.location.href = "login.html";
        });
    }

    //logout functionality 
    const logoutButton = document.getElementById("logoutButton"); 
    if(loginButton){
        loginButton.addEventListener("click", function(){
            localStorage.removeItem("currentUser"); 
            alert("you have been logged out"); 
            window.location.href = "index.html"
        })
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
        {img: 'img1.jpg', title: 'Property 1', price: '$500,000', location: 'Location 1', beds: 3, baths: 2, sqft: 1500},
        {img: 'img2.jpg', title: 'Property 2', price: '$750,000', location: 'Location 2', beds: 4, baths: 3, sqft: 2000}
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
