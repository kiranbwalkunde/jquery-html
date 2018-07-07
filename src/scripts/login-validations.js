(function ($) {
  $('#submitButton').on('click', function () {
    console.log('The button has been clicked. ', this)
    // Get the values of the userName and Password.
    var userName = $('#userNameField').val()
    var password = $('#passwordField').val()
    if (!userName || !password || password === '' || userName === '') {
        alert('Password or User Name should not be empty.')
    }
  })
})(window.$)
