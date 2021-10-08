// Доробити:

// місця вигрузуи 0-1
// <1000 грн не показувати
// ДОбавити перевірку заявок з ларді (Получаємо всі заявки з ларді, перевіряємо чи є така в памяті)

let list = document.getElementById('request_list_main');

function extract(id) {
    let targetCard = document.querySelector('.request_' + id);
    let fraht = {};

    fraht.idDella = targetCard.getAttribute('data-request_id');

    // Дата
    let dateFrom1 = targetCard.querySelector('.date_add').innerHTML.substring(4,6);
    let dateFrom2 = targetCard.querySelector('.date_add').innerHTML.substring(1,3);
    fraht.dateFrom = '2021-' + dateFrom1 + '-' + dateFrom2
    
    let dateTo1 = targetCard.querySelector('.date_add').innerHTML.substring(10,12);
    let dateTo2 = targetCard.querySelector('.date_add').innerHTML.substring(7,9);
    if (dateTo1 > 0) {
        fraht.dateTo = '2021-' + dateTo1 + '-' + dateTo2;
    }

    // Назва грузу
    fraht.contentName = targetCard.querySelector('.cargo_type').textContent;

    // Доп. інформація по грузу
    fraht.note = '';
    // температурний режим
    if (targetCard.querySelector('.temperature') !== null) {
        fraht.note += 'темп: ' + targetCard.querySelector('.temperature').textContent.replace(' C 0', '') + " С ";
    }
    //Кількість палет + Розміри

    let paletSource = targetCard.querySelector('.request_text').childNodes;
    for (let i = 0; i < paletSource.length; i++) {
        if (paletSource[i].textContent.includes('кільк. палет')) {
            fraht.note += 'палет ' + paletSource[i + 1].textContent + ' ';
        }

        // Розміри

        if (paletSource[i].textContent.includes('дов=')) {
            fraht.sizeLength = paletSource[i + 1].textContent.replace(',', '.').replace('м', '');
        }
        if (paletSource[i].textContent.includes('шир=')) {
            fraht.sizeWidth = paletSource[i + 1].textContent.replace(',', '.').replace('м', '');
        }
        if (paletSource[i].textContent.includes('вис=')) {
            fraht.sizeHeight = paletSource[i + 1].textContent.replace(',', '.').replace('м', '');
        }

    }
    // Тип загрузки\вигрузки
    

    loadTypesSource = targetCard.querySelector('.request_tags');
    if (loadTypesSource !== null){
        fraht.loadTypes = [];
        if (loadTypesSource.textContent.includes('Збоку')){
            fraht.loadTypes.push(25)
        }
        if (loadTypesSource.textContent.includes('Зверху')){
            fraht.loadTypes.push(24)
        }
        if (loadTypesSource.textContent.includes('Задня')){
            fraht.loadTypes.push(26)
        }
        // Кількість мість погрузки\вигрузки
        if (loadTypesSource.textContent.includes('Місць')){
            let tags = loadTypesSource.querySelectorAll('.tag')
            for (let i = 0; i < tags.length; i++) {
                if (tags[i].textContent.includes('Місць')) {
                    fraht.note += tags[i].textContent.replace('\n', '') + ' ';
                }
            }
        }      
        if (loadTypesSource.textContent.includes('Довантаження')){
            fraht.note += 'Догруз ';
        }
        if (loadTypesSource.textContent.includes('Можл. дозавантаження')){
            fraht.note += 'Можл. догруз ';
        }
        if (loadTypesSource.textContent.includes('Без довантаження (окреме авто)')){
            fraht.note += 'Окреме авто ';
        }
        if (loadTypesSource.textContent.includes('Рога (коники)')){
            fraht.note += 'Рога (коники) ';
        }
        if (loadTypesSource.textContent.includes('Санпаспорт')){
            fraht.note += 'Санпаспорт ';
        }
        if (loadTypesSource.textContent.includes('Санитарна книжка')){
            fraht.note += 'Санитарна книжка ';
        }
        if (loadTypesSource.textContent.includes('Пломба')){
            fraht.note += 'Пломба ';
        }
        if (loadTypesSource.textContent.includes('Ремені')){
            fraht.note += 'Ремені ';
        }
        if (loadTypesSource.textContent.includes('На склад')){
            fraht.note += 'На склад ';
        }
        if (loadTypesSource.textContent.includes("Дерев'яна підлога")){
            fraht.note += "Дерев'яна підлога ";
        }
        if (loadTypesSource.textContent.includes('Розтентування')){
            fraht.note += 'Розтентування ';
        }
        if (loadTypesSource.textContent.includes('Пломба')){
            fraht.note += 'Пломба ';
        }
        if (loadTypesSource.textContent.includes('Гаки')){
            fraht.note += 'Гаки ';
        }
        if (loadTypesSource.textContent.includes("З'ємні стійки")){
            fraht.note += "З'ємні стійки ";
        }
        if (loadTypesSource.textContent.includes('Гідроборт')){
            fraht.note += 'Гідроборт ';
        }  
    }
    fraht.note = fraht.note.substring(0,40);

    

    
    // Габарити грузу
    let volumeSource = targetCard.querySelector('.cube');
    if (volumeSource !== null){
        if (volumeSource.textContent.includes('-')) {
            minPosition = volumeSource.textContent.indexOf('-');
            fraht.sizeVolumeFrom = volumeSource.textContent.slice(0, minPosition).replace(' м³', '' ).replace(',', '.');
            fraht.sizeVolumeTo = volumeSource.textContent.slice(minPosition + 1).replace(' м³', '' ).replace(',', '.');
        } else {
            fraht.sizeVolumeTo = volumeSource.textContent.replace(' м³', '' ).replace(',', '.');
        }
        
    }

    // Тип машини

    let bodyGroupIdSourse = targetCard.querySelector('.truck_type').textContent;
    switch(bodyGroupIdSourse) {
        case 'тент':
            fraht.bodyTypeId = '34';
            break;
        case 'будь-яка':
            fraht.bodyGroupId = '1';
            break;
        case 'крита':
            fraht.bodyGroupId = '1';
            break;
        case 'відкрита':
            fraht.bodyGroupId = '2';
            break;
        case 'рефрижератор':
            fraht.bodyTypeId = '32';
            break;
        case 'тагач':
            fraht.bodyTypeId = '70';
            break;
        case 'ізотерм':
            fraht.bodyTypeId = '25';
            break;
        case 'цільнометал.':
            fraht.bodyTypeId = '36';
            break;
        case 'автовоз':
            fraht.bodyTypeId = '20';
            break;
        case 'бортова':
            fraht.bodyTypeId = '63';
            break;
        case 'зерновоз':
            fraht.bodyTypeId = '26';
            break;
        case 'контейнеровіз':
            fraht.bodyTypeId = '28';
            break;
        case 'лісовоз':
            fraht.bodyTypeId = '42';
            break;
        case 'негабарит':
            fraht.bodyTypeId = '30';
            break;
        case 'платформа':
            fraht.bodyTypeId = '64';
            break;
        case 'самоскид':
            fraht.bodyTypeId = '33';
            break;
        case 'трал':
            fraht.bodyTypeId = '30';
            break;
        case 'мікроавтобус':
            fraht.bodyTypeId = '57';
            break;
        case 'контейнер пустий':
            fraht.bodyTypeId = '27';
            break;
        default:
            console.log('Невідомий тип транспорту - написати Олександру Миколайовичу');

    }

    // Ціна

    paymentPriceSource = targetCard.querySelector('.price_main');
    if (paymentPriceSource !== null) {
        paymentPriceSource.querySelectorAll('div,span').forEach(n => n.remove());
        fraht.paymentPrice = paymentPriceSource.innerHTML.replace(/\D/g,'');
    }
    
    // Валюта

    fraht.paymentCurrencyId = '2';

    // Доп. умови оплати

    if (targetCard.querySelector('.price_tags') !==null) {
        paymentsTagsSource = targetCard.querySelector('.price_tags').innerHTML;
        if (paymentsTagsSource.includes('При розвантаженні')) {
            fraht.paymentMomentId = '4';
        } else if (paymentsTagsSource.includes('При завантаженні')){
            fraht.paymentMomentId = '2';
        }
        if (paymentsTagsSource.includes('На картку')) {
            fraht.paymentTypeId = '10';
        } else if (paymentsTagsSource.includes('Б/г')) {
            fraht.paymentTypeId = '4';
        } else if (paymentsTagsSource.includes('Готівка')) {
            fraht.paymentTypeId = '2';
        } else if (paymentsTagsSource.includes('Софт')) {
            fraht.paymentTypeId = '10';
        }
    }
    
    // Вага

    let sizeMasSource = targetCard.querySelector('.weight');
    if (sizeMasSource !== null){
        if (sizeMasSource.textContent.includes('–')) {
            minPosition = sizeMasSource.textContent.indexOf('–');
            fraht.sizeMassFrom = sizeMasSource.textContent.slice(0, minPosition).replace(',', '.').replace('т', '').replace(' ', '');
            fraht.sizeMassTo = sizeMasSource.textContent.slice(minPosition+1).replace(',', '.').replace('т', '').replace(' ', '');
        } else {
            fraht.sizeMassTo = targetCard.querySelector('.weight').innerHTML.replace(',', '.').replace('т', '').replace(' ', '');
        }
    } else {
        fraht.sizeMassFrom = '22';
    }

    // Загрузка - вигрузка

    citiesSource = targetCard.querySelector('.request_distance').childNodes;
    
    let cityAddTarget = 'loadTowns';
    fraht.waypointListSource = [];
    fraht.waypointListTarget = [];
    for (let i = 1; i < citiesSource.length; i++) {
        if (citiesSource[i].textContent.includes(',')){
        } else if (citiesSource[i].textContent.includes('—')) {
            cityAddTarget = 'unLoadTowns';
            } else {
                if (citiesSource[i].hasAttribute('title')){
                    let townNameAdd = citiesSource[i].querySelector('.locality').textContent;
                    townNameAdd = townNameAdd.slice(0, townNameAdd.length-1);
                    let city = {
                        areaId: checkRegion(citiesSource[i].getAttribute('title')),
                        countrySign: "UA",
                        townName: townNameAdd                        
                    }
                    if (cityAddTarget === 'loadTowns') {
                        fraht.waypointListSource.push(city);
                    } else {
                        fraht.waypointListTarget.push(city);
                    }
                }
        }
        
        
    }
    //console.log(fraht)
    return fraht;
}
async function addCargo(data) {
    let proxyURL = 'https://obscure-garden-92895.herokuapp.com/';
    let targetURL = 'https://api.lardi-trans.com/v2/proposals/my/add/cargo';
    let response = await fetch(proxyURL + targetURL, {
        method: 'POST',
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : "2G30T38OTS7000002145" //Натаха 2KMC4KLY6L5000002157         2G30T38OTS7000002145
        },
        body: JSON.stringify(data)
     });
    let result = await response.json();
    
    if (Object.keys(result)[0] === 'id') {
        data.idLardi = result.id.toString();
        addToStorage(data);
        console.log('Успішно додана заявка: ' + data.waypointListSource[0].townName + ' - ' + data.waypointListTarget[0].townName)
        return true;
    } else {
        console.log(data.waypointListSource[0].townName + ' - ' + data.waypointListTarget[0].townName)
        console.log(result);
        return false;
    }
}
async function deleteCargo(id) {
    let cargos = {
        cargoIds: [id],
    }
    let proxyURL = 'https://obscure-garden-92895.herokuapp.com/';
    let targetURL = 'https://api.lardi-trans.com/v2/proposals/my/basket/throw';
    let response = await fetch(proxyURL + targetURL, {
        method: 'POST',
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : "2G30T38OTS7000002145" //Натаха 2KMC4KLY6L5000002157         2G30T38OTS7000002145
        },
        body: JSON.stringify(cargos)
     });
    let result = await response.json();
    if (result.cargoes.success) {
        console.log('Успішно видалено');
        return true;
    } else {

        console.log('Чомусь не видалено')
        return false;
    }
    
}
function checkRegion(region) {
    let regions = {
        "Вінницька обл.": '15',         "Волинська обл.": "16",         
        "Дніпропетровська обл.": '17',  "Донецька обл.": "18",
        "Житомирська обл.": "19",       "Закарпатська обл.": "20",
        "Запорізька обл.": "21",        "Івано-Франківська обл.": "22",
        "Київська обл.": "23",          "Кіровоградська обл.": "24",
        "Крим Авт. Респ.": "25",        "Луганська обл.": "26",
        "Львівська обл.": "27",         "Миколаївська обл.": "28",
        "Одеська обл.": "29",           "Полтавська обл.": "30",
        "Рівненська обл.": "31",        "Сумська обл.": "32",
        "Тернопільська обл.": "33",     "Харківська обл.": "34",
        "Херсонська обл.": "35",        "Хмельницька обл.": "36",
        "Черкаська обл.": "37",         "Чернігівська обл.": "38",
        "Чернівецька обл.": "39"
    }
    let result = 'Область не знайдено';
    for (let key in regions) {
        if (region.includes(key)) {
            result = regions[key];
            break;
        }
    }
    return result;
}
function addToStorage(order) {
    chrome.storage.local.set({[order.idDella]:order});
}
function getAllCardsFromPage() {
    let allCardsFromPage = document.querySelectorAll('.request_card');
    for (let i = 0; i < allCardsFromPage.length; i++) {
        if (allCardsFromPage.item(i).parentNode.getAttribute('style')) {
            allCardsFromPage.item(i).parentNode.remove();
        }
    }
   let result = document.querySelectorAll('.request_card');
   return result;    
}
function hideCard() {
    // ПДВ, Бг
    allCards = document.querySelectorAll('.price_tags');
    for (let i = 0; i < allCards.length; i++) {
        if (allCards.item(i).textContent.includes('ПДВ') || allCards.item(i).textContent.includes('Б/г')) {
            allCards.item(i).closest('.request_card').remove()
        }
    }
    // Назва грузу
    let cargos = document.querySelectorAll('.cargo_type');
    for (let i = 0; i < cargos.length; i++) {
        if (cargos.item(i).textContent.includes('цегла')
        || cargos.item(i).textContent.includes('будматеріали')
        || cargos.item(i).textContent.includes('цемент')
        || cargos.item(i).textContent.includes('газоб')
        ) {
            cargos.item(i).closest('.request_card').remove()
        }
    }
    // Ціна
    let prices = document.querySelectorAll('.price_main');
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] !== null) {
            prices[i].querySelectorAll('div,span').forEach(n => n.remove());
            let price = prices[i].innerHTML.replace(/\D/g,'');
            if (price < 2000) {
                prices.item(i).closest('.request_card').remove();
            }
        }
    }
    // Сині смужки (між карточками)
    let delimiters = document.querySelectorAll('.requests_cards_delimiter')
    for (let i = 0; i < delimiters.length; i++) {
        delimiters[i].remove();
    }
    let veshka = document.querySelectorAll('.veshka_container')
    for (let i = 0; i < veshka.length; i++) {
        veshka[i].remove();
    }
}
function getFromStorage(id) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(id, (item) => {
            resolve(item[id]);
        })
    })
}
async function deleteFromStorage(id) {
    chrome.storage.local.remove(id, function(result) {
        console.log('ВИдалено ID: ' + id)
    })
}
function deepEqual(obj1, objFromMemory) {
    let result = true;
    let obj2 = JSON.parse(JSON.stringify(objFromMemory));
    delete obj2.idLardi;
    if (JSON.stringify(Object.keys(obj1).sort()) == JSON.stringify(Object.keys(obj2).sort())) {
        for (let key in obj1) {
            if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
                result = false;
                console.log('відрізняється :' + JSON.stringify(obj1[key]) + ' ' + JSON.stringify(obj2[key]))
            }
        }
    } else {
        result = false;
    }
    return result;
}
function getALLStorageData() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(null, (items) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(items);
        })
    })
}
function checkCardsOnPage() {

    for (let i = 0; i < allCardsFromPage.length; i++) {
        let cardId = allCardsFromPage[i].getAttribute('data-request_id');
        let extractedCard = extract(cardId);

        //перевірити чи закрита
        if (allCardsFromPage[i].matches('.deleted')) {
            getFromStorage(cardId).then(result => {
                if (result) {
                    if (result.idLardi) {
                        deleteCargo(result.idLardi).then(res => {
                            if (res) {
                                deleteFromStorage(cardId);
                            }
                        })
                    } else {
                        deleteFromStorage(cardId);
                    }
                }
            })
        } else {
            //перевірити чи є така в памяті
            getFromStorage(cardId).then(result => {
                //якщо э, перевіряємо на ідентичність
                if (result) {
                    if (!deepEqual(extractedCard, result)) {
                        //не ідентичні, видаляємо з ларді
                        deleteCargo(result.idLardi).then(res => {
                            if (res) {
                                deleteFromStorage(cardId).then(() => {
                                    addCargo(extractedCard);
                                })
                                
                            }
                        })
                    }
                //якшо нема в памяті то додати 
                } else {
                    addCargo(extractedCard);
                }
            })
        }
    }
}
function checkCardsOnMemory() {
    getALLStorageData().then(result => {    
        for (let key in result) {
            if (!document.querySelector('.request_' + key)) {
                deleteCargo(result[key].idLardi).then(res => {
                    if (res) {
                        deleteFromStorage(key)
                    }
                })
            } else {
                
            }
        }
    })
}

