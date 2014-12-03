$(function() {
  var iframe = document.querySelector('.iframe');
  iframe.src = "https://w.soundcloud.com/player/?url=" +  "http://api.soundcloud.com/users/1539950/favorites"
  var widget = SC.Widget(iframe);
})