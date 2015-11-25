// hash-tabs.js
// require jquery.js or zepto.js　modern library
(function(global, $) {
  'use strict';

  function hashTabs(element, options) {
    if (!(this instanceof hashTabs)) {
      return new hashTabs(element, options);
    }
    this.options = options || {};
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
    var hash = location.hash.substring(1);
    var hashContent = $('[data-hash=' + hash + ']', this.el);
    var opts = this.options;
    var url = decodeURIComponent(location.href);
    var lastChar = url.substring(url.length - 1);
      
    if (hashContent.length) {
      $(window).trigger('hashchange');
    } 
      
    else if (!location.hash && lastChar !== '#') {
      opts.idx = Math.max(0, Math.min(opts.idx, this.tab.length - 1));
      this.tab.eq(opts.idx).addClass('active');
      this.content.eq(opts.idx).removeClass('hide');
      location.hash = this.tab.eq(opts.idx).attr('href');
    }
      
  };
    
  hashTabs.prototype.hashChangeHandle = function(e) {
    var hash = location.hash.substring(1);
    var hashContent = $('[data-hash=' + hash + ']', this.el);
    if (hashContent.length) {
      this.content.addClass('hide');
      hashContent.removeClass('hide');
      this.tab.removeClass('active');
      $('[href=#' + hash + ']').addClass('active');
    } else {
      this.tab.removeClass('active');
      this.content.addClass('hide');
    }
  };
    
  window.hashTabs = hashTabs;
    
})(window, (window.jQuery || window.Zepto));
