$(function() {
  function buildHTML(message){
    let img = (message.image !== null) ? `<img src = "${ message.image }", class: 'messages__message__text__image'">`: "";
    let text = (message.content !== null) ? `${ message.content }`: "";
    let html = `<div class="messages__message" data-message-id="${ message.id }">
                  <div class="messages__message__info">
                    <div class="messages__message__info__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="messages__message__info__date">
                      ${ message.date }
                    </div>
                  </div>
                  <div class="messages__message__text">
                      <p class="messages__message__text__content">
                        ${ text }
                      </p>
                    ${ img }
                  </div>
                </div>`
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = (window.location.href);
    $.ajax( {
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      let html = buildHTML(message);
      $('.messages').append(html);
      $('.text-box')[0].reset();
      $('.messages').scrollTop( $(".messages")[0].scrollHeight );
    })
    .fail(function(message) {
      alert('送信できませんでした')
    })
    .always(function(message){
      $(".submit-btn").prop("disabled", false);
    })
  });

  let reloadMessages = function() {
    last_message_id = $(".messages__message:last").data(message-id);
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      let insertHTML = '';
      $(messages).forEach(function(message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML)
      });
      setInterval(reloadMessages, 5000);
    })
    .fail(function() {
      console.log('error')
    })
  }
})