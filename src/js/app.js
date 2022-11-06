import Tooltip from './tooltip';
import Popup from './Popup';

console.log('app.js is bunled');

const btnAdd = document.querySelector('.btn_add');
const popup = new Popup()
const containerPopup = document.querySelector('.app_container')

btnAdd.addEventListener('click', (e) => {
    e.preventDefault();

    popup.openPopup(containerPopup)

    const btnCancel = document.querySelector('.btn_cancel');

    btnCancel.addEventListener('click', (e) => {
      e.preventDefault();

      popup.closePopup()
    });

    const btnSave = document.querySelector('.btn_save');

    btnSave.addEventListener('click', (e) => {
      e.preventDefault();

      popup.saveInputNote()

      const lists = document.querySelectorAll('.list_editor')
      const btnDelete = Array.from( lists )[ lists.length - 1 ].querySelector( '.btn_delete' )
      const btnUpdate = Array.from( lists )[ lists.length - 1 ].querySelector( '.btn_update_img' )
      btnUpdate.addEventListener( 'click', () => popup.updateNote(btnUpdate.closest( '.list_editor' )) )
      btnDelete.addEventListener( 'click', () => btnDelete.closest( '.list_editor' ).remove() )
    });
});

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
