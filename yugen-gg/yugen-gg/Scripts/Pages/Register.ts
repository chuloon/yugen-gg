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

let generalObject = {
    basicInfo: {
        firstName: ko.observable<string>().extend({ required: true }),
        lastName: ko.observable<string>().extend({ required: true }),
        email: ko.observable<string>().extend({ required: true, email: true })
    },
    id: ko.observable<string>(),
    game: 'General'
}

let smashObject = {
    basicInfo: {
        firstName: ko.observable<string>().extend({ required: true }),
        lastName: ko.observable<string>().extend({ required: true }),
        nickname: ko.observable<string>(),
        email: ko.observable<string>().extend({ required: true, email: true }),
        phone: ko.observable<string>().extend({ phoneUS: true, required: true }),
    },
    id: ko.observable<string>(),
    game: 'Hearthstone'
}

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
        firstName: ko.observable<string>("").extend({ required: true }),
        lastName: ko.observable<string>("").extend({ required: true }),
        email: ko.observable<string>("").extend({ required: true, email: true }),
        phone: ko.observable<string>("").extend({ phoneUS: true, required: true }),
        battleId: ko.observable<string>("").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' }  })
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

        coachFirstName: ko.observable<string>(""),
        coachLastName: ko.observable<string>(""),

        sub1FirstName: ko.observable<string>(""),
        sub1LastName: ko.observable<string>(""),
        sub1battleId: ko.observable<string>("").extend({ pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),

        sub2FirstName: ko.observable<string>(""),
        sub2LastName: ko.observable<string>(""),
        sub2battleId: ko.observable<string>("").extend({ pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
    },
    id: ko.observable<string>(),
    game: 'Overwatch'
}

let errors = {
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
            if (game == 'hearthstone')
                this.processRegistration(hearthstoneObject, game);
            else if (game == 'league')
                this.processRegistration(leagueObject, game);
            else if (game == 'overwatch')
                this.processRegistration(overwatchObject, game);
            else if (game == 'general')
                this.processRegistration(generalObject, game);
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
        else if (game == 'general')
            retObj.price = eventData().venuePrice;
        else if (game == 'smash')
            retObj.price = eventData().entryPrice + eventData().venuePrice;

        return retObj;
    }

    this.processRegistration = (data, game) => {
        let returnBool = false;

        data.id(generalObject.basicInfo.firstName() + data.basicInfo.lastName() + Math.floor(Math.random() * 1000 + 1));
        self.dataUnwrapped = ko.toJS(data);

        try {
            return firebase.database().ref('/registration/' + eventId()).once('value').then((result) => {
                if (result.val() != null) {
                    $.each(result.val(), (index, item) => {
                        if (index == registrationId()) {
                            firebase.database.ref('/registration/' + eventId() + '/' + game + '/' + registrationId()).set(self.dataUnwrapped);
                            registrationId(index);
                            confirmCheckout(true);
                            returnBool = true;
                        }
                    });
                }

                if (!returnBool) {
                    let pushResult = firebase.database().ref('/registration/' + eventId() + '/' + game + '/').push(self.dataUnwrapped);
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