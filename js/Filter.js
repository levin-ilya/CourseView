function Filter (){
    // handle a semester Filter event
    this.semesterFilter = function(eventObject){
      // get all selected semesters filters
        var selectedSemesters = $(":checked").map(function (index,element){return element.value});

        // if nothing is selected just hide all the rows
        if(selectedSemesters.length==0){
            $(".row.course").slideUp();
        }else{
            // get all courses HTML
            var coursesHTML = $(".row.course");

            // loop through each courses and make sure it's part of the selected filters
            // otherwise hide it
            for(var courseIdx=0;courseIdx<coursesHTML.length;courseIdx++){
                // loop through each semester and test if it's the semester attribute
                var course = coursesHTML[courseIdx];

                for(var semesterIdx=0;semesterIdx<selectedSemesters.length;semesterIdx++){
                    var semesterTest =  course.getAttribute("data-semester").indexOf(selectedSemesters[semesterIdx]);
                    if(semesterTest>=0){
                        course.setAttribute("data-filter","on");
                        break;
                    }else{
                        course.setAttribute("data-filter","off");
                    }
                }

            }
            $(".row.course[data-filter='on']").slideDown();
            $(".row.course[data-filter='off']").slideUp();
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