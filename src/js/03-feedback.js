import throttle from 'lodash.throttle';
const feedbackFormRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';
console.log('feedbackFormRef: ', feedbackFormRef);

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

initPage();

feedbackFormRef.addEventListener('input', throttle(handleInput, 500));

function handleInput(event) {
  const { name, value } = event.target;
  try {
    let saveData = load(LOCALE_STORAGE_KEY);
    saveData = saveData ? saveData : {};

    saveData[name] = value;
    save(LOCALE_STORAGE_KEY, saveData);
  } catch (error) {
    console.log(error);
  }
}

function initPage() {
  const saveData = load(LOCALE_STORAGE_KEY);
  if (!saveData) {
    return;
  }
  Object.entries(saveData).forEach(([name, value]) => {
    feedbackFormRef.elements[name].value = value;
  });
}

feedbackFormRef.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();

  if (feedbackFormRef.elements.email.value === '') {
    return alert('Будь ласка, заповніть поле "EMAIL"');
  }

  console.log(JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY)));

  remove(LOCALE_STORAGE_KEY);
  event.currentTarget.reset();
}
