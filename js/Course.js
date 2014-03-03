function Course(init){
    this.course = init;
    this.terms= this.getTerms();
}

Course.prototype = {
    show: function(object){
        object.preventDefault();
        // get the object from the course attribute
        this.course = JSON.parse(object.currentTarget.getAttribute("data-course"));
        // storing terms into an array so it can be loop through the Mustache framework
        this.terms = this.getTerms();
        // get the html Mustache template
        var html = $("#detailsPopupTemplate").html();
        $("#detailsPopup")[0].innerHTML = Mustache.render(html,this);
        // reveals the details window
        $("#detailsPopup").foundation('reveal', 'open');
    },
    toJSON: function(){
       return JSON.stringify(this.course);
    },
    getTerms: function(){
        var termArray = new Array();
        for(var term in this.course.terms){
            // need to add the term (ie: 2013_fall) to the term object
            // so we don't lose that data when we store it in an array
            var displayTerm = {
                term: this.termDisplay(term),
                meets: this.meetDisplay(this.course.terms[term].meet_times),
                instructors: this.course.terms[term].instructors
            };

            termArray.push(displayTerm);
        }
        return termArray;
    },
    // takes a term - 2013_fall and returns Fall 2013
    termDisplay: function(term){
        var temp =   term.split("_").reverse();
        temp[0] = temp[0].charAt(0).toUpperCase() + temp[0].slice(1);
        return temp.join(" ");
    },
    meetDisplay: function (meeting_times){
        var meetsList = [];
        if(meeting_times.length==0){
            return "N/A";
        }
        for(var i=0;i<meeting_times.length;i++){
            var appendText =  meeting_times[i].weekDay + " " + meeting_times[i].startTime.substr(0,5) + "-" + meeting_times[i].endTime.substr(0,5) + " "  ;
            if(meeting_times[i].building != "" && meeting_times[i].building != "unknown"){
                meeting_times[i].building + " Rm:" + meeting_times[i].room ;
            }
            meetsList.push(appendText);
        }
        return meetsList;
    }


};
