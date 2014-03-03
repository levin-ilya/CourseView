function View(coursesData){
    this.courses = coursesData;
    this.filter = new Filter();

    // get all the unique semesters
    var semesters = this.courses.getAllSemesters();

    // builds the filter form
    this.filter.buildSemesterFilter(semesters);

    this.displayCourses(this.courses); //displays initial list of courses with detail button

}

View.prototype = {
    displayCourses: function (courses){
    // generate the html for the courses

        var courseHTML = "";
        var html = $('#courseRow').html();

        // loop through each course within the courseData object
        for(var course in this.courses.courseData){
            //create some course object
            // on the row $(row).data('course', new CourseObj(course))
            // someone clicks row
            // in click handler obj = $(this).data('course')           prototype
            // obj.showRow() will display the popup
            // bind event handlers
            courseHTML += this.generateCourseHtml(new Course(this.courses.courseData[course]),html);
        }


        $("#courseList").append(courseHTML);
        // var output = Mustache.render(object, view);
        // add event listen for the Details button

        this.bindEventHandlers();
    },
    generateCourseHtml: function(course, template){
        return Mustache.render(template, course);
    },
    bindEventHandlers: function(){
        // mock object to be filled in later on detail event click
        var c = new Course({"terms":[]});

        $('.detailsButton').on("click",c.show.bind(c));
    }
}

