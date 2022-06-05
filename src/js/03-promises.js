import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timeoutId;

const refs = { 
  form: document.querySelector('form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) { 
  e.preventDefault();
  if (timeoutId) {
    return
  }

  let step = +refs.inputDelay.value;

  timeoutId = setTimeout(() => {
    for (let i = 1; i <= refs.inputAmount.value; i += 1) {

      createPromise(i, step)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
        step += +refs.inputStep.value;
    }
  }, step);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      }
      reject({position, delay});
      }, delay);
  })
}
