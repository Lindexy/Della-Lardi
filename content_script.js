function hideElementsByCondition() {
    // Приховуємо роздільники
    const delimiters = document.querySelectorAll('.requests_cards_delimiter');
    delimiters.forEach(delimiter => {
        delimiter.style.display = "none";
    });

    // Приховуємо елементи veshka_container
    const veshkaContainers = document.querySelectorAll('.veshka_container');
    veshkaContainers.forEach(container => {
        container.style.display = "none";
    });

    // Перевіряємо, чи не знаходимось ми на сторінці /selected/
    if (window.location.pathname.includes('/selected/')) {
        addClickButton(); // Додаємо кнопку на сторінці /selected/
        return;
    }

    const blocks = document.querySelectorAll(".request_card");
    
    blocks.forEach(block => {
        const paymentPriceSource = block.querySelector('.price_main');
        let price = 0;

        if (paymentPriceSource !== null) {
            paymentPriceSource.querySelectorAll('div,span').forEach(n => n.remove());
            price  = paymentPriceSource.innerHTML.replace(/\D/g,'');            
        }

        const markedIcon = block.querySelector('.marked_icon.is_active');
        
        if (price < 4500 || markedIcon !== null) {
            block.style.display = "none";
        }
    });
}

function addClickButton() {
    const button = document.createElement('button');
    button.innerText = 'Знайти всі заявки';
    button.style.position = 'fixed';
    button.style.left = '10px';
    button.style.bottom = '10px';
    button.style.zIndex = '1000';
    button.style.padding = '10px';
    button.style.backgroundColor = '#007BFF';
    button.style.color = '#FFFFFF';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    button.addEventListener('click', () => {
        const activeIcons = document.querySelectorAll('.marked_icon.is_active');
        activeIcons.forEach(icon => {
            icon.click(); // Клікаємо по кожному активному елементу
        });
    });

    document.body.appendChild(button);
}

window.addEventListener("load", hideElementsByCondition);