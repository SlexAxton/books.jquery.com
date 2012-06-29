var util = require('util'),
    OperationHelper = require('apac').OperationHelper;
var _ = require('underscore');

var opHelper = new OperationHelper({
    awsId:     'AKIAJAPYJAE2DWQHRVYA',
    awsSecret: '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',
    assocId:   'stagjquebook-20'
});

var res = [];

var request = require('request');
var cheerio = require('cheerio');

function addImages (data) {
data.forEach(function (item, idx) {
  request(item.DetailPageURL, function (err, resp, body) {
    var $ = cheerio.load(body);
    item.Image = $('#prodImage').attr('src') || null;
    if (item.Image) {
      item.Image = item.Image.replace(',200_PIsitb-sticker-arrow-click', '');
      item.Image = item.Image.replace(',TopRight','');
      item.Image = item.Image.replace(',204,203,35,-76_AA240_SH20_OU01_', '');
      item.Image = item.Image.replace('._BO2', '');
    }
    if (idx === (data.length-1)) {
      console.log(JSON.stringify(data));
    }
  });
});
}


function getEm (page) {
  page = page || 1;
  opHelper.execute('ItemSearch', {
      'SearchIndex': 'Books',
      'Keywords': 'jQuery',
      'ResponseGroup': 'ItemAttributes,Offers',
      'ItemPage' : page
  }, function(error, results) {
      if (error) {
        console.log('Error: ' + error + "\n");
      }
      if (!results.Items.Item) {
        console.log(JSON.stringify(results, null, ' '));
      }
      if (!results.Items.Item.push) {
        results.Items.Item = [results.Items.Item];
      }
      res = _(res).union(results.Items.Item.map(function (item){
        return {
          Title : item.ItemAttributes.Title,
          Author : typeof item.ItemAttributes.Author == 'object' ? item.ItemAttributes.Author : [item.ItemAttributes.Author],
          ASIN : item.ASIN,
          DetailPageURL : item.DetailPageURL,
          EAN : item.ItemAttributes.EAN,
          Edition : item.ItemAttributes.Edition,
          ISBN : item.ItemAttributes.ISBN,
          Label : item.ItemAttributes.Label,
          Price : item.ItemAttributes.ListPrice ? item.ItemAttributes.ListPrice.FormattedPrice : null,
          Published : item.ItemAttributes.PublicationDate,
          SKU : item.ItemAttributes.SKU,
          Publisher : item.ItemAttributes.Publisher
        };

      }));

      var total = 1;
      if (results.Items.TotalPages ) {
        total = parseInt(results.Items.TotalPages, 10);
      }
      if (total) {
        if (page < total && page < 10) {
          getEm(page+1);
        }
        else {
          res = _(res).sortBy(function(item){ return item.Published; });
          addImages(res);
        }
      }
      else {
        res = _(res).sortBy(function(item){ return item.Published; });
        addImages(res);
      }
  });
}

getEm();
