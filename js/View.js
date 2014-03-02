/* functions for the view */

// handle a semester Filter event
function semesterFilter(eventObject){
    // jquery selector to find all the courses to hide. Note using the '*=' for selection.
    var selector = ".row.course[data-semester*='" + eventObject.currentTarget.value +"']";
    if(eventObject.currentTarget.checked){
        $(selector).slideDown();
    }else{
        $(selector).slideUp();
    }

}

// populate semesterFilter Form
function buildSemesterFilter(semesterList){
    var semesterListHTML="";
    var temp="";
    for(var i=0;i<semesterList.length;i++){
        temp = '<input type="checkbox" value="' + semesterList[i] + '" class="semesterFilter" checked><label>'+ termDisplay(semesterList[i]) +'</label>';
        semesterListHTML = semesterListHTML+temp + "<br/>";
    }
    $("#semesterList")[0].innerHTML = semesterListHTML;

    // add listeners to the filter options
    $(".semesterFilter").on('click',semesterFilter);

}

// Displays Modal window after click on Details button
function displayCourseDetail(eventObject){
  eventObject.preventDefault();
  var id = eventObject.currentTarget.getAttribute('data-id');
  var course = window.ilevin.courseApp.getCourseDetail(id);
  var courseDetailHTML = generateCourseDetailHTML(course);
  $('#detailsPopup')[0].innerHTML = courseDetailHTML;
    $('#detailsPopup').foundation('reveal', 'open');
  function generateCourseDetailHTML(course){
      var html = '<h2>' + course.course_name + ' | ' + course.course_title  + '</h2>' +
                  '<p>' + course.course_desc + '</p>' +
                  // Course History
                  generateCourseHistory(course.terms) +
                  '<a class="close-reveal-modal">&#215;</a>';

      return html;
  }

  function generateCourseHistory(terms){
     var html =    '<table>'  +
        ' <thead>'  +
             '<tr>'  +
                 '<th>Semester</th>' +
                 '<th>Instructors</th>' +
                 '<th>Schedule</th>' +
             '</tr>'  +
         '</thead>'  +
         '<tbody>'  +
             generateHistoryRows(terms) +
         '</tbody>'   +
         '</table>'
      return html;
  }

  function generateHistoryRows(terms){
      var html = "";
      var appendString;
      for(term in terms){
         if(terms.hasOwnProperty(term)){
             appendString =
                 '<tr>'  +
                 '<td>' +  termDisplay(term) + '</td>' +
                 '<td>' + displayInstructors(terms[term].instructors) + '</td>'  +
                 '<td>'  +
                    generateSchedule(terms[term].meet_times)  +
                 '</td>'   +
                 '</tr>'
             html = html + appendString;
         }
      }
      return html;
  }

  function displayInstructors(instructors){

     return instructors.length==0 ? "N/A" : instructors.join("<br>");
  }

  function generateSchedule(meeting_times){
      var finalText = "";
      var appendText;
      if(meeting_times.length==0){
          return "N/A";
      }
      for(var i=0;i<meeting_times.length;i++){
          appendText =  meeting_times[i].weekDay + " " + meeting_times[i].startTime.substr(0,5) + "-" + meeting_times[i].endTime.substr(0,5) + " "  ;
          if(meeting_times[i].building != "" && meeting_times[i].building != "unknown"){
              meeting_times[i].building + " Rm:" + meeting_times[i].room ;
          }
          finalText = finalText + appendText + "<br>";
      }
     return finalText;
  }
}

// takes a term - 2013_fall and returns Fall 2013
function termDisplay(term){
    var temp =   term.split("_").reverse();
    temp[0] = temp[0].charAt(0).toUpperCase() + temp[0].slice(1);
    return temp.join(" ");
}


// callback function once JSON has been loaded
function displayCourses(courseData){
    // generate the html for the courses
    function generateCourseHTML(id, course){
        var html = '<div class="row course" data-semester="'+ Object.keys(course.terms).join(",") + '">' +
            '<div class="large-12 columns">' +
            '<div class="callout panel"><p><strong>' +   course.course_name + ' | ' + course.course_title  +
            '</strong> <br>' + course.course_desc + '</p>' +
            '<a href="#" class="small round button detailsButton" data-id="'+id+'">Details</a><br/>' +
            '</div>' +
            '</div>' +
            '</div>'

        return html;
    }

    // loop through each course within the courseData object
    for(var id in courseData){
        // make sure the element is it's own and not inherited
        if(courseData.hasOwnProperty(id)){
            // add the course to the list to display
            var courseHTML = generateCourseHTML(id,courseData[id])
            $("#courseList").append(courseHTML);
        }
    }

    // add event listen for the Details button
    $('.detailsButton').on("click",displayCourseDetail);




}




