//==================GLOBALS==========================
const navList = document.querySelector('.nav-bar .nav-list');
const barsBtn = document.querySelector('#bars');
const closeBtin = document.querySelector('#close-nav-list');
// 
const items = document.querySelector('.grid-items .container .row');
// 
const navItems=document.querySelectorAll('.nav-bar .nav-list-item');
// 
const httpReq = new XMLHttpRequest();
let data = [];
//
// =================RUN============================
barsBtn.onclick = showNav;
closeBtin.onclick = hideNav;
// 
getData('https://jsonplaceholder.typicode.com/posts', makeItems);

for(let x of navItems){
    x.addEventListener('click',(e)=>{
        // console.log(e.target);
        showfromNav(e.target.innerText);
    })
}

//========FUNCTIONS=========
// nav bar
function showNav() {
    navList.style.top = 0;
}
function hideNav() {
    navList.style.top = '-205px';
}
//
function makeItems() {
    let txt = '';
    for (let i = 0; i < 12; i++) {
        txt += `<div class="item">
        <img src="https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320" alt="img">
        <h2>${data[i].title}</h2>
        <p>${data[i].body}</p>
        </div>`
    }
    items.innerHTML = txt;
}
// api
function getData(url, func) {
    httpReq.open("GET", url);
    httpReq.send();
    httpReq.onreadystatechange = () => {
        if (httpReq.readyState == 4 && httpReq.status == 200) {
            data = JSON.parse(httpReq.response);
            func();
        }
    }
}
function showfromNav(subj){
    getData(`https://newsapi.org/v2/top-headlines?country=us&category=${subj}&apiKey=5bf58b0007da4ab295fa9d4ce50475a6`, () => {
        let txt = '';
        for (let x of data.articles) {
            txt += `<div class="item">
            <img src='${x.urlToImage}' alt='img'>
            <h2><a href="${x.url}" target='_blank'>${x.title}</a></h2>
            <p>${x.description}</p>
            </div>`;
            console.log(x.description);
        }
        items.innerHTML = txt;
    });
}