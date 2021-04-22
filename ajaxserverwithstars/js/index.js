const container=document.querySelector('.grid');
const searchBar=document.querySelector('.search');
const renderBooks=async (term)=>{
    let  uri='http://localhost:3000/books?_sort=price';
    if(term){
        uri+=`&q=${term}`;
    }
    const response= await fetch(uri);
    const books= await response.json();
    console.log(books);
    let template='';
    books.forEach(book => { 


let got = book.rating;
let outof = 5;
let minof = 1;
let rating = (((+got - +minof) * (5 - 1)) / (+outof - +minof)) + 1;
console.log("Rating : "+ rating);
let number = Math.floor(book.rating);
let template1 = '';
for (let i = 0; i < number; i++) {
   template1 += '<i class="fa fa-star"  style="color:#FFD700"></i>'

}
if(+rating % 1)
    template1 += '<i class="fa fa-star-half"  style="color:#FFD700"></i>';




        template+=`
        <a style="text-decoration:none" href="/detail.html?id=${book.id}">
        <div class="book-grid" id='${book.id}'>
        <br>
        <img src="${book.cover}" alt="${book.title}" style="width:50%">
        <h3>${book.title}</h3>
        <p style="text-align: center">Rating: ${book.rating} ${template1}</p>
        <p class="price" style="color:black"><strong>₹${book.price}</strong></p>
        </div>
        </a>
        `
    });
    container.innerHTML=template;
     
}
searchBar.addEventListener('submit',(e)=>{
    e.preventDefault();
    renderBooks(searchBar.term.value.trim());
})
window.addEventListener('DOMContentLoaded',()=>renderBooks());
