const host = 'https://wedev-api.sky.pro/api/v2/polina-zheganova/comments'
const autHost = 'https://wedev-api.sky.pro/api/user'
export let token = ''

export const setToken = (newToken) => {
    token = newToken
}

export let name = ''

export const setName = (newName) => {
    name = newName
}

export const fetchComments = () => {
    return fetch(host, {
        method: 'GET',
    }).then((response) => {
        return response.json()
    })
}

export const postComment = (newComment) => {
    return fetch(host, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newComment),
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

export const login = (login, password) => {
    return fetch(autHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Неверный запрос')
        }

        if (response.status === 201) {
            return response.json()
        }
    })
}

export const registration = (name, login, password) => {
    return fetch(autHost, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Неверный запрос')
        }

        if (response.status === 201) {
            return response.json()
        }
    })
}
