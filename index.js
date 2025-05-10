import { fetchComments } from './modules/api.js'
import { renderComments } from './modules/renderComments.js'
import { updateComments } from './modules/comments.js'

const LoaderEl = document.querySelector('.loading')

export const fetchAndRender = () => {
    LoaderEl.classList.remove('loading')
    fetchComments()
        .then((data) => {
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
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                alert('Нет интернета, попробуйте обновить страницу')
            }
        })
}

fetchAndRender()
