const id= new URLSearchParams(window.location.search).get('id');
let container=document.querySelector('.details');
let delete1=document.querySelector('#delete');
console.log(delete1);
const renderDetails=async()=>{
    const response=await fetch('http://localhost:3000/books/'+id);
    const book= await response.json();
    console.log(book);


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


    let template=`
    <div class="card">
    <img src="${book.cover}" alt="${book.title}" style="width:20%">
    <p><strong>Author:${book.author}</strong></p> 
    <p><strong>Rating:${template1} </strong></p>
    <p><strong>Series:${book.series}</strong></p>
    <p><strong>Genre :${book.tags}</strong><p>
    <p><strong>Price :₹${book.price}</strong></p>
    <h1>${book.title}</h1>
    <br>
    <p style="text-align:justify"><strong>${book.description}</strong></p>
    </div>
    `
    container.innerHTML=template;
};
delete1.addEventListener('click',async (e)=>{

    const res=await fetch('http://localhost:3000/books/'+id,{
        method:'DELETE'
    });
    window.location.replace('/index.html');

});
window.addEventListener('DOMContentLoaded',()=>renderDetails());