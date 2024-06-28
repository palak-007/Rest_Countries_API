let countryName = new URLSearchParams(window.location.search).get('name')
let x

let info
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then(res => res.json())
    .then(data => {
        info = data
        flag.src = info[0].flags.svg;
        commonName.innerText = info[0].name.common

        if (info[0].name.nativeName)
            nativeName.innerText = info[0].name.nativeName[Object.keys(info[0].name.nativeName)[0]].common
        else
            nativeName.innerText = info[0].name.common

        if (info[0].tld)
            domain.innerText = info[0].tld[0]

        population.innerText = info[0].population.toLocaleString('en-IN')

        if (info[0].currencies) {
            for (let i in info[0].currencies) {
                if (currency.innerText === '')
                    currency.innerText += info[0].currencies[i].name
                else
                    currency.innerText += `, ${info[0].currencies[i].name}`
            }
        }

        region.innerText = info[0].region

        if (info[0].languages)
            language.innerText = Object.values(info[0].languages).join(', ')

        if (info[0].subregion)
            subRegion.innerText = info[0].subregion

        if (info[0].capital)
            capital.innerText = info[0].capital[0]

        if (info[0].borders) {
            info[0].borders.forEach(code => {
                fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(res => res.json())
                    .then(data => {
                        const countryLink = document.createElement('a')
                        countryLink.href = `country.html?name=${data[0].name.common}`;
                        x = countryLink

                        countryLink.innerHTML = `<button>${data[0].name.common}</button>`
                        countries.appendChild(countryLink)
                    })
            });
        }
    })

const flag = document.querySelector('img')
const commonName = document.querySelector('h1')

const nativeName = document.querySelector('.name')
const domain = document.querySelector('.domain')

const population = document.querySelector('.population')
const currency = document.querySelector('.currency')

const region = document.querySelector('.region')
const language = document.querySelector('.language')

const subRegion = document.querySelector('.subRegion')
const capital = document.querySelector('.capital')

const countries = document.querySelector('.countries')
const modeElem = document.querySelector('.mode-div')

if (localStorage.getItem('selectedMode'))
    document.querySelector('body').classList.add(localStorage.getItem('selectedMode'))

modeElem.addEventListener('click', () => {

    if (localStorage.getItem('selectedMode'))
        localStorage.removeItem('selectedMode')
    else
        localStorage.setItem('selectedMode', 'dark')
    document.querySelector('body').classList.toggle('dark')
})