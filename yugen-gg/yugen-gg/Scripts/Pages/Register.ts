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
        phone: ko.observable<string>().extend({ phoneUS: true }),

        deckClass1: ko.observable<string>().extend({ required: true }),
        deckClass2: ko.observable<string>().extend({ required: true }),
        deckClass3: ko.observable<string>().extend({ required: true }),
        deckClass4: ko.observable<string>().extend({ required: true })
    },
    id: ko.observable<string>(),
    game: 'Hearthstone'
}

let errors = ko.validation.group(hearthstoneObject, { deep: true });

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

(<any>$('#hearthstone-phone')).mask('999-999-9999');

hearthstoneObject.basicInfo.deckClass1.subscribe(() => {
    console.log(hearthstoneObject.basicInfo.deckClass1());
})

function registerViewModel() {
    let self = this;

    this.showForm = (params: any) => {
        formVisible(!formVisible());
        if (formVisible()) {
            $('#' + params + '-item').addClass('game-item-active');
        }
        else {
            $('#' + params + '-item').removeClass('game-item-active');
        }
    }

    this.registerClick = () => {
        let returnBool = false;
        debugger;
        if (errors().length == 0) {
            hearthstoneObject.id(hearthstoneObject.basicInfo.firstName() + hearthstoneObject.basicInfo.lastName() + Math.floor(Math.random() * 1000) + 1);
            self.hsObjectUnwrapped = ko.toJS(hearthstoneObject);
            try {
                return firebase.database().ref('/registration/' + eventId()).once('value').then((result) => {
                    if (result.val() != null) {
                        $.each(result.val(), (index, item) => {
                            if (index == registrationId()) {
                                firebase.database().ref('/registration/' + eventId() + '/' + registrationId()).set(self.hsObjectUnwrapped);
                                registrationId(index);
                                confirmCheckout(true);
                                returnBool = true;
                            }
                        });
                    }

                    if (!returnBool) {
                        let pushResult = firebase.database().ref('/registration/' + eventId()).push(self.hsObjectUnwrapped);
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
        
    }

    this.cancelClick = () => {
        confirmCheckout(false);
    }
}

ko.applyBindings(new registerViewModel());