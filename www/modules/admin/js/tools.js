var Tools = {
  setCookie: function(cname, cvalue, exdays)
  {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },

  getCookie: function(cname)
  {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ')
        c = c.substring(1);
      if (c.indexOf(name) == 0)
        return c.substring(name.length, c.length);
    }
    return "";
  },

  isEmail: function(email)
  {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  },

  elHasClass: function(el, cls)
  {
    return $(el).hasClass(cls);
  },

  elRemoveClass: function(el, cls)
  {
    return $(el).removeClass(cls);
  },

  getScreenSize: function(a, b) {
      return a.is(":visible") ? "small" : b.is(":visible") ? "tablet" : "desktop"
  }

};
