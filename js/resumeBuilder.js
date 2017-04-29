/*
This is empty on purpose! Your code to build the resume will go here.
 */
var sha = {
    bio: {
        "name": "Sha Long",
        "role": "Frontend Developer",
        "contacts": {
            "mobile": 17705817732,
            "email": "errol1989@126.com",
            "github": "errol1989",
            "location": "Hangzhou"
        },
        "welcomeMessage": "Hire me please!",
        "skills": ["HTML", "CSS", "Javascript"],
        "bioPic": " images/me.jpg",
    },
    education: {
        "schools": [
            {
                "name": "Zhejiang University",
                "location": "Zhejiang University Yuquan Campus",
                "degree": "MA",
                "major": ["Cryogenics"],
                "dates": "2011-2013"
            }, {
                "name": "Zhejiang University",
                "location": "Zhejiang University Yuquan Campus",
                "degree": "BA",
                "major": ["Energy"],
                "dates": "2007-2011"
            }
        ],
        "onlineCourses": [
            {
                "title": "Frontend Nano Degree",
                "school": "Udacity",
                "dates": 2017,
                "URL": "https://cn.udacity.com/"
            }
        ]
    },
    work: {
        "jobs": [
            {
                "title": "Construction Engineer",
                "employer": "Zhejiang Natural Gas Co., Ltd.",
                "dates": "2013-2017",
                "location": "Zheneng No.2 Mansion",
                "description": "Served the provincial company, of which the main business is transporting and trading natural gas, as an engineer."
            }
        ]
    },
    projects: {
        "projects": [
            {
                "title": "YTW Natural Gas Pipeline Project",
                "dates": " 2013-2017",
                "description": "Managed an provincial major project in the aspects of engineering change and land expropriation. The name YTW is short for Yong-Tai-Wen, also known as Ningbo-Taizhou-Wenzhou."
            }
        ]
    },
    displayInfo: function() {
        var formattedName = HTMLheaderName.replace("%data%", this.bio.name)
        var formattedRole = HTMLheaderRole.replace("%data%", this.bio.role)
        $("#header").prepend(formattedName, formattedRole)

        for(var i in this.bio.contacts) {
            var fomattedContact = HTMLcontactGeneric.replace("%contact%", i).replace("%data%", this.bio.contacts[i])
            $("#topContacts").append(fomattedContact)
        }

        var fomattedbioPic = HTMLbioPic.replace("%data%", this.bio.bioPic)
        $("#header").append(fomattedbioPic)

        if (this.bio.skills.length > 0) {
            $("#header").append(HTMLskillsStart)
            for (var i in this.bio.skills) {
                var fomattedSkill = HTMLskills.replace("%data%", this.bio.skills[i])
                $("#skills").append(fomattedSkill)
            }
        }
    },
    displayEducation: function() {
        for (var i = 0; i < this.education.schools.length; i++) {
            $("#education").append(HTMLschoolStart)
            var formattedName = HTMLschoolName.replace("%data%", this.education.schools[i].name)
            var formattedDegree = HTMLschoolDegree.replace("%data%", this.education.schools[i].degree)
            var formattedDates = HTMLschoolDates.replace("%data%", this.education.schools[i].dates)
            var formattedLocation = HTMLschoolLocation.replace("%data%", this.education.schools[i].location)
            var formattedMajor = HTMLschoolMajor.replace("%data%", this.education.schools[i].major)
            $(".education-entry:last").append(formattedName + formattedDegree)
            $(".education-entry:last").append(formattedDates, formattedLocation, formattedMajor)
        }
    },
    displayWork: function() {
        for (var i = 0; i < this.work.jobs.length; i++) {
            $("#workExperience").append(HTMLworkStart)
            var formattedEmployer = HTMLworkEmployer.replace("%data%", this.work.jobs[i].employer)
            var formattedTitle = HTMLworkTitle.replace("%data%", this.work.jobs[i].title)
            var formattedDates = HTMLworkDates.replace("%data%", this.work.jobs[i].dates)
            var formattedLocation = HTMLworkLocation.replace("%data%", this.work.jobs[i].location)
            var formattedDescription = HTMLworkDescription.replace("%data%", this.work.jobs[i].description)
            $(".work-entry:last").append(formattedEmployer + formattedTitle)
            $(".work-entry:last").append(formattedDates,  formattedLocation, formattedDescription)
        }
    },
    displayProjects: function() {
        for (var i = 0; i < this.projects.projects.length; i++) {
            $("#projects").append(HTMLprojectStart)
            var formattedTitle = HTMLprojectTitle.replace("%data%", this.projects.projects[i].title)
            var formattedDates = HTMLprojectDates.replace("%data%", this.projects.projects[i].dates)
            var formattedDescription = HTMLprojectDescription.replace("%data%", this.projects.projects[i].description)
            $(".project-entry:last").append(formattedTitle, formattedDates, formattedDescription)
        }
    },
    displayMap: function() {
        $("#mapDiv").append(HTMLmap)
        var map;    // declares a global map variable
        initializeMap(this)
    }
}


function initializeMap(who) {
    var locations;
    var mapOptions = {
        resizeEnable: true
    };
    map = new AMap.Map(document.querySelector('#map'), mapOptions);
    // locations is an array of location strings returned from locationFinder()
    locations = locationFinder(who);
    // creates markers on the map for each location in
    // the locations array
    search(locations);
}

 /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
function locationFinder(who) {
    // initializes an empty array
    var locations = [];
    locations.push(who.bio.contacts.location);
    who.education.schools.forEach(function(school){
        locations.push(school.location);
    });
    who.work.jobs.forEach(function(job){
        locations.push(job.location);
    });
    return locations;
}

  /*
  addMarker(placeData) reads AMap search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
function addMarker(placeData) {
    var marker = new AMap.Marker({
        map: map,
        position:placeData.location
    });
    console.log(placeData.location)
    var infoWindow = new AMap.InfoWindow({
        content: placeData.name,
        offset: {x: 0, y: -30}
    });
    marker.on("mouseover", function(e) {
        infoWindow.open(map, marker.getPosition());
    });
    marker.on("mouseout", function(e) {
        infoWindow.close();
    });
    map.setFitView();
}

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
function search(locations) {
    AMap.service(["AMap.PlaceSearch"], function() {
        // creates a AMap place search service object. PlaceSearch does the work of
        // actually searching for location data.
        var placeSearch = new AMap.PlaceSearch();
        // Iterates through the array of locations, creates a search object for each location
        locations.forEach(function(place) {
            // Actually searches the AMaps API for location data and runs the callback
            // function with the search results after each search.
            placeSearch.search(place, function(status, result) {
                //makes sure the search returned results for a location, if so add a marker to
                //the position of the first match result.
                if (status === 'complete' && result.info === 'OK') {
                    addMarker(result.poiList.pois[0])
                }
            })
        })
    });
}
//addEventListener or attachEvent, capabilities of browsers between IE8- and Firefox
function addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,handler,false);
    }else{
        target.attachEvent('on'+type,function(event){
            return handler.call(target,event);
        });
    }
}

addEvent(window, 'load', function() {
    sha.displayInfo()
    sha.displayEducation()
    sha.displayWork()
    sha.displayProjects()
    sha.displayMap()
})

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
addEvent(window, 'resize', function() {
    map.setFitView();
});
