import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function showAlertMessage(messageText) {
  Notify.failure(messageText);
}

export function showInfoMessage(messageText) {
  Notify.info(messageText);
}

export function showSuccessMessage(messageText) {
  Notify.success(messageText);
}
