import { fetchComments, postComment } from './modules/api.js'
import { renderComments } from './modules/renderComments.js'
import { updateComments } from './modules/comments.js'
import { escapeHtml } from './modules/replaceAll.js'

const LoaderEl = document.querySelector('.loading')
const inputEl = document.querySelector('.add-form-name')
const textareaEl = document.querySelector('.add-form-text')
const ButtonEl = document.querySelector('.add-form-button')

const fetchAndRender = () => {
    LoaderEl.classList.remove('loading')
    fetchComments().then((data) => {
        const appComments = data.comments.map((comment) => ({
            name: comment.author.name,
            date: `${new Date(comment.date).toLocaleDateString('ru-RU', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
            })} ${new Date(comment.date).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
            })}`,
            text: comment.text,
            likes: comment.likes,
            isLiked: false,
        }))
        updateComments(appComments)
        renderComments()
        LoaderEl.classList.add('loading')
    })
}

// /Возможность оставить новый комментарий//
const initButtonListener = () => {
    ButtonEl.addEventListener('click', () => {
        if (inputEl.value.trim() === '' || textareaEl.value.trim() === '') {
            alert('Пожалуйста, заполните все поля!')
            return
        }

        const newComment = {
            name: escapeHtml(inputEl.value),
            text: escapeHtml(textareaEl.value),
        }

        ButtonEl.disabled = true
        ButtonEl.textContent = 'Создание комментария...'

        postComment(newComment)
            .then(() => {
                return fetchAndRender()
            })
            .then(() => {
                // Этот блок выполнится только после успешного завершения fetchAndRender
                inputEl.value = ''
                textareaEl.value = ''

                ButtonEl.disabled = false
                ButtonEl.textContent = 'Написать'
            })
            .catch((error) => {
                if (error.message === 'Failed to fetch') {
                    alert('Нет интернета, попробуйте снова')
                }

                if (error.message === 'Ошибка сервера') {
                    alert('Сервер сломался, попробуй позже')
                }

                if (error.message === 'Неверный запрос') {
                    alert('Имя и комментарий должны быть не короче 3 символов')
                }

                console.log(error)

                ButtonEl.disabled = false
                ButtonEl.textContent = 'Написать'
            })
    })
}

fetchAndRender()
initButtonListener()
