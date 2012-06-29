var data = require('./books/jquery-amazon-books.json');


data.forEach(function (book) {
  book.DetailPageURL = book.DetailPageURL.replace('camp%3D2025', 'camp%3D1789');
  book.DetailPageURL = book.DetailPageURL.replace('creative%3D165953', 'creative%3D9325');
  book.DetailPageURL = book.DetailPageURL.replace('linkCode%3Dxm2', 'linkCode%3Das2');
  book.DetailPageURL = book.DetailPageURL.replace('tag%3Dstagjquebook-20', 'tag%3Djquerycom-20');
});

console.log(JSON.stringify(data));
