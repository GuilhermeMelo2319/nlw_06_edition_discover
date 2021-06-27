import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

const checkButtons = document.querySelectorAll(".actions a.check")
checkButtons.forEach(element => {
    element.addEventListener('click', handleClick)
});

const deleteButtons = document.querySelectorAll(".actions a.delete")
deleteButtons.forEach(element => {
    element.addEventListener('click', (event) => handleClick(event, false))
});

function handleClick(event, check = true){
    event.preventDefault()
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const form = document.querySelector(".modal form")
    const text = 'Are you sure you want to '
    const questionId = event.target.dataset.id

    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)
    check ? modalButton.classList.remove('red') : modalButton.classList.add('red')
    modalTitle.innerHTML = check ? 'Mark as read' : 'Delete this question'
    modalDescription.innerHTML = text + (check ? 'mark as read?' : 'delete this question?')
    modalButton.innerHTML = check ? 'Yes, check it!' : 'Yes, delete it!'
    
    modal.open()
}