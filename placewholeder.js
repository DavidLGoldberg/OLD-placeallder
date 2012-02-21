(function(){
    var initOverlay = function($input) {
        var placeholderText = $input.attr('placeholder');
        $input.parent().append(
            $input.clone()
                .attr('id', 'placewholeder-overlay-' + $input.attr('id'))
                .attr('type', 'text')
                .css('position', 'absolute')
                .css('top', $input.position().top)
                .css('left', $input.position().left)
                .addClass('placewholeder')
                .click(function() {
                    $(this).hide();
                    $input.focus();
                })
                .val(placeholderText)
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
