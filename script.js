const products = [
    { id: 1, units: 1, offer: 0.1, price: 100 },
    { id: 2, units: 2, offer: 0.2, price: 150 },
    { id: 3, units: 3, offer: 0.3, price: 200 }
];

let selectedProduct = null;

function createProductBox(product) {
    const box = document.createElement('div');
    box.className = 'product-box';
    box.onclick = () => selectProduct(product.id);
    
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'product';
    input.id = `product${product.id}`;
    input.style.display = 'inline'; // Display the radio button
    
    const priceInfo = document.createElement('div');
    priceInfo.className = 'price-info';
    const discountedPrice = (product.price * (1 - product.offer)).toFixed(2);
    priceInfo.innerHTML = `
        <p>$${discountedPrice} USD</p>
        <p style="text-decoration: line-through; color: #888;">$${product.price} USD</p>
    `;

    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    const unitsDiscount = document.createElement('div');
    unitsDiscount.className = 'units-discount';
    unitsDiscount.innerHTML = `
        <p>${product.units}&nbsp; Unit &nbsp;</p>
        <p class="discount">Offer: ${product.offer * 100}% off</p> <!-- Highlighted discount -->
    `;
    productInfo.appendChild(unitsDiscount);
    productInfo.appendChild(input); // Append the radio button

    const dropdowns = document.createElement('div');
    dropdowns.className = 'dropdowns';
    dropdowns.id = `dropdowns${product.id}`;
    dropdowns.innerHTML = createDropdowns(product.id, product.units); // Pass number of units for dropdowns
    
    // If the product is the second one, add the "MOST POPULAR" label
    if (product.id === 2) {
        const popularTag = document.createElement('div');
        popularTag.className = 'popular-tag';
        popularTag.textContent = 'MOST POPULAR';
        box.appendChild(popularTag); // Add the "MOST POPULAR" tag to the box
    }

    box.appendChild(priceInfo);
    box.appendChild(productInfo);
    box.appendChild(dropdowns);
    document.getElementById('products').appendChild(box);
}

function createDropdowns(productId, units) {
    let dropdownsHTML = '<p>Size & Colour</p>';
    for (let i = 1; i <= units; i++) { // Create dropdowns based on the number of units
        dropdownsHTML += `
            <div>
                <label for="size${productId}-${i}"># ${i} </label>
                <select id="size${productId}-${i}">
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                </select>
                
                <select id="color${productId}-${i}">
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Red">White</option>
                    <option value="Blue">Yellow</option>
                    <option value="Green">Pink</option>
                </select>
            </div>
        `;
    }
    return dropdownsHTML;
}

function selectProduct(productId) {
    if (selectedProduct !== null) {
        updateProductBox(selectedProduct, false);
    }

    selectedProduct = productId;
    updateProductBox(productId, true);
    calculateTotal();
}

function updateProductBox(productId, isSelected) {
    const productBox = document.getElementById(`product${productId}`);
    const dropdowns = document.getElementById(`dropdowns${productId}`);
    
    productBox.checked = isSelected; // Check current radio button
    dropdowns.style.display = isSelected ? 'block' : 'none'; // Show dropdowns
    productBox.closest('.product-box').classList.toggle('selected', isSelected); // Toggle highlight
    document.getElementById('add-to-cart').style.display = 'block'; // Show button
}

function calculateTotal() {
    if (selectedProduct === null) return;

    const product = products[selectedProduct - 1];
    const total = product.units * product.price * (1 - product.offer);
    
    document.getElementById('delivery').textContent = `Free delivery`;
    
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function addToCart() {
    let addedItems = [];
    for (let i = 1; i <= products[selectedProduct - 1].units; i++) {
        const size = document.getElementById(`size${selectedProduct}-${i}`).value;
        const color = document.getElementById(`color${selectedProduct}-${i}`).value;
        addedItems.push(`Product ${selectedProduct}, Size: ${size}, Color: ${color}`);
    }
    
    alert(`Added to cart! \n${addedItems.join('\n')}`);
}

// Initialize product boxes on page load
products.forEach(createProductBox);
