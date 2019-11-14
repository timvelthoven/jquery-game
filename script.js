// Disable scrolling when dialog is opened
function disableBodyScrolling() {
    $('#disableScrollDiv').css({
        display: "block"
    });

    $('body').css({
        overflow: "hidden"
    });
}

// Enable scrolling when dialog is closed
function enableBodyScrolling() {
    $('#disableScrollDiv').css({
        display: "hidden"
    });

    $('body').css({
        overflow: "auto"
    });
}

let healthBarHero = 100;
let healthBarEnemy = 0;

let mushroomEaten = false;
let swordGrabbed = false;

// Get random integer for amount of damage
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function attack() {
    let randomInt = getRandomInt(5, 31);
    if (swordGrabbed) {
        randomInt = Math.round(randomInt * 0.9);
    }

    if (mushroomEaten) {
        randomInt = Math.round(randomInt * 1.1);
    }

    healthBarEnemy = healthBarEnemy - randomInt;
    $('#enemy-health-bar').css("width", "calc(" + healthBarEnemy + "% - 22px)");
    console.log("> Health bar enemy = " + healthBarEnemy);

    if (healthBarEnemy > 20 && healthBarHero > 20) {
        disableBodyScrolling();
        setTimeout(function () {
            healthBarHero = healthBarHero - getRandomInt(5, 21);
            $('#adventurer-health-bar').css("width", "calc(" + healthBarHero + "% - 22px)");
            $('.enemy').addClass("attack");
            console.log(healthBarHero);
        }, 2000);
        setTimeout(function () {
            $("#dialog4").dialog("open");
        }, 4000);
    } else {
        $('.enemy.battle').removeClass('battle');
        $('.enemy').addClass('dead');
        setTimeout(function () {
            $('.enemy-container .health-bar-container').remove();
            $('.adventurer-container .health-bar-container').remove();
            $('.adventurer.battle').removeClass('battle');
            $('.adventurer').addClass('cave');
            $('.adventurer.cave').addClass('walking');
        }, 2000);
        goToPage("cave.html");
    }
}

function fadePage() {
    $(document).ready(function () {
        $('#overlay').animate({
            opacity: 1,
        }, 4000, function () {
        });
    });
}

function goToPage(page) {
    window.setTimeout(function () {
        window.location.href = page;
    }, 5000);
}

function createButton(text, click) {
    return {
        text: text,
        click: function () {
            $(this).dialog("close");
            if (click) {
                click();
            }
        }
    }
}

const dialogsOpened = [];

function createDialog(dialogId, dialogNumber, buttons) {
    $("#" + dialogId).dialog({
        buttons: buttons,
        dialogClass: dialogId,
        open: disableBodyScrolling,
        close: enableBodyScrolling
    }).dialog("widget").find(".ui-dialog-title").hide();

    dialogsOpened.push(dialogNumber);
}

// To check if dialog has been opened
function dialogHasBeenOpened(number) {
    return dialogsOpened.includes(number);
}

const dialogOneButtons = [
    createButton('Yes', function () {
        fadePage();
        goToPage('game.html');
    }),
    createButton('No', function () {
        fadePage();
        goToPage("credits.html");
    })
];

const dialogTwoButtons = [
    createButton('Take the risk', function () {
        swordGrabbed = true;
        createDialog('dialogGrabSword', 2, [createButton('Well, that sucks')]);
    }),
    createButton("I'll skip")
];

const dialogThreeButtons = [
    createButton('Eat it', function () {
        mushroomEaten = true;
        createDialog('dialogEatMushroom', 2, [createButton('Trippy!')]);
    }),
    createButton('I hate mushrooms')
];

const dialogFourButtons = [
    createButton('Use sword', function () {
        attack();
        $('.adventurer.battle').addClass("attack");
    }),
    createButton('Slap him', function () {
        attack();
        $('.adventurer.battle').addClass("attack-punch");
    }),
    createButton('Scream at him', function () {
        attack();
        $('.adventurer.battle').addClass("scream");
    })
];

let couldUseIsClicked = false;

const dialogFiveButtons = [
    createButton('Return, duh', function () {
        setTimeout(function () {
            var percentageToScroll = 100;
            var percentage = percentageToScroll / 100;
            var height = $(document).scrollTop();
            var scrollAmount = height * (1 - percentage);

            $('html,body').animate({
                scrollTop: scrollAmount
            }, 5000, function () {
            });
        }, 1000);

        setTimeout(function () {
            fadePage();
            goToPage("credits.html");
        }, 6000);
    }),
    createButton('I could use it...', function () {
        couldUseIsClicked = true;
        $('.chest').addClass("open");

        setTimeout(function () {
            $('.adventurer-cave').fadeOut(2000, function () {
                $('.evilAdventurer').fadeIn(2000);
            });
        }, 1000);

        setTimeout(function () {
            if (couldUseIsClicked === true) {
                var percentageToScroll = 100;
                var percentage = percentageToScroll / 100;
                var height = $(document).scrollTop();
                var scrollAmount = height * (1 - percentage);

                $('html,body').animate({
                    scrollTop: scrollAmount
                }, 5000, function () {
                });
            }
        }, 5500);

        setTimeout(function () {
            fadePage();
            goToPage("credits.html");
        }, 10000);
    })
];

// Deze moeten nog aangepast worden o.b.v. functies onderaan (handmatig)
const dialogs = [
    {
        scrollPosition: 200,
        id: 'dialog1',
        number: 1,
        buttons: dialogOneButtons
    },
    {
        scrollPosition: 400,
        id: 'dialog2',
        number: 2,
        buttons: dialogTwoButtons
    },
    {
        scrollPosition: 600,
        id: 'dialog3',
        number: 3,
        buttons: dialogThreeButtons
    },
    {
        scrollPosition: 800,
        id: 'dialog4',
        number: 4,
        buttons: dialogFourButtons
    },
    {
        scrollPosition: 2158.75,
        id: 'dialog5',
        number: 5,
        buttons: dialogFiveButtons
    }
];

function checkScrollPosition(heightOrWidth) {
    console.log(heightOrWidth);
    for (let i = 0; i < dialogs.length; i++) {
        const dialog = dialogs[i];
        if (heightOrWidth > dialog.scrollPosition - 10 && heightOrWidth < dialog.scrollPosition + 10 && dialogHasBeenOpened(dialog.number) === false) {
            createDialog(dialog.id, dialog.number, dialog.buttons);
        }
    }
}

// Vertical
$(window).scroll(function () {
    const currentHeight = $(window).scrollTop();
    checkScrollPosition(currentHeight);
});

// Horizontal
$(window).scroll(function () {
    const currentWidth = $(window).scrollLeft();
    checkScrollPosition(currentWidth);
});

// BATTLE JS
$(window).click(function () {
    $('#combat-music')[0].play();
});

const dialog = dialogs[3];
createDialog(dialog.id, dialog.number, dialog.buttons);