$(function(){
    var $inputs = $('input');
    var count = 0; //There's a way to do this with the $.each I beleive...
    $inputs.each(function(){
        count++;
        var $input = $(this);
        var placeholderText = $input.attr('placeholder');
        if (placeholderText){
            $input.parent().append(
                '<div id="placewholeder-overlay-' + count + '"'
                    + 'class="placewholeder"'
                    + 'style="position: absolute;'
                        + 'z-index: 2;'
                        + 'left: ' + $input.position().left + ';'
                        + 'top: ' + $input.position().top + ';'
                        + '">'
                    + placeholderText +
                '</div>');
                    //.click(function(){
                        //debugger;
                        //var $placewholeder = $(this);
                        //$placewholeder.css('display: none;'); 
                        //$input.blur();
                    //});
        }
    });
});
