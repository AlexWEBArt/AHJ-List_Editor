import edit from '../img/update.png'
import Tooltip from './tooltip';

export default class Popup {
    constructor() {
        this.container = null
        this.update = false
        this.activEvent = null
    }

    openPopup(container) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('container is not HTMLElement');
        }

        this.container = container;
        if (!document.querySelector('.popup_container')) {
            const containerPopup = document.createElement('DIV');
            const popupControlName = document.createElement('DIV');
            const paragraphName = document.createElement('P');
            const inputName = document.createElement('INPUT');
            const popupControlCost = document.createElement('DIV');
            const paragraphCost = document.createElement('P');
            const inputCost = document.createElement('INPUT');
            const containerBtn = document.createElement('DIV');
            const btnCancel = document.createElement('A');
            const btnSave = document.createElement('A');

            containerPopup.classList.add('popup_container')
            popupControlName.classList.add('popup-control')
            popupControlCost.classList.add('popup-control')
            paragraphName.classList.add('Input_text')
            paragraphName.textContent = 'Название'
            paragraphCost.classList.add('Input_text')
            paragraphCost.textContent = 'Стоимость'
            inputName.classList.add('input_name')
            inputCost.classList.add('input_cost')

            containerBtn.classList.add('popup-btn')
            btnCancel.href = '#'
            btnCancel.classList.add('btn')
            btnCancel.classList.add('btn_cancel')
            btnCancel.textContent = 'Отмена'
            
            btnSave.href = '#'
            btnSave.classList.add('btn')
            btnSave.classList.add('btn_save')
            btnSave.textContent = 'Сохранить'

            document.body.appendChild(containerPopup)
            containerBtn.prepend(btnCancel)
            containerBtn.prepend(btnSave)
            containerPopup.prepend(containerBtn)

            popupControlCost.prepend(inputCost)
            popupControlCost.prepend(paragraphCost)
            containerPopup.prepend(popupControlCost)

            popupControlName.prepend(inputName)
            popupControlName.prepend(paragraphName)
            containerPopup.prepend(popupControlName)

            btnCancel.addEventListener('click', (e) => {
                e.preventDefault();
          
                this.closePopup()
            });
              
            btnSave.addEventListener('click', (e) => {
                e.preventDefault();

                const tooltipFactory = new Tooltip();
                const actualMessages = {};
                let flag = false

                const showTooltip = (el) => {
                    actualMessages.id = tooltipFactory.showTooltip("And here's some amazing content. it`s very engaging. right?", el);
                };

                if (actualMessages.id) {
                    tooltipFactory.removeTooltip(actualMessages.id);
                    delete actualMessages.id;
                } else {
                    showTooltip(btnSave);
                    flag = true
                }

                if (!this.update && !flag) {
                    this.saveInputNote()
                    this.closePopup()
                }
                if (this.update && !flag) {
                    const Name = this.activEvent.closest('.list_editor').querySelector('.name_title')
                    const Cost = this.activEvent.closest('.list_editor').querySelector('.cost_title')

                    Name.textContent = inputName.value
                    Cost.textContent = inputCost.value

                    this.update = false
                    this.closePopup()
                }    
            });  
            // this.container.insertAdjacentHTML('afterend', `
            //     <div class="popup_container">
            //         <div class="popup-control">
            //             <p class="Input_text">Название</p>
            //             <input type="text" class="input_name" >
            //         </div>
            //         <div class="popup-control">
            //             <p class="Input_text">Стоимость</p>
            //             <input type="text" class="input_cost">
            //         </div>
            //         <div class="popup-btn">
            //             <a href="#" class="btn btn_save">Сохранить</a>
            //             <a href="#" class="btn btn_cancel">Отмена</a>
            //         </div>
            //     </div>
            // `)
        } else {
            return
        }
    }

    closePopup() {
        document.querySelector('.popup_container').remove();
    }

    saveInputNote() {
        const inputName = document.querySelector('.input_name')
        const inputCost = document.querySelector('.input_cost')

        const editor = document.querySelector('.list_editor_container')
        const listEditor = document.createElement('UL');
        const liName = document.createElement('LI');
        const paragraphName = document.createElement('P');
        const liCost = document.createElement('LI');
        const paragraphCost = document.createElement('P');
        const liActionEdit = document.createElement('LI');
        const btnUpdate = document.createElement('IMG');
        const btnDelete = document.createElement('DIV');

        listEditor.classList.add('list_editor')
        liName.classList.add('name')
        paragraphName.classList.add('name_title')
        liCost.classList.add('cost')
        paragraphCost.classList.add('cost_title')
        liActionEdit.classList.add('action_edit')
        btnUpdate.classList.add('btn_update_img')
        btnDelete.classList.add('btn_delete')

        paragraphName.textContent = inputName.value
        paragraphCost.textContent = inputCost.value
        btnUpdate.src = edit
        btnDelete.textContent = 'x'

        editor.appendChild(listEditor)
        liActionEdit.prepend(btnDelete)
        liActionEdit.prepend(btnUpdate)
        listEditor.prepend(liActionEdit)
        liCost.prepend(paragraphCost)
        listEditor.prepend(liCost)
        liName.prepend(paragraphName)
        listEditor.prepend(liName)
        
        btnUpdate.addEventListener( 'click', (e) => {
            this.updateNote(btnUpdate.closest( '.list_editor' ))
            this.activEvent = e.target
        })
        btnDelete.addEventListener( 'click', () => btnDelete.closest( '.list_editor' ).remove() )
      

        // editor.insertAdjacentHTML('beforeend', `
        //     <ul class="list_editor">
        //         <li class="name">
        //             <p class="name_title">${inputName.value}</p>
        //         </li>
        //         <li class="cost">
        //             <p class="cost_title">${inputCost.value}</p>
        //         </li>
        //         <li class="action_edit">
        //             <img class="btn_update_img" src="${edit}"></img>
        //             <div class="btn_delete">x</div>
        //         </li>
        //     </ul>
        // `)
    }

    updateNote(listEditor) {
        if (this.container) {
            this.openPopup(this.container)
        } else {
            this.openPopup(document.querySelector('.app_container'))
            this.activEvent = document.querySelector('.btn_update_img')
        }
        const inputName = document.querySelector('.input_name')
        const inputCost = document.querySelector('.input_cost')
        
        inputName.value = listEditor.querySelector('.name_title').textContent
        inputCost.value = listEditor.querySelector('.cost_title').textContent

        this.update = true
    }

}