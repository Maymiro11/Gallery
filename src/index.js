import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'
import { v4  } from 'uuid';

console.log(v4());


const form = document.querySelector('.js-form');
const box = document.querySelector('.js-list')

let gallery = [];

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    let img1 = form.elements.img1.value;
    let img2 = form.elements.img2.value;

    if ( img1 === '' || img2 === '') {
      pushNotify() ;
      return;
  }

    const image = {
      img1: img1,
      img2: img2,
      id: v4()
     };
    gallery.push(image);
    localStorage.setItem('img', JSON.stringify(gallery));

  
addCard(image);
form.reset();
} 

function renderCard(img) {
    return `<li class="box item" data-id="${img.id}">
    <img
      src="${img.img1}"
      alt=""
      
    />
    <button class="form-control" data-type="delete">DELETE</button>
  </li>`
}

function addCard (img){
box.insertAdjacentHTML('afterbegin', renderCard(img));
}

function pushNotify() {
    new Notify({
      status: 'warning',
      title: 'Warning',
      text: 'Please fill in the form fields',
      effect: 'fade',
      speed: 300,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 5000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'center top'
    })
  }
  

  function init() {
    
    const json = localStorage.getItem('img');
    const parseJson = JSON.parse(json) || [];
    gallery.push(...parseJson);
    gallery.forEach(addCard);
    
  }
  init();

  box.addEventListener('click', onImageListDelete);

  function onImageListDelete(e) {
   
    if (e.target.nodeName !== 'BUTTON' ) {

      return;
    }
    const liElem = e.target.parentNode;
    console.log(liElem.dataset.id);
    
    const dataId = liElem.dataset.id;
    gallery = gallery.filter((elem) => elem.id !== dataId);
    localStorage.setItem('img', JSON.stringify(gallery));
    liElem.remove();
  }
