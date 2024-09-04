// Example property data with images
const propertiesForSale = [
    { 
        name: 'Modern House', 
        type: 'house', 
        location: 'Suburbs', 
        price: '$500,000', 
        status: 'available',
        imageUrl: './assets/img/townhouse1.png' // Add image URL
    },
    { 
        name: 'City Apartment', 
        type: 'apartment', 
        location: 'Downtown', 
        price: '$300,000', 
        status: 'available',
        imageUrl: './assets/img/townhouse2.png' // Add image URL
    },
    { 
        name: 'Luxury Townhouse', 
        type: 'townhouse', 
        location: 'Uptown', 
        price: '$700,000', 
        status: 'available',
        imageUrl: './assets/img/townhouse3.png' // Add image URL
    },
    { 
        name: 'Beach Condo', 
        type: 'condo', 
        location: 'Beachside', 
        price: '$400,000', 
        status: 'available',
        imageUrl: './assets/img/townhouse1.png' // Add image URL
    }
];

function displayProperties(properties) {
    const container = document.getElementById('property-list-container');
    container.innerHTML = '';

    properties.forEach(property => {
        const propertyElement = document.createElement('div');
        propertyElement.classList.add('property-item');

        propertyElement.innerHTML = `
            <img src="${property.imageUrl}" alt="${property.name}" class="property-image">
            <h3 class="property-title">${property.name}</h3>
            <p class="property-type">Type: ${property.type}</p>
            <p class="property-location">Location: ${property.location}</p>
            <p class="property-price">Price: ${property.price}</p>
        `;

        container.appendChild(propertyElement);
    });
}

// Display properties on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProperties(propertiesForSale);
});
