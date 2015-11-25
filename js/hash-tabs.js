// hash-tabs.js
// require jquery.js or zepto.js　modern library

(function(global, $) {
  'use strict';

  function hashTabs(element) {
    if(!(this instanceof hashTabs)) {
      return new hashTabs(element);
    }
    this.el = $(element);
    this.tab = $('[data-hash-tab]', this.el);
    this.content = $('[data-hash]', this.el);
    this.listener();
  }

  hashTabs.prototype.listener = function() {
    $(window).on('hashchange', $.proxy(this.hashChangeHandle, this));
    this.initialize();
  };

  hashTabs.prototype.initialize = function() {
    var hash = '',
      $this = this;
    this.content.addClass('hide');
    $.each(this.tab, function(i, el) {
      el = $(el);
      if(el.is('.active')) {
        location.hash = this.hash;
        hash = this.hash.substring(1);
        $('[data-hash=' + hash + ']').removeClass('hide');
        return !1;
      }
    });
  };

  hashTabs.prototype.hashChangeHandle = function(e) {
    var hash = location.hash.substring(1)
    var hashContent = $('[data-hash=' + hash + ']', this.el);
    if(hashContent.length) {
      this.content.addClass('hide');
      hashContent.removeClass('hide');
      this.tab.removeClass('active');
      $('[href=#' + hash + ']').addClass('active');
    }
  };

  window.hashTabs = hashTabs;

})(window, (window.jQuery || window.Zepto));
