import './style.css';
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>F.prototype</h1><p>Откройте консоль</p>`;

/*==========================================================================================*/
let animal = { eats: true };

// функция КОНСТРУКТОР
function Rabbit(name) { this.name = name; }
function Dog(name) { this.name = name; }

/*==========================================================================================*/
Rabbit.prototype = 'animal';
console.log('r1 Rabbit.prototype', Rabbit.prototype)  // Rabbit.prototype: animal; КАК свойство prototype со значением animal
/*------------------------------------------------------------------------------------------*/
Dog.prototype = animal; 
console.log('d1 Rabbit.prototype', Rabbit.prototype); // Rabbit.prototype {eats: true}

/*==========================================================================================*/
let rabbit = new Rabbit("White Rabbit"); 
console.log('r2 rabbit', rabbit) //  rabbit.__proto__: Object
rabbit.__proto__ = 'ПОПЫТКА присвоить примитив' // НЕ СРАБОТАЛО
console.log('r3 rabbit', rabbit) //  rabbit.__proto__: Object
/*---------------------------------!!!!!!!!!!!!!!-------------------------------------------*/
let dog = new Dog("White Dog"); 

dog.__proto__ = { eats: false } // !!! ПЕРЕЗАТЕР animal !!! - rabbit.__proto__ = {eats: false}
console.log('d3 dog', dog) // dog.__proto__ = {eats: false}
console.log('animal', animal)  // !!! animal остался прежним

// dog.__proto__.eats = 'true!!!'
// console.log('d33 dog', dog) // dog.__proto__ = {eats: 'true!!!'}
// console.log('animal', animal)  // !!! animal остался прежним

// animal.eats = false // ЕСЛИ ИЗМЕНИТЬ ОБЪЕКТ КОТОРЫЙ БЫЛ В __proto__ ТО ИЗМЕНЕНИЯ ОТОБРАЗЯТЬСЯ И В dog.__proto__
// console.log('d33 dog', dog) // dog.__proto__ == { eats: FALSE } !!!!!!!

dog.__proto__ = 'thm'
console.log('d4 dog', dog) // !!! примитив НЕ перезатер - dog.__proto__ = {eats: false}

/*==========================================================================================*/
// !!! В КОНСТРУКТОРАХ - ПРОТОТАЙПЫ ОСТАЛИСЬ НЕИЗМЕННЫ 
console.log('Rabbit.prototype', Rabbit.prototype) // Rabbit.prototype 'animal'

Dog.prototype.show = function() { console.log(this); };
console.log('Dog.prototype', Dog.prototype) // Dog.prototype {eats: true, show: ƒ}
/* 
  ПОСЛЕ ДОБАВЛЕНИЯ МЕТОДА К Dog.prototype
  У dog НИЧЕГО НЕ ИЗМЕНИЛОСЬ - dog.__proto__ = {eats: false}
*/
console.log('d5 dog', dog) // dog.__proto__ = {eats: false}

let sabaken = new Dog("White Dog"); // !!!!! у вновь созданных появился метод show
console.log('sabaken', sabaken) // sabaken.__proto__ = {eats: true},show() 
/*==========================================================================================*/
// создаём новый объект с прототипом animal
let cat = Object.create(animal);

console.log(cat.eats); // true
console.log(Object.getPrototypeOf(cat) === animal); // получаем прототип объекта cat
Object.setPrototypeOf(cat, {}); // заменяем прототип объекта cat на {}
console.log(cat); // 

/*
  Все встроенные объекты следуют одному шаблону:
  Методы хранятся в прототипах (Array.prototype, Object.prototype, Date.prototype и т.д.).
  Сами объекты хранят только данные (элементы массивов, свойства объектов, даты).
  Примитивы также хранят свои методы в прототипах объектов-обёрток: Number.prototype, String.prototype, Boolean.prototype.
  Только у значений undefined и null нет объектов-обёрток.

  Свойство __proto__ считается устаревшим, и по стандарту оно должно поддерживаться только браузерами.
  ВМЕСТО __proto__:
  Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj.
  Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto.
  Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]], указанным как proto, и необязательными дескрипторами свойств descriptors.
  Эти методы нужно использовать вместо __proto__

  __proto__ – это геттер/сеттер для свойства [[Prototype]], и находится он в Object.prototype, как и другие методы
*/