// hash-tabs.js
// require jquery.js or zepto.js　modern library

(function(global, $) {
  'use strict';

  function hashTabs(element, options) {
    if (!(this instanceof hashTabs)) {
      return new hashTabs(element, options);
    }
    this.options = options || {
      idx: 0
    };
    this.el = $(element);
    this.tab = $('[data-hash-tab]', this.el);
    this.content = $('[data-hash]', this.el);
    this.listener();
  }
    
  hashTabs.prototype.listener = function() {
    $(this.el).on('hashtabs', $.proxy(this.hashChangeHandle, this));
    $(window).on('hashchange', $.proxy(function() {
      $(this.el).trigger('hashtabs');
    }, this));
    this.initialize();
  };
    
  hashTabs.prototype.initialize = function() {
    var opts = this.options;
    var hash = location.hash.substring(1);
    var hashContent = $('[data-hash=' + hash + ']', this.el);
    $(this.el).trigger('hashtabs');
    if (!hash || (hash && !hashContent.length)) {
      opts.idx = Math.max(0, Math.min(opts.idx, this.tab.length - 1));
      hash = this.tab[opts.idx].hash.substring(1);
      this.tab.eq(opts.idx).addClass('active');
      $('[data-hash=' + hash + ']').removeClass('hide');
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
    }
  };
    
  window.hashTabs = hashTabs;
    
})(window, (window.jQuery || window.Zepto));
