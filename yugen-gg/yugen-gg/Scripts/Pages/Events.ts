$().ready(() => {
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
    this.registerClick = (params: any) => {
        window.location.href = "/Register/" + params;
    }
}

isBusy(false);

ko.applyBindings(new eventsViewModel());