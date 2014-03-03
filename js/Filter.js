function Filter (){
    // handle a semester Filter event
    this.semesterFilter = function(eventObject){
        // jquery selector to find all the courses to hide. Note using the '*=' for selection.
        var selector = ".row.course[data-semester*='" + eventObject.currentTarget.value +"']";
        if(eventObject.currentTarget.checked){
            $(selector).slideDown();
        }else{
            $(selector).slideUp();
        }

    };

    // populate semesterFilter Form
    this.buildSemesterFilter = function(semesterList){
        var semesterListHTML="";
        var temp="";
        for(var i=0;i<semesterList.length;i++){
            temp = '<input type="checkbox" value="' + Course.prototype.termDisplay(semesterList[i]) + '" class="semesterFilter" checked><label>'+ Course.prototype.termDisplay(semesterList[i]) +'</label>';
            semesterListHTML = semesterListHTML+temp + "<br/>";
        }
        $("#semesterList")[0].innerHTML = semesterListHTML;
        $(".semesterFilter").on('click',this.semesterFilter);
    };





}