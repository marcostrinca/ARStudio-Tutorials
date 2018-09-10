var Diagnostics = require('Diagnostics');
var Scene = require('Scene');
var FaceTracking = require('FaceTracking');
var Animation = require('Animation');
Diagnostics.log(Animation);

// get the plane and set it's initial position on the screen
var cloud = Scene.root.find("cloud0");
cloud.transform.y = 17

// monitor the FaceTracking to detect faces
FaceTracking.count.monitor().subscribe( function(e) {
	if (e.newValue > 0) {

		// hide the plane in case there is no face
		cloud.hidden = false;

		// function to track the head's position
		trackHead()
	} else {
		
		cloud.hidden = true;
	}
})

function trackHead() {
	
	// store the first head detected
	var head = FaceTracking.face(0);

	// grab the “x” position of detected head
	var head_x = head.cameraTransform.x

	// set the ‘x’ coordinate of the plane to be the ‘x’ coordinate of the head
	cloud.transform.x = head_x
}

// Animations
function animateFloating(obj, deltaY, ms) {
  
	// get the initial Y position of the object
	// (if you don't understand the "lastValue" property at the end, try using 
	// Diagnostic.log(obj.transform.y) and check the console)
	var y0 = obj.transform.y.lastValue

	// create time driver mirroring the animation
	// loop 999 times
	obj.animy_driver = Animation.timeDriver({durationMilliseconds: ms, loopCount: 999, mirror: true});
  
	// create sampler
	obj.animy_sampler = Animation.samplers.easeInOutSine(y0, y0 + deltaY);
  
	// bind the animation to the object's property passing the driver and the sampler
	obj.transform.y = Animation.animate(obj.animy_driver, obj.animy_sampler);

	// start the animation
	obj.animy_driver.start();
}

// animate the cloud 4 units in Y axis in 3 seconds
animateFloating(cloud, 3, 2000);

var mat_cloud = Materials.get("mat_cloud")

// FadeIn
function fadeIn(obj, mat) {

	// create the driver and sampler as properties of (inside) the object
	obj.fadein_driver = Animation.timeDriver({durationMilliseconds: 400});
	obj.fadein_sampler = Animation.samplers.easeInOutSine(0.0,1.0);

	// it's good to reset the driver before the animation starts (in case you ran
	// this animation before)
	obj.fadein_driver.reset();

	// bind the opacity to the animation passing the driver and sampler
	mat.opacity = Animation.animate(obj.fadein_driver, obj.fadein_sampler);

	// start the animation
	obj.fadein_driver.start();
	
}

// FadeOut - exactly the same - we could even create a new param to use just 
// one function to fade in our fade out, but for educational purposes I kept the two functions
function fadeOut(obj, mat) {

	// create the driver and sampler as properties of (inside) the object
	obj.fadeout_driver = Animation.timeDriver({durationMilliseconds: 400});
	obj.fadeout_sampler = Animation.samplers.easeInOutSine(1.0,0.0);

	// it's good to reset the driver before the animation starts (in case you ran
	// this animation before)
	obj.fadeout_driver.reset();

	// bind the opacity to the animation passing the driver and sampler
	mat.opacity = Animation.animate(obj.fadeout_driver, obj.fadeout_sampler);

	// start the animation
	obj.fadeout_driver.start();
}