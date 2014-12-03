var token = localStorage.getItem('token')

SC.initialize({
  client_id: '858ef5ad42ec60ae1747c188576c7312',
  redirect_uri: 'http://' + window.location.host + "/get-token",
  access_token: token,
  scope: 'non-expiring'
})

if (!token) {
  SC.connect(function() {
    console.log(SC.accessToken());
    localStorage.setItem('token', SC.accessToken());
  })
}

// var socket = io.connect(window.location.host);
// socket.emit('user', {userId: '13796103', deviceName: 'web'});
// socket.on('client', function(data) {
//   console.log(data);
// })

$(function() {


  $('.test').on('click', function() {
    SC.get('/me', function(me) {
      console.log(me);
    })
  })

  $('.logout').on('click', function() {
    localStorage.removeItem('token');
  })
})