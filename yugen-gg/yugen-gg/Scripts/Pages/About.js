var aboutText = ko.observable();
$().ready(function () {
    isBusy(true);
    return firebase.database().ref('/page-content/about/').once('value').then(function (result) {
        aboutText(result.val().mainText);
        isBusy(false);
    });
});
function aboutViewModel() {
}
ko.applyBindings(new aboutViewModel());
//# sourceMappingURL=About.js.map