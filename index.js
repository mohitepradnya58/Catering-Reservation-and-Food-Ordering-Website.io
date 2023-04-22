/* const firebaseConfig = {
    apiKey: "AIzaSyD9Jfd0ekIAX5tf8fOtMRo61t-QLR18sBo",
    authDomain: "pradnya-mohite.firebaseapp.com",
    databaseURL: "https://pradnya-mohite-default-rtdb.firebaseio.com",
    projectId: "pradnya-mohite",
    storageBucket: "pradnya-mohite.appspot.com",
    messagingSenderId: "16789597019",
    appId: "1:16789597019:web:42e093f0686551354c887e"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var messagesRef = firebase.database().ref('messages');

  document.getElementById('contactForm').addEventListener('submit', submitForm);

  function submitForm(e){
    e.preventDefault();

    var email = getInputVal('email');
    var password = getInputVal('password');
    
    saveMessage(email, password);

    document.querySelector('.alert').style.display = 'block';

    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    document.getElementById('contactForm').reset();
  }

  function saveMessage(name, company, email, phone, message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        email: email,
        password: password,
        
    });
  }

 */

  $(document).ready(function() {
    var productItem = [{
        productName: "Dessert-1",
        price: "180.00",
        photo: "desert-1.jpg"
      },
      {
        productName: "Dessert-2",
        price: "150.00",
        photo: "desert-2.jpg"
      },
      {
        productName: "Dessert-3",
        price: "200.00",
        photo: "desert-3.jpg"
      },
      {
        productName: "Dessert-4",
        price: "190.00",
        photo: "desert-4.jpg"
      },
      {
        productName: "Dessert-5",
        price: "180.00",
        photo: "desert-5.jpg"
      },
      {
        productName: "Dessert-6",
        price: "100.00",
        photo: "desert-6.webp"
      },
      {
        productName: "Pav Bhaji",
        price: "80.00",
        photo: "snack1.jpg"
      },
      {
        productName: "Idali",
        price: "60.00",
        photo: "snack2.jpg"
      },
      {
        productName: "Udid Wada",
        price: "40.00",
        photo: "snack3.jpg"
      },
      {
        productName: "Misal Pav",
        price: "80.00",
        photo: "snack4.jpg"
      },
      {
        productName: "Samosa",
        price: "15.00",
        photo: "snack5.jpg"
      },
      {
        productName: "Poha",
        price: "50.00",
        photo: "snack6.jpg"
      },
      {
        productName: "Tomato Soup",
        price: "100.00",
        photo: "soup1.jpg"
      },
      {
        productName: "Vegetable Soup",
        price: "150.00",
        photo: "soup2.webp"
      },
      {
        productName: "Noodles Soup",
        price: "180.00",
        photo: "soup3.jpg"
      },
      {
        productName: "Manchurian Soup",
        price: "140.00",
        photo: "soup4.jpg"
      },
      {
        productName: "Drink-1",
        price: "180.00",
        photo: "drink1.jpg"
      },
      {
        productName: "Drink-2",
        price: "120.00",
        photo: "drink2.jpg"
      },
      {
        productName: "Drink-3",
        price: "160.00",
        photo: "drink3.jpg"
      },
      {
        productName: "Lunch-1",
        price: "500.00",
        photo: "lunch1.jpg"
      },
      {
        productName: "Lunch-2",
        price: "200.00",
        photo: "lunch2.jpg"
      },
      {
        productName: "Lunch-3",
        price: "180.00",
        photo: "lunch3.jpg"
      },
      {
        productName: "Lunch-4",
        price: "190.00",
        photo: "lunch4.jpg"
      },
      {
        productName: "Lunch-5",
        price: "200.00",
        photo: "lunch5.jpg"
      },
      {
        productName: "Lunch-6",
        price: "140.00",
        photo: "lunch6.jpg"
      },
    ];
    showProductGallery(productItem);
  });
  
  function showProductGallery(product) {
    //Iterate javascript shopping cart array
    var productHTML = "";
    product.forEach(function(item) {
      productHTML += '<div class="product-item">'+
            '<img src="img/' + item.photo + '" width="150px" class="img-thumbnail">'+
            '<div class="productname">' + item.productName + '</div>'+
            '<div class="price">$<span>' + item.price + '</span></div>'+
            '<div class="cart-action">'+
              '<input type="text" class="product-quantity ms-1 text-center" name="quantity" value="1" size="2" />'+
              '<input type="submit" value="Add to Cart" class="add-to-cart ms-1 btn btn-outline-dark me-1" onClick="addToCart(this)" />'+
            '</div>'+
          '</div>';
          "<tr>";
      
    });
    $('#product-item-container').html(productHTML);
  }
  
  function addToCart(element) {
    var productParent = $(element).closest('div.product-item');
  
    var price = $(productParent).find('.price span').text();
    var productName = $(productParent).find('.productname').text();
    var quantity = $(productParent).find('.product-quantity').val();
  
    var cartItem = {
      productName: productName,
      price: price,
      quantity: quantity
    };
    var cartItemJSON = JSON.stringify(cartItem);
  
    var cartArray = new Array();
    // If javascript shopping cart session is not empty
    if (sessionStorage.getItem('shopping-cart')) {
      cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
    }
    cartArray.push(cartItemJSON);
  
    var cartJSON = JSON.stringify(cartArray);
    sessionStorage.setItem('shopping-cart', cartJSON);
    showCartTable();
    cartIsEmpty();
  }

  function emptyCart() {
    if (sessionStorage.getItem('shopping-cart')) {
      // Clear JavaScript sessionStorage by index
      sessionStorage.removeItem('shopping-cart');
      showCartTable();
    }
  }

  function showCartTable() {
    var cartRowHTML = "";
    var itemCount = 0;
    var grandTotal = 0;
  
    var price = 0;
    var quantity = 0;
    var subTotal = 0;
  
    if (sessionStorage.getItem('shopping-cart')) {
      var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
      itemCount = shoppingCart.length;
  
      //Iterate javascript shopping cart array
      shoppingCart.forEach(function(item) {
        var cartItem = JSON.parse(item);
        price = parseFloat(cartItem.price);
        quantity = parseInt(cartItem.quantity);
        subTotal = price * quantity
  
        cartRowHTML += "<tr>" +
          "<td>" + cartItem.productName + "</td>" +
          "<td class='text-right'>$" + price.toFixed(2) + "</td>" +
          "<td class='text-right'>" + quantity + "</td>" +
          "<td class='text-right'>$" + subTotal.toFixed(2) + "</td>" +
          "</tr>";
  
        grandTotal += subTotal;
      });
    }
  
    $('#cartTableBody').html(cartRowHTML);
    $('#itemCount').text(itemCount);
    $('#totalAmount').text("$" + grandTotal.toFixed(2));
  }
 



  function cartIsEmpty() {
    var table = document.getElementById("tableId");
    var totalRowCount = table.rows.length; // 5
   
    var tbodyRowCount = table.tBodies[0].rows.length; // 3
if(tbodyRowCount > 0) {
    alert("Your order has been placed successfully!");
   }
else{
     alert("Your cart is empty. Please add items to your cart before placing an order.");
   }
    return true; 
};

//login function
function auth(event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (email === "admin@gmail.com" && password === "user") {
    alert("You Have Login Successfully!")
       window.location.replace("/index.html");
  } else {
      alert("Invalid Details. Please Try Again!");
      return;
  }
}

  
  
