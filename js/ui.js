const $input = $('input');
const $mainDiv = $('.main-body');
const collectInput = () => $input.val();

const displayHome = (data) => {
    $mainDiv.empty();

    data.map((show) => {
        createCardShow(show);
    })
}
const createCardShow = (data) => {
    const $cardMovie = $('<div class="card card-movie col-12 col-md-6 col-lg-4 box">');
    $cardMovie.attr('data-id', data.id);
    const $img = $('<img class="card-img-top">');
    const $cardBody = $('<div class="card-body">');
    const $cardText = $('<p class="card-text">');
    $img.attr('src', data.image);
    $cardText.text(data.name);

    $cardBody.append($cardText);
    $cardMovie.append($img);
    $cardMovie.append($cardBody);
    $mainDiv.append($cardMovie);
}
const addToList = (data) => {
    const $ul = $('.search-ul')
    $ul.empty();

    data.map((show) => {
        const $li = $('<li class="list-group-item search-li">');
        $li.attr('data-id', show.id)
        $li.text(show.name);
        $ul.append($li);
    })
}
const displaySingle = (show) => {
    const $mainDiv = $('.img-single');
    const $img = $('<img>').attr('src', show.image);

    $('.show-name').text(show.name);
    const $divBody = $('.details-body');
    const $p = $(show.info);
    $divBody.append($p);
    $mainDiv.append($img);
    const $ulSeasons = $('.season');
    const $ulCast = $('.cast');

    $('.season-title').text(`Seasons (${show.seasons.length})`);

    for (let i = 0; i < show.seasons.length; i++) {
        const $li = $('<li class="list-group-item">').text(`${i + 1}. ${show.seasons[i].getInfo()}`);
        $ulSeasons.append($li);
    }
    if (show.cast.length > 5) {
        show.cast.length = 5;
    }
    for (let i = 0; i < show.cast.length; i++) {
        const $li = $('<li class="list-group-item">').text(`${show.cast[i].name}`);
        $ulCast.append($li);
    }
}
export {
    collectInput,
    displayHome,
    addToList,
    displaySingle
}