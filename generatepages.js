var data = require('./books/jquery-amazon-books.json');
var Handlebars = require('handlebars');
var fs = require('fs');
var slug = require('slug');

var pageTemplate = Handlebars.compile(fs.readFileSync(__dirname + '/bookpage.hbs', 'utf8'));

Handlebars.registerHelper('esc', function (inp) {
  return JSON.stringify(inp);
});

data.forEach(function (book) {
  book.DetailPageURL = book.DetailPageURL.replace('camp%3D2025', 'camp%3D1789');
  book.DetailPageURL = book.DetailPageURL.replace('creative%3D165953', 'creative%3D932');
  book.DetailPageURL = book.DetailPageURL.replace('linkCode%3Dxm2', 'linkCode%3Das2');
  book.DetailPageURL = book.DetailPageURL.replace('tag%3Dstagjquebook-20', 'tag%3Djquerycom-20');

  fs.writeFileSync(__dirname + '/fakepage/'+slug(book.Title).toLowerCase().replace(':','').replace("'", '').replace('.','-')+ '.html',
                   pageTemplate(book),'utf8');
});
