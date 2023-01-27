class Card {
  constructor(dataCat, selectorTemplate) {
    this._data = dataCat;
    this._selectorTemplate = selectorTemplate;
  }

  _getTemplate() {
   
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector('.card');
    
  }
  getElement() {
    this.element = this._getTemplate().cloneNode(true);
    const cardTitle = this.element.querySelector('.card__name');
    const cardImage = this.element.querySelector('.card__image');
    const cardLike = this.element.querySelector('.card__like');
    const BtnDelete = this.element.querySelector('.card__delete');

   
    //Удаление карточки
    BtnDelete.setAttribute('id', this._data.id);
    BtnDelete.addEventListener('click', (e) => {
    if (confirm('Удалить котика?')) {
      api.deleteCatById(this._data.id).then(() => {
        const element = document.getElementById(this._data.id);
        element.parentElement.remove();
        location.reload()
      });
    }
  });
  //
  
  //Добавление к кнопке "Like" класса active 

  if (this._data.favorite) {
    cardLike.classList.add('card__like_active');
  }
//
    cardTitle.textContent = this._data.name ?? 'Ваш котик';
    cardImage.src =
      this._data.image ||
      './assets/images/cat.jpg';
    return this.element;
  }
}

const card = new Card(cats[0], '#card-template');