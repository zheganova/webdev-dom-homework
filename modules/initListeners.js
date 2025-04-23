import { comments } from './comments.js'
import { renderComments } from './renderComments.js'

const textareaEl = document.querySelector('.add-form-text')

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
