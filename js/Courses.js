function Courses(dataUrl){
    this.dataUrl = dataUrl;
    this.loadData(dataUrl);
}

Courses.prototype = {
    loadData:  function (path){
        $.getJSON(this.dataUrl,this.storeData.bind(this));
    },
    getCourseDetail: function(id){
        return this.courseData[id];
    },
    getAllSemesters: function(){
        // find all the semesters from the data set
        var semesterList =  new Set();
        for(var course in this.courseData){
            for(var term in this.courseData[course].terms){
                semesterList.add(term);
            }
        }
        return Object.keys(semesterList);
    },
    storeData: function(data){
        this.courseData = data;
        new View(this);
    }
}
