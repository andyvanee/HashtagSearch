/*
  Twitter Hashtag Search App
  app.js
  2010 - Andrew VanEe
*/

window.onload = function(){
  // Store a copy of the row template
  row.blank_row = $('.items>li:last-child').remove();
  
  // When the user enters a hashtag, fire the AJAX request
  $('#hashtag').blur(function(ev){
    var new_url = "http://search.twitter.com/search.json?q=%23" + ev.target.value;
    if (new_url != twitterFeed.feed_url) {
      twitterFeed.feed_url = new_url;
      twitterFeed.reload();
    }
  });
  $('#hashtag').keypress(function(ev) {
    if (ev.which == 13) {
      var new_url = "http://search.twitter.com/search.json?q=%23" + ev.target.value;
      if (new_url != twitterFeed.feed_url) {
        twitterFeed.feed_url = new_url;
        twitterFeed.reload();
      }
    }
  });
}

var twitterFeed = {
  // Update this object by setting the feed URL, and calling the reload function.  
  feed_url: "",
  feed_data: {},
  reload: function() {
    row.clear();
    $.ajax({
      url: this.feed_url,
      context: document,
      dataType: "json",
      success: function(data, textStatus, jqXHR){
        twitterFeed.feed_data = data;
        twitterFeed.update_rows();
      }
    });
  },
  update_rows: function(){
    for (i in this.feed_data.results) row.add(this.feed_data.results[i]);
    $('#more').css("display", "block");
  },
  more: function(){
    if (this.feed_data.next_page) {
      this.feed_url = "http://search.twitter.com/search.json" + this.feed_data.next_page;
      $.ajax({
        url: this.feed_url,
        context: document,
        dataType: "json",
        success: function(data, textStatus, jqXHR){
          twitterFeed.feed_data = data;
          twitterFeed.update_rows();
        }
      });
    }
  }
};

var row = {
  blank_row: {},
  set: function(row_object){ this.blank_row = row_object },
  add: function(tweet) {
    var current_row = this.blank_row.clone().appendTo('.items'),
    profile_pic = "<a href='http://twitter.com/#!/"+tweet.from_user+"' target='_blank'>" + "<img src='"+tweet.profile_image_url+"' /></a>",
    profile_user = "<h4><a href='http://twitter.com/#!/"+tweet.from_user+"' target='_blank'>"+tweet.from_user+"</a></h4>",
    tweet_text = "<p>"+tweet.text+"</p>";
    tweet_text = replaceLinks(tweet_text);
    
    current_row[0].innerHTML = profile_pic + profile_user + tweet_text;
  },
  clear: function(){ $('.items>li').remove() }
}

function replaceLinks(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
  return text.replace(exp,"<a href='$1'>$1</a>"); 
}