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

let eventData = ko.observable<any>();
let loadComplete = ko.observable<boolean>(false);
let gameList = ko.observableArray();
let confirmCheckout = ko.observable<boolean>(false);

let eventId = ko.observable<string>();
let registrationId = ko.observable<string>();

let formVisible = ko.observable<boolean>(false);
let selectedGame = ko.observable<string>("");

let deckClasses = ko.observableArray([
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

let hearthstoneObject = {
    basicInfo: {
        firstName: ko.observable<string>().extend({ required: true }),
        lastName: ko.observable<string>().extend({ required: true }),
        battleId: ko.observable<string>().extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
        email: ko.observable<string>().extend({ required: true, email: true }),
        phone: ko.observable<string>().extend({ phoneUS: true, required: true }),

        deckClass1: ko.observable<string>().extend({ required: true }),
        deckClass2: ko.observable<string>().extend({ required: true }),
        deckClass3: ko.observable<string>().extend({ required: true }),
        deckClass4: ko.observable<string>().extend({ required: true })
    },
    id: ko.observable<string>(),
    game: 'Hearthstone'
}

let leagueObject = {
    basicInfo: {
        firstName: ko.observable<string>("").extend({ required: true }),
        lastName: ko.observable<string>("").extend({ required: true }),
        email: ko.observable<string>("").extend({ required: true, email: true }),
        phone: ko.observable<string>("").extend({ phoneUS: true, required: true }),
        summoner: ko.observable<string>("").extend({ required: true })
    },
    teamInfo: {
        player2FirstName: ko.observable<string>("").extend({ required: true }),
        player2LastName: ko.observable<string>("").extend({ required: true }),
        player2Summoner: ko.observable<string>("").extend({ required: true }),

        player3FirstName: ko.observable<string>("").extend({ required: true }),
        player3LastName: ko.observable<string>("").extend({ required: true }),
        player3Summoner: ko.observable<string>("").extend({ required: true }),

        player4FirstName: ko.observable<string>("").extend({ required: true }),
        player4LastName: ko.observable<string>("").extend({ required: true }),
        player4Summoner: ko.observable<string>("").extend({ required: true }),

        player5FirstName: ko.observable<string>("").extend({ required: true }),
        player5LastName: ko.observable<string>("").extend({ required: true }),
        player5Summoner: ko.observable<string>("").extend({ required: true }),

        coachFirstName: ko.observable<string>(""),
        coachLastName: ko.observable<string>(""),

        sub1FirstName: ko.observable<string>(""),
        sub1LastName: ko.observable<string>(""),
        sub1Summoner: ko.observable<string>(""),

        sub2FirstName: ko.observable<string>(""),
        sub2LastName: ko.observable<string>(""),
        sub2Summoner: ko.observable<string>(""),
    },
    id: ko.observable<string>(),
    game: 'League of Legends'
}

let overwatchObject = {
    basicInfo: {
        firstName: ko.observable<string>("test").extend({ required: true }),
        lastName: ko.observable<string>("test").extend({ required: true }),
        email: ko.observable<string>("test@test.com").extend({ required: true, email: true }),
        phone: ko.observable<string>("5133848411").extend({ phoneUS: true, required: true }),
        battleId: ko.observable<string>("test").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' }  })
    },
    teamInfo: {
        player2FirstName: ko.observable<string>("").extend({ required: true }),
        player2LastName: ko.observable<string>("").extend({ required: true }),
        player2battleId: ko.observable<string>("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' }  }),

        player3FirstName: ko.observable<string>("").extend({ required: true }),
        player3LastName: ko.observable<string>("").extend({ required: true }),
        player3battleId: ko.observable<string>("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' }  }),

        player4FirstName: ko.observable<string>("").extend({ required: true }),
        player4LastName: ko.observable<string>("").extend({ required: true }),
        player4battleId: ko.observable<string>("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' }  }),

        player5FirstName: ko.observable<string>("").extend({ required: true }),
        player5LastName: ko.observable<string>("").extend({ required: true }),
        player5battleId: ko.observable<string>("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' }  }),

        player6FirstName: ko.observable<string>("").extend({ required: true }),
        player6LastName: ko.observable<string>("").extend({ required: true }),
        player6battleId: ko.observable<string>("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' }  }),

        coachFirstName: ko.observable<string>("test"),
        coachLastName: ko.observable<string>("test"),

        sub1FirstName: ko.observable<string>("test"),
        sub1LastName: ko.observable<string>("test"),
        sub1battleId: ko.observable<string>("test").extend({ pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),

        sub2FirstName: ko.observable<string>(""),
        sub2LastName: ko.observable<string>(""),
        sub2battleId: ko.observable<string>("").extend({ pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
    },
    id: ko.observable<string>(),
    game: 'Overwatch'
}

let errors = {
    hearthstone: undefined,
    league: undefined
};
errors.hearthstone = ko.validation.group(hearthstoneObject, { deep: true });
errors.league = ko.validation.group(leagueObject, { deep: true });

hearthstoneObject.basicInfo.deckClass1.extend({
    validation: {
        validator: function() {
            let decks = hearthstoneObject.basicInfo;

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
            let decks = hearthstoneObject.basicInfo;

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
            let decks = hearthstoneObject.basicInfo;

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
            let decks = hearthstoneObject.basicInfo;

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

(<any>$('.phone-field')).mask('999-999-9999');

hearthstoneObject.basicInfo.deckClass1.subscribe(() => {
    console.log(hearthstoneObject.basicInfo.deckClass1());
})

function registerViewModel() {
    let self = this;

    this.showForm = (params: any) => {
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
    }

    this.registerClick = (game) => {

        if (errors[game]().length == 0) {
            console.log(eventData());
            if (game == 'hearthstone')
                this.hearthstoneRegistration();
            else if (game == 'league')
                this.leagueRegistration();
            else if (game == 'overwatch')
                this.overwatchRegistratioin();
        }
        else {
            errors[game].showAllMessages();
        }
        
    }

    this.getPayPalReturnUrl = (eventId, game, registrationId) => {
        let retObj = {
            custom: 'registration/' + eventId + '/' + game + '/' + registrationId,
            price: undefined
        };

        if (game == 'hearthstone')
            retObj.price = eventData().entryPrice + eventData().venuePrice;
        else if (game == 'league')
            retObj.price = (eventData().entryPrice + eventData().venuePrice) * 5;
        else if (game == 'overwatch')
            retObj.price = (eventData().entryPrice + eventData().venuePrice) * 6;

        return retObj;
    }

    this.hearthstoneRegistration = () => {
        let returnBool = false;

        hearthstoneObject.id(hearthstoneObject.basicInfo.firstName() + hearthstoneObject.basicInfo.lastName() + Math.floor(Math.random() * 1000) + 1);
        self.hsObjectUnwrapped = ko.toJS(hearthstoneObject);
        try {
            return firebase.database().ref('/registration/' + eventId()).once('value').then((result) => {
                if (result.val() != null) {
                    $.each(result.val(), (index, item) => {
                        if (index == registrationId()) {
                            firebase.database().ref('/registration/' + eventId() + '/hearthstone/' + registrationId()).set(self.hsObjectUnwrapped);
                            registrationId(index);
                            confirmCheckout(true);
                            returnBool = true;
                        }
                    });
                }

                if (!returnBool) {
                    let pushResult = firebase.database().ref('/registration/' + eventId() + '/hearthstone/').push(self.hsObjectUnwrapped);
                    registrationId(pushResult.key);
                    confirmCheckout(true);
                }
            });

        }
        catch (ex) {
            alert("Invalid registration input. Please try again!");
        }
    }

    this.leagueRegistration = () => {
        let returnBool = false;

        leagueObject.id(leagueObject.basicInfo.firstName() + leagueObject.basicInfo.lastName() + Math.floor(Math.random() * 1000) + 1);
        self.leagueObjectUnwrapped = ko.toJS(leagueObject);
        try {
            return firebase.database().ref('/registration/' + eventId()).once('value').then((result) => {
                if (result.val() != null) {
                    $.each(result.val(), (index, item) => {
                        if (index == registrationId()) {
                            firebase.database().ref('/registration/' + eventId() + '/league/' + registrationId()).set(self.leagueObjectUnwrapped);
                            registrationId(index);
                            confirmCheckout(true);
                            returnBool = true;
                        }
                    });
                }

                if (!returnBool) {
                    let pushResult = firebase.database().ref('/registration/' + eventId() + '/league/').push(self.leagueObjectUnwrapped);
                    registrationId(pushResult.key);
                    confirmCheckout(true);
                }
            });

        }
        catch (ex) {
            alert("Invalid registration input. Please try again!");
        }
    }

    this.overwatchRegistration = () => {
        let returnBool = false;

        overwatchObject.id(overwatchObject.basicInfo.firstName() + overwatchObject.basicInfo.lastName() + Math.floor(Math.random() * 1000) + 1);
        self.leagueObjectUnwrapped = ko.toJS(leagueObject);
        try {
            return firebase.database().ref('/registration/' + eventId()).once('value').then((result) => {
                if (result.val() != null) {
                    $.each(result.val(), (index, item) => {
                        if (index == registrationId()) {
                            firebase.database().ref('/registration/' + eventId() + '/overwatch/' + registrationId()).set(self.overwatchObjectUnwrapped);
                            registrationId(index);
                            confirmCheckout(true);
                            returnBool = true;
                        }
                    });
                }

                if (!returnBool) {
                    let pushResult = firebase.database().ref('/registration/' + eventId() + '/overwatch/').push(self.overwatchObjectUnwrapped);
                    registrationId(pushResult.key);
                    confirmCheckout(true);
                }
            });

        }
        catch (ex) {
            alert("Invalid registration input. Please try again!");
        }
    }

    this.cancelClick = () => {
        confirmCheckout(false);
    }
}

ko.applyBindings(new registerViewModel());