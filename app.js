



const addButton = document.getElementById('add-btn');
const list = document.getElementById('list');
const fruitInput = document.getElementById('fruit-name');
const priceInput = document.getElementById('fruit-price');
const quantityInput = document.getElementById('fruit-quantity');
const totalPrice = document.getElementById('total-price');
const fruitBasket = document.getElementById('fruit-basket');
const totalDiv = document.getElementById('total-div');

const fruitList = [];
let total = 0;

const state = {};

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const fruitName = capitalize(fruitInput.value);
    const fruitPrice = priceInput.value;
    const fruitQuantity = quantityInput.value;
    var fq = parseInt(document.getElementById('fruit-quantity').value);

    console.log(fq)
    if (Number.isNaN(fq)) {
        alert("Please insert a qty !");
        return;
    }

    if (fruitName !== '' && !fruitList.includes(fruitName)) {

        state[`${fruitName}`] = {
            price: `${fruitPrice}`,
            quantity: `${fruitQuantity}`
        };

        fruitList.push(fruitName);

        renderList();

        //total += parseFloat(fruitPrice) * parseInt(fruitQuantity);
        //fruitInput.value = '';
        //quantityInput.value = '1';
        //priceInput.value = '';
        renderTotal();
    }

    /**modifier la quatite en stock dans le champ au niveau du formualire */
    var sq = parseInt(document.getElementById('quantity-stock').value)
    if (fq > sq) {
        document.getElementById('fruit-quantity').value = "0"
        alert("Value is too high");
    } else {
        red = sq - fq;
    }

    document.getElementById('quantity-stock').value = red;
});

list.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList[0] === 'button') {
        const elementNode = element.parentElement;
        const elementDataName = element.dataset.name;
        let elementDataPrice = parseFloat(element.dataset.price);
        let elementDataQuantity = parseInt(element.dataset.quantity);
        total = total - (parseFloat(elementDataPrice) * parseInt(elementDataQuantity));
        elementNode.remove();
        if (fruitList.includes(elementDataName)) {
            const index = fruitList.indexOf(elementDataName);
            fruitList.splice(index, 1);
            delete state[`${elementDataName}`];
        }

        renderList();
        renderTotal();
    }
});

let temoin1 = 0;
totalPrice.addEventListener('click', () => {

    totalDiv.classList.toggle('hidden');
    renderTotal();
    temoin1++;;

    let currenttext = document.getElementById('total-price').textContent;
    if (temoin1 % 2 == 0)
        document.getElementById('total-price').textContent = 'View Total Price';
    else
        document.getElementById('total-price').textContent = 'Hide Total Price';
})
let temoin = 0;

fruitBasket.addEventListener('click', () => {
    list.classList.toggle('hidden');

    temoin++;

    let currenttext = document.getElementById('fruit-basket').textContent;

    if (temoin % 2 == 0)
        document.getElementById('fruit-basket').textContent = 'View Fruit Basket';
    else
        document.getElementById('fruit-basket').textContent = 'Hide Fruit Basket';

})

const renderList = () => {
    list.innerHTML = '';

    fruitList.sort();
    fruitList.forEach((fruit) => {

        itemHtml = `
            <div class="mt-sm-3 bg-light alert flexview">
                <p class="">${fruit}</p>
                <button type="button" class="button col-sm-2 remove-btn" data-name="${fruit}" data-price="${state[`${fruit}`].price}" data-quantity="${state[`${fruit}`].quantity}">Remove</button>
            </div>`;
        list.insertAdjacentHTML('beforeend', itemHtml);
    })
}


const renderTotal = () => {
    let fp = parseInt(document.getElementById('fruit-price').value);
    let qs = parseInt(document.getElementById('quantity-stock').value);
    let qf = parseInt(document.getElementById('fruit-quantity').value);

    if(Number.isNaN(fp)){
        alert("Why do you earase the price ?");
        return;
    }

    if(!Number.isNaN(qs)){
        total = qs*fp;
    }else{
        total = fp*qf;
    }

    totalDiv.innerHTML = '';
    const html = `<p class="display-4">Total: <span>${total}</span></p>`;
    totalDiv.insertAdjacentHTML('afterbegin', html);
}

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**tableau associatif pour les fruits */

var getListFruit = function(){
    return [
        {
            "fruit": "cerise",
            "qty": 300,
            "unitPrice": 34
        },
        {
            "fruit": "orange",
            "qty": 400,
            "unitPrice": 10
        },
        {
            "fruit": "fraise",
            "qty": 100,
            "unitPrice": 20
        },
        {
            "fruit": "noix de coco",
            "qty": 340,
            "unitPrice": 25
        }
    ];
}



/**placement de la quantite du fruit le champ texte quantite */
let combofruit = document.getElementById('fruit-name');

combofruit.addEventListener('change', function () {
    let fruitname = document.getElementById('fruit-name').value;
    let listfruit = getListFruit()

    for (let i = 0; i < listfruit.length; ++i) {
        var key = listfruit[i];
        if (key['fruit'] == fruitname){
            document.getElementById('quantity-stock').value = key['qty']
            document.getElementById('fruit-price').value = key['unitPrice']
        }
    }

});

/**test sur la quatite achat par rapport a la quatite en stock */

document.getElementById('fruit-price').addEventListener('click', function () {
    let quantitestock = parseInt(document.getElementById('quantity-stock').value);
    let quantiteachat = document.getElementById('fruit-quantity').value;

    if (quantitestock <= quantiteachat)
        alert("Quantite achat doit < quantite en stock");

})

