$(function() {
  let search_list = $("#user-search-result");

  function appendUser(user) {
    let html = 
      `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${ user.name }</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
      </div>`
    search_list.append(html)
  }

  function appendErrMsgToHTML(msg) {
    let html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${ msg }</p>
      </div>`;
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    let input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendErrMsgToHTML("ユーザーが見つかりません")
      }
    })
    .fail(function(){
      
    })
  });
});