$().ready(function () {
    isBusy(false);
});
var leagueReadMore = ko.observable("Read More");
function rulesViewModel() {
    this.toggleShow = function (id) {
        if (leagueReadMore() == "Read More") {
            $('#' + id).prev().prevObject.addClass("text-expanded");
            leagueReadMore("Show Less");
        }
        else {
            $('#' + id).prev().prevObject.removeClass("text-expanded");
            leagueReadMore("Read More");
        }
    };
}
ko.applyBindings(new rulesViewModel());
