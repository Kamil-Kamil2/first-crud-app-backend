function loadProducts() {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById('product-list');
        list.innerHTML = '';
        data.forEach(product => {
          const item = document.createElement('li');
          item.innerHTML = `Name: ${product.name}<br>Quantity: ${product.quantity}<br>Price: $${product.price}<br><br>`;
          list.appendChild(item);
        });
      })
      .catch(error => console.error('Error:', error));
  }

  // Load products on page load
  loadProducts();

  // Handle form submission for POST request
  document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload

    const name = document.getElementById('product-name').value;
    const quantity = document.getElementById('product-quantity').value;
    const price = document.getElementById('product-price').value;

    fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ name, quantity, price })
    })

    .then(response => response.json())
    .then(data => {
      console.log('Product added:', data);
      loadProducts(); // Refresh product list
      document.getElementById('product-form').reset();
    })
    .catch(error => console.error('Error:', error));
  });