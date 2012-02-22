(function(){

    // caret position taken from: http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area 
    $.fn.setCursorPosition = function(pos) {
        this.each(function(index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });

        return this;
    };

    var getOverlay = function($input) {
        return $('#placeallder-overlay-' + $input.attr('id'));
    }

    var normalizeState = function($input) {
        var $curOverlay = getOverlay($input);
        if ($input.val() === '') {
            $curOverlay.show();
        }
        else {
            $curOverlay.hide();
        }
    };

    var initOverlay = function($input) {
        var placeholderText = $input.attr('placeholder');
        var $overlay = $('<input>')
            .attr('id', 'placeallder-overlay-' + $input.attr('id'))
            .attr('type', 'text')
            .css('position', 'absolute')
            .css('top', $input.position().top)
            .css('left', $input.position().left)
            ////.css('caret', 'none') //Todo: find a way to prevent caret jump
            .addClass('placeallder')
            .click(function() {
                $(this).setCursorPosition(0);
                $input.focus();
            })
            .val(placeholderText);

        $input.keypress(function(e){
            $overlay.hide();
        });

        $input.parent().append($overlay);

        normalizeState($input);

        $input.blur(function() {
            normalizeState($input);
        });
    };

    $(function(){
        var $inputs = $('input');
        $inputs.each(function(){
            var $input = $(this);
            if ($input.attr('placeholder')){
                initOverlay($input);
            }
        });
    });
})();
