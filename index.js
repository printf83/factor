// var totalLoop = 0;
let result = [];
let max = 0;

function showStart() {
	document.getElementById(
		"root"
	).innerHTML = `Max : <input type="number" id="max" value="99999"/><br/><button onclick="startCalc()">Start Calculate Prime</button>`;
}

function startCalc() {
	max = parseInt(document.getElementById("max").value);

	document.getElementById("root").innerHTML = `Calculating prime inside <b>${max.toLocaleString(
		"en-US"
	)}</b> numbers...`;

	setTimeout(function () {
		let min = 1;

		let iteminrow = 10;

		let item = "";
		let itsPrime = false;
		let arrayOfPrime = [];

		result = [];
		let start = window.performance.now();

		for (let x = min; x <= max; x++) {
			// totalLoop++;
			itsPrime = isPrime(x, arrayOfPrime);
			if (itsPrime) {
				arrayOfPrime.push(x);
				item += `<span>${x}</span>`;
			} else {
				item += `<div>${x}</div>`;
			}

			if (x % iteminrow === 0) {
				result.push(item);
				item = "";
			}
		}
		let end = window.performance.now();
		document.getElementById("root").innerHTML = `We found <b>${arrayOfPrime.length.toLocaleString(
			"en-US"
		)} prime</b> inside <b>${max.toLocaleString("en-US")} numbers</b> in <b>${parseFloat(
			(end - start).toFixed(1)
		).toLocaleString(
			"en-US"
		)}ms</b>.<br/><button onclick="showResult()">Show result</button> <button onclick="showStart()">Try Again</button>`;
	}, 1);
}

function showResult() {
	document.getElementById("root").innerHTML = `Please wait. Generating <b>${max.toLocaleString(
		"en-US"
	)}</b> result into your browser...`;

	let start = window.performance.now();
	setTimeout(function () {
		document.getElementById("root").innerHTML = `
        <button onclick="showStart()">Try Again</button><br/>
        <small id="speed_label1"></small>
        <div class="d-flex">${result.join(`</div><div class="d-flex">`)}</div>
        <small id="speed_label2"></small>
        <button onclick="showStart()">Try Again</button>`;

		let end = window.performance.now();
		let genLength = (end - start).toFixed(1).toLocaleString("en-US");

		document.getElementById("speed_label1").innerHTML = `This list generated in ${genLength}ms`;
		document.getElementById("speed_label2").innerHTML = `This list generated in ${genLength}ms`;
	}, 1);
}

function isPrime(num, arrayOfPrime) {
	if (num > 10) {
		return factor(num, arrayOfPrime);
	} else {
		switch (num) {
			case 2:
			case 3:
			case 5:
			case 7:
				return true;
			default:
				return false;
		}
	}

	// return factor(num, arrayOfPrime);
}

function factor(num, arrayOfPrime) {
	return factor4(num, arrayOfPrime);
}

//99999 number -> 1966ms (455,239,139 Loop)
function factor1(num) {
	if (num % 2 === 0) {
		return false;
	} else {
		let result = true;
		for (let x = 2; x < num; x++) {
			// totalLoop++;

			if (num % x === 0) {
				result = false;
				break;
			}
		}
		return result;
	}
}

//99999 number -> 1102ms (227,664,775 Loop)
function factor2(num) {
	if (num % 2 === 0) {
		return false;
	} else {
		let result = true;
		for (let x = 3; x < num; x++) {
			if (x % 2 !== 0) {
				// totalLoop++;
				if (num % x === 0) {
					result = false;
					// console.log(`${x} is factor for ${num}`);
					break;
				}
			}
		}
		return result;
	}
}

//99999 number -> 1029ms (227,648,110 Loop)
function factor3(num) {
	if (!((num + 1) % 6 === 0 || (num - 1) % 6 === 0)) {
		return false;
	} else {
		let result = true;
		for (let x = 3; x < num; x++) {
			if (x % 2 !== 0) {
				// totalLoop++;
				if (num % x === 0) {
					result = false;
					// console.log(`${x} is factor for ${num}`);
					break;
				}
			}
		}

		return result;
	}
}

//99999 number -> 272ms (46,414,463 Loop)
function factor4(num, arrayOfPrime) {
	let result = true;
	let arrayOfPrimeLength = arrayOfPrime.length;
	for (let x = 0; x < arrayOfPrimeLength; x++) {
		// totalLoop++;
		if (num % arrayOfPrime[x] === 0) {
			result = false;
			break;
		}
	}
	return result;
}

showStart();
