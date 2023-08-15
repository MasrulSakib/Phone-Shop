const phoneList = async (searchPhn, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhn}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, datalimit);
}

displayPhone = (phones, datalimit) => {

    const phoneDiv = document.getElementById('phone-container')
    // console.log(phones);
    phoneDiv.innerHTML = ``;

    const showAll = document.getElementById('show-all')
    if (datalimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');

    }
    else {
        showAll.classList.add('d-none');
    }


    const noPhn = document.getElementById('not-found')
    if (phones.length === 0) {
        noPhn.classList.remove('d-none');
    }
    else {
        noPhn.classList.add('d-none');
    }

    phones.forEach(phone => {

        const phoneDataList = document.createElement('div');
        phoneDataList.classList.add('col');
        phoneDataList.innerHTML = `
    
    <div class="card p-4">
        <img id = "img-size" src= ${phone.image} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <button onclick = "moreDetails('${phone.slug}')" type="button" class="btn btn-outline-success"
            data-bs-toggle="modal" data-bs-target="#exampleModal"> More Details</button>
        </div>
    </div>
    `
        phoneDiv.appendChild(phoneDataList);
    });
    toggleLoader(false);
}

const processSearch = (datalimit) => {
    toggleLoader(true);
    const inputField = document.getElementById('input-search');
    const inputValue = inputField.value;
    phoneList(inputValue, datalimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);
})

document.getElementById('input-search').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processSearch(10);
    }

})

const toggleLoader = (spinner) => {

    const loaderDiv = document.getElementById('loader');
    if (spinner === true) {
        loaderDiv.classList.remove('d-none')
    }
    else if (spinner === false) {
        loaderDiv.classList.add('d-none')
    }
}

document.getElementById('show-more').addEventListener('click', function () {
    const appPhones = document.getElementById('phone-container');
    processSearch();
});

const moreDetails = async (detailsPhn) => {
    const url = `https://openapi.programming-hero.com/api/phone/${detailsPhn}`;
    const res = await fetch(url);
    const data = await res.json();
    phnModalList(data.data);

}

const phnModalList = (text) => {
    const detailsPhn = document.getElementById('exampleModal');
    const detailsPhnHeader = document.getElementById('exampleModalLabel');
    detailsPhnHeader.innerText = text.name;
    const phoneInnerInfo = document.getElementById('phnInnerInfo');

    phoneInnerInfo.innerHTML = `
        <p> Main features: ${text.mainFeatures.chipSet} ${text.mainFeatures.displaySize}
            ${text.mainFeatures.memory}</p>
        <p> Others: ${text.others.Bluetooth} ${text.others.GPS} ${text.others.WLAN}
            ${text.others.USB} ${text.others.NFC}</p>
        <p> ReleaseDate: ${text.releaseDate ? text.releaseDate : 'To be Announced'}</p>
    
    `
};

// phoneList(); 