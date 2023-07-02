import { fetchBreeds, fetchCatByBreed } from './cat.api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
select.addEventListener('change', onChangeSelect);


const loader = document.querySelector('.loader');
const divInfo = document.querySelector('.cat-info');

fetchAndRenderBreeds();

    function fetchAndRenderBreeds() {
    loader.classList.remove('invisible');
    fetchBreeds()
        .then(cats => updateSelect(cats))
        .catch(error => {
        Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'
        );
        select.classList.add('hidden-select');
        })
        .finally(() => {
        loader.classList.add('invisible');
        select.classList.remove('invisible');
        });
    }

    function onChangeSelect(e) {
    loader.classList.remove('invisible');
    const breedId = e.target.value;

    fetchCatByBreed(breedId)
        .then(breed => updateCatInfo(breed))
        .catch(error => {
        Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'
        );
        })
        .finally(() => loader.classList.add('invisible'));
    }

    function updateSelect(cats) {
    const markupBreeds = cats
        .map(({ id, name }) => {
        return `<option value =${id}>${name}</option>`;
        })
        .join('');
    select.insertAdjacentHTML('beforeend', markupBreeds);
    new SlimSelect({
        select: '#single',
    });
    }

function updateCatInfo(id) {
    console.log(id)
    const markup = id
      .map(breed => {
          return `
        <div class="wrapper">
	<img src='${breed.url}' width='600' alt="${breed.breeds[0].name}">
	<div class="cat-box">
		<h2>${breed.breeds[0].name}</h2>
		<p>${breed.breeds[0].description}</p>
    <h2>Temperament</h2>
    <p>${breed.breeds[0].temperament}</p>
	</div> 
</div>`;
      })
      .join('');
    divInfo.innerHTML = markup;
    

    // const markupPicture = `<img src='${breed.url}' alt='${breed.id}' width='400'>`;
    // // const markupDesc = `<h1 class="cat-info-desc">${breed.breeds[0].name}</h1><p class="cat-info-desc">${breed.breeds[0].description}</p><p class="cat-info-desc"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
    // divPicture.insertAdjacentHTML('beforeend', markupPicture);
    // // divInfo.insertAdjacentHTML('beforeend', markupDesc);
    }