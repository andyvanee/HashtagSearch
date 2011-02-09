var twitterFeed = {
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

window.onload = function(){
  row.blank_row = $('.items>li:last-child').remove();
  $('#hashtag').blur(function(ev){
    twitterFeed.feed_url = "http://search.twitter.com/search.json?q=%23" + ev.target.value;
    twitterFeed.reload();
  });
//  
  
}

var row = {
  blank_row: {},
  set: function(obj){
    this.blank_row = obj;
  },
  add: function(text){
    var current_row = this.blank_row.clone().appendTo('.items');
    var x = current_row.children("button")[0].innerHTML = text;
    console.log(x);
  },
  update: function(){
    $('.items>li').remove();
    this.data = twitterFeed.feed_data.results;
    for (x in this.data){
      this.add(this.data[x].text);
    }
  }
}