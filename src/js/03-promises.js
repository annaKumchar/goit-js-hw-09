import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[ name="step"]');
const amountInput = document.querySelector('[name="amount"]');


formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt){
  evt.preventDefault();

  let delay = Number(delayInput.value);
  for (let position = 1; position <= amountInput.value; position += 1) {
    if (position > 1) {
      delay += Number(stepInput.value);
      };
    createPromise(position, delay)
       .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
     })

    .catch(({ position, delay }) => {
      Notiflix.Notify.success(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  },delay);
  
  });
}