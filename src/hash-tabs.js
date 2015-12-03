// hash-tabs.js
// require jquery.js or zepto.js　modern library
(function(global, $) {
  'use strict';

  function hashTabs(element, options) {
    if(!(this instanceof hashTabs)) {
      return new hashTabs(element, options);
    }
    this.options = options;
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
    var href = encodeURIComponent(location.href);
    if(href.substring(href.length - 1) === '#') {
      $(document).scrollTop(0);
    }
    else if(!location.hash.length || !this.setHashTabs()) {
      this.hashCompare();
    }
    else {
      this.setHashTabs();
    }
    this.clickHandler();
  };

  hashTabs.prototype.hashCompare = function() {
    var opts = this.options;
    opts.idx = Math.max(0, Math.min(opts.idx, this.tab.length - 1));
    var href = hashName(this.tab[opts.idx].hash);
    this.tab.removeClass('active');
    this.tab.eq(opts.idx).addClass('active');
    this.content.addClass('hide');
    $('[data-hash=' + href + ']').removeClass('hide');
  };

  hashTabs.prototype.setHashTabs = function() {
    var hash = location.hash;
    var id = this.el.data('id');
    var $this = this;
    var correctHash = false;
    $.each(this.tab, function(i, el) {
      el = $(el);
      var href = hashName(el.attr('href'));
      if(('#' + id + '=' + href) === hash) {
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
      e.preventDefault();
      var href = hashName($(this).attr('href'));
      var str = id + '=' + href;
      if(location.hash === str) {
        return false;
      }
      location.hash = str;
    });
  };

  function hashName(attr) {
    return attr && attr.substring(1);
  }

  window.hashTabs = hashTabs;

})(window, (window.jQuery || window.Zepto));