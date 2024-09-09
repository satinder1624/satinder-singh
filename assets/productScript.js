document.addEventListener('DOMContentLoaded', function () {
  // Handle the add to cart button click
  document.querySelectorAll('.addToCartBtn').forEach(function (button) {
    button.addEventListener('click', function () {
      let productIndex = this.getAttribute('data-product-index');
      let productHandle = this.getAttribute('data-product-handle');
      let modal = document.getElementById('modal-' + productIndex);

      let selectedSize = modal.querySelector('.dropdownLabel').textContent;
      let selectedColor = modal.querySelector(
        '.colorBox.active span'
      )?.textContent;

      // Fetch product data using AJAX API
      fetch(`/products/${productHandle}.js`)
        .then((response) => response.json())
        .then((product) => {
          let variants = product.variants; // Get product variants from fetched data

          let selectedVariant = variants.find(function (variant) {
            return (
              variant.option1 === selectedSize &&
              variant.option2 === selectedColor
            );
          });

          if (selectedVariant) {
            // Add selected variant to cart
            fetch('/cart/add.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: selectedVariant.id,
                quantity: 1,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (selectedColor === 'Black' && selectedSize === 'M') {
                  console.log('I am here');
                  let softWinterJacketHandle = 'dark-winter-jacket';

                  fetch(`/products/${softWinterJacketHandle}.js`)
                    .then((response) => response.json())
                    .then((softWinterJacket) => {
                      let softWinterJacketVariant =
                        softWinterJacket.variants[0];

                      return fetch('/cart/add.js', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          id: softWinterJacketVariant.id,
                          quantity: 1,
                        }),
                      });
                    })
                    .then((response) => response.json())
                    .then((data) => {
                      alert(
                        'Product and Soft Winter Jacket added to cart successfully!'
                      );
                    })
                    .catch((error) => {
                      console.error(
                        'Error adding Soft Winter Jacket to cart:',
                        error
                      );
                      alert(
                        'Failed to add Soft Winter Jacket to cart. Please try again.'
                      );
                    });
                } else {
                  alert('Product added to cart successfully!');
                }
              })
              .catch((error) => {
                console.error('Error adding product to cart:', error);
                alert('Failed to add product to cart. Please try again.');
              });
          } else {
            alert('Please select a size and color.');
          }
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
          alert('Failed to fetch product data. Please try again.');
        });
    });
  });
  // Handle dropdown toggle
  document.querySelectorAll('.dropdown').forEach(function (dropdown) {
    dropdown.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });

  // Handle option selection
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('option')) {
      const dropdown = event.target.closest('.dropdown');
      const label = dropdown.querySelector('.dropdownLabel');
      label.textContent = event.target.textContent;
      dropdown.classList.remove('active');
    }
  });
  // Handle color options
  document.querySelectorAll('.colorBox').forEach(function (box) {
    box.addEventListener('click', function () {
      // remove the active class
      document.querySelectorAll('.colorBox').forEach(function (b) {
        b.classList.remove('active');
      });

      // Adding active class to the clicked one
      box.classList.add('active');
    });
  });
  // Modal
  let plusOverlays = document.querySelectorAll('.plusOverlay');
  let closeModalButtons = document.querySelectorAll('.closeModal');

  // Opening modal
  plusOverlays.forEach(function (overlay) {
    overlay.addEventListener('click', function () {
      let productId = this.getAttribute('data-product-id');
      let modal = document.getElementById('modal-' + productId);
      modal.showModal();
    });
  });

  // Closing modal
  closeModalButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      let productId = this.getAttribute('data-product-id');
      let modal = document.getElementById('modal-' + productId);
      modal.close();
    });
  });

  // Closing modal when click outside the modal
  window.addEventListener('click', function (event) {
    let modals = document.querySelectorAll('.productModal');
    modals.forEach(function (modal) {
      if (
        event.target.tagName === 'DIALOG' &&
        event.target.hasAttribute('open')
      ) {
        modal.close();
      }
    });
  });
});
