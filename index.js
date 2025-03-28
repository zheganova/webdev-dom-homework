import {renderComments} from "./modules/renderComments.js";
import {initLikeListeners,initButtonListener,initCommentClickListeners} from "./modules/initListeners.js";

renderComments();
initLikeListeners();
initButtonListener();
initCommentClickListeners();