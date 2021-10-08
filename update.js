function reload() {
    window.location.reload();
}
setTimeout(reload, 60000)

let allCardsFromPage = getAllCardsFromPage();

window.onload = checkCardsOnPage();
setTimeout(checkCardsOnMemory, 5000)

