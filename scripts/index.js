const cardsContainer = document.querySelector('.cards');
const btnOpenPopupForm = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');
const popupAddCat = new Popup('popup-add-cats');
const formEditCat = document.querySelector('#popup-form-edit');
popupAddCat.setEventListener();
const popupEditCat = new Popup('popup-edit-cats');
popupEditCat.setEventListener();


function handleFormAddCat(e, isEdit) {
  e.preventDefault();
 
  if (isEdit) {
    const elementsFormCat = [...formEditCat.elements];
    const dataFromForm = serializeForm(elementsFormCat);
    console.log({ dataFromForm });
    api.updateCatById(dataFromForm.id, dataFromForm);
    return popupEditCat.close();
  }
  const elementsFormCat = [...formAddCat.elements];
  const dataFromForm = serializeForm(elementsFormCat);
  api.addNewCat(dataFromForm);
  createCat(dataFromForm);
  const oldStorage = JSON.parse(localStorage.getItem('cats'));
  oldStorage.push(dataFromForm);
  localStorage.setItem('cats', JSON.stringify(oldStorage));
  const setTime = new Date(new Date().getTime() + 6000);
  localStorage.setItem('catsRefresh', setTime);
  // updateLocalStorage(cats, {type: 'ADD_CAT'});
  popupAddCat.close();
}
function createCat(data) {
  const cardInstance = new Card(data, '#card-template', onClickToEdit);
  const newCardElement = cardInstance.getElement();
  cardsContainer.append(newCardElement);
}

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
formAddCat.addEventListener('submit', handleFormAddCat);
formEditCat.addEventListener('submit', (e) => handleFormAddCat(e, true));


function checkLocalStorage() {
  const localData = JSON.parse(localStorage.getItem('cats'));
  console.log({ localData });

  const getTimeExpires = localStorage.getItem('catsRefresh');

  if (localData && localData.length && new Date() < new Date(getTimeExpires)) {
    localData.forEach((data) => createCat(data));
  } else {
    api.getAllCats().then((data) => {
      localStorage.setItem('cats', JSON.stringify(data));
      data.forEach((cat) => {
        createCat(cat);
      });
    });
    
    const setTime = new Date(new Date().getTime() + 5000);
    localStorage.setItem('catsRefresh', setTime);
  }
}
function onClickToEdit(card, id) {
  popupEditCat.setContent(card, id);
  popupEditCat.open();
}

checkLocalStorage();

localStorage.setItem('cats', JSON.stringify(cats));
localStorage.setItem('time', 'myTime');

const result = localStorage.getItem('cats');
const result2 = localStorage.getItem('time');

