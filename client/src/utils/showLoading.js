import { Loading } from 'notiflix/build/notiflix-loading-aio';

//Remove the indicator if exist.
export function removeLoading() {
  Loading.remove();
}

export function showLoadingHourglass(messageText) {
  Loading.hourglass(messageText, {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });
}

export function showLoadingCircle(messageText) {
  Loading.circle(messageText, {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });
}

export function showLoadingDots(messageText) {
  Loading.dots(messageText, {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });
}
