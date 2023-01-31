class Card {
  constructor(dataCat, selectorTemplate, onClickToEdit = () => {}, setLikeCat = ()=> {}) {
    this._data = dataCat;
    this._selectorTemplate = selectorTemplate;
    this._onClickToEdit = onClickToEdit;
    this._setLikeCat = setLikeCat
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
    const cardLink = this.element.querySelector('.card__link');
    const cardEdit = this.element.querySelector('.card__edit');
   

   
    //Удаление карточки
    BtnDelete.setAttribute('id', this._data.id);
    BtnDelete.addEventListener('click', (e) => {
      e.preventDefault();
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

 
  cardLike.addEventListener('click', (e) => {
    e.preventDefault();
 
    api.updateCatById(this._data.id).then(() => {
      const element = document.getElementById(this._data.id);
      element.this._data.id.classList.add('card__like_active');
      location.reload()
    });
  
});



  //
    cardTitle.textContent = this._data.name ?? 'Ваш котик';
    cardImage.src =
      this._data.image ||
      './assets/images/cat.jpg';
    
      cardLink.addEventListener('click', (e) => {
        this._onClickToEdit(this.element, this._data.id);
      });


      cardEdit.addEventListener('click', (e) => {
        this._onClickToEdit(this.element, this._data.id);
      });

      cardImage.addEventListener('click', (e) => {
        this._onClickToEdit(this.element, this._data.id);
      });
      
      
      
      return this.element;
    }

    
  
    setEventListener() {
      // console.log('', this.cardTitle);
      // this.cardTitle.addEventlistener('click', ()=> this._handleCatTitle(this))
    }
  }




