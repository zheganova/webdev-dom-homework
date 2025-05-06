// Функция для рендера страницы логина
import { fetchAndRender } from '../index.js'
import { login, setToken, setName } from './api.js'
import { renderRegistration } from './renderRegistration.js'

export function renderLogin() {
    const container = document.querySelector('.container')

    const loginHtml = `
    <section class="add-form">
        <h3 class="form-title">Форма входа</h3>
        <div class="add-form-input">
            <input type="text" id="login-input" class="add-form-name add-name" placeholder="Введите логин">
            <input type="password" id="password-input" class="add-form-name add-name" placeholder="Введите пароль">
        </div>
        <br />
       
            <button class="add-form-button button-main" id="login-button" type="submit">Войти</button>
            <u class="add-form-button-link link-registry" id="reg-button-link">Зарегистрироваться</u>
        
    </section>
    `
    container.innerHTML = loginHtml

    document.querySelector('.link-registry').addEventListener('click', () => {
        renderRegistration()
    })

    const loginEl = document.querySelector('#login-input')
    const passwordEl = document.querySelector('#password-input')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                fetchAndRender()
            })
    })
}
