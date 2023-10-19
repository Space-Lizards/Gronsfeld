function gronsfeldTable ()
{
	const buttonCrypt = document.querySelector('#encrypt');
	const buttonEnrypt = document.querySelector('#decrypt');
	const alphabet = Array.from('абвгдеёжзийклмнопрстуфхцчшщъыьэюя');

	const crypt = (dict, key, word) =>
	{
		let cryptWord = '';
		const keyArray = key.split('').map(char => parseInt(char));
		let keyIndex = 0;
		for (let i = 0; i < word.length; i++)
		{
			if (dict.includes(word[i]))
			{
				cryptWord += dict[(dict.indexOf(word[i]) + keyArray[keyIndex % keyArray.length]) % 33];
				keyIndex ++;
			}
			else
			{
				cryptWord += word[i];
			}
		}

		return cryptWord;
	}

	const decrypt = (dict, key, word) =>
	{
		let encryptWord = '';
		const keyArray = key.split('').map(char => parseInt(char));
		let keyIndex = 0;
		for (let i = 0; i < word.length; i++)
		{
			if (dict.includes(word[i]))
			{
				encryptWord += dict[(dict.indexOf(word[i]) - keyArray[keyIndex % keyArray.length]) % 33];
				keyIndex ++;
			}
			else
			{
				encryptWord += word[i];
			}
		}

		return encryptWord;
	}

	buttonCrypt.addEventListener('click', function()
	{
		const result = document.getElementById('result');
		const key = document.getElementById('key').value;
		const word = document.getElementById('word').value;
		
		result.textContent = `Результат: ${crypt(alphabet, key, word)}`
	});

	buttonEnrypt.addEventListener('click', function()
	{
		const result = document.getElementById('result');
		const key = document.getElementById('key').value;
		const word = document.getElementById('word').value;

		result.textContent = `Результат: ${decrypt(alphabet, key, word)}`
	});
}

gronsfeldTable();



