import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const formDelay = form.querySelector(`[name='delay']`);
const formStep = form.querySelector(`[name='step']`);
const formAmount = form.querySelector(`[name='amount']`);
const formSubmitBtn = form.querySelector(`[type='submit']`);

formSubmitBtn.addEventListener('click', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number.parseInt(formDelay.value);
  const step = Number.parseInt(formStep.value);
  const amount = Number.parseInt(formAmount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    
    delay += step;
  };
};

//  

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else { reject({position, delay}); };
    }, delay);
  });
};