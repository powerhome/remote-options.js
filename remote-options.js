(function ($) {
  $.fn.remoteOptions = function (optionsUrl, urlValues, value, label) {
    var $select = $(this);
    var initialOptions = $select.html();
    var updateOptions = function () {
      var values = {};
      _.each(urlValues, function (selector, key) {
        values[key] = $(selector).val();
      });
      $select.html(initialOptions);
      $.get(format(optionsUrl, values), values, function (options) {
        _.each(options, function (option) {
          $("<option>")
            .val(option[value])
            .text(option[label])
            .appendTo($select);
        });
        $select.trigger('remote-options:changed');
      });
    };
    _.each(urlValues, function (selector, key) {
      $(selector).on('remote-options:changed change', updateOptions);
    });
    updateOptions();
  };
})(jQuery);
