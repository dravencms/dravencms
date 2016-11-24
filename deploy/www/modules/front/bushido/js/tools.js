 ;(function($){
    $.fn.extend({
        donetyping: function(selector,callback,timeout){
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function(self){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(self);
                };
            return this.each(function(i,el){
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $(el).on('keyup keypress paste propertychange change', selector,  function(e){
                    var self = $(this);
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too preemptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type=='keyup' && e.keyCode!=8) return;

                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        // if we made it here, our timeout has elapsed. Fire the
                        // callback
                        doneTyping(self);
                    }, timeout);
                }).on('blur', selector,function(){
                    var self = $(this);
                    // If we can, fire the event since we're leaving the field
                    doneTyping(self);
                });
            });
        }
    });
})(jQuery);
