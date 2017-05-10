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

function adminViewModel() {
    this.getRegistrationNumbers = (eventId) => {
        let regCount = 0;
        let regEvents = $.map(registrations()[eventId], (value, index) => { return [value] });

        $.each(regEvents, (index, item) => {
            let regGame = $.map(item, (value, index) => { return [value] });
            regCount += regGame.length;
        });
        
        return regCount.toString();
    }

    this.selectEvent = (eventId) => {
        window.location.href = '/admin/events/' + eventId;
    }

    this.logout = () => {
        firebase.auth().signOut();
    }
}

ko.applyBindings(new adminViewModel);