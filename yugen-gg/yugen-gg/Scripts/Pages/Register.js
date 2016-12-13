var eventData = ko.observable();
var loadComplete = ko.observable(false);
var gameList = ko.observableArray();
var confirmCheckout = ko.observable(false);
var eventId = ko.observable();
var registrationId = ko.observable();
var formVisible = ko.observable(false);
var hearthstoneObject = {
    basicInfo: {
        firstName: ko.observable().extend({ required: true }),
        lastName: ko.observable().extend({ required: true }),
        battleId: ko.observable().extend({ required: true, pattern: { message: 'Invalid BattleTag', params: '^\\D.{2,11}#\\d{4,5}$' } }),
        email: ko.observable().extend({ required: true, email: true }),
        phone: ko.observable("").extend({ phoneUS: true })
    },
    id: ko.observable(),
    paid: ko.observable(false),
    game: 'Hearthstone'
};
ko.validation.rules.pattern.message = 'Invalid.';
ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
}, true);
var errors = ko.validation.group(hearthstoneObject);
debugger;
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
            alert(ex);
        }
    };
    this.cancelClick = function () {
        confirmCheckout(false);
    };
}
ko.applyBindings(new registerViewModel());
