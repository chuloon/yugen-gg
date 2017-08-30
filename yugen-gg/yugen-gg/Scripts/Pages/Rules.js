$().ready(function () {
    isBusy(false);
});
function rulesViewModel() {
    this.toggleShow = function (id) {
        var collapseArticle = $('#' + id);
        if (collapseArticle.prev().hasClass("text-expanded")) {
            collapseArticle.text("Read More");
            collapseArticle.prev().removeClass("text-expanded");
        }
        else {
            collapseArticle.text("Show Less");
            collapseArticle.prev().addClass("text-expanded");
        }
    };
}
ko.applyBindings(new rulesViewModel());
//# sourceMappingURL=Rules.js.map