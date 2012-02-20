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
                // Only works with clicks so far.
                .click(function(){
                    var $placewholeder = $(this);
                    $placewholeder.hide();
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

                $input.blur(function() {
                    $('#placewholeder-overlay-' + $input.attr('id')).show();
                });
            }
        });
    });
})();
