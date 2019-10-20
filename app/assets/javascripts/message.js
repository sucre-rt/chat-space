$(function() {
  function buildHTML(message){
    let img = ""
    if (message.image !== null) {
      img = `<img src = "${ message.image }", class: 'messages__message__text__image'">`
    }
    let text = ""
    if (message.content !== null) {
      text = `${ message.content }`
    }
    let html = `<div class="messages__message" data-id="${ message.id }">
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
      $('.messages').append(html)
      $('#message_content').val('')
      $('#message_image').val('')
      $('.messages').scrollTop( $(".messages")[0].scrollHeight );
      $(".submit-btn").prop("disabled", false);
    })
    .fail(function(message) {
      alert('送信できませんでした')
    })
  })
})