// Функция 1 - разворот строки
function reverseString(str) {
    let clean = str.replace(/\s/g, '').toLowerCase();
    if (clean === clean.split('').reverse().join('')) {
        console.log("Это палиндром!");
        
        return str;
    }
    else{console.log("Не палиндром")}
    return str.split('').reverse().join('');
}

// Функция 2 - подсчет гласных
function countVowels(str) {
    let vowels = 'aeiouyаеёиоуыэюя';
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i].toLowerCase())) count++;
    }
    return count;
}

// Функция 3 - проверка пароля
function checkPassword(pass) {
    if (pass.length < 8) return false;
    if (!/[A-ZА-ЯЁ]/.test(pass)) return false;
    if (!/[a-zа-яё]/.test(pass)) return false;
    if (!/[0-9]/.test(pass)) return false;
    return true;
}

console.log("Функция reverseString");
console.log(reverseString("Привет"));
console.log(reverseString("Казак"));
console.log(reverseString("А роза упала на лапу Азора"));

console.log("\nФункция countVowels");
console.log(countVowels("Привет"));
console.log(countVowels("Hello"));
console.log(countVowels("Ааааа"));
console.log(countVowels("123"));

console.log("\nФункция checkPassword");
console.log(checkPassword("Пароль1"));
console.log(checkPassword("Парольцуцу"));
console.log(checkPassword("пароль123"));
console.log(checkPassword("Пароль123"));