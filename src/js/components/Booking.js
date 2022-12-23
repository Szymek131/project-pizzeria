import {templates, select} from '../settings.js';
import AmountWidget from './AmountWidget.js';
import utils from '../utils.js';

class Booking{
  constructor(element){
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidgets();
  }
  
  render(element){
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    const bookingWrapper = document.querySelector(select.containerOf.booking);
    bookingWrapper.appendChild(generatedDOM);

    thisBooking.dom = {
      wrapper: element,
      peopleAmount: element.querySelector(select.booking.peopleAmount),
      hoursAmount: element.querySelector(select.booking.hoursAmount)
    };
  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmountWidget =  new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmountWidget = new AmountWidget(thisBooking.dom.hoursAmount);

    
    thisBooking.dom.wrapper.addEventListener('updated', function(event){
      event.preventDefault();
    });
  }
}

export default Booking;