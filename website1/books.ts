let book = document.getElementById('book') as HTMLElement; //id for input
let table = document.getElementById('table1') as HTMLTableElement;
let btn = document.getElementById('btn1') as HTMLElement;
let selection = document.querySelector('#selection') as HTMLSelectElement;
class store {
    static clearFields() {
        table.innerText = '';
    }
    static getBooks() {
        let bookstore: any[];
        if (localStorage.getItem('books') == null) {
            bookstore = [];
        } else {
            bookstore = JSON.parse(localStorage.getItem('books') !);
        }
        return bookstore;

    }

}
let count = 0;
btn.addEventListener('click', (e: Event) => {
            e.preventDefault(); //to stop the reloading
            count++;
            let row: string;
            console.log(`count is ${count}`);
            const place = selection.value;
            const bookstore = store.getBooks();
            console.log('selection = ' + place);
            switch (place) {
                case 'id':
                    for (let el of bookstore) {
                        if (book.value == el.id) //2==2(book2-->el)
                        {
                            row = `<tr>
                        <td>${el.id}</td>
                        <td>${el.title}</td>
                        <td>${el.author}</td>
                        <td>${el.ratings}</td>
                        <td>${el.price}</td>
                    </tr>`
                            table.innerHTML += row;
                        }

                       
                    }
                    if (count> 1) {
                        count = 0;
                        store.clearFields();                 
                    } 
                    
                    break;




                case 'ratings':
                    for (let el of bookstore) {
                        if (book.value == el.ratings) //2==2(book2-->el)
                        {
                            row = `<tr>
                        <td>${el.id}</td>
                        <td>${el.title}</td>
                        <td>${el.author}</td>
                        <td>${el.ratings}</td>
                        <td>${el.price}</td>
                    </tr>`
                            table.innerHTML += row;
                        }

                        
                    }
                    if (count > 1) { //1>0
                        count = 0;
                        store.clearFields();
                    }


                    break;
                case 'author':
                    for (let el of bookstore) {
                        if (book.value == el.author) //2==2(book2-->el)
                        {
                            row = `<tr>
                        <td>${el.id}</td>
                        <td>${el.title}</td>
                        <td>${el.author}</td>
                        <td>${el.ratings}</td>
                        <td>${el.price}</td>
                    </tr>`
                            table.innerHTML += row;
                        }

                        
                    }
                    if (count > 1) { //1>0
                        count = 0;
                        store.clearFields();
                    }

                    break;
                case 'title':
                    for (let el of bookstore) {
                        if (book.value == el.title) //2==2(book2-->el)
                        {
                            row = `<tr>
                        <td>${el.id}</td>
                        <td>${el.title}</td>
                        <td>${el.author}</td>
                        <td>${el.ratings}</td>
                        <td>${el.price}</td>
                    </tr>`
                            table.innerHTML += row;
                        }

                       
                    }

                    if (count > 1) { //1>0
                        count = 0;
                        store.clearFields();
                    }
                    break;

                    case 'price':

                    for (let el of bookstore) {
                        if (book.value == el.price) //2==2(book2-->el)
                        {
                            row = `<tr>
                        <td>${el.id}</td>
                        <td>${el.title}</td>
                        <td>${el.author}</td>
                        <td>${el.ratings}</td>
                        <td>${el.price}</td>
                    </tr>`
                            table.innerHTML += row;
                        }

                       
                    }

                    if (count > 1) { //1>0
                        count = 0;
                        store.clearFields();
                    }
                    break;
            }
        });
