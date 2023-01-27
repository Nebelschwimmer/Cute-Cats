const configApi = {
  url: 'https://cats.petiteweb.dev/api/single/nebelschwimmer',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
};

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _onResponse(res) {
    return res.ok ? res.json() : Promise.reject({ ...res, message: 'error' });
  }
  getAllCats() {
  
    return fetch(`${this._url}/show`, {
      method: 'GET',
    }).then(this._onResponse);
  }
  getAllCatsId() {
   
    return fetch(`${this._url}/ids`, {
      method: 'GET',
    }).then(this._onResponse);
  }
  getCatById(id) {
    
    return fetch(`${this._url}/show/${id}`, {
      method: 'GET',
    }).then(this._onResponse);
  }
  addNewCat(body) {
    return fetch(`${this._url}/add`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._onResponse);
  }
  updateCatById(id, data) {
    return fetch(`${this._url}/update/${id}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._onResponse);
  }
  deleteCatById(id) {
   
    return fetch(`${this._url}/delete/${id}`, {
      method: 'DELETE',
    }).then(this._onResponse);
  }
}

const api = new Api(configApi);
