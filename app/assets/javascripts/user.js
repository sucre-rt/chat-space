$(document).on('turbolinks:load', function(){
  let search_list = $("#user-search-result");
  let group_list = $("#user-group-result");

  function addUserId(user_ids) {
    $('.group-member').each(function(i,user_id) {
      let id = $(user_id).val();
      user_ids.push(id);
    });
    return user_ids;
  }

  function appendUser(user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    let html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${ msg }</p>
      </div>`
    search_list.append(html);
  }

  function GroupUser(name, id) {
    let html = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${ id }' class="group-member" >
                <p class='chat-group-user__name'>${ name }</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
    group_list.append(html);
  }

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    let input = $("#user-search-field").val();
    let user_ids = [];
    
    addUserId(user_ids);

    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input, user_ids: user_ids }
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
      alert("ユーザー検索に失敗しました");
    })
  })
  $(function(){
    $(document).on('click', '.user-search-add', function(){
      let id = $(this).data('user-id');
      let name = $(this).data('user-name');
      $(this).parent().remove();
      GroupUser(name, id);
    });
    $(document).on("click",'.user-search-remove', function() {
      $(this).parent().remove(); 
    })
  });
});
