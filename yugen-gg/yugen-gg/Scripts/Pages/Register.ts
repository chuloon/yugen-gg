let eventData = ko.observable<any>();
let loadComplete = ko.observable<boolean>(false);
let gameList = ko.observableArray();
let confirmCheckout = ko.observable<boolean>(false);

let eventId = ko.observable<string>();
let registrationId = ko.observable<string>();

let formVisible = ko.observable<boolean>(false);

let hearthstoneObject = {
    basicInfo: {
        firstName: ko.observable<string>().extend({ maxLength: 2 }),
        lastName: ko.observable<string>(),
        battleId: ko.observable<string>(),
        email: ko.observable<string>(),
        phone: ko.observable<string>("")
    },
    id: ko.observable<string>(),
    paid: ko.observable<boolean>(false),
    game: 'Hearthstone'
}

ko.validation.rules.pattern.message = 'Invalid.';

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
}, true);

let errors = ko.validation.group(hearthstoneObject);
debugger;

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
            alert(ex);
        }
    }

    this.cancelClick = () => {
        confirmCheckout(false);
    }
}

ko.applyBindings(new registerViewModel());