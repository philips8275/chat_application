$(document).ready(function() {
  let token = null;

  $('#register-button').click(async function() {
      const username = $('#username').val();
      const password = $('#password').val();
      const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
      });
      if (response.ok) {
          alert('User registered successfully');
      } else {
          alert('Registration failed');
      }
  });

  $('#login-button').click(async function() {
      const username = $('#username').val();
      const password = $('#password').val();
      const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
          token = data.token;
          $('#auth-container').addClass('d-none');
          $('#chat-container').removeClass('d-none');
          loadMessages();
      } else {
          alert('Login failed');
      }
  });

  async function loadMessages() {
      const response = await fetch('http://localhost:3000/messages', {
          headers: { 'Authorization': token }
      });
      const messages = await response.json();
      $('#message-container').empty();
      messages.forEach(message => {
          $('#message-container').append(`<div><strong>${message.username}</strong>: ${message.message}</div>`);
      });
  }

  $('#send-button').click(async function() {
      const message = $('#message-input').val();
      const response = await fetch('http://localhost:3000/messages', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token
          },
          body: JSON.stringify({ message })
      });
      const newMessage = await response.json();
      $('#message-container').append(`<div><strong>${newMessage.username}</strong>: ${newMessage.message}</div>`);
      $('#message-input').val('');
  });
});
