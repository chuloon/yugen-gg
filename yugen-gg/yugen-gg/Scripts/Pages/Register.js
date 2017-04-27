ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null,
    grouping: {
        deep: true,
        live: true,
        observable: true
    }
}, true);
var eventData = ko.observable();
var loadComplete = ko.observable(false);
var gameList = ko.observableArray();
var confirmCheckout = ko.observable(false);
var eventId = ko.observable();
var registrationId = ko.observable();
var formVisible = ko.observable(false);
var selectedGame = ko.observable("");
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
        phone: ko.observable().extend({ phoneUS: true, required: true }),
        deckClass1: ko.observable().extend({ required: true }),
        deckClass2: ko.observable().extend({ required: true }),
        deckClass3: ko.observable().extend({ required: true }),
        deckClass4: ko.observable().extend({ required: true })
    },
    id: ko.observable(),
    game: 'Hearthstone'
};
var leagueObject = {
    basicInfo: {
        firstName: ko.observable("test").extend({ required: true }),
        lastName: ko.observable("test").extend({ required: true }),
        email: ko.observable("test@test.com").extend({ required: true, email: true }),
        phone: ko.observable("5133848411").extend({ phoneUS: true, required: true }),
        summoner: ko.observable("test").extend({ required: true })
    },
    teamInfo: {
        player2FirstName: ko.observable("test").extend({ required: true }),
        player2LastName: ko.observable("test").extend({ required: true }),
        player2Summoner: ko.observable("test").extend({ required: true }),
        player3FirstName: ko.observable("test").extend({ required: true }),
        player3LastName: ko.observable("test").extend({ required: true }),
        player3Summoner: ko.observable("test").extend({ required: true }),
        player4FirstName: ko.observable("test").extend({ required: true }),
        player4LastName: ko.observable("test").extend({ required: true }),
        player4Summoner: ko.observable("test").extend({ required: true }),
        player5FirstName: ko.observable("test").extend({ required: true }),
        player5LastName: ko.observable("test").extend({ required: true }),
        player5Summoner: ko.observable("test").extend({ required: true }),
        coachFirstName: ko.observable("test"),
        coachLastName: ko.observable("test"),
        sub1FirstName: ko.observable("test"),
        sub1LastName: ko.observable("test"),
        sub1Summoner: ko.observable("test"),
        sub2FirstName: ko.observable(""),
        sub2LastName: ko.observable(""),
        sub2Summoner: ko.observable(""),
    },
    id: ko.observable(),
    game: 'League of Legends'
};
var errors = {
    hearthstone: undefined,
    league: undefined
};
errors.hearthstone = ko.validation.group(hearthstoneObject, { deep: true });
errors.league = ko.validation.group(leagueObject, { deep: true });
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
$('.phone-field').mask('999-999-9999');
hearthstoneObject.basicInfo.deckClass1.subscribe(function () {
    console.log(hearthstoneObject.basicInfo.deckClass1());
});
function registerViewModel() {
    var _this = this;
    var self = this;
    this.showForm = function (params) {
        if (selectedGame() == params)
            formVisible(!formVisible());
        else
            formVisible(true);
        selectedGame(params);
        if (formVisible()) {
            $('.game-item-active').removeClass('game-item-active');
            $('#' + params + '-item').addClass('game-item-active');
        }
        else {
            $('#' + params + '-item').removeClass('game-item-active');
        }
    };
    this.registerClick = function (game) {
        if (errors[game]().length == 0) {
            console.log(eventData());
            if (game == 'hearthstone')
                _this.hearthstoneRegistration();
            else if (game == 'league')
                _this.leagueRegistration();
        }
        else {
            errors[game].showAllMessages();
        }
    };
    this.hearthstoneRegistration = function () {
        var returnBool = false;
        hearthstoneObject.id(hearthstoneObject.basicInfo.firstName() + hearthstoneObject.basicInfo.lastName() + Math.floor(Math.random() * 1000) + 1);
        self.hsObjectUnwrapped = ko.toJS(hearthstoneObject);
        try {
            return firebase.database().ref('/registration/' + eventId()).once('value').then(function (result) {
                if (result.val() != null) {
                    $.each(result.val(), function (index, item) {
                        if (index == registrationId()) {
                            firebase.database().ref('/registration/' + eventId() + '/hearthstone/' + registrationId()).set(self.hsObjectUnwrapped);
                            registrationId(index);
                            confirmCheckout(true);
                            returnBool = true;
                        }
                    });
                }
                if (!returnBool) {
                    var pushResult = firebase.database().ref('/registration/' + eventId() + '/hearthstone/').push(self.hsObjectUnwrapped);
                    registrationId(pushResult.key);
                    confirmCheckout(true);
                }
            });
        }
        catch (ex) {
            alert("Invalid registration input. Please try again!");
        }
    };
    this.leagueRegistration = function () {
        var returnBool = false;
        leagueObject.id(leagueObject.basicInfo.firstName() + leagueObject.basicInfo.lastName() + Math.floor(Math.random() * 1000) + 1);
        self.leagueObjectUnwrapped = ko.toJS(leagueObject);
        try {
            return firebase.database().ref('/registration/' + eventId()).once('value').then(function (result) {
                if (result.val() != null) {
                    $.each(result.val(), function (index, item) {
                        if (index == registrationId()) {
                            firebase.database().ref('/registration/' + eventId() + '/league/' + registrationId()).set(self.leagueObjectUnwrapped);
                            registrationId(index);
                            confirmCheckout(true);
                            returnBool = true;
                        }
                    });
                }
                if (!returnBool) {
                    var pushResult = firebase.database().ref('/registration/' + eventId() + '/league/').push(self.leagueObjectUnwrapped);
                    registrationId(pushResult.key);
                    confirmCheckout(true);
                }
            });
        }
        catch (ex) {
            alert("Invalid registration input. Please try again!");
        }
    };
    this.cancelClick = function () {
        confirmCheckout(false);
    };
}
ko.applyBindings(new registerViewModel());
//# sourceMappingURL=Register.js.map