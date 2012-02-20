$(function(){
    var $inputs = $('input');
    var count = 0; //There's a way to do this with the $.each I beleive...
    $inputs.each(function(){
        count++;
        var placeholderText = $(this).attr('placeholder');
        if (placeholderText){
            $(this).parent().append(
                '<div id="placewholeder-overlay-' + count + '"'
                    + 'class="placewholeder">'
                    + placeholderText +
                '</div>');
        }
    });
});
