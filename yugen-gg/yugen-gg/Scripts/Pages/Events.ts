﻿$().ready(() => {
    isBusy(true);
    eventsArray([]);
    return firebase.database().ref('/events/').once('value').then((result) => {
        events(result.val());
        $.each(events(), (index, item) => {
            eventsArray.push(item);
        });
        console.log(eventsArray());
        isBusy(false);
    });
});

function eventsViewModel() {

}

isBusy(false);

ko.applyBindings(new eventsViewModel());