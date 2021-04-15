let city = 'caracas';
const d = document,
	$main = d.querySelector('.card'),
	$template = d.querySelector('#data-template').content,
	$form = d.querySelector('.city-input'),
	$fragment = document.createDocumentFragment(),
	apiID = 'd300eec55078ff055687aa3d8d6274cf';

function toCelcius(grade) {
	let temp = Math.round(grade - 273.15);
	return temp;
}

function isDay(weatherDescription) {
	if (weatherDescription.includes('d')) return true;
	else return false;
}

async function getWeather() {
	const res = await fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiID}&lang=es`
	);
	const json = await res.json();

	if (json.cod >= 400 && json.cod <= 499) {
		$main.innerHTML = `<p class="error">Ciudad <em>"${city}"</em> no encontrada</p>`;
	} else {
		$template.querySelector('.city').textContent = json.name;
		$template.querySelector(
			'.temp-weather'
		).textContent = json.weather[0].description.toUpperCase();
		$template.querySelector('.temp').textContent = `${toCelcius(json.main.temp)} ºC`;
		$template.querySelector('.temp-max').textContent = `${toCelcius(json.main.temp_max)} ºC`;
		$template.querySelector('.temp-min').textContent = `${toCelcius(json.main.temp_min)} ºC`;
		$template.querySelector(
			'.weather-condition'
		).src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;

		$template.querySelector('.sensation h4').textContent = `${toCelcius(json.main.feels_like)} ºC`;
		$template.querySelector('.humidity h4').textContent = `${json.main.humidity}%`;
		$template.querySelector('.wind h4').textContent = `${json.wind.speed} km/h`;

		let $clone = d.importNode($template, true);
		$fragment.appendChild($clone);

		$main.appendChild($fragment);
	}
}

d.addEventListener('submit', (e) => {
	e.preventDefault();

	if (!e.target.matches('.form')) return;

	if (e.target.matches('.form')) {
		city = $form.value;

		$main.innerHTML = '';
		getWeather();

		$form.value = '';
	}
});