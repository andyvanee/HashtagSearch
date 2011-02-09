/*
  List App
  app.js
  2010 - Andrew VanEe
*/

window.onload = function(){
  // Store a copy of the row template
  row.blank_row = $('.items>li:last-child').remove();
  
  // When the user enters a hashtag, fire the AJAX request
  $('#hashtag').blur(function(ev){
    twitterFeed.feed_url = "http://search.twitter.com/search.json?q=%23" + ev.target.value;
    twitterFeed.reload();
  });
}

var twitterFeed = {
  // Update this object by setting the feed URL, and calling the reload function.  
  feed_url: "",
  feed_data: {},
  reload: function(){
    $.ajax({
      url: this.feed_url,
      context: document,
      dataType: "json",
      success: function(data, textStatus, jqXHR){
        twitterFeed.feed_data = data;
        row.update();
      }
    });
  }
};

var row = {
  blank_row: {},
  set: function(row_object){
    this.blank_row = row_object;
  },
  add: function(text){
    var current_row = this.blank_row.clone().appendTo('.items');
    current_row.children("button")[0].innerHTML = text;
  },
  update: function(){
    $('.items>li').remove();
    this.data = twitterFeed.feed_data.results;
    for (i in this.data){
      this.add(this.data[i].text);
    }
  }
}


// Resuls returned by a twitter query
//
//  twitterFeed: Object
//    feed_data: Object
//      completed_in: 0.18851
//      max_id: 35352210950852610
//      max_id_str: "35352210950852608"
//      next_page: "?page=2&max_id=35352210950852608&q=%23appl"
//      page: 1
//      query: "%23appl"
//      refresh_url: "?since_id=35352210950852608&q=%23appl"
//      results: Array (15)
//      results_per_page: 15
//      since_id: 0
//      since_id_str: "0"
//      __proto__: Object
//    feed_url: "http://search.twitter.com/search.json?q=%23appl"
//    reload: function () {
