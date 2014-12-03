$(function() {
  $('.get-token').on('click', function() {
    SC.initialize({
      client_id: '858ef5ad42ec60ae1747c188576c7312',
      redirect_uri: 'http://' + window.location.host + "/callback",
    })

    SC.connect(function() {
      $('.get-token').remove();
      $('body').append('<div>ACCESS TOKEN: ' + SC.accessToken() + '</div>')
      localStorage.setItem('token', SC.accessToken());
    })
  })
})