const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer NGAPI_2QcqcEVbl%B%C(AxitjS$FLzMN8PtR)K714229c08db526fcf6db83f6d8e72e92'
  }
};

fetch('https://publicapi.nationsglory.fr/playercount', options)
  .then(response => response.json())
  .then(response => {console.log(response)})
    
  .catch(err => console.error(err));