import Show from './entities/Show.js';
import Season from './entities/Season.js';
import Person from './entities/Person.js';

const END_POINT = 'https://api.tvmaze.com/';

const fetchDataHome = (onSuccessHome) => {
    const newEndPoint = `${END_POINT}shows`
    fetch(newEndPoint)
    .then(response => response.json())
    .then( (data) => {

        data.sort(function (a, b) {
            return b.rating.average - a.rating.average;
        })
        const numOfPopularShow = 51;
        const shows = data.slice(0, numOfPopularShow).map((show) => {
            const name = show.name;
            const img = show.image.medium;
            const info = show.summary;
            const id = show.id;
            return createShow(id, name, img, info);
        })
        onSuccessHome(shows);
    })
    .catch(error => console.log('greska: ', error))
}
const fetchDataForSearch = (inputValue, onSuccessSearch) => {
    const newEndPoint = `${END_POINT}/search/shows?q=${inputValue}`;
    fetch(newEndPoint)
    .then(response => response.json())
    .then((data) => {
        const movies = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].show.image == null) {
                continue;
            }
            const name = data[i].show.name;
            const img = data[i].show.image.medium;
            const info = data[i].show.summary;
            const id = data[i].show.id;

            const show = createShow(id, name, img, info);
            movies.push(show);
        }
        onSuccessSearch(movies);
    })
}

const fetchDataForSingleShow = (id, onSuccess) => {

    const newEndPoint = `${END_POINT}shows/${id}?embed[]=seasons&embed[]=cast`;
    fetch(newEndPoint)
    .then(response => response.json())
    .then((data) => {
        const name = data.name;
        const image = data.image.original;
        const info = data.summary;
        const seasons = data._embedded.seasons;
        const cast = data._embedded.cast;
        const show = createShow(id, name, image, info);
        const ourSeasons = seasons.map((season) => {
            return createSeason(season.premiereDate, season.endDate);
        })
        for (let i = 0; i < ourSeasons.length; i++) {
            addSeasonToShow(ourSeasons[i], show);
        }
        for (let i = 0; i < cast.length; i++) {
            const person = createPerson(cast[i].person.name);
            addPersonToShow(show, person);
        }
        onSuccess(show);
    })
}

const createShow = (id, name, image, info) => new Show(id, name, image, info);
const createSeason = (premiereDate, endDate) => new Season(premiereDate, endDate);
const addSeasonToShow = (newSeason, show) => show.seasons.push(newSeason);
const createPerson = (name) => new Person(name);
const addPersonToShow = (show, person) => show.cast.push(person);
const fetchLocalStorage = () => localStorage.getItem('id');

export {
    fetchDataHome,
    fetchDataForSearch,
    fetchDataForSingleShow,
    fetchLocalStorage
}