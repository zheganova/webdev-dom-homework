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
    })
}
