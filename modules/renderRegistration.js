// Функция для рендера страницы логина
import { fetchAndRender } from '../index.js'
import { setToken, setName, registration } from './api.js'
import { renderLogin } from './renderLogin.js'

export function renderRegistration() {
    const container = document.querySelector('.container')

    const loginHtml = `
    <section class="add-form">
        <h3 class="form-title">Форма регистрации</h3>
        <div class="add-form-input">
            <input type="text" id="name-input" class="add-form-name add-name" placeholder="Введите имя">
            <input type="text" id="login-input" class="add-form-name add-name" placeholder="Введите логин">
            <input type="password" id="password-input" class="add-form-name add-name" placeholder="Введите пароль">
        </div>
        <br />
       
            <button class="add-form-button button-main" id="login-button" type="submit">Зарегистрироваться</button>
            <u class="add-form-button-link link-login" id="reg-button-link">Войти</u>
        
    </section>
    `
    container.innerHTML = loginHtml

    document.querySelector('.link-login').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.querySelector('#name-input')
    const loginEl = document.querySelector('#login-input')
    const passwordEl = document.querySelector('#password-input')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
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
