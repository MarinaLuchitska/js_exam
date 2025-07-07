const pairList = document.getElementById('pairList');

function isValidPair(str) {
    const regex = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/;
    return regex.exec(str);
}

function addPair() {
    const input = document.getElementById('pairInput');
    const value = input.value.trim();
    const match = isValidPair(value);
    if (match) {
        const name = match[1];
        const val = match[2];
        const option = document.createElement('option');
        option.value = `${name}=${val}`;
        option.textContent = `${name} = ${val}`;
        pairList.appendChild(option);
        input.value = '';
    } else {
        alert("Invalid format. Use name=value with only letters and numbers.");
    }
}

function sortByName() {
    sortPairs((a, b) => a.name.localeCompare(b.name));
}

function sortByValue() {
    sortPairs((a, b) => a.value.localeCompare(b.value));
}

function sortPairs(compareFn) {
    const options = Array.from(pairList.options).map(opt => {
        const [name, value] = opt.value.split('=');
        return { name, value, text: opt.textContent };
    });

    options.sort(compareFn);

    pairList.innerHTML = '';
    for (let pair of options) {
        const opt = document.createElement('option');
        opt.value = `${pair.name}=${pair.value}`;
        opt.textContent = pair.text;
        pairList.appendChild(opt);
    }
}

function deleteSelected() {
    const selected = Array.from(pairList.selectedOptions);
    for (let opt of selected) {
        opt.remove();
    }
}