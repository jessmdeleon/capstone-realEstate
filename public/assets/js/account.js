document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    const favoritesList = document.querySelector('.favorites-list');
    const logoutButton = document.getElementById("logoutButton");

    // Display favorite properties
    if (currentUser && currentUser.favorites) {
        if (currentUser.favorites.length === 0) {
            favoritesList.innerHTML = '<p>No favorite properties yet.</p>';
        } else {
            currentUser.favorites.forEach(property => {
                // Ensure that all necessary property data exists
                const propertyTitle = property.title || 'Unknown Title';
                const propertyPrice = property.price || 'Unknown Price';
                const propertyImg = property.img || 'assets/img/default.jpg'; // Use a default image if none available
                const propertyLocation = property.location || 'Unknown Location';
                const propertyBeds = property.beds || 'N/A';
                const propertyBaths = property.baths || 'N/A';
                const propertySqft = property.sqft || 'N/A';

                const propertyCard = `
                    <div class="card">
                        <div class="card-banner">
                            <figure class="img-holder" style="--width: 585; --height: 390">
                                <img src="${propertyImg}" width="585" height="390" alt="${propertyTitle}" class="img-cover">
                            </figure>
                            <span class="badge label-medium">Favorite</span>
                        </div>
                        <div class="card-content">
                            <span class="title-large">${propertyPrice}</span>
                            <h3><a href="#" class="title-small card-title">${propertyTitle}</a></h3>
                            <address class="body-medium card-text">
                                ${propertyLocation}
                            </address>
                            <div class="card-meta-list">
                                <div class="meta-item">
                                    <span class="material-symbols-rounded meta-icon" aria-hidden="true">bed</span>
                                    <span class="meta-text label-medium">${propertyBeds} Beds</span>
                                </div>
                                <div class="meta-item">
                                    <span class="material-symbols-rounded meta-icon" aria-hidden="true">bathroom</span>
                                    <span class="meta-text label-medium">${propertyBaths} Bath</span>
                                </div>
                                <div class="meta-item">
                                    <span class="material-symbols-rounded meta-icon" aria-hidden="true">straighten</span>
                                    <span class="meta-text label-medium">${propertySqft} sqft</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                favoritesList.insertAdjacentHTML('beforeend', propertyCard);
            });
        }
    } else {
        favoritesList.innerHTML = '<p>You must be logged in to view your favorite properties.</p>';
    }

    // Logout button functionality
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("token");
            alert("You have been logged out.");
            window.location.href = "index.html";
        });
    }
});
