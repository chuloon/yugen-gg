var selectedEvent = {
    date: ko.observable(),
    entryPrice: ko.observable(),
    eventHeader: ko.observable(),
    eventThumb: ko.observable(),
    games: ko.observable(),
    id: ko.observable(),
    locationShort: ko.observable(),
    longDescription: ko.observable(),
    name: ko.observable(),
    orderBy: ko.observable(),
    time: ko.observable(),
    venuePrice: ko.observable()
};
$().ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "/admin/login";
        }
        else {
            loggedInUser(user);
        }
    });
});
function adminEventsViewModel() {
    this.saveEvent = function () {
        isBusy(true);
        var objUnwrapped = ko.toJS(selectedEvent);
        firebase.database().ref('/events/' + selectedEvent.id()).set(objUnwrapped)
            .then(function () {
            isBusy(false);
            alert("Save successful!");
        })
            .catch(function (e) {
            isBusy(false);
            alert(e);
        });
    };
    this.backClick = function () {
        window.history.back();
    };
}
ko.applyBindings(new adminEventsViewModel);
//# sourceMappingURL=Events.js.map