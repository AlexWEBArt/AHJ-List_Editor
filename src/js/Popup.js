export default class Popup {
    constructor() {
        this.container = null
    }

    openPopup(container) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('container is not HTMLElement');
        }

        this.container = container;
        if (!document.querySelector('.popup_container')) {
            this.container.insertAdjacentHTML('afterend', `
                <div class="popup_container">
                    <div class="popup-control">
                        <p class="Input_text">Название</p>
                        <input type="text" class="input_name" >
                    </div>
                    <div class="popup-control">
                        <p class="Input_text">Стоимость</p>
                        <input type="text" class="input_cost">
                    </div>
                    <div class="popup-btn">
                        <a href="#" class="btn btn_save">Сохранить</a>
                        <a href="#" class="btn btn_cancel">Отмена</a>
                    </div>
                </div>
            `)
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
        console.log(this.inputName)
        editor.insertAdjacentHTML('beforeend', `
            <ul class="list_editor">
                <li class="name">
                    <p class="name_title">${inputName.value}</p>
                </li>
                <li class="cost">
                    <p class="cost_title">${inputCost.value}</p>
                </li>
                <li class="action_edit">
                    <img class="btn_update_img" src="img/update.png"></img>
                    <div class="btn_delete">x</div>
                </li>
            </ul>
        `)
    }

    updateNote(listEditor) {
        this.openPopup(this.container)
        const inputName = document.querySelector('.input_name')
        const inputCost = document.querySelector('.input_cost')
        inputName.value = listEditor.querySelector('.name_title').textContent
        inputCost.value = listEditor.querySelector('.cost_title').textContent
    }

}