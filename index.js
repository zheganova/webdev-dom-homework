import { renderComments } from './modules/renderComments.js'
import { initButtonListener } from './modules/initListeners.js'
import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'

fetchAndRenderComments()
renderComments()
initButtonListener()
