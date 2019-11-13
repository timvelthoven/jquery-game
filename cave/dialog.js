// Deze moeten nog aangepast worden o.b.v. functies onderaan (handmatig, nog console.log toevoegen daar)
const scrollPositionDialog5 = 10;
let dialog5HasBeenOpened = false;

function disableBodyScrolling() {
    $('#disableScrollDiv').css({
        display: "block"
    });

    $('body').css({
        overflow: "hidden"
    });
}

// Deze width en height nog veranderen naar auto
function enableBodyScrolling() {
    $('#disableScrollDiv').css({
        display: "hidden"
    });

    $('body').css({
        overflow: "auto"
    });
}

function checkScrollPosition(heightOrWidth) {
    console.log(heightOrWidth);
    $("#dialog5").dialog({
        buttons: [
            {
                text: "Return, duh",
                click: function () { // Er wordt geklikt/keuze gemaakt
                    console.log("Return, duh");
                    $(this).dialog("close"); // Pop up gaat weg

                    // return gold
                    // fade to black screen
                    $(document).ready(function() {
                        $('#overlay').animate({
                            opacity: 1,
                        }, 4000, function() {
                        });
                    });
                    // open credits page
                    window.setTimeout(function(){
                        window.location.href = "https://www.google.com/"; // TODO link to happy credits page
                    }, 5000);
                }
            },
            {
                text: "I could use it...",
                click: function () { // Er wordt geklikt/keuze gemaakt
                    console.log("I could use it...");
                    $(this).dialog("close"); // Pop up gaat weg

                    // keep gold
                    // TODO fade hero into enemy

                        $('.chestOpen').fadeIn('fast', function(){
                            $('.chest').fadeOut('fast');
                        });

                        $('.adventurer').fadeOut('slow', function(){
                            $('.evilAdventurer').fadeIn('slow');
                        });


                    // fade to black screen
                    $(document).ready(function() {
                        $('#overlay').animate({
                            opacity: 1,
                        }, 6000, function() {
                        });
                    });
                    // open credits page
                    window.setTimeout(function(){
                        window.location.href = "index.html#bottom"; // TODO link to sad credits page
                    }, 5000);
                }
            },
        ],
        open: disableBodyScrolling,
        close: enableBodyScrolling
    }).dialog("widget").find(".ui-dialog-title").hide();

    dialog5HasBeenOpened = true;

}

// Deze voor verticale scroll pagina's
$(window).scroll(function () {
    const currentHeight = $(window).scrollTop();
    checkScrollPosition(currentHeight);
});

