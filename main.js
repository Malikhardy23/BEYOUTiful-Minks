// menu button //

var menuBtn = document.getElementById('menuButton');
var mobileMenu = document.getElementsByClassName('mobile-menu')

var clickedBtn = function(){
    mobileMenu[0].classList.toggle('active');
}

menuBtn.addEventListener('click', clickedBtn)
console.log(menuBtn[0]);


// shopping cart 

let carts = document.querySelectorAll('.cartButton');

let products = [
    {
        name: 'Milly Lash',
        tag: 'MillyLash',
        price: 12,
        inCart: 0

    },
    {
        name: 'Shade Lash',
        tag: 'ShadeLash',
        price: 12,
        inCart: 0

    },
    {
        name: 'Lessie Lash',
        tag: 'LessieLash',
        price: 12,
        inCart: 0

    },
    {
        name: 'Ashanti Lash',
        tag: 'AshantiLash',
        price: 12,
        inCart: 0

    },
    {
        name: 'Distance Lash',
        tag: 'DistanceLash',
        price: 12,
        inCart: 0

    },
    {
        name: 'Kii Lash',
        tag: 'KiiLash',
        price: 12,
        inCart: 0

    }
];

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
    })
  }
  
  function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
  
    if(productNumbers){
      document.querySelector('.cartAmount').textContent = productNumbers;
    }
  }
  
  function cartNumbers(products){
    
    let productNumbers = localStorage.getItem('cartNumbers');
  
    productNumbers = parseInt(productNumbers);
    
    if(productNumbers){
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cartAmount').textContent = productNumbers + 1;
    } else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cartAmount').textContent = 1;
    }
  
    setItems(products);
    
  }

  function setItems(products){
      console.log('The product clicked is', products)
      let cartItems = localStorage.getItem('productsInCart');
      cartItems = JSON.parse(cartItems);

      if(cartItems != null){
          if(cartItems[products.tag] == undefined){
              cartItems = {
                  ...cartItems,
                  [products.tag]: products
              }
          }
        cartItems[products.tag].inCart += 1
      } else {
        products.inCart = 1;
        cartItems = {
            [products.tags]: products
        }
      };

      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  };

  const totalCost = (products) => {
    // console.log("The product price is", products.price)
    
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price)
    } else {
        localStorage.setItem("totalCost", products.price)
    }
  }

  const displayCart = () => {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    console.log(cartItems)
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
            <div id="close-button">
            <ion-icon name="close-outline"></ion-icon>
            </div>
            <img src="${item.tag}.jpg"> 
            <span id="item-name">${item.name}</span>
            </div>
            <div class="item-price">
                <div id="item-price">
                    $${item.price}
                </div>
            </div>
            <div class="quantity">
                <div id="removeButton">
                    <ion-icon name="remove-outline" id="remove"></ion-icon>
                </div>
                <span>${item.inCart}</span>
                <div id="addButton">
                    <ion-icon name="add-outline" id="add"></ion-icon>
                </div>
            </div>
            <div class="total">
                
            </div>
            `
        });

        productContainer.innerHTML += `
        
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Cart Total
            </h4>
            <h4 class="basketTotal">
                $${cartCost}.00
            </h4>
        </div>
        
        `
    }
  }
  
  onLoadCartNumbers();
  displayCart();

// Add +1 To Cart // 

const closeButton = document.getElementById('close-button');

closeButton.addEventListener('click', () => {
    console.log('clicked!')
})

const removeButton = document.getElementById('removeButton');

removeButton.addEventListener('click', () => {
    console.log('clicked!')
})