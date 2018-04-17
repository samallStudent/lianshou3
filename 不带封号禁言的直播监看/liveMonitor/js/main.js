var ylmobj = {
  ylobj: $("#ylContents li"),
  onResize: function() {
    var ylh = $("#ylContents>div").width();
    $("#ylContents>div").height(ylh+"px");
  },
  getAgs: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    } else {
      return null;
    }
  },
  showData: function(result) {
    var self = this;
    var data = result.live;
    console.log(data);
    var appendobj = $("#ylContents");
    for (var i = 0;i <= data.length - 1; i++) {
      appendobj.append('<div class="yl-hover col-xs-4 col-sm-4 col-md-3 col-lg-2"><div><img class="yl-cover" src="'+ data[i].room_cover +'" alt="" /><div class="yl-hover-bg"><a href="javascript:void(0);" class="r-btn" data-num="'+data[i].room_id+'" target="_blank"><img src="./img/play_btn.png" alt=""></a></div><div class="yl-info"><a class="i-snap" href="javascript:void(0);"><img src="'+ data[i].snap +'" alt=""></a><div class="i-txt-content"><p class="i-tit">'+ data[i].title +'</p><p class="i-ainfo"><span class="fl i-nick">'+data[i].nick_name+'</span><span class="fr i-hot-count">'+data[i].ct_total+'</span><span class="fr i-hot-icon"></span></p></div></div></div></div>');
    }
    ylmobj.onResize();
    $(".yl-hover").bind().mouseover(function(event) {
      $(this).find('.yl-hover-bg').show();
      $(this).find('.yl-info').addClass('yl-info-shadow');
    });
    $(".yl-hover").bind().mouseout(function(event){
      $(this).find('.yl-hover-bg').hide();
      $(this).find('.yl-info').removeClass('yl-info-shadow');
    });
    $(".r-btn").bind().click(function(event) {
      var rid = $(this).data('num');
      window.open('./room.html?id=' + rid);
      return false;
    });
    return false;
  }
}
$(function() {
  $('body').append("<script src='https://app.yueyevr.com/a1/liveShare/sort_index?callback=ylmobj.showData'><\/script>");
  ylmobj.onResize();
  $(window).resize(function() {
    ylmobj.onResize();
  });
});
