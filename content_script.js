function hideElementsByCondition() {
    const blocks = document.querySelectorAll(".request_card");
    
    blocks.forEach(block => {
        const paymentPriceSource = block.querySelector('.price_main');
        let price = 0;

        if (paymentPriceSource !== null) {
            paymentPriceSource.querySelectorAll('div,span').forEach(n => n.remove());
            price  = paymentPriceSource.innerHTML.replace(/\D/g,'');            
        }

      if (price < 4000) {
        block.style.display = "none";

      }
    });
  }
  
  window.addEventListener("load", hideElementsByCondition);