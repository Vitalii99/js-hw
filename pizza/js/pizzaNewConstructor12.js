window.addEventListener('DOMContentLoaded', () => {
    const pizzaSize = document.forms[0];
    const spanPrice = document.querySelector('.price .span_price');
    const spanSauce = document.querySelector('.sauces .span_sauce');
    const spanTopping = document.querySelector('.toppings .span_topping');

    let price = 0;
    spanPrice.innerHTML = `${price} ₴`;
    spanPrice.style.color = "red";

    let allSauces = [];
    let allToppings = [];
    let nameSauces = [];
    let nameToppings = []

    // parent constructor class pizza
    const Pizza = class Pizza {
        constructor(size) {
            this.size = size;
        }
        // created method add object, name object and display it on the screen 
        addIngredient(ingredient) {
            if (ingredient.type == 'sauce') {
                allSauces.push(ingredient);
                nameSauces.push(ingredient.name);
                spanSauce.innerHTML = nameSauces.join(", ").toString();
                spanSauce.style.textTransform = "capitalize";
                // return allSauces
            }
            else if (ingredient.type == 'topping') {
                allToppings.push(ingredient);
                nameToppings.push(ingredient.name);
                spanTopping.innerHTML = nameToppings.join(", ").toString();
                spanTopping.style.textTransform = "capitalize";
                // return allToppings
            }
        }
        // created method remove object, name object and display it on the screen
        /*removeIngredient(ingredient) {
            if (ingredient.type == 'sauce') {
                allSauces = allSauces.filter(elem => elem.name != ingredient.name);
                nameSauces.forEach(function (elem, i, arr) {
                    if (elem == ingredient.name) {
                        arr.splice(i, 1);
                    }
                })
                spanSauce.innerHTML = nameSauces.join(", ").toString();
                spanSauce.style.textTransform = "capitalize";
            }
            else if (ingredient.type == 'topping') {
                allToppings = allToppings.filter(elem => elem.name != ingredient.name);
                nameToppings.forEach(function (elem, i, arr) {
                    if (elem == ingredient.name) {
                        arr.splice(i, 1);
                    }
                })
                spanTopping.innerHTML = nameToppings.join(", ").toString();
                spanSauce.style.textTransform = "capitalize";
            }
        }*/

        // created method calculation final price of the pizza to order and display it on the screen
        calcPrice() {
            let totalPrice = 0;
            if (totalPrice != 0) {
                totalPrice = 0;
            }
            for (let elem of Object.values(this)) {
                if (elem.price) {
                    totalPrice += +elem.price;
                }
            }
            for (let elem of Object.values(allSauces)) {
                if (elem.price) {
                    totalPrice += +elem.price;
                }
            }
            for (let elem of Object.values(allToppings)) {
                if (elem.price) {
                    totalPrice += +elem.price;
                }
            }
            return totalPrice;
        }
    }
    // constructor child class ingredient (extends super)
    class Ingredient extends Pizza {
        constructor(name, price, type) {
            super(name, price);
            this.name = name;
            this.price = price;
            this.type = type;
        }
    }
    // constructor child class cake (extends super)
    class Cakes extends Pizza {
        constructor(name, price, type) {
            super(name, price);
            this.name = name;
            this.price = price;
            this.type = type;
        }
    }

    //objects cakes
    Pizza.SIZE_SMALL = new Cakes('small', 50, 'cake');
    Pizza.SIZE_MEDIUM = new Cakes('medium', 70, 'cake');
    Pizza.SIZE_BIG = new Cakes('big', 90, 'cake');
    //objects sauces 
    Pizza.SAUCE_KETCHUP = new Ingredient('кетчуп', 10, 'sauce');
    Pizza.SAUCE_BBQ = new Ingredient('BBQ', 20, 'sauce');
    Pizza.SAUCE_RIKOTTA = new Ingredient('рікотта', 15, 'sauce');
    //objects toppings
    Pizza.TOPPING_CHEESE = new Ingredient('сир', 20, 'topping');
    Pizza.TOPPING_FETA = new Ingredient('фета', 15, 'topping');
    Pizza.TOPPING_MOZZARELLA = new Ingredient('моцарелла', 10, 'topping');
    Pizza.TOPPING_BEEF = new Ingredient('телятина', 40, 'topping');
    Pizza.TOPPING_TOMATO = new Ingredient('помідори', 10, 'topping');
    Pizza.TOPPING_MUSHROOMS = new Ingredient('гриби', 25, 'topping');

    // create new pizza function
    const createPizza = (size) => {
        pizza = new Pizza(size);
        showPrice();
    }
    // choose the size of the pizza (input radio)
    let cake = document.querySelector('[alt = "Корж класичний"]');

    for (i = 0; i < pizzaSize.elements.length; i++) {
        pizzaSize[i].addEventListener('click', (event) => {
            switch (event.target.getAttribute("id")) {
                case "small":
                    {
                        createPizza(Pizza.SIZE_SMALL);
                        cake.style.transform = "scale(1)";
                        break;
                    }
                case "medium":
                    {
                        createPizza(Pizza.SIZE_MEDIUM);
                        cake.style.transform = "scale(1)";
                        break;
                    }
                case "big":
                    {
                        createPizza(Pizza.SIZE_BIG);
                        cake.style.transform = "scale(1)";
                        break;
                    }
            }
        })
    }

    function showPrice() {
        try {
            spanPrice.innerHTML = `${pizza.calcPrice()} ₴`;
        } catch (e) {
            console.log(e.message)
        }
    }
    // --------------------------------------------------------------------------------------------

    //drag and drop 
    const goal = document.querySelector('.table-wrapper .table');
    const ingredients = document.querySelectorAll(".draggable");

    const dragAndDrop = function () {
        function dragStart(e) {
            try {
                switch (e.target.getAttribute("id")) {
                    case 'sauceClassic':
                        {
                            pizza.addIngredient(Pizza.SAUCE_KETCHUP)
                            break;
                        }
                    case 'sauceBBQ':
                        {
                            pizza.addIngredient(Pizza.SAUCE_BBQ);
                            break;
                        }
                    case 'sauceRikotta':
                        {
                            pizza.addIngredient(Pizza.SAUCE_RIKOTTA);
                            break;
                        }
                    case 'moc1':
                        {
                            pizza.addIngredient(Pizza.TOPPING_CHEESE);
                            break;
                        }
                    case 'moc2':
                        {
                            pizza.addIngredient(Pizza.TOPPING_FETA);
                            break;
                        }
                    case 'moc3':
                        {
                            pizza.addIngredient(Pizza.TOPPING_MOZZARELLA);
                            break;
                        }
                    case 'telya':
                        {
                            pizza.addIngredient(Pizza.TOPPING_BEEF);
                            break;
                        }
                    case 'vetch1':
                        {
                            pizza.addIngredient(Pizza.TOPPING_TOMATO);
                            break;
                        }
                    case 'vetch2':
                        {
                            pizza.addIngredient(Pizza.TOPPING_MUSHROOMS);
                            break;
                        }
                }
            } catch (e) {
                alert(`Вітаю! Необхідно здійснити вибір розміра піци.`)
            }

            const item = e.target.dataset.key;

            if (item === "sauce") {
                try {
                    if (!pizza.nameSauces.includes(e.target.alt)) {
                        pizza.nameSauces.push(e.target.alt);
                        pizza.allSauces.push(e.target.id);
                    }
                } catch (e) {
                    console.log(e.message)
                }
            }
            if (item === "topping") {
                try {
                    if (!pizza.nameToppings.includes(e.target.alt)) {
                        pizza.nameToppings.push(e.target.alt);
                        pizza.allToppings.push(e.target.id);
                    }
                } catch (e) {
                    console.log(e.message)
                }
            }
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData("img", this.attributes.src.textContent);
        }
        // the end of the move
        const dragEnd = (e) => {
            goal.style.backgroundColor = ''
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        }

        // moveable over the target element
        function dragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        }

        // moveable in the area of the target element
        function dragEnter(e) {
            goal.style.backgroundColor = 'whitesmoke'
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        }

        // moveable not in the area of the target element
        function dragLeave(e) {
            goal.style.backgroundColor = 'rgb(248, 228, 231)'
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        }

        // the move is complete
        function dragDrop(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            const itemImg = document.createElement("img");

            itemImg.setAttribute("src", e.dataTransfer.getData("img"));
            goal.append(itemImg);
            showPrice()
        }

        // hendler for the target element
        goal.addEventListener('dragover', dragOver);
        goal.addEventListener('drop', dragDrop);
        goal.addEventListener('dragenter', dragEnter);
        goal.addEventListener('dragleave', dragLeave);

        // hendler for the moveable element
        ingredients.forEach(item => {
            item.addEventListener('dragstart', dragStart);
            item.addEventListener('dragend', dragEnd);
        })
    }
    dragAndDrop()

    // cancel the created pizza
    const inputRadio = document.querySelectorAll('[type="radio"]');
    function resetPizza() {
        // reset the radio input  
        for (let radio of inputRadio) {
            radio.checked = false;
        }
        // remove the selected ingredients from the pizza layout
        const item = document.querySelectorAll('.table>img');

        item.forEach(item => {
            if (!item.alt[0]) {
                item.remove();
            }
        })
        size = null;
        // remove all arrays
        allSauces = allSauces.splice();
        console.log(allSauces)
        nameSauces = nameSauces.splice();
        console.log(nameSauces)
        allToppings = allToppings.splice();
        console.log(allToppings)
        nameToppings = nameToppings.splice();
        console.log(nameToppings)
        // cleared string
        spanPrice.innerHTML = `${price} ₴`;
        spanSauce.innerHTML = "";
        spanTopping.innerHTML = "";
    }

    // reset button
    const btnResetPizza = document.querySelector('.btn_reset_pizza');
    btnResetPizza.addEventListener('click', function () {
        resetPizza();
    })

})

