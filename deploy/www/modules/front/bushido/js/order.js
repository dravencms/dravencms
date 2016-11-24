var Order = function()
{
  var self = this;

  this.$transportationHolder = $('.transportation-method');
  this.$transportationOptions = this.$transportationHolder.find('input');
  this.$paymentHolder = $('.payment-method');

  this.$total = $('.order-total');
  this.$totalVat = $('.order-totalvat');
  this.$shipping = $('.order-shipping');

  this.selectedTransportationId = 0;
  this.selectedPaymentId = 0;

  this.init = function()
  {
    this.$transportationOptions.on('ifClicked', function(){
      var transportationId = $(this).data('id');
      self.selectedTransportationId = transportationId;
      var url = self.$transportationHolder.data('url');

      $.ajax({
         type: 'GET',
         url: url,
         data: {'transportationId': transportationId},
         success: function(data, textStatus, request){
           self.$paymentHolder.removeClass('hidden');
           self.$paymentHolder.html(data);
           self.$paymentHolder.find('input').iCheck();

           self.$shipping.html(Base64.decode(request.getResponseHeader('X-Order-TransportationPrice')));
           self.$total.html(Base64.decode(request.getResponseHeader('X-Order-Total')));
           self.$totalVat.html(Base64.decode(request.getResponseHeader('X-Order-Totalvat')));
         },
         error: function (request, textStatus, errorThrown) {
           console.log(errorThrown, textStatus, request);
         }
       });
    });

    $(document).on('ifClicked', '.payment-method input', function(){
      var paymentId = $(this).data('id');
      self.selectedPaymentId = paymentId;
      var url = self.$paymentHolder.data('url');

      $.ajax({
         type: 'GET',
         url: url,
         data: {'transportationId': self.selectedTransportationId, 'paymentId': paymentId},
         success: function(data, textStatus, request){

           self.$shipping.html(data.data.transportationPrice);
           self.$total.html(data.data.total);
           self.$totalVat.html(data.data.totalVat);
         },
         error: function (request, textStatus, errorThrown) {
           console.log(errorThrown, textStatus, request);
         }
       });
    });
  };

  this.init();
};



/*
$('#frm-doOrderForm-register').click(function(){
 if($(this).is(':checked'))
 {
   $('.register-group').removeClass('hidden');
 }
 else
 {
   $('.register-group').addClass('hidden');
 }
});
*/
