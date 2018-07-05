var Scene = require('Scene');
var Diagnostics = require('Diagnostics');

// Diagnostics.log("Infos about the Scene Module");
// Diagnostics.log(Scene)
// Diagnostics.log(Scene.root);

var my_plane = Scene.root.find("plane0");
// Diagnostics.log(my_plane.hidden);
// Diagnostics.log(my_plane.transform);
// Diagnostics.log(my_plane.transform.y);
my_plane.transform.y = 17

var FaceTracking = require('FaceTracking');
// Diagnostics.log(FaceTracking);
// Diagnostics.log(FaceTracking.count);
// Diagnostics.log(FaceTracking.count.monitor());

FaceTracking.count.monitor().subscribe( function(e) {
	if (e.newValue > 0) {
		my_plane.hidden = false;

		// function to track the head's position
		trackHead()
	} else {
		my_plane.hidden = true;
	}
})

function trackHead() {
	
	// store the first head detected
	var head = FaceTracking.face(0);

	// grab the “x” position of detected head
	var head_x = head.cameraTransform.x

	// set the ‘x’ coordinate of the plane to be the ‘x’ coordinate of the head
	my_plane.transform.x = head_x
}