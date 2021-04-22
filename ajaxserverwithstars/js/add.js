const form=document.querySelector('form');

const createbook=async(e)=>{
    e.preventDefault();
    const doc={
        id:form.id.value,
        isbn:form.isbn.value,
        title:form.title.value,
        author:form.author.value,
        pages:form.pages.value,
        price:form.price.value,
        rating:form.rating.value,
        votes:form.votes.value,
        description:form.description.value,
        tags:form.tags.value,
        series:form.series.value,
        seriesIndex:form.seriesIndex.value,
        releaseDate:form.releaseDate.value,
        cover:form.cover.value
      
    }
    
    await fetch('http://localhost:3000/books',{
        method:'POST',
        body:JSON.stringify(doc),
        headers:{'Content-Type':'application/json'}

    })

    window.location.replace('/index.html')
}

form.addEventListener('submit',createbook);