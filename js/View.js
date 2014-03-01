/* functions for the view */

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
                  '<p class="lead">' + course.course_desc + '</p>' +
                  '<a class="close-reveal-modal">&#215;</a>';

      return html;
  }
}



// callback function once JSON has been loaded
function displayCourses(courseData){
    // generate the html for the courses
    function generateCourseHTML(id, course){
        var html = '<div class="row">' +
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