// draft version
/*const b = new Pizza(Cakes.SIZE_BIG)
console.log(b.calcPrice())
console.log(b)
b.addIngredient(Pizza.SAUCE_KETCHUP)
console.log(b.calcPrice())
b.addIngredient(Pizza.SAUCE_BBQ)
console.log(b.calcPrice())
b.addIngredient(Pizza.SAUCE_RIKOTTA)
console.log(b.calcPrice())
b.addIngredient(Pizza.TOPPING_CHEESE)
console.log(b.calcPrice())
b.addIngredient(Pizza.TOPPING_FETA)
console.log(b.calcPrice())
b.addIngredient(Pizza.TOPPING_MOZZARELLA)
console.log(b.calcPrice())
b.addIngredient(Pizza.TOPPING_BEEF)
console.log(b.calcPrice())
b.addIngredient(Pizza.TOPPING_TOMATO)
console.log(b.calcPrice())
b.addIngredient(Pizza.TOPPING_MUSHROOMS)
console.log(b.calcPrice())
b.removeIngredient(Pizza.TOPPING_BEEF)
console.log(b.calcPrice())
b.removeIngredient(Pizza.TOPPING_BEEF)
console.log(b.calcPrice())
b.removeIngredient(Pizza.SAUCE_KETCHUP)
console.log(b.calcPrice())
b.removeIngredient(Pizza.SAUCE_RIKOTTA)
console.log(b.calcPrice())
console.log(Pizza.SAUCE_KETCHUP.name)
console.log(Pizza.SAUCE_BBQ.price)
console.log(Pizza.SAUCE_RIKOTTA)
console.log(Pizza.TOPPING_CHEESE)
console.log(Pizza.TOPPING_FETA)
console.log(Pizza.TOPPING_MOZZARELLA)
console.log(Pizza.TOPPING_BEEF)
console.log(Pizza.TOPPING_TOMATO)
console.log(Pizza.TOPPING_MUSHROOMS)*/

