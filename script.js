const inputEl = document.querySelector('.add-form-name')
const textareaEl = document.querySelector('.add-form-text')
const ButtonEl = document.querySelector('.add-form-button')
const commentsListEl = document.querySelector('.comments')

// Массив комментариев
let comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        isLiked: false,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        isLiked: true,
    },
]

// Рендерная функция для отрисовки комментариев
function renderComments() {
    commentsListEl.innerHTML = comments
        .map((comment, index) => {
            return `
            <li class="comment" data-index="${index}">
              <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  ${comment.text}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comment.likes}</span>
                  <button class="like-button ${
                      comment.isLiked ? '-active-like' : ''
                  }" data-index="${index}"></button>
                </div>
              </div>
            </li>
          `
        })
        .join('')
}

renderComments()

// Функция обработчиков лайков
const LikeListeners = () => {
    const likeButtons = document.querySelectorAll('.like-button')

    for (const buttonLike of likeButtons) {
        buttonLike.addEventListener('click', () => {
            event.stopPropagation()
            const commentIndex = buttonLike.dataset.index
            const comment = comments[commentIndex] // Находим комментарий в массиве comments
            comment.isLiked = !comment.isLiked // Меняем состояние лайка
            comment.likes += comment.isLiked ? 1 : -1 // Обновляем количество лайков
            renderComments()
            initCommentClickListeners()
            LikeListeners()
        })
    }
}

LikeListeners()

// Функция для экранирования HTML
function escapeHtml(unsafeText) {
    return unsafeText
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}

//Возможность оставить новый комментарий//
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

    comments.push(newComment)
    renderComments()
    initCommentClickListeners()
    LikeListeners()

    inputEl.value = ''
    textareaEl.value = ''
})

// Функция для обработки кликов на комментарии
const initCommentClickListeners = () => {
    const commentElements = document.querySelectorAll('.comment')

    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', () => {
            const commentIndex = commentElement.dataset.index
            const comment = comments[commentIndex]

            // Добавляем имя автора и текст комментария в поле "Текст"
            textareaEl.value = `> ${comment.name}: ${comment.text}\n\n`
            textareaEl.focus() // Фокусируемся на поле ввода
        })
    }
}

initCommentClickListeners()
