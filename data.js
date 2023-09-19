export let countries = {};

export let countryCodes = []; 

export function loadCountries() {
    const url = "https://flagcdn.com/fr/codes.json";
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        countries = data;
        countryCodes = Object.keys(countries).filter((c) => !c.startsWith("us-"));
    })
}


  

