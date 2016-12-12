let eventData = ko.observable<any>();
let loadComplete = ko.observable<boolean>(false);
let gameList = ko.observableArray();

let formVisible = ko.observable<boolean>(false);

let hearthstoneObject = {
    basicInfo: {
        firstName: ko.observable<string>(),
        lastName: ko.observable<string>(),
        battleId: ko.observable<string>(),
        email: ko.observable<string>(),
        phone: ko.observable<string>()
    }
}

function registerSuccess() {
    debugger;
}

function registerViewModel() {
    this.showForm = (params: any) => {
        formVisible(!formVisible());
        if (formVisible()) {
            $('#' + params + '-item').addClass('game-item-active');
        }
        else {
            $('#' + params + '-item').removeClass('game-item-active');
        }
    }
}

ko.applyBindings(new registerViewModel());