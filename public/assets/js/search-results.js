document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const wantTo = params.get('want-to');
    const propertyType = params.get('property-type');
    const location = params.get('location').toLowerCase();

    // Filter properties based on search criteria
    const filteredProperties = properties.filter(property => {
        const matchesType = propertyType === "any" || property.type === propertyType;
        const matchesLocation = property.location.toLowerCase().includes(location);
        return matchesType && matchesLocation;
    });

    // Display filtered properties
    const resultsDiv = document.getElementById('results');
    if (filteredProperties.length > 0) {
        filteredProperties.forEach(property => {
            const propertyCard = `
                <div class="card">
                    <div class="card-banner">
                        <figure class="img-holder" style="--width: 585; --height: 390">
                            <img src="${property.img}" width="585" height="390" alt="${property.title}" 
                            class="img-cover">
                        </figure>

                        <span class="badge label-medium">New</span>

                        <button class="icon-btn fav-btn" aria-label="add to favorite" data-toggle-btn>
                            <span class="material-symbols-rounded" aria-hidden="true">favorite</span>
                        </button>
                    </div>

                    <div class="card-content">
                        <span class="title-large">${property.price}</span>
                        <h3><a href="#" class="title-small card-title">${property.title}</a></h3>
                        <address class="body-medium card-text">${property.location}</address>

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
                </div>`;
            resultsDiv.innerHTML += propertyCard;
        });
    } else {
        resultsDiv.innerHTML = `<p>No properties found matching your criteria.</p>`;
    }
});
