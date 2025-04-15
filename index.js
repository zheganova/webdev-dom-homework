import { renderComments } from './modules/renderComments.js'
import { initButtonListener } from './modules/initListeners.js'
import { updateComments } from './modules/comments.js'

renderComments()
initButtonListener()

fetch('https://wedev-api.sky.pro/api/v1/polina-zheganova/comments', {
    method: 'GET',
})
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        const appComments = data.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: `${new Date().toLocaleDateString('ru-RU', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                })} ${new Date().toLocaleTimeString('ru-RU', {
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
    })
