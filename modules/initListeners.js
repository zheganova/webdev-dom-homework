import { comments } from './comments.js'
import { renderComments } from './renderComments.js'
import { escapeHtml } from './replaceAll.js'
import { updateComments } from './comments.js'

const inputEl = document.querySelector('.add-form-name')
const textareaEl = document.querySelector('.add-form-text')
const ButtonEl = document.querySelector('.add-form-button')

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

//Возможность оставить новый комментарий//
export function initButtonListener() {
    ButtonEl.addEventListener('click', function () {
        if (inputEl.value.trim() === '' || textareaEl.value.trim() === '') {
            alert('Пожалуйста, заполните все поля!')
            return
        }

        const newComment = {
            name: escapeHtml(inputEl.value),
            date: `${new Date().toLocaleDateString('ru-RU', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
            })} ${new Date().toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
            })}`,
            text: escapeHtml(textareaEl.value),
            likes: 0,
            isLiked: false,
        }

        fetch('https://wedev-api.sky.pro/api/v1/polina-zheganova/comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                return response.json()
            })
            .then((date) => {
                updateComments(appComments)
                renderComments()
            })

        comments.push(newComment)
        renderComments()

        inputEl.value = ''
        textareaEl.value = ''
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
