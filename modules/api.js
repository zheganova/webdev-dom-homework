export const fetchComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/polina-zheganova/comments', {
        method: 'GET',
    }).then((response) => {
        return response.json()
    })
}

export const postComment = (newComment) => {
    return fetch('https://wedev-api.sky.pro/api/v1/polina-zheganova/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        forceError: true, //потом убрать
    }).then((response) => {
        if (response.status === 500) {
            throw new Error('Ошибка сервера')
        }

        if (response.status === 400) {
            throw new Error('Неверный запрос')
        }

        if (response.status === 201) {
            return response.json()
        }
    })
}
