const form = document.querySelector('.js-form');
const box = document.querySelector('.js-list')

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    let img1 = form.elements.img1.value;
    let img2 = form.elements.img2.value;

    if ( img1 === '' || img2 === '') {
        pushNotify() ;
        return;
    }
addCard(img1);
form.elements.img1.value = '';
} 

function renderCard(img1) {
    return `<li class="box item">
    <img
      src="${img1}"
      alt=""
    />
    <button class="form-control" data-type="delete">DELETE</button>
  </li>`
}

function addCard (img1){
box.insertAdjacentHTML('afterbegin', renderCard(img1));
}

import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

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