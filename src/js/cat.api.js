const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_eK14vcWQAlPiRloepB6ZUKEOx8G6fP8Y7kAVgA4ugn498PutxsXkzg8uWaLWzkJI';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?key=${API_KEY}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

fetchBreeds()
  .then(date => {
    console.log(date);
  })
  .catch(err => console.log(err));

function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };


