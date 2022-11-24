import Tooltip from './tooltip';
import Popup from './Popup';
import edit from '../img/update.png'
import background from '../img/cell.jpg'

console.log('app.js is bunled');

document.querySelector('.btn_update_img').src = edit
document.querySelector('.container').style.backgroundImage = `url(${background})`

const btnAdd = document.querySelector('.btn_add');
const btnUpdate = document.querySelector('.btn_update_img');
const btnDelete = document.querySelector('.btn_delete');

const popup = new Popup()
const containerPopup = document.querySelector('.app_container')


btnAdd.addEventListener('click', (e) => {
    e.preventDefault();

    popup.openPopup(containerPopup)
});

btnUpdate.addEventListener('click', () => {
    popup.updateNote(btnUpdate.closest( '.list_editor' ))
});

btnDelete.addEventListener('click', () => btnDelete.closest( '.list_editor' ).remove());



// const btn = document.querySelector('.btn');

// const tooltipFactory = new Tooltip();
// const actualMessages = {};

// const showTooltip = (el) => {
//   actualMessages.id = tooltipFactory.showTooltip("And here's some amazing content. it`s very engaging. right?", el);
// };

// btn.addEventListener('click', (e) => {
//   e.preventDefault();
//   if (actualMessages.id) {
//     tooltipFactory.removeTooltip(actualMessages.id);
//     delete actualMessages.id;
//   } else {
//     showTooltip(btn);
//   }
// });
