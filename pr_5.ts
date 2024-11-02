//Крок 1
type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description: string;
    inStock: boolean;
}

type Electronics = BaseProduct & {
    category: 'electronics',
    brand: string;
    warranty: number;
}

type Clothing = BaseProduct & {
    categoty: 'clothing';
    size: string;
    material: string;
    color: string;
}

type Book = BaseProduct & {
    category: 'book';
    author: string;
    publisher: string;
    pages: number;
    language: string;
}

type Food = BaseProduct & {
    category: 'food';
    expirationDate: Date;
    weight: number;
    ingredients: string[];
}

//Крок 2
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    //Шукаємо товар з однаковим id
    return products.find(product => product.id === id)
}

const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    //Шукаємо товари з ціною менше максимальної
    return products.filter(product => product.price <= maxPrice)
}

//Крок 3
type CartItem<T> = {
    product: T;
    quantity: number;
}

const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T | undefined,
    quantity: number
): CartItem<T>[] => {
    //Перевіряємо товар на наявність
    if (!product?.inStock) {
        console.warn(`Товар "${product?.name}" зараз відсутній в наявності і не можу бути доданий до кошика.`);
        return cart;
    }

    //Перевіряємо існування товару
    if (!product) {
        console.warn(`Товар не знайдено`);
        return cart;
    }

    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
        //Оновлюємо кількість товару при його наявності у кошику
        cart[existingItemIndex].quantity += quantity;
    } else {
        //Додаємо товар до кошика при його відсутності
        cart.push({ product, quantity });
    }

    return cart;
}

const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

//Крок 4
const electronics: Electronics[] = [
    {
        id: 1,
        name: "Телефон",
        price: 10000,
        description: "Смартфон з великим екраном",
        inStock: true,
        category: 'electronics',
        brand: "Samsung",
        warranty: 24
    },
    {
        id: 2,
        name: "Ноутбук",
        price: 30000,
        description: "Ігровий ноутбук",
        inStock: true,
        category: 'electronics',
        brand: "Asus",
        warranty: 36
    }
];

const clothing: Clothing[] = [
    {
        id: 3,
        name: "Футболка",
        price: 400,
        description: "Бавовняна футболка",
        inStock: true,
        categoty: 'clothing',
        size: "M",
        material: "Бавовна",
        color: "Білий"
    },
    {
        id: 4,
        name: "Куртка",
        price: 1500,
        description: "Зимова куртка",
        inStock: false,
        categoty: 'clothing',
        size: "L",
        material: "Поліестер",
        color: "Чорний"
    }
];

const books: Book[] = [
    {
        id: 5,
        name: "Книга з програмування",
        price: 500,
        description: "Посібник з програмування на TypeScript.",
        inStock: true,
        category: 'book',
        author: "павло Ільченко",
        publisher: "",
        pages: 350,
        language: "Українська"
    }
];

const food: Food[] = [
    {
        id: 6,
        name: "Яблуко",
        price: 10,
        description: "Свіже яблуко",
        inStock: true,
        category: 'food',
        expirationDate: new Date("2024-12-31"),
        weight: 150,
        ingredients: ["Яблуко"]
    }
];

//Пошук товару
const foundElectronics = findProduct(electronics, 1);
const foundClothing = findProduct(clothing, 7);
const unavailableProduct = findProduct(clothing, 4);
console.log(foundElectronics);
console.log(foundClothing);


//Фільтрація товарів за ціною
const affordableElectronics = filterByPrice(electronics, 1000);
console.log(affordableElectronics);

const affordableClothing = filterByPrice(clothing, 1000);
console.log(affordableClothing);

//Робота з кошиком
let cart: CartItem<BaseProduct>[] = [];
cart = addToCart(cart, foundElectronics!, 1);
cart = addToCart(cart, foundClothing!, 2);

//Підрахунок загальної вартості
const total = calculateTotal(cart);
console.log("Загальга вартість: ", total);

console.log("Кошик: ", cart);

//Спроба додати товар, який відсутній на складі
if (unavailableProduct) {
    cart = addToCart(cart, unavailableProduct, 1);
}
console.log("Кошик після спроби додати відсутній товар:", cart);

//Спроба додати неіснуючий товар
cart = addToCart(cart, undefined, 1);
console.log("Кошик: ", cart);