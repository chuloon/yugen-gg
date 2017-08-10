$().ready(() => {
    isBusy(false);
});

let leagueReadMore = ko.observable<string>("Read More");

function rulesViewModel() {

    this.toggleShow = (id: string) => {
        if (leagueReadMore() == "Read More") {
            (<any>$('#' + id)).prev().prevObject.addClass("text-expanded");
            leagueReadMore("Show Less");
        }
        else {
            (<any>$('#' + id)).prev().prevObject.removeClass("text-expanded");
            leagueReadMore("Read More");
        }
    }
}

ko.applyBindings(new rulesViewModel());