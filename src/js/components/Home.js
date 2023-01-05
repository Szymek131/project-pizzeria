import {templates, select} from '../settings.js';
import utils from '../utils.js';

class Home{
  constructor(element){
    const thisHome = this;

    thisHome.render(element);
    thisHome.carousel();
  }

  render(element){
    const thisHome = this;

    const generatedHTML = templates.home();
    thisHome.element = utils.createDOMFromHTML(generatedHTML);
    const bookingWrapper = document.querySelector(select.containerOf.homePage);
    bookingWrapper.appendChild(thisHome.element).innerHTML;

    thisHome.dom = {
      wrapper: element,

    };
  }

  carousel(){
    const thisHome = this;

    const carouselWrapper = document.querySelector(select.containerOf.carousel);
    const flkty = new Flickity(select.containerOf.carousel, {
      imagesLoaded: true,
      percentPosition: false,
    });
  }
}

export default Home;