var Cart = function()
{
  var self = this;
  this.$notificationArea = $('.notification-area');
  //this.$deleteTrigger = $('.cart-delete');
  this.$counter = $('.cart-counter');
  this.$cartcontent = $('.cart-dropdown');
  this.$total = $('.cart-total');

  this.cartCountChange = {};

  this.init = function()
  {
    //Adding to cart
    $(document).on("click", '.cart-add', function(e) {
        e.preventDefault();
        var triggerType = $(this).prop("tagName");
        if (triggerType == 'A')
        {
          var url = $(this).attr('href');
          var type = 'GET';
          var data = {};
        }
        else if (triggerType == 'BUTTON')
        {
          var url = $(this).data('ajax');
          var type = 'GET';
          var data = {};
          data['count'] = $(this).parent('form').find('input[name="count"]').val();
        }

        $.ajax({
           type: 'GET',
           url: url,
           data: data,
           success: function(data, textStatus, request){
             self.updateCart(data, request);
           },
           error: function (request, textStatus, errorThrown) {
             self.notify(textStatus + errorThrown, 'danger');
           }
         });
    });

    $(document).donetyping('.cart-quantity', function(el) {
      var cartId = $(this).data('cartid');
      var newVal = $(this).val();
      var url = $(this).data('uri');

      if ((cartId in self.cartCountChange && self.cartCountChange[cartId] == newVal) || !newVal)
      {
        return;
      }

      self.cartCountChange[cartId] = newVal;

      $.ajax({
         type: 'GET',
         url: url,
         data: {'eshopOrderId': cartId, 'count': newVal},
         success: function(data, textStatus, request){
           self.updateCart(data, request);
         },
         error: function (request, textStatus, errorThrown) {
           self.notify(textStatus + errorThrown, 'danger');
         }
       });
    }, 500);

    //Deleting from cart
    $(document).on("click", '.cart-delete', function(e) {
      e.preventDefault();
      var $item = $(this).parent().parent('.item');
      var url = $(this).data('href');
      $item.hide(300, function(){
        $.when($item.remove()).then( function(){
          $.ajax({
             type: 'GET',
             url: url,
             success: function(data, textStatus, request){
               self.updateCart(data, request);
             },
             error: function (request, textStatus, errorThrown) {
               self.notify(textStatus + errorThrown, 'danger');
             }
           });
        });
      });
    });
  };

  this.updateCart = function(data, request)
  {
    this.$counter.html(Base64.decode(request.getResponseHeader('X-Cart-Count')));
    this.$cartcontent.html(data);

    var message = Base64.decode(request.getResponseHeader('X-Cart-Message'));
    var messageType = Base64.decode(request.getResponseHeader('X-Cart-MessageType'));
    if (message)
    {
      self.notify(message, messageType ? messageType : 'info');
    }
  };

  this.notify = function(text, type)
  {
    var $notif = $('<div>');
    $notif.addClass('alert');
    $notif.addClass('alert-' + type);
    $notif.html(text);
    this.$notificationArea.html($notif);
    $notif.fadeTo(2000, 500).slideUp(500, function(){
      $notif.alert('close');
    });
  }

  this.init();
}
