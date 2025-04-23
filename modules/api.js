import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'
import { escapeHtml } from './replaceAll.js'

const LoaderEl = document.querySelector('.loading')
const inputEl = document.querySelector('.add-form-name')
const textareaEl = document.querySelector('.add-form-text')
const ButtonEl = document.querySelector('.add-form-button')

export const fetchAndRenderComments = () => {
    LoaderEl.classList.remove('loading')
    document.querySelector('.comments').innerHTML = '';

    return fetch('https://wedev-api.sky.pro/api/v1/polina-zheganova/comments', {
        method: 'GET',
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const appComments = data.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: `${new Date(comment.date).toLocaleDateString(
                        'ru-RU',
                        {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                        },
                    )} ${new Date(comment.date).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}`,
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })

            updateComments(appComments)
            renderComments()
            LoaderEl.classList.add('loading')
        })
}

// /Возможность оставить новый комментарий//
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

        ButtonEl.disabled = true
        ButtonEl.textContent = 'Создание комментария...'

        fetch('https://wedev-api.sky.pro/api/v1/polina-zheganova/comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
        })
            .then(() => {
                return fetchAndRenderComments()
            })
            .then(() => {
                inputEl.value = ''
                textareaEl.value = ''

                ButtonEl.disabled = false
                ButtonEl.textContent = 'Написать'
            })
    })
}
