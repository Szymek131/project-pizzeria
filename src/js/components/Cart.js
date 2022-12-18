import {settings, select, classNames, templates} from '../settings.js';
import CartProduct from './CartProduct.js';
import utils from '../utils.js';


class Cart{
  constructor(element){
    const thisCart = this;

    thisCart.products = [];

    thisCart.getElements(element);
    thisCart.initActions();
  }

  getElements(element){
    const thisCart = this;

    thisCart.dom = {
      
      wrapper: element,
      form: element.querySelector(select.cart.form),
      deliveryFee: element.querySelector(select.cart.deliveryFee),
      subtotalPrice: element.querySelector(select.cart.subtotalPrice),
      totalPrice: element.querySelectorAll(select.cart.totalPrice),
      totalNumber: element.querySelector(select.cart.totalNumber),
      productList: element.querySelector(select.cart.productList),
      address: element.querySelector(select.cart.address),
      phone: element.querySelector(select.cart.phone)

    };

    thisCart.dom.wrapper = element;

    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = document.querySelector(select.cart.productList);
  }

  initActions(){
    const thisCart = this;

    thisCart.dom.toggleTrigger.addEventListener('click', function(){
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });

    thisCart.dom.productList.addEventListener('updated', function(){
      thisCart.update();
    });

    thisCart.dom.productList.addEventListener('remove', function(event){
      thisCart.remove(event.detail.cartProduct);
    });

    thisCart.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisCart.sendOrder();
    });

  }

  add(menuProduct){
    const thisCart = this;

    const generatedHTML = templates.cartProduct(menuProduct);


    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    thisCart.dom.productList.appendChild(generatedDOM);

    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));

    thisCart.update();
  }

  update(){
    const thisCart = this;

    const deliveryFee = settings.cart.defaultDeliveryFee;

    let totalNumber = 0;
    let subtotalPrice = 0;

    for(let product of thisCart.products){
      totalNumber += product.amount;
      subtotalPrice += product.price;
    }
    if(totalNumber != 0){
      thisCart.totalPrice = subtotalPrice + deliveryFee;
      thisCart.dom.deliveryFee.innerHTML = deliveryFee;
    } else {
      thisCart.totalPrice = subtotalPrice;
      thisCart.dom.deliveryFee.innerHTML = 0;
    }
    for (let element of thisCart.dom.totalPrice){
      element.innerHTML = thisCart.totalPrice;
    }
    
    thisCart.dom.totalNumber.innerHTML = totalNumber;
    thisCart.dom.subtotalPrice.innerHTML = subtotalPrice;
    thisCart.totalNumber = totalNumber;
    thisCart.deliveryFee = deliveryFee;
    thisCart.subtotalPrice = subtotalPrice;
  }

  remove(event){
    const thisCart = this;

    event.dom.wrapper.remove();
    const indexOfProduct = thisCart.products.indexOf(event);
    const removedProducts = thisCart.products.splice(indexOfProduct, 1);
    console.log('removed Products: ',removedProducts);
    thisCart.update();

  }

  sendOrder(){
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.orders;


    
    const payload = {
      address: thisCart.dom.address.value,
      phone:  thisCart.dom.phone.value,
      totalPrice: thisCart.totalPrice,
      subtotalPrice:  thisCart.subtotalPrice,
      totalNumber:  thisCart.totalNumber,
      deliveryFee:  thisCart.deliveryFee,
      products: []
    };

    for(let product of thisCart.products) {
      payload.products.push(product.getData());
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };
          
    fetch(url, options)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }
}

export default Cart;