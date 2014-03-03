CourseView
==========

The following web site allows you to filter courses by semester. Clicking on the details button will 
display a modal window where you can see the history of the course. 

Solution
========

- I used Foundatation for the layout and modal window
- Mustash was used to dynamically render some the HTML
- Break down of important Files:
   - index.html - Main HTML / Javascript starts here
   - CourseApp.js - setups up the Courses object to load the data
   - Courses.js - loads the data and then setups the View
   - View.js - displays the courses and setups the filter
   - Filter.js - handles creating the filter form and handling filter events
   - Course.js - holds all the properties of a course as well as some functions that the View uses
