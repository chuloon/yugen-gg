﻿ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
}, true);

let eventData = ko.observable<any>();
let loadComplete = ko.observable<boolean>(false);
let gameList = ko.observableArray();
let confirmCheckout = ko.observable<boolean>(false);

let eventId = ko.observable<string>();
let registrationId = ko.observable<string>();

let formVisible = ko.observable<boolean>(false);

let hearthstoneObject = {
    basicInfo: {
        firstName: ko.observable<string>("test").extend({ required: true }),
        lastName: ko.observable<string>("test").extend({ required: true }),
        battleId: ko.observable<string>("test#1234").extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
        email: ko.observable<string>("test@test.com").extend({ required: true, email: true }),
        phone: ko.observable<string>("5133848411").extend({ phoneUS: true })
    },
    id: ko.observable<string>(),
    game: 'Hearthstone'
}

let errors = ko.validation.group(hearthstoneObject);

ko.validation.rules.pattern.message = 'Invalid.';

(<any>$('#hearthstone-phone')).mask('999-999-9999');



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
                    debugger;
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
            alert("Errors!")
        }
        
    }

    this.cancelClick = () => {
        confirmCheckout(false);
    }
}

ko.applyBindings(new registerViewModel());