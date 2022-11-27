import Popup from './Popup';
import edit from '../img/update.png';
import background from '../img/cell.jpg';

console.log('app.js is bunled');

document.querySelector('.btn_update_img').src = edit;
document.querySelector('.container').style.backgroundImage = `url(${background})`;

const btnAdd = document.querySelector('.btn_add');
const btnUpdate = document.querySelector('.btn_update_img');
const btnDelete = document.querySelector('.btn_delete');

const popup = new Popup();
const containerPopup = document.querySelector('.app_container');

btnAdd.addEventListener('click', (e) => {
  e.preventDefault();

  popup.openPopup(containerPopup);
});

btnUpdate.addEventListener('click', () => {
  popup.updateNote(btnUpdate.closest('.list_editor'));
});

btnDelete.addEventListener('click', () => btnDelete.closest('.list_editor').remove());
