import { comments } from './comments.js'
import { renderComments } from './renderComments.js'
import { escapeHtml } from './replaceAll.js'
import { postComment } from './api.js'
import { fetchAndRender } from '../index.js'

const textareaEl = document.querySelector('.add-form-text')
const getAddFormElements = () => ({
    inputEl: document.querySelector('.add-form-name'),
    textareaEl: document.querySelector('.add-form-text'),
    ButtonEl: document.querySelector('.add-form-button'),
})

// Функция обработчиков лайков
export function initLikeListeners() {
    document.querySelectorAll('.like-button').forEach((buttonLike) => {
        buttonLike.addEventListener('click', (event) => {
            event.stopPropagation()
            const commentIndex = buttonLike.dataset.index
            const comment = comments[commentIndex] // Находим комментарий в массиве comments
            comment.isLiked = !comment.isLiked // Меняем состояние лайка
            comment.likes += comment.isLiked ? 1 : -1 // Обновляем количество лайков
            renderComments()
        })
    })
}

// Функция для обработки кликов на комментарии
export function initCommentClickListeners() {
    document.querySelectorAll('.comment').forEach((commentElement) => {
        commentElement.addEventListener('click', () => {
            const commentIndex = commentElement.dataset.index
            const comment = comments[commentIndex]

            // Добавляем имя автора и текст комментария в поле "Текст"
            textareaEl.value = `> ${comment.name}: ${comment.text}\n\n`
            textareaEl.focus() // Фокусируемся на поле ввода
        })
    })
}

// /Возможность оставить новый комментарий//
export const initButtonListener = () => {
    const { inputEl, textareaEl, ButtonEl } = getAddFormElements()

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
