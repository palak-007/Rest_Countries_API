let info
let linkElem
// localStorage.setItem('selectedMode', 'dark')

fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then((data) => {
        createCards(data)
        info = data;
    })

const containerElem = document.querySelector('.container')
const filterElem = document.querySelector('.search')
const searchElem = document.querySelector('.input-div input')
const modeElem = document.querySelector('.mode-div')

filterElem.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterElem.value}`)
        .then(res => res.json())
        .then(createCards)
})

searchElem.addEventListener('input', (e) => {
    const filteredData = info.filter((country) =>
        country.name.common.toLowerCase()
            .includes(e.target.value.toLowerCase()))

    createCards(filteredData)
})

if (localStorage.getItem('selectedMode'))
    document.querySelector('body').classList.add(localStorage.getItem('selectedMode'))

modeElem.addEventListener('click', () => {
    if (localStorage.getItem('selectedMode'))
        localStorage.removeItem('selectedMode')
    else
        localStorage.setItem('selectedMode', 'dark')

    document.querySelector('body').classList.toggle('dark')
})

function createCards(info) {
    containerElem.innerHTML = ''
    for (let i = 0; i < info.length; i++) {
        linkElem = document.createElement('a');
        linkElem.href = `country.html?name=${info[i].name.common}`
        linkElem.innerHTML +=
            `<div class="card">
                <div class="flag-div">
                    <img src=${info[i].flags.png} class="flag">
                </div>

                <h2>${info[i].name.common}</h2>

                <div class="details">
                    <p><span>Population: </span>${info[i].population.toLocaleString('en-IN')}</p>
                    <p><span>Region: </span>${info[i].region}</p>
                    <p><span>Capital: </span>${info[i].capital}</p>
                </div>
            </div>
            `
        containerElem.appendChild(linkElem)
    }
}



