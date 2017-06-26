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
var generalObject = {
    basicInfo: {
        firstName: ko.observable().extend({ required: true }),
        lastName: ko.observable().extend({ required: true }),
        email: ko.observable().extend({ required: true, email: true })
    },
    id: ko.observable(),
    game: 'General'
};
var smashObject = {
    basicInfo: {
        firstName: ko.observable().extend({ required: true }),
        lastName: ko.observable().extend({ required: true }),
        nickname: ko.observable(),
        email: ko.observable().extend({ required: true, email: true }),
        phone: ko.observable().extend({ phoneUS: true, required: true }),
    },
    id: ko.observable(),
    game: 'Hearthstone'
};
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
        firstName: ko.observable("").extend({ required: true }),
        lastName: ko.observable("").extend({ required: true }),
        email: ko.observable("").extend({ required: true, email: true }),
        phone: ko.observable("").extend({ phoneUS: true, required: true }),
        summoner: ko.observable("").extend({ required: true })
    },
    teamInfo: {
        player2FirstName: ko.observable("").extend({ required: true }),
        player2LastName: ko.observable("").extend({ required: true }),
        player2Summoner: ko.observable("").extend({ required: true }),
        player3FirstName: ko.observable("").extend({ required: true }),
        player3LastName: ko.observable("").extend({ required: true }),
        player3Summoner: ko.observable("").extend({ required: true }),
        player4FirstName: ko.observable("").extend({ required: true }),
        player4LastName: ko.observable("").extend({ required: true }),
        player4Summoner: ko.observable("").extend({ required: true }),
        player5FirstName: ko.observable("").extend({ required: true }),
        player5LastName: ko.observable("").extend({ required: true }),
        player5Summoner: ko.observable("").extend({ required: true }),
        coachFirstName: ko.observable(""),
        coachLastName: ko.observable(""),
        sub1FirstName: ko.observable(""),
        sub1LastName: ko.observable(""),
        sub1Summoner: ko.observable(""),
        sub2FirstName: ko.observable(""),
        sub2LastName: ko.observable(""),
        sub2Summoner: ko.observable(""),
    },
    id: ko.observable(),
    game: 'League of Legends'
};
var overwatchObject = {
    basicInfo: {
        firstName: ko.observable("").extend({ required: true }),
        lastName: ko.observable("").extend({ required: true }),
        email: ko.observable("").extend({ required: true, email: true }),
        phone: ko.observable("").extend({ phoneUS: true, required: true }),
        battleId: ko.observable("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } })
    },
    teamInfo: {
        player2FirstName: ko.observable("").extend({ required: true }),
        player2LastName: ko.observable("").extend({ required: true }),
        player2battleId: ko.observable("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
        player3FirstName: ko.observable("").extend({ required: true }),
        player3LastName: ko.observable("").extend({ required: true }),
        player3battleId: ko.observable("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
        player4FirstName: ko.observable("").extend({ required: true }),
        player4LastName: ko.observable("").extend({ required: true }),
        player4battleId: ko.observable("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
        player5FirstName: ko.observable("").extend({ required: true }),
        player5LastName: ko.observable("").extend({ required: true }),
        player5battleId: ko.observable("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
        player6FirstName: ko.observable("").extend({ required: true }),
        player6LastName: ko.observable("").extend({ required: true }),
        player6battleId: ko.observable("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
        coachFirstName: ko.observable(""),
        coachLastName: ko.observable(""),
        sub1FirstName: ko.observable(""),
        sub1LastName: ko.observable(""),
        sub1battleId: ko.observable("").extend({ pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
        sub2FirstName: ko.observable(""),
        sub2LastName: ko.observable(""),
        sub2battleId: ko.observable("").extend({ pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
    },
    id: ko.observable(),
    game: 'Overwatch'
};
var errors = {
    hearthstone: undefined,
    league: undefined,
    overwatch: undefined,
    general: undefined
};
errors.hearthstone = ko.validation.group(hearthstoneObject, { deep: true });
errors.league = ko.validation.group(leagueObject, { deep: true });
errors.overwatch = ko.validation.group(overwatchObject, { deep: true });
errors.general = ko.validation.group(generalObject, { deep: true });
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
            if (game == 'hearthstone')
                _this.processRegistration(hearthstoneObject, game);
            else if (game == 'league')
                _this.processRegistration(leagueObject, game);
            else if (game == 'overwatch')
                _this.processRegistration(overwatchObject, game);
            else if (game == 'general')
                _this.processRegistration(generalObject, game);
        }
        else {
            errors[game].showAllMessages();
        }
    };
    this.getPayPalReturnUrl = function (eventId, game, registrationId) {
        var retObj = {
            custom: 'registration/' + eventId + '/' + game + '/' + registrationId,
            price: undefined
        };
        if (game == 'hearthstone')
            retObj.price = eventData().entryPrice + eventData().venuePrice;
        else if (game == 'league')
            retObj.price = (eventData().entryPrice + eventData().venuePrice) * 5;
        else if (game == 'overwatch')
            retObj.price = (eventData().entryPrice + eventData().venuePrice) * 6;
        else if (game == 'general')
            retObj.price = eventData().venuePrice;
        else if (game == 'smash')
            retObj.price = eventData().entryPrice + eventData().venuePrice;
        return retObj;
    };
    this.processRegistration = function (data, game) {
        var returnBool = false;
        data.id(generalObject.basicInfo.firstName() + data.basicInfo.lastName() + Math.floor(Math.random() * 1000 + 1));
        self.dataUnwrapped = ko.toJS(data);
        try {
            return firebase.database().ref('/registration/' + eventId()).once('value').then(function (result) {
                if (result.val() != null) {
                    $.each(result.val(), function (index, item) {
                        if (index == registrationId()) {
                            firebase.database.ref('/registration/' + eventId() + '/' + game + '/' + registrationId()).set(self.dataUnwrapped);
                            registrationId(index);
                            confirmCheckout(true);
                            returnBool = true;
                        }
                    });
                }
                if (!returnBool) {
                    var pushResult = firebase.database().ref('/registration/' + eventId() + '/' + game + '/').push(self.dataUnwrapped);
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
