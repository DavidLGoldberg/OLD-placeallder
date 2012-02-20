(function(){
    var overlayCount = 0;

    var initOverlay = function($input) {
        overlayCount++;
        var placeholderText = $input.attr('placeholder');
        $input.parent().append(
            $('<div id="placewholeder-overlay-' + overlayCount + '"'
                + 'class="placewholeder"'
                + 'style="position: absolute;'
                    + 'z-index: 2;'
                    + 'left: ' + $input.position().left + ';'
                    + 'top: ' + $input.position().top + ';'
                    + '">'
                + placeholderText +
            '</div>')
                .click(function(){
                    var $placewholeder = $(this);
                    $placewholeder.css('display',  'none');  //change this to remove?
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
                    initOverlay($input);
                });
            }
        });
    });
})();
