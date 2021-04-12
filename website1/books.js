var book = document.getElementById('book'); //id for input
var table = document.getElementById('table1');
var btn = document.getElementById('btn1');
var selection = document.querySelector('#selection');
var store = /** @class */ (function () {
    function store() {
    }
    store.clearFields = function () {
        table.innerText = '';
    };
    store.getBooks = function () {
        var bookstore;
        if (localStorage.getItem('books') == null) {
            bookstore = [];
        }
        else {
            bookstore = JSON.parse(localStorage.getItem('books'));
        }
        return bookstore;
    };
    return store;
}());
var count = 0;
btn.addEventListener('click', function (e) {
    e.preventDefault(); //to stop the reloading
    count++;
    var row;
    console.log("count is " + count);
    var place = selection.value;
    var bookstore = store.getBooks();
    console.log('selection = ' + place);
    switch (place) {
        case 'id':
            for (var _i = 0, bookstore_1 = bookstore; _i < bookstore_1.length; _i++) {
                var el = bookstore_1[_i];
                if (book.value == el.id) //2==2(book2-->el)
                 {
                    row = "<tr>\n                        <td>" + el.id + "</td>\n                        <td>" + el.title + "</td>\n                        <td>" + el.author + "</td>\n                        <td>" + el.ratings + "</td>\n                        <td>" + el.price + "</td>\n                    </tr>";
                    table.innerHTML += row;
                }
            }
            if (count > 1) {
                count = 0;
                store.clearFields();
            }
            break;
        case 'ratings':
            for (var _a = 0, bookstore_2 = bookstore; _a < bookstore_2.length; _a++) {
                var el = bookstore_2[_a];
                if (book.value == el.ratings) //2==2(book2-->el)
                 {
                    row = "<tr>\n                        <td>" + el.id + "</td>\n                        <td>" + el.title + "</td>\n                        <td>" + el.author + "</td>\n                        <td>" + el.ratings + "</td>\n                        <td>" + el.price + "</td>\n                    </tr>";
                    table.innerHTML += row;
                }
            }
            if (count > 1) { //1>0
                count = 0;
                store.clearFields();
            }
            break;
        case 'author':
            for (var _b = 0, bookstore_3 = bookstore; _b < bookstore_3.length; _b++) {
                var el = bookstore_3[_b];
                if (book.value == el.author) //2==2(book2-->el)
                 {
                    row = "<tr>\n                        <td>" + el.id + "</td>\n                        <td>" + el.title + "</td>\n                        <td>" + el.author + "</td>\n                        <td>" + el.ratings + "</td>\n                        <td>" + el.price + "</td>\n                    </tr>";
                    table.innerHTML += row;
                }
            }
            if (count > 1) { //1>0
                count = 0;
                store.clearFields();
            }
            break;
        case 'title':
            for (var _c = 0, bookstore_4 = bookstore; _c < bookstore_4.length; _c++) {
                var el = bookstore_4[_c];
                if (book.value == el.title) //2==2(book2-->el)
                 {
                    row = "<tr>\n                        <td>" + el.id + "</td>\n                        <td>" + el.title + "</td>\n                        <td>" + el.author + "</td>\n                        <td>" + el.ratings + "</td>\n                        <td>" + el.price + "</td>\n                    </tr>";
                    table.innerHTML += row;
                }
            }
            if (count > 1) { //1>0
                count = 0;
                store.clearFields();
            }
            break;
        case 'price':
            for (var _d = 0, bookstore_5 = bookstore; _d < bookstore_5.length; _d++) {
                var el = bookstore_5[_d];
                if (book.value == el.price) //2==2(book2-->el)
                 {
                    row = "<tr>\n                        <td>" + el.id + "</td>\n                        <td>" + el.title + "</td>\n                        <td>" + el.author + "</td>\n                        <td>" + el.ratings + "</td>\n                        <td>" + el.price + "</td>\n                    </tr>";
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
