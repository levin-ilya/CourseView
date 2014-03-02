function Courses(){
    var courseData;
    var dataPath;
    var semesterList

    this.loadData = function (path,callback){
        dataPath = path;
        $.getJSON(path,function(data){
            courseData = data;
            callback(courseData);
        });
    }

    this.getCourseDetail = function(id){
       return courseData[id];
    }

    this.getAllSemesters = function(){
        // find all the semesters from the data set
        semesterList =  new Set();
        for(var course in courseData){
            for(var term in courseData[course].terms){
               semesterList.add(term);
            }
        }
        return Object.keys(semesterList);
    }



}
