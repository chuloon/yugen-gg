$().ready(() => {
    isBusy(true);
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location.href = "/admin/login";
        }
        else {
            loggedInUser(user);
        }
    });
    
    firebase.database().ref('/events/').once('value').then((result) => {
        events(result.val());
        $.each(events(), (index, item) => {
            eventsArray.push(item);
        });

        firebase.database().ref('/registration/').once('value').then((result) => {
            registrations(result.val());
            isBusy(false);
        });
    });
});

let registrations = ko.observable<any>();
let loggedInUser = ko.observable<any>();

function adminViewModel() {
    this.getRegistrationNumbers = (eventId) => {
        let regCount = 0;
        let regEvents = $.map(registrations()[eventId], (value, index) => { return [value] });

        $.each(regEvents, (index, item) => {
            let regGame = $.map(item, (value, index) => { return [value] });
            regCount += regGame.length;
        });

        debugger;
        return regCount.toString();
    }
}

ko.applyBindings(new adminViewModel);