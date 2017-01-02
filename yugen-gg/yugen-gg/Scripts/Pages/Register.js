ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null,
    decorateInputElement: true
}, true);
var eventData = ko.observable();
var loadComplete = ko.observable(false);
var gameList = ko.observableArray();
var confirmCheckout = ko.observable(false);
var eventId = ko.observable();
var registrationId = ko.observable();
var formVisible = ko.observable(false);
var deckClasses = ko.observableArray([
    "Druid",
    "Hunter",
    "Mage",
    "Paladin",
    "Priest",
    "Rogue",
    "Shaman",
    "Warlock",
    "Warrior"
]);
var hearthstoneObject = {
    basicInfo: {
        firstName: ko.observable().extend({ required: true }),
        lastName: ko.observable().extend({ required: true }),
        battleId: ko.observable().extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
        email: ko.observable().extend({ required: true, email: true }),
        phone: ko.observable().extend({ phoneUS: true }),
        deckClass1: ko.observable().extend({ required: true }),
        deckClass2: ko.observable().extend({ required: true }),
        deckClass3: ko.observable().extend({ required: true }),
        deckClass4: ko.observable().extend({ required: true })
    },
    id: ko.observable(),
    game: 'Hearthstone'
};
var errors = ko.validation.group(hearthstoneObject, { deep: true });
hearthstoneObject.basicInfo.deckClass1.extend({
    validation: {
        validator: function () {
            var decks = hearthstoneObject.basicInfo;
            if (decks.deckClass1() == decks.deckClass2() || decks.deckClass1() == decks.deckClass3() || decks.deckClass1() == decks.deckClass4()) {
                return false;
            }
            else {
                return true;
            }
        },
        message: 'No duplicate classes.'
    }
});
hearthstoneObject.basicInfo.deckClass2.extend({
    validation: {
        validator: function () {
            var decks = hearthstoneObject.basicInfo;
            if (decks.deckClass2() == decks.deckClass1() || decks.deckClass2() == decks.deckClass3() || decks.deckClass2() == decks.deckClass4()) {
                return false;
            }
            else {
                return true;
            }
        },
        message: 'No duplicate classes.'
    }
});
hearthstoneObject.basicInfo.deckClass3.extend({
    validation: {
        validator: function () {
            var decks = hearthstoneObject.basicInfo;
            if (decks.deckClass3() == decks.deckClass2() || decks.deckClass3() == decks.deckClass1() || decks.deckClass3() == decks.deckClass4()) {
                return false;
            }
            else {
                return true;
            }
        },
        message: 'No duplicate classes.'
    }
});
hearthstoneObject.basicInfo.deckClass4.extend({
    validation: {
        validator: function () {
            var decks = hearthstoneObject.basicInfo;
            if (decks.deckClass4() == decks.deckClass2() || decks.deckClass4() == decks.deckClass3() || decks.deckClass4() == decks.deckClass1()) {
                return false;
            }
            else {
                return true;
            }
        },
        message: 'No duplicate classes.'
    }
});
ko.validation.rules.pattern.message = 'Invalid.';
$('#hearthstone-phone').mask('999-999-9999');
hearthstoneObject.basicInfo.deckClass1.subscribe(function () {
    console.log(hearthstoneObject.basicInfo.deckClass1());
});
function registerViewModel() {
    var self = this;
    this.showForm = function (params) {
        formVisible(!formVisible());
        if (formVisible()) {
            $('#' + params + '-item').addClass('game-item-active');
        }
        else {
            $('#' + params + '-item').removeClass('game-item-active');
        }
    };
    this.registerClick = function () {
        var returnBool = false;
        debugger;
        if (errors().length == 0) {
            hearthstoneObject.id(hearthstoneObject.basicInfo.firstName() + hearthstoneObject.basicInfo.lastName() + Math.floor(Math.random() * 1000) + 1);
            self.hsObjectUnwrapped = ko.toJS(hearthstoneObject);
            try {
                return firebase.database().ref('/registration/' + eventId()).once('value').then(function (result) {
                    if (result.val() != null) {
                        $.each(result.val(), function (index, item) {
                            if (index == registrationId()) {
                                firebase.database().ref('/registration/' + eventId() + '/' + registrationId()).set(self.hsObjectUnwrapped);
                                registrationId(index);
                                confirmCheckout(true);
                                returnBool = true;
                            }
                        });
                    }
                    if (!returnBool) {
                        var pushResult = firebase.database().ref('/registration/' + eventId()).push(self.hsObjectUnwrapped);
                        registrationId(pushResult.key);
                        confirmCheckout(true);
                    }
                });
            }
            catch (ex) {
                alert("Invalid registration input. Please try again!");
            }
        }
        else {
            errors.showAllMessages();
        }
    };
    this.cancelClick = function () {
        confirmCheckout(false);
    };
}
ko.applyBindings(new registerViewModel());
