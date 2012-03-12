(function($) {

    // focusNextInputField modified from: http://jqueryminute.com/set-focus-to-the-next-input-field-with-jquery/
    $.fn.focusPreviousInputField = function() {
        log('focusPreviousInputField');
        return this.each(function() {
            var fields = $(this).closest('form, body').find('button,input,textarea,select');
            var index = fields.index(this);
            if (index > -1 && (index - 1) >= 0) {
                fields.eq(index - 2).focus();
            }
            return false;
        });
    };

    $.fn.focusNextInputField = function() {
        return this.each(function() {
            var fields = $(this).closest('form, body').find('button,input,textarea,select');
            var index = fields.index( this );
            if ( index > -1 && ( index + 1 ) < fields.length ) {
                fields.eq( index + 1 ).focus();
            }
            return false;
        });
    };

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
            //if (this.placeholder && 'placeholder' in document.createElement(this.tagName))
                //return;
            
            var $input = $(this);
            if ($input.attr('placeholder')) {
                var $overlay = initOverlay($input, settings);
                bindInput($input, $overlay);
            }

            //Todo: remove overlays from input submits?
        });
    };

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

        var showOverlay = function($input, $overlay) {
            log('showOverlay');
            $overlay
                .show()
                .setCursorPosition(0);
        };

        var showInput = function($input, $overlay) {
            log('showInput');
            $overlay.hide();
            $input
                .show()
                .focus();
        };

        var normalizeState = function($input, $overlay) {
            log('***normalizeState***');
            if ($input.val() === '') { 
                showOverlay($input, $overlay);
            }
            else {
                showInput($input, $overlay);
            }
        };

        $overlay
            .click(function() {
                log('overlay: click');
                normalizeState($input, $overlay);
            })
            .bind($.browser.msie ? 'propertychange' : 'keypress', function(e) {
                log('overlay: propertychange or keypress');
                showInput($input, $overlay);
            });

        $input
            .bind($.browser.msie ? 'propertychange' : 'keyup', function(e) { // Note: needs keyup for backspace.
                log('input: propertychange or keyup');
                e.preventDefault();

                if (e.shiftKey && e.keyCode === 9) { // shift tab
                    $input.focusPreviousInputField().focusPreviousInputField();
                }
                else if (e.keyCode === 9) { // tab
                    $input.focusNextInputField().focusNextInputField();
                }
                else { // this might need to be removed... might need to always normalize.
                    normalizeState($input, $overlay);
                }
            })
            .after($overlay);
    };

})(jQuery);