$().ready(function () {
    isBusy(false);
});
function rulesViewModel() {
    this.showMore = function (id) {
        $('#' + id).prev().prevObject.addClass("text-expanded");
    };
}
ko.applyBindings(new rulesViewModel());
