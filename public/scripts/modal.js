export default function Modal(){
    const cancelButton = document.querySelector('.button.cancel')
    const wrapper = document.querySelector('.modal-wrapper')
    
    cancelButton.addEventListener('click', close)

    function open(){
        wrapper.classList.add('active')
    }
    function close(){
        wrapper.classList.remove('active')
    }
    return{
        open,
        close
    }
}