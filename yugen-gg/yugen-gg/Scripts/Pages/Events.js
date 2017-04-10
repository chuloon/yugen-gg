$().ready(function () {
    isBusy(true);
    eventsArray([]);
    return firebase.database().ref('/events/').once('value').then(function (result) {
        events(result.val());
        $.each(events(), function (index, item) {
            eventsArray.push(item);
        });
        console.log(eventsArray());
        isBusy(false);
    });
});
function eventsViewModel() {
    this.registerClick = function (params) {
        window.location.href = "/Register/" + params;
    };
}
isBusy(false);
ko.applyBindings(new eventsViewModel());
//# sourceMappingURL=Events.js.map