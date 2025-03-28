import {comments} from "./comments.js";
import { initLikeListeners, initCommentClickListeners } from './initListeners.js';

const commentsListEl = document.querySelector('.comments')

// Рендерная функция для отрисовки комментариев
export function renderComments() {
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

    initLikeListeners();
    initCommentClickListeners();
}