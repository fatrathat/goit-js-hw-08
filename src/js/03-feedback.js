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
    console.log(error);
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

const loadDataFromStorage = () => {
  const userData = loadFormData(LOCALSTORAGE_KEY);

  if (userData === undefined) {
    console.log('Заповніть форму');
  } else {
    refs.form.elements.email.value = userData.email;
    refs.form.elements.message.value = userData.message;
  }
};

loadDataFromStorage();
refs.form.addEventListener('input', handleInput);
refs.form.addEventListener(
  'submit',
  _.throttle(event => {
    handleSubmit(event);
  }, 500),
);
