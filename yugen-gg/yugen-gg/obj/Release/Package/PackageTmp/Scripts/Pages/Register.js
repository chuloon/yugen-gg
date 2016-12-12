var eventData = ko.observable();
var loadComplete = ko.observable(false);
var gameList = ko.observableArray();
var formVisible = ko.observable(false);
var hearthstoneObject = {
    basicInfo: {
        firstName: ko.observable(),
        lastName: ko.observable(),
        battleId: ko.observable(),
        email: ko.observable(),
        phone: ko.observable()
    }
};
function registerSuccess() {
    debugger;
}
function registerViewModel() {
    this.showForm = function (params) {
        formVisible(!formVisible());
        if (formVisible()) {
            $('#' + params + '-item').addClass('game-item-active');
        }
        else {
            $('#' + params + '-item').removeClass('game-item-active');
        }
    };
}
ko.applyBindings(new registerViewModel());
//# sourceMappingURL=Register.js.map