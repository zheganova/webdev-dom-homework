import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'

const LoaderEl = document.querySelector('.loading')

export const fetchAndRenderComments = () => {
    LoaderEl.classList.remove('loading')

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
