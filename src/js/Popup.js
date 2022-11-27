import edit from '../img/update.png';
import Tooltip from './tooltip';

export default class Popup {
  constructor() {
    this.container = null;
    this.update = false;
    this.activEvent = null;
  }

  openPopup(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
    if (!document.querySelector('.popup_container')) {
      const containerPopup = document.createElement('DIV');
      const formPopup = document.createElement('FORM');
      const popupControlName = document.createElement('DIV');
      const paragraphName = document.createElement('P');
      const inputName = document.createElement('INPUT');
      const popupControlCost = document.createElement('DIV');
      const paragraphCost = document.createElement('P');
      const inputCost = document.createElement('INPUT');
      const containerBtn = document.createElement('DIV');
      const btnCancel = document.createElement('BUTTON');
      const btnSave = document.createElement('BUTTON');

      formPopup.setAttribute('novalidate', true);
      containerPopup.classList.add('popup_container');
      popupControlName.classList.add('popup-control');
      popupControlCost.classList.add('popup-control');
      paragraphName.classList.add('Input_text');
      paragraphName.textContent = 'Название';
      paragraphCost.classList.add('Input_text');
      paragraphCost.textContent = 'Стоимость';
      inputName.classList.add('input_name');
      inputName.setAttribute('required', true);
      inputName.name = 'name';
      inputCost.classList.add('input_cost');
      inputCost.setAttribute('required', true);
      inputCost.name = 'cost';
      inputCost.pattern = '^([0-9]*$)';

      containerBtn.classList.add('popup-btn');
      btnCancel.classList.add('btn');
      btnCancel.classList.add('btn_cancel');
      btnCancel.textContent = 'Отмена';

      btnSave.classList.add('btn');
      btnSave.classList.add('btn_save');
      btnSave.textContent = 'Сохранить';

      document.body.appendChild(containerPopup);
      containerPopup.prepend(formPopup);

      containerBtn.prepend(btnCancel);
      containerBtn.prepend(btnSave);
      formPopup.prepend(containerBtn);

      popupControlCost.prepend(inputCost);
      popupControlCost.prepend(paragraphCost);
      formPopup.prepend(popupControlCost);

      popupControlName.prepend(inputName);
      popupControlName.prepend(paragraphName);
      formPopup.prepend(popupControlName);

      btnCancel.addEventListener('click', (e) => {
        e.preventDefault();

        Popup.closePopup();
      });

      const tooltipFactory = new Tooltip();

      let actualMessages = [];

      const showTooltip = (message, el) => {
        actualMessages.push({
          name: el.name,
          id: tooltipFactory.showTooltip(message, el),
        });
      };

      formPopup.addEventListener('submit', (e) => {
        e.preventDefault();

        actualMessages.forEach((message) => tooltipFactory.removeTooltip(message.id));
        actualMessages = [];

        if (formPopup.checkValidity()) {
          if (!this.update) {
            this.saveInputNote();
            Popup.closePopup();
          }
          if (this.update) {
            const Name = this.activEvent.closest('.list_editor').querySelector('.name_title');
            const Cost = this.activEvent.closest('.list_editor').querySelector('.cost_title');

            Name.textContent = inputName.value;
            Cost.textContent = inputCost.value;

            this.update = false;
            Popup.closePopup();
          }
        } else {
          const { elements } = formPopup;

          [...elements].forEach((elem) => {
            const error = Popup.getError(elem);

            if (error) {
              showTooltip(error, elem);
            }
          });
        }
      });

      const elementOnBlur = (e) => {
        const el = e.target;

        const error = Popup.getError(el);
        if (error) {
          showTooltip(error, el);
        } else {
          const currentErrorMessage = actualMessages.find((item) => item.name === el.name);

          if (currentErrorMessage) {
            tooltipFactory.removeTooltip(currentErrorMessage.id);
          }
        }

        el.removeEventListener('blur', elementOnBlur);
      };

      Array.from(formPopup.elements).forEach((el) => el.addEventListener('focus', () => {
        el.addEventListener('blur', elementOnBlur);
      }));
    }
  }

  static getError(el) {
    const errors = {
      name: {
        valueMissing: 'Представьтесь, пожалуйста!',
      },
      cost: {
        valueMissing: 'Заполните, пожалуйста, поле "Стоимость"',
        patternMismatch: 'Стоимость вы можете указать только цифрами',
      },
    };

    const errorKey = Object.keys(ValidityState.prototype).find((key) => {
      if (!el.name) return null;
      if (key === 'valid') return null;

      return el.validity[key];
    });

    if (!errorKey) return null;

    return errors[el.name][errorKey];
  }

  static closePopup() {
    document.querySelector('.popup_container').remove();
  }

  saveInputNote() {
    const inputName = document.querySelector('.input_name');
    const inputCost = document.querySelector('.input_cost');

    const editor = document.querySelector('.list_editor_container');
    const listEditor = document.createElement('UL');
    const liName = document.createElement('LI');
    const paragraphName = document.createElement('P');
    const liCost = document.createElement('LI');
    const paragraphCost = document.createElement('P');
    const liActionEdit = document.createElement('LI');
    const btnUpdate = document.createElement('IMG');
    const btnDelete = document.createElement('DIV');

    listEditor.classList.add('list_editor');
    liName.classList.add('name');
    paragraphName.classList.add('name_title');
    liCost.classList.add('cost');
    paragraphCost.classList.add('cost_title');
    liActionEdit.classList.add('action_edit');
    btnUpdate.classList.add('btn_update_img');
    btnDelete.classList.add('btn_delete');

    paragraphName.textContent = inputName.value;
    paragraphCost.textContent = inputCost.value;
    btnUpdate.src = edit;
    btnDelete.textContent = 'x';

    editor.appendChild(listEditor);
    liActionEdit.prepend(btnDelete);
    liActionEdit.prepend(btnUpdate);
    listEditor.prepend(liActionEdit);
    liCost.prepend(paragraphCost);
    listEditor.prepend(liCost);
    liName.prepend(paragraphName);
    listEditor.prepend(liName);

    btnUpdate.addEventListener('click', (e) => {
      this.updateNote(btnUpdate.closest('.list_editor'));
      this.activEvent = e.target;
    });
    btnDelete.addEventListener('click', () => btnDelete.closest('.list_editor').remove());
  }

  updateNote(listEditor) {
    if (this.container) {
      this.openPopup(this.container);
    } else {
      this.openPopup(document.querySelector('.app_container'));
      this.activEvent = document.querySelector('.btn_update_img');
    }
    const inputName = document.querySelector('.input_name');
    const inputCost = document.querySelector('.input_cost');

    inputName.value = listEditor.querySelector('.name_title').textContent;
    inputCost.value = listEditor.querySelector('.cost_title').textContent;

    this.update = true;
  }
}
