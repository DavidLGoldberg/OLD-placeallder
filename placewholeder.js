(function(){
    var initOverlay = function($input) {
        var placeholderText = $input.attr('placeholder');
        $input.parent().append(
            $('<div id="placewholeder-overlay-' + $input.attr('id') + '"'
                + 'class="placewholeder"'
                + 'style="position: absolute;'
                    + 'display: block;'
                    + 'z-index: 2;'
                    + 'left: ' + $input.position().left + ';'
                    + 'top: ' + $input.position().top + ';'
                    + '">'
                + placeholderText +
            '</div>')
                .click(function() {
                    $(this).hide();
                    $input.focus();
                })
        );   
    };

    $(function(){
        var $inputs = $('input');
        $inputs.each(function(){
            var $input = $(this);
            if ($input.attr('placeholder')){
                initOverlay($input);

                var curOverlay = $('#placewholeder-overlay-' + $input.attr('id'));

                $input.blur(function() {
                    if (!$input.val())
                        curOverlay.show();
                });

                $input.focus(function() {
                    curOverlay.hide();
                });
            }
        });
    });
})();
