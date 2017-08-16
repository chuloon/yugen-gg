$().ready(() => {
    isBusy(false);
});

function rulesViewModel() {

    this.toggleShow = (id: string) => {
        let collapseArticle = (<any>$('#' + id));
        if (collapseArticle.prev().hasClass("text-expanded")) {
            collapseArticle.text("Read More");
            collapseArticle.prev().removeClass("text-expanded");
        }
        else {
            collapseArticle.text("Show Less");
            collapseArticle.prev().addClass("text-expanded");
        }
    }
}

ko.applyBindings(new rulesViewModel());