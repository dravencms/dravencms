
  var mm_config = {
    "accordion": !0,
    "animation_speed": 250,
    "store_state": !0,
    "store_state_key": "mmstate",
    "disable_animation_on": [],
    "dropdown_close_delay": 300,
    "detect_active": !0,
    "detect_active_predicate": function(a, b) {
        return b == a;
    }
  }

  MainMenu = function()
  {
    this._screen = null;
    this._last_screen = null;
    this._animate = !1;
    this._close_timer = null;
    this._dropdown_li = null;
    this._dropdown = null;
    return this;
  };

  MainMenu.prototype.init = function()
  {
      var a, b;
      return this.$menu = $("#main-menu"), this.$menu.length ? (this.$body = $("body"), this.menu = this.$menu[0], this.$ssw_point = $("#small-screen-width-point"), this.$tsw_point = $("#tablet-screen-width-point"), a = this, mm_config.store_state && (b = this._getMenuState(), document.body.className += " disable-mm-animation", null !== b && this.$body["collapsed" === b ? "addClass" : "removeClass"]("mmc"), setTimeout(function() {
          return function() {
              return Tools.elRemoveClass(document.body, "disable-mm-animation")
          }
      }(this), 20)), this.setupAnimation(), $(window).on("resize.pa.mm", $.proxy(this.onResize, this)), this.onResize(), this.$menu.find(".navigation > .mm-dropdown").addClass("mm-dropdown-root"), mm_config.detect_active && this.detectActiveItem(), $.support.transition && this.$menu.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", $.proxy(this._onAnimationEnd, this)), $("#main-menu-toggle").on("click", $.proxy(this.toggle, this)), $("#main-menu-inner").slimScroll({
          "height": "100%"
      }).on("slimscrolling", function(a) {
          return function() {
              return a.closeCurrentDropdown(!0)
          }
      }(this)), this.$menu.on("click", ".mm-dropdown > a", function() {
          var b;
          return b = this.parentNode, Tools.elHasClass(b, "mm-dropdown-root") && a._collapsed() ? Tools.elHasClass(b, "mmc-dropdown-open") ? Tools.elHasClass(b, "freeze") ? a.closeCurrentDropdown(!0) : a.freezeDropdown(b) : a.openDropdown(b, !0) : a.toggleSubmenu(b), !1
      }), this.$menu.find(".navigation").on("mouseenter.pa.mm-dropdown", ".mm-dropdown-root", function() {
          return a.clearCloseTimer(), a._dropdown_li !== this ? !a._collapsed() || a._dropdown_li && Tools.elHasClass(a._dropdown_li, "freeze") ? void 0 : a.openDropdown(this) : void 0
      }).on("mouseleave.pa.mm-dropdown", ".mm-dropdown-root", function() {
          return a._close_timer = setTimeout(function() {
              return a.closeCurrentDropdown()
          }, mm_config.dropdown_close_delay)
      }), this) : void 0
  };

  MainMenu.prototype._collapsed = function() {
      return "desktop" === this._screen && Tools.elHasClass(document.body, "mmc") || "desktop" !== this._screen && !Tools.elHasClass(document.body, "mme")
  };

  MainMenu.prototype.onResize = function()
  {
      return this._screen = Tools.getScreenSize(this.$ssw_point, this.$tsw_point), this._animate = -1 === mm_config.disable_animation_on.indexOf(screen), this._dropdown_li && this.closeCurrentDropdown(!0), ("small" === this._screen && this._last_screen !== this._screen || "tablet" === this._screen && "small" === this._last_screen) && (document.body.className += " disable-mm-animation", setTimeout(function() {
          return function() {
              return Tools.elRemoveClass(document.body, "disable-mm-animation")
          }
      }(this), 20)), this._last_screen = this._screen
  };

  MainMenu.prototype.clearCloseTimer = function() {
      return this._close_timer ? (clearTimeout(this._close_timer), this._close_timer = null) : void 0
  };

  MainMenu.prototype._onAnimationEnd = function(a) {
      return "desktop" === this._screen && "main-menu" === a.target.id ? $(window).trigger("resize") : void 0
  };

  MainMenu.prototype.toggle = function() {
      var a, b;
      return a = "small" === this._screen || "tablet" === this._screen ? "mme" : "mmc", Tools.elHasClass(document.body, a) ? Tools.elRemoveClass(document.body, a) : document.body.className += " " + a, "mmc" !== a ? (b = document.getElementById(""), $("#main-navbar-collapse").stop().removeClass("in collapsing").addClass("collapse")[0].style.height = "0px", $("#main-navbar .navbar-toggle").addClass("collapsed")) : (mm_config.store_state && this._storeMenuState(Tools.elHasClass(document.body, "mmc")), $.support.transition ? void 0 : $(window).trigger("resize"))
  };

  MainMenu.prototype.toggleSubmenu = function(a) {
      return this[Tools.elHasClass(a, "open") ? "collapseSubmenu" : "expandSubmenu"](a), !1
  };

  MainMenu.prototype.collapseSubmenu = function(a) {
      var b, c;
      return b = $(a), c = b.find("> ul"), this._animate ? c.animate({
          "height": 0
      }, mm_config.animation_speed, function() {
          return function() {
              return Tools.elRemoveClass(a, "open"), c.attr("style", ""), b.find(".mm-dropdown.open").removeClass("open").find("> ul").attr("style", "")
          }
      }(this)) : Tools.elRemoveClass(a, "open"), !1
  };

  MainMenu.prototype.expandSubmenu = function(a) {
      var b, c, d, e;
      return b = $(a), mm_config.accordion && this.collapseAllSubmenus(a), this._animate ? (c = b.find("> ul"), e = c[0], e.className += " get-height", d = c.height(), Tools.elRemoveClass(e, "get-height"), e.style.display = "block", e.style.height = "0px", a.className += " open", c.animate({
          "height": d
      }, mm_config.animation_speed, function() {
          return function() {
              return c.attr("style", "")
          }
      }(this))) : a.className += " open"
  };

  MainMenu.prototype.collapseAllSubmenus = function(a) {
      var b;
      return b = this, $(a).parent().find("> .mm-dropdown.open").each(function() {
          return b.collapseSubmenu(this)
      })
  };

  MainMenu.prototype.openDropdown = function(a, b) {
      var c, d, e, f, g, h, i, j, k, l, m;
      return null == b && (b = !1), this._dropdown_li && this.closeCurrentDropdown(b), c = $(a), e = c.find("> ul"), k = e[0], this._dropdown_li = a, this._dropdown = k, d = e.find("> .mmc-title"), d.length || (d = $('<div class="mmc-title"></div>').text(c.find("> a > .mm-text").text()), k.insertBefore(d[0], k.firstChild)), a.className += " mmc-dropdown-open", k.className += " mmc-dropdown-open-ul", j = c.position().top, Tools.elHasClass(document.body, "main-menu-fixed") ? (f = e.find(".mmc-wrapper"), f.length || (m = document.createElement("div"), m.className = "mmc-wrapper", m.style.overflow = "hidden", m.style.position = "relative", f = $(m), f.append(e.find("> li")), k.appendChild(m)), l = $(window).innerHeight(), i = d.outerHeight(), h = i + 3 * e.find(".mmc-wrapper > li").first().outerHeight(), j + h > l ? (g = j - $("#main-navbar").outerHeight(), k.className += " top", k.style.bottom = l - j - i + "px") : (g = l - j - i, k.style.top = j + "px"), Tools.elHasClass(k, "top") ? k.appendChild(d[0]) : k.insertBefore(d[0], k.firstChild), a.className += " slimscroll-attached", f[0].style.maxHeight = g - 10 + "px", f.pixelSlimScroll({})) : k.style.top = j + "px", b && this.freezeDropdown(a), b || e.on("mouseenter", function(a) {
          return function() {
              return a.clearCloseTimer()
          }
      }(this)).on("mouseleave", function(a) {
          return function() {
              return a._close_timer = setTimeout(function() {
                  return a.closeCurrentDropdown()
              }, mm_config.dropdown_close_delay)
          }
      }(this)), this.menu.appendChild(k)
  };

  MainMenu.prototype.closeCurrentDropdown = function(a) {
      var b, c;
      return null == a && (a = !1), !this._dropdown_li || Tools.elHasClass(this._dropdown_li, "freeze") && !a ? void 0 : (this.clearCloseTimer(), b = $(this._dropdown), Tools.elHasClass(this._dropdown_li, "slimscroll-attached") && (Tools.elRemoveClass(this._dropdown_li, "slimscroll-attached"), c = b.find(".mmc-wrapper"), c.pixelSlimScroll({
          "destroy": "destroy"
      }).find("> *").appendTo(b), c.remove()), this._dropdown_li.appendChild(this._dropdown), Tools.elRemoveClass(this._dropdown, "mmc-dropdown-open-ul"), Tools.elRemoveClass(this._dropdown, "top"), Tools.elRemoveClass(this._dropdown_li, "mmc-dropdown-open"), Tools.elRemoveClass(this._dropdown_li, "freeze"), $(this._dropdown_li).attr("style", ""), b.attr("style", "").off("mouseenter").off("mouseleave"), this._dropdown = null, this._dropdown_li = null)
  };

  MainMenu.prototype.freezeDropdown = function(a) {
      return a.className += " freeze"
  };

  MainMenu.prototype.setupAnimation = function() {
      var a, b, c, d;
      return c = document.body, d = mm_config.disable_animation_on, c.className += " dont-animate-mm-content", a = $("#main-menu"), b = a.find(".navigation"), b.find("> .mm-dropdown > ul").addClass("mmc-dropdown-delay animated"), b.find("> li > a > .mm-text").addClass("mmc-dropdown-delay animated fadeIn"), a.find(".menu-content").addClass("animated fadeIn"), b.find("> .mm-dropdown > ul").addClass(Tools.elHasClass(c, "main-menu-right") || Tools.elHasClass(c, "right-to-left") && !Tools.elHasClass(c, "main-menu-right") ? "fadeInRight" : "fadeInLeft"), c.className += -1 === d.indexOf("small") ? " animate-mm-sm" : " dont-animate-mm-content-sm", c.className += -1 === d.indexOf("tablet") ? " animate-mm-md" : " dont-animate-mm-content-md", c.className += -1 === d.indexOf("desktop") ? " animate-mm-lg" : " dont-animate-mm-content-lg", window.setTimeout(function() {
          return Tools.elRemoveClass(c, "dont-animate-mm-content")
      }, 500)
  };

  MainMenu.prototype.detectActiveItem = function() {
      var a, b, c, d, e, f, g, h, i;
      for (f = (document.location + "").replace(/\#.*?$/, ""), e = mm_config.detect_active_predicate, d = $("#main-menu .navigation"), d.find("li").removeClass("open active"), c = d[0].getElementsByTagName("a"), b = function() {
              return function(a) {
                  return a.className += " active", Tools.elHasClass(a.parentNode, "navigation") ? void 0 : (a = a.parentNode.parentNode, a.className += " open", b(a))
              }
          }(this), i = [], g = 0, h = c.length; h > g; g++) {
          if (a = c[g], -1 === a.href.indexOf("#") && e(a.href, f)) {
              b(a.parentNode);
              break
          }
          i.push(void 0)
      }
      return i
  };

  MainMenu.prototype._getMenuState = function() {
      return Tools.getCookie(mm_config.store_state_key, null)
  };

  MainMenu.prototype._storeMenuState = function(a) {
      return mm_config.store_state ? Tools.setCookie(mm_config.store_state_key, a ? "collapsed" : "expanded") : void 0
  };

$(document).ready(function(){
  var mm = new MainMenu();
  mm.init();
});
