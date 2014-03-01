function Courses(){
    var courseData;

    this.loadData = function (path,callback){
        $.getJSON(path,function(data){
            courseData = data;
            callback(courseData);
        });
    }

    this.getCourseDetail = function(id){
       return courseData[id];
    }
}
