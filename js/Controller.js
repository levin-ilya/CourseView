function setupView(data){
    displayCourses(data);
    setupFilter();
}

function setupFilter(){
    var semesters = ilevin.courseApp.getAllSemesters();
    buildSemesterFilter(semesters);
}