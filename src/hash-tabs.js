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
    $(window).on('hashchange', $.proxy(this.setHashTabs, this));
    this.initialize();
  };
    
  hashTabs.prototype.initialize = function() {
    var opts = this.options;
    this.clickHandler();
    if (!location.hash.length || !this.setHashTabs()) {
      opts.idx = Math.max(0, Math.min(opts.idx, this.tab.length - 1));
      var href = this.tab[opts.idx].hash.substring(1);
      this.tab.eq(opts.idx).addClass('active');
      $('[data-hash=' + href + ']').removeClass('hide');
    } else {
      this.setHashTabs();
    }
  };
  
  hashTabs.prototype.setHashTabs = function() {
    var hash = location.hash;
    var id = this.el.data('id');
    var $this = this;
    var correctHash = false;
    $.each(this.tab, function(i, el) {
      el = $(el);
      var href = el.attr('href').substring(1);
      if (('#' + id + '=' + href) === hash) {
        $this.content.addClass('hide');
        $('[data-hash=' + href + ']').removeClass('hide');
        $this.tab.removeClass('active');
        el.addClass('active');
        correctHash = true;
        return false;
      }
    });
    return correctHash;
  };
  
  hashTabs.prototype.clickHandler = function() {
    var id = this.el.data('id');
    this.tab.on('click', function(e) {　　
      var href = $(this).attr('href').substring(1);
      location.hash = id + '=' + href;
      e.preventDefault();
    });
  };
    
  window.hashTabs = hashTabs;
    
})(window, (window.jQuery || window.Zepto));