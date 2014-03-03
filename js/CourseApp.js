function CourseApp(){
    //data source would typically come from api which is not modeled here
    //this solution is not the most optimal but in a production environment
    //id pass in the parameters of the search
    new Courses("data/Courses.json");
}
