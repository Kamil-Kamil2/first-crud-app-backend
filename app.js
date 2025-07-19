function loadProducts() {
  fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('product-list');
      list.innerHTML = '';
      data.forEach(product => {
        const item = document.createElement('li');
        const safeName = product.name.replace(/'/g, "\\'").replace(/"/g, '\\"');
        item.innerHTML = `Name: ${product.name}<br>
                            Quantity: ${product.quantity}<br>
                            Price: $${product.price}<br>
                            ID: <span id="product-id-${product._id}">${product._id}</span><br>
                            <button onclick="copyProductId('${product._id}', '${safeName}')"><ion-icon name="copy-outline"></ion-icon>Copy ID</button><br><br>`;
        list.appendChild(item);
      });
    })
    .catch(error => console.error('Error:', error));
}

// Load products on page load
loadProducts();

// Handle form submission for POST request
document.getElementById('product-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload

  const name = document.getElementById('product-name').value;
  const quantity = document.getElementById('product-quantity').value;
  const price = document.getElementById('product-price').value;

  fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, quantity, price })
  })

    .then(response => response.json())
    .then(data => {
      console.log('Product added:', data);
      loadProducts(); // Refresh product list
      document.getElementById('product-form').reset();
    })
    .catch(error => console.error('Error:', error));
})

document.getElementById('find-product-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('find-product-id').value;
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => {
      if (!response.ok) throw new Error('Product not found!');
      return response.json();
    })
    .then(product => {
      // You can change this to display however you want
      document.getElementById('single-product-result').innerHTML = `
        <strong>Name:</strong> ${product.name}<br>
        <strong>Quantity:</strong> ${product.quantity}<br>
        <strong>Price:</strong> $${product.price}<br>
        <strong>ID:</strong> ${product._id}
      `;
    })
    .catch(error => {
      document.getElementById('single-product-result').innerText = error.message;
    });
});

document.getElementById('update-existing-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload

  const name = document.getElementById('u-product-name').value;
  const quantity = document.getElementById('u-product-quantity').value;
  const price = document.getElementById('u-product-price').value;

  const id = document.getElementById('edit-product-id').value;

  fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, quantity, price })
  })

    .then(response => response.json())
    .then(product => {
      alert(`${product.name} Has been updated`)
      // Display the updated product info
      document.getElementById('updated-product-result').innerHTML = `
        <strong>Updated Product:</strong><br>
        <strong>Name:</strong> ${product.name}<br>
        <strong>Quantity:</strong> ${product.quantity}<br>
        <strong>Price:</strong> $${product.price}<br>
        <strong>ID:</strong> ${product._id}
      `;
      loadProducts(); // Refresh product list
      document.getElementById('update-existing-form').reset();
    })
    .catch(error => {
      document.getElementById('updated-product-result').innerText = 'Error updating product: ' + error;
      console.error('Error:', error);
    });
})

document.getElementById('delete-product-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('delete-product-id').value;
  const name = document.getElementById('delete-product-id').value;
  deleteProduct(id, name);
});

window.deleteProduct = function (id) {
  // Fetch product details first
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(product => {
      const name = product.name || "this product";
      if (!confirm(`Are you sure you want to delete ${name}?`))
        return;
      // Now actually delete
      fetch(`http://localhost:3000/api/products/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
          loadProducts();
        });
    })
    .catch(error => {
      alert("Could not find product to delete.");
      console.error(error);
    });
};


window.copyProductId = function (id) {
  // Copy to clipboard using the Clipboard API
  navigator.clipboard.writeText(id)
    .then(() => {
      console.log('Product ID copied: ' + id);
    })
    .catch(err => {
      alert('Failed to copy ID: ' + err);
    });
}