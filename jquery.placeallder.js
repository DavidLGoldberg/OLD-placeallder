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
                //.setCursorPosition(0) // needs 2 set cursors!
                .show()
                .setCursorPosition(0);
        };

        var showInput = function($input, $overlay) {
            $overlay.hide();
            $input.show();
        };

        var normalizeState = function($input, $overlay) {
            log('***normalizeState');
            if ($input.val() === '') { 
                showOverlay($input, $overlay);
                // Todo: set up a one time readjust of tab index ? rather not have to do this...
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
            .blur(function(){
                log('overlay: blur');
                //var curIndex = $overlay.index(this);
                //console.log(curIndex);
                //$(':input:eq(' + (curIndex + 1) + ')').focus();
            })
            .bind($.browser.msie ? 'propertychange' : 'keypress', function(e) { // add back change and blur?
                log('overlay: propertychange or keypress');
                $overlay.hide();
                $input.focus();
            });

        $input
            .bind($.browser.msie ? 'propertychange' : 'keyup', function(e) { // add back change and blur?
                log('input: propertychange or keyup');
                if ($.browser.msie) { 
                    e.preventDefault();
                }
                normalizeState($input, $overlay);
            })
            .after($overlay);
    };

})(jQuery);