import {select} from '../settings.js';
import AmountWidget from './AmountWidget.js';

class CartProduct{
  constructor(menuProduct, element){
    const thisCartProduct = this;

    thisCartProduct.id = menuProduct.id;
    thisCartProduct.name = menuProduct.name;
    thisCartProduct.amount = menuProduct.amount;
    thisCartProduct.price = menuProduct.price;
    thisCartProduct.priceSingle = menuProduct.priceSingle;
    thisCartProduct.params = menuProduct.params;

    thisCartProduct.getElements(element);
    thisCartProduct.initAmountWidget();
    thisCartProduct.initActions();
  }

  getElements(element){
    const thisCartProduct = this;

    thisCartProduct.dom = {
      
      wrapper: element,
      amountWidgetElem: element.querySelector(select.cartProduct.amountWidget),
      price: element.querySelector(select.cartProduct.price),
      edit: element.querySelector(select.cartProduct.edit),
      remove: element.querySelector(select.cartProduct.remove),

    };
  }

  initAmountWidget(){
    const thisCartProduct = this;

    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidgetElem, thisCartProduct.amount);

    thisCartProduct.dom.amountWidgetElem.addEventListener('updated', function(){
      thisCartProduct.amount = thisCartProduct.amountWidget.value;
      thisCartProduct.price = thisCartProduct.priceSingle *  thisCartProduct.amount;
      thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
    });
  }

  remove(){
    const thisCartProduct = this;

    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,
      },
    });
    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }

  initActions(){
    const thisCartProduct = this;


    thisCartProduct.dom.edit.addEventListener('click', function(event){
      event.preventDefault();
    });

    thisCartProduct.dom.remove.addEventListener('click', function(event){
      event.preventDefault();
      thisCartProduct.remove();
    });

  }

  getData(){
    const thisCartProduct = this;

    const productSummary = {
      
      id: thisCartProduct.id,
      name: thisCartProduct.name,
      amount: thisCartProduct.amountWidget.value,
      price: thisCartProduct.priceSingle * thisCartProduct.amountWidget.value,
      priceSingle: thisCartProduct.priceSingle,
      params: thisCartProduct.params,
    };
    
    return (productSummary);
  }
}

export default CartProduct;