var nimsdk = null;
var aid = '';
var ylmobj = {
  ylobj: $("#ylContents li"),
  onResize: function() {
    var ylh = ($("#yl-video").width()/12*9).toFixed(0);
    $("#yl-video").height(ylh+"px");
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
    console.log(result);
    $("#ifr").attr('src', 'http://4108.liveplay.myqcloud.com/vr_player/index.html?url='+result.rtml_luency);
    $("#t-snap").attr('src', result.snap);
    $("#r-tit").html(result.title);
    $("#r-nick").html(result.nick_name);
    $("#r-count").html(result.count);
    aid = result.acc_id;
    this.initYX(result.chat_id, result.address_one);
    return false;
  },
  initYX: function(cid, cadOne) {
    var anum = "";
    for(var i = 0; i < 6; i ++) {
      anum += Math.floor(Math.random()*10);
    }
    var self = this;
    nimsdk = SDK.Chatroom.getInstance({
      debug: false,
      appKey: '311a81d3ee6ec213d24fe0a1e1f2e117',
      chatroomId: cid,
      chatroomAddresses: [
        cadOne
      ],
      chatroomNick: '用户' + anum,
      chatroomAvatar: 'chatroomAvatar',
      isAnonymous: true,
      onconnect: function(obj) {
        self.onChatroomConnect(obj)
      },
      onerror: function(err) {
        self.onChatroomError(err)
      },
      onwillreconnect: function() {
        self.onChatroomWillReconnect()
      },
      ondisconnect: function() {
        self.onChatroomDisconnect()
      },
      onmsgs: function(msg) {
        self.onChatroomMsgs(msg)
      }
    });
  },
  onChatroomConnect: function (obj) {
    // console.log('onConnect')
  },
  onChatroomWillReconnect: function () {
    // console.log('onWillReconnect')
  },
  onChatroomDisconnect: function () {
    // console.log('onDisconnect')
  },
  onChatroomError: function (err) {
    // console.log('onError' + err)
  },
  onChatroomMsgs: function (msg) {
    var self = this;
    var ucostum = null;
    var msgList = $("#rr-msgList");
    var levelimg = null;
    if(!(msg[0].attach === null || msg[0].attach === '' || msg[0].attach === undefined)) {
      if(msg[0].attach.type === 'memberEnter') {
        if(msg[0].attach.custom) {
          ucostum = JSON.parse(msg[0].attach.custom);
          if(ucostum.userType == '2' || ucostum.userType == '3') {
            levelimg = ucostum.achorLevel
          } else {
            levelimg = ucostum.wealthLevel
          }
          msgList.append('<li ><img src="'+ levelimg +'" class="u-level" /><span class="u-nick">'+ ucostum.fromNick +'</span><span class="msg-txt">'+ ucostum.content +'</span></li>');
        } else {
          ucostum = msg[0].attach;
          msgList.append('<li><span class="u-nick">'+ ucostum.fromNick +'</span><span class="msg-txt">进入直播间</span></li>');
        }
      }
    } else {
      var txtConData = JSON.parse(msg[0].custom),
        levelpic = '';
      if(txtConData.messageType == 2) {
        if(txtConData.userType == '2' || txtConData.userType == '3') {
          levelpic = txtConData.achorLevel;
        } else {
          levelpic = txtConData.wealthLevel;
        }
        msgList.append('<li ><img src="'+ levelpic +'" class="u-level" /><span class="u-nick">'+ txtConData.fromNick +'</span><span class="msg-txt">'+ txtConData.content +'</span></li>');
      } else if(txtConData.messageType == 3) {
        var gifttxt = '', giftimg = '';
        if(txtConData.userType == '2' || txtConData.userType == '3') {
          levelpic = txtConData.achorLevel;
        } else {
          levelpic = txtConData.wealthLevel;
        }
        if(txtConData.gift.doubleHitCount === '1') {
          gifttxt = '送了' + txtConData.gift.num + '个' + txtConData.gift.name
        } else if((txtConData.gift.doubleHitCount > 1) && (txtConData.gift.doubleHitCount%10===0)){
          gifttxt = '送了' + txtConData.gift.num*txtConData.gift.doubleHitCount + '个' + txtConData.gift.name
        }
        giftimg = './img/gift/' + txtConData.gift.id + '.png';
        msgList.append('<li ><img src="'+ levelpic +'" class="u-level" /><span class="u-nick">'+ txtConData.fromNick +'</span><span class="msg-txt">'+ gifttxt +'</span><img class="u-gift" src="'+ giftimg +'" height="18" /></li>');
      }
    }
    return false;
  }
};
$(function() {
  ylmobj.onResize();
  var rid = ylmobj.getAgs('id');
  $('body').append("<script src='https://app.yueyevr.com/a1/liveShare/live_share?room_id="+ rid +"&&callback=ylmobj.showData'><\/script>");
  $(window).resize(function() {
    ylmobj.onResize();
  });
});
