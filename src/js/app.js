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
      popup.addlistener()
      // const lists = document.querySelectorAll('.inserted')
      // console.log(lists)
      // console.log(document.querySelectorAll('.inserted'))
      // Array.from( lists )[ lists.length - 1 ].querySelector( '.btn_delete' ).addEventListener( 'click', () => this.closest( '.inserted' ).remove() )

    });
});

// const btnCancel = document.querySelector('.btn_cancel');

// btnCancel.addEventListener('click', (e) => {
//   e.preventDefault();

//   popup.closePopup()
// });

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
