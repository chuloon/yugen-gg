let selectedEvent = {
    date: ko.observable<any>(),
    entryPrice: ko.observable<any>(),
    eventHeader: ko.observable<any>(),
    eventThumb: ko.observable<any>(),
    games: ko.observable<any>(),
    id: ko.observable<any>(),
    locationShort: ko.observable<any>(),
    longDescription: ko.observable<any>(),
    name: ko.observable<any>(),
    orderBy: ko.observable<any>(),
    time: ko.observable<any>(),
    venuePrice: ko.observable<any>()
};

$().ready(() => {
    
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location.href = "/admin/login";
        }
        else {
            loggedInUser(user);
        }
    });
});

function adminEventsViewModel() {
    this.saveEvent = () => {
        isBusy(true);
        let objUnwrapped = ko.toJS(selectedEvent);
        firebase.database().ref('/events/' + selectedEvent.id()).set(objUnwrapped)
            .then(() => {
                isBusy(false);
                alert("Save successful!");
            })
            .catch((e) => {
                isBusy(false);
                alert(e);
            });
    }

    this.backClick = () => {
        window.history.back();
    }
}

ko.applyBindings(new adminEventsViewModel);