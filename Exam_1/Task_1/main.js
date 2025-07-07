const rateText = document.getElementById('rates');
const amount1 = document.getElementById('amount1');
const amount2 = document.getElementById('amount2');
const currency1 = document.getElementById('currency1');
const currency2 = document.getElementById('currency2');

let rates = {};

fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(res => res.json())
    .then(data => {
        const usd = data.find(cur => cur.cc === 'USD');
        const eur = data.find(cur => cur.cc === 'EUR');

        rates = {
            UAH: 1,
            USD: usd.rate,
            EUR: eur.rate
        };

        rateText.textContent = `1 USD = ${usd.rate.toFixed(2)} UAH, 1 EUR = ${eur.rate.toFixed(2)} UAH`;
        convertFromFirst();
    });

function convertFromFirst() {
    const value = parseFloat(amount1.value);
    const result = value * (rates[currency1.value] / rates[currency2.value]);
    amount2.value = result.toFixed(2);
}

function convertFromSecond() {
    const value = parseFloat(amount2.value);
    const result = value * (rates[currency2.value] / rates[currency1.value]);
    amount1.value = result.toFixed(2);
}

amount1.addEventListener('input', convertFromFirst);
currency1.addEventListener('change', convertFromFirst);
currency2.addEventListener('change', convertFromFirst);

amount2.addEventListener('input', convertFromSecond);
currency1.addEventListener('change', convertFromSecond);
currency2.addEventListener('change', convertFromSecond);