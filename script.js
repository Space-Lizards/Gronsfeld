function createVigenereSquare() {
	// Русский алфавит
	let alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
	// Пустой массив для хранения строк квадрата
	let square = [];
	// Цикл по длине алфавита
	for (let i = 0; i < alphabet.length; i++) {
		// Получить подстроку алфавита, начиная с i-го символа
		let substring = alphabet.substring(i);
		// Добавить оставшуюся часть алфавита в конец подстроки
		substring += alphabet.substring(0, i);
		// Добавить подстроку в массив квадрата
		square.push(substring);
	}
	// Вернуть массив квадрата
	return square;
}

// Функция для шифрования слова по ключу с помощью квадрата Виженера
function encryptWord(word, key, square) {
	key = key.replace(/\s/g, '');
	// Пустая строка для хранения зашифрованного слова
	let encrypted = '';
	// Счетчик для индекса буквы ключа
	let keyIndex = 0;
	// Цикл по длине слова
	for (let i = 0; i < word.length; i++) {
		// Получить i-ю букву слова
		let letter = word[i];
		// Проверить, является ли буква пробелом
		if (letter === ' ') {
			// Добавить пробел в зашифрованное слово
			encrypted += ' ';
		} else {
			// Получить букву ключа по счетчику
			let keyLetter = key[keyIndex];
			// Найти индекс буквы в первой строке квадрата
			let index = square[0].indexOf(letter);
			// Найти строку квадрата, соответствующую букве ключа
			let row = square.find((row) => row[0] === keyLetter);
			// Получить букву на пересечении строки и столбца
			let encryptedLetter = row[index];
			// Добавить зашифрованную букву в строку
			encrypted += encryptedLetter;
			// Увеличить счетчик на один
			keyIndex++;
		}
	}
	// Вернуть зашифрованное слово
	return encrypted;
}

// Функция для дешифрования слова по ключу с помощью квадрата Виженера
function decryptWord(word, key, square) {
	key = key.replace(/\s/g, '');
	// Пустая строка для хранения расшифрованного слова
	let decrypted = '';
	// Счетчик для индекса буквы ключа
	let keyIndex = 0;
	// Цикл по длине слова
	for (let i = 0; i < word.length; i++) {
		// Получить i-ю букву слова
		let letter = word[i];
		// Проверить, является ли буква пробелом
		if (letter === ' ') {
			// Добавить пробел в расшифрованное слово
			decrypted += ' ';
		} else {
			// Получить букву ключа по счетчику
			let keyLetter = key[keyIndex];
			// Найти строку квадрата, соответствующую букве ключа
			let row = square.find((row) => row[0] === keyLetter);
			// Найти индекс буквы в строке квадрата
			let index = row.indexOf(letter);
			// Получить букву из первой строки квадрата по индексу
			let decryptedLetter = square[0][index];
			// Добавить расшифрованную букву в строку
			decrypted += decryptedLetter;
			// Увеличить счетчик на один
			keyIndex++;
		}
	}
	// Вернуть расшифрованное слово
	return decrypted;
}

// Создать квадрат Виженера
let vigenereSquare = createVigenereSquare();

// Получить элементы по их id
let encryptButton = document.getElementById('encrypt');
let decryptButton = document.getElementById('decrypt');
let keyInput = document.getElementById('key');
let wordInput = document.getElementById('word');
let resultDiv = document.getElementById('result');

// Добавить обработчик события клика на кнопку шифрования
encryptButton.addEventListener('click', function () {
	// Получить значение ключа и слова из инпутов
	let key = keyInput.value.toLowerCase();
	let word = wordInput.value.toLowerCase();
	// Проверить, что ключ и слово не пустые и имеют одинаковую длину
	if (key && word && key.length === word.length) {
		// Вызвать функцию шифрования и получить результат
		let encrypted = encryptWord(word, key, vigenereSquare);
		// Вывести результат в div
		resultDiv.textContent = 'Зашифрованное слово: ' + encrypted;
	} else {
		// Вывести сообщение об ошибке в div
		resultDiv.textContent = 'Пожалуйста, введите ключ и слово одинаковой длины';
	}
});

// Добавить обработчик события клика на кнопку дешифрования
decryptButton.addEventListener('click', function () {
	// Получить значение ключа и слова из инпутов
	let key = keyInput.value.toLowerCase();
	let word = wordInput.value.toLowerCase();
	// Проверить, что ключ и слово не пустые и имеют одинаковую длину
	if (key && word && key.length === word.length) {
		// Вызвать функцию дешифрования и получить результат
		let decrypted = decryptWord(word, key, vigenereSquare);
		// Вывести результат в div
		resultDiv.textContent = 'Расшифрованное слово: ' + decrypted;
	} else {
		// Вывести сообщение об ошибке в div
		resultDiv.textContent = 'Пожалуйста, введите ключ и слово одинаковой длины';
	}
});
