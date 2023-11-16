//variables


const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const technologyBtn = document.getElementById("technology");
const entertainmentBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("searchBtn");

const newsQuery =document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsDetails = document.getElementById("newsDetails");




//Array

var newsDataArr = [];

//API's

const API_KEY = "a6cd33b5d1d74639b5e10978e8f9dee8";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";



window.onload = function() {
    newsType.innerHTML = "<h4></h4>";
    console.log(" I am at onload ")
    fetchHeadlines();
};



generalBtn.addEventListener("click",function(){

    fetchGeneralNews();
    

});

businessBtn.addEventListener("click",function(){

    fetchBusinessNews();

});

sportsBtn.addEventListener("click",function(){

    fetchSportsNews();

});

technologyBtn.addEventListener("click",function(){

    fetchTechnologyNews();

});

entertainmentBtn.addEventListener("click",function(){

    fetchEntertainmentNews();

});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();

});

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
    console.log("Hurray General News")
}

const fetchGeneralNews = async () => {
    console.log("Yes i am fetching general news");
    const response = await fetch(GENERAL_NEWS+API_KEY);

    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
    console.log("Hurray General News")
}

const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchQueryNews = async () => {

    if(newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS+newsQuery.value+"&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
};


function displayNews(){

    newsDetails.innerHTML = "";
    
    // newsDetails.innerHTML = "";
    // if(newsDataArr.length == 0){
    //     newsDetails.innerHTML = "<h5>No data found.</h5>"
    //     return;
    // };
    console.log("Hurray General News")
    newsDataArr.forEach(news =>{

        var date = news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className="col-sm-12 col-md-14 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className="p-2";


        var image = document.createElement('img');
        image.setAttribute("height", "matchparnt");
        image.setAttribute("width", "100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className ="card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];


        var description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        var link = document.createElement('a');
        link.className = "btn - btn-dark";
        link.setAttribute("target", "_blank");
        link.setAttribute("data-url", news.url);
        link.href = news.url;
        link.innerHTML="Read more";


        link.addEventListener('click', function (event) {
            console.log("link function")
            if (event.target && event.target.classList.contains('btn')) {
                const url = event.target.getAttribute('data-url');
        
                if (!url) {
                    console.error('URL is missing.');
                    return;
                }
        
                // Send a request to the server to execute the Python script with the specified URL
                fetch(`/scrape?url=${encodeURIComponent(url)}`)
                    .then(response => response.text())
                    .then(data => console.log(data))
                    .catch(error => console.error('Error:', error));
            }
        });

        document.body.appendChild(link);

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsDetails.appendChild(col);

    });

    
    



}