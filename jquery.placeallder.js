(function($) {

    // setCursorPosition taken from: http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area 
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

    $.fn.placeallder = function(options) {
        var settings = $.extend( {
            'className' : 'placeallder'
        }, options); 

        return this.each(function() {
            if (this.placeholder && 'placeholder' in document.createElement(this.tagName))
                return;
            
            var $input = $(this);
            if ($input.attr('placeholder')){
                var $overlay = initOverlay($input, settings);
                bindInput($input, $overlay);
            }
        });
    };

    var getOverlay = function($input) {
        return $('#placeallder-overlay-' + $input.attr('id'));
    }

    var initOverlay = function($input, settings) {
        // handle special opera field case idea from: https://github.com/miketaylr/jQuery-html5-placeholder/blob/master/html5placeholder.jquery.js
        var isOperaIconInput = $.browser.opera && $.browser.version < 10.5
            && ($input.get(0).type == 'email' || $input.get(0).type == 'url');
        var placeholderText = $input.attr('placeholder');

        var $overlay = $('<input>')
            .attr('id', 'placeallder-overlay-' + $input.attr('id'))
            .attr('type', 'text')
            .css('position', 'absolute')
            .css('top', $input.position().top)
            .css('left', $input.position().left)
            ////.css('caret', 'none') //Todo: find a way to prevent caret jump
            .addClass(settings.className)
            .val(placeholderText);

        if (isOperaIconInput) {
            $overlay
                .css('border-left-width', 0)
                .css('left', $input.position().left + 22);
        }

        return $overlay;
    };

    var bindInput = function ($input, $overlay) {

        var toggleOverlay = function($input, $overlay) {
            $overlay.setCursorPosition(0);
            $input.focus();
        };

        var normalizeState = function($input) {
            var $curOverlay = getOverlay($input);
            if ($input.val() === '')
                $curOverlay.show();
            else 
                $curOverlay.hide();
        };

        $overlay.bind('click', function() {
            toggleOverlay($input, $overlay);
        });

        $input
            .bind($.browser.msie ? 'propertychange' : 'change', function(e){
                e.preventDefault();
                normalizeState($input);
            })
            .blur(function() {
                normalizeState($input);
            })
            .parent().append($overlay);

        normalizeState($input);
    };

})(jQuery);