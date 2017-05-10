$().ready(function () {
    isBusy(true);
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "/admin/login";
        }
        else {
            loggedInUser(user);
        }
    });
    firebase.database().ref('/events/').once('value').then(function (result) {
        events(result.val());
        $.each(events(), function (index, item) {
            eventsArray.push(item);
        });
        firebase.database().ref('/registration/').once('value').then(function (result) {
            registrations(result.val());
            isBusy(false);
        });
    });
});
function adminViewModel() {
    this.getRegistrationNumbers = function (eventId) {
        var regCount = 0;
        var regEvents = $.map(registrations()[eventId], function (value, index) { return [value]; });
        $.each(regEvents, function (index, item) {
            var regGame = $.map(item, function (value, index) { return [value]; });
            regCount += regGame.length;
        });
        return regCount.toString();
    };
    this.selectEvent = function (eventId) {
        window.location.href = '/admin/events/' + eventId;
    };
    this.logout = function () {
        firebase.auth().signOut();
    };
}
ko.applyBindings(new adminViewModel);
//# sourceMappingURL=Index.js.map