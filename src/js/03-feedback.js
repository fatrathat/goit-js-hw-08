import _ from 'lodash';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
};

// Зберігання у сховище
const saveFormData = (key, value) => {
  try {
    const formData = JSON.stringify(value);
    localStorage.setItem(key, formData);
  } catch (error) {
    console.log(error.message);
  }
};

// Завантаження із сховища
const loadFormData = key => {
  try {
    const formData = localStorage.getItem(key);
    return formData === null ? undefined : JSON.parse(formData);
  } catch (error) {
    console.log(error.message);
  }
};

// Подія вводу
const handleInput = event => {
  const userEmail = event.currentTarget.elements.email.value;
  const userMessage = event.currentTarget.elements.message.value;
  const userData = { email: userEmail, message: userMessage };

  saveFormData(LOCALSTORAGE_KEY, userData);
};

// Подія відправки
const handleSubmit = event => {
  event.preventDefault();

  console.log(loadFormData(LOCALSTORAGE_KEY));

  localStorage.removeItem(LOCALSTORAGE_KEY);
  refs.form.reset();
};

refs.form.addEventListener('input', handleInput);
refs.form.addEventListener(
  'submit',
  _.throttle(userData => {
    handleSubmit(userData);
  }, 500),
);
