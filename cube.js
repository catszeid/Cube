function $(id) {
	return document.getElementById(id);
}
// WebGL variables
var scene,
	camera,
	renderer,
	geometry,
	material,
	cube;
// enumeration of modes for running simulation
var Modes = {
		Play: "play",
		Stop: "stop"};
// current mode the simulation is in
var mode;
// amount of rotation to apply each frame
var rotation = new THREE.Vector3(0,0,0);
// counts number of frames that have passed since start of simulation
var frameNum = 0;
	
window.onload = function() {
	// start the simulation playing
	mode = Modes.Play;
	$('start').value = "Stop";
	
	// attach event listeners
	$('start').addEventListener("click", stop);
	$('xRotation').addEventListener("change", updateRotation);
	$('yRotation').addEventListener("change", updateRotation);
	$('zRotation').addEventListener("change", updateRotation);
	$('cubeColor').addEventListener("change", updateColor);
	$('colored').addEventListener("change", updateColor);
	$('blackWhite').addEventListener("change",updateColor);
	
	// keylistener
	window.onkeydown = function(e) { keydown(e)};
	
	// get initial rotation values
	updateRotation();
	// initialize webGL
	initialize();
	updateColor();
	console.log("Starting rendering...");
	render();
}

// initialize the webGL scene
function initialize() {
	console.log("Initializing cube...");
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
	document.body.appendChild(renderer.domElement);
	renderer.domElement.id = "canvas";

	box = new THREE.BoxGeometry(1,1,1);
	material = new THREE.MeshBasicMaterial( { color: $('cubeColor').value });
	cube = new THREE.Mesh(box, material);
	scene.add(cube);
	
	// start camera at standoff
	camera.position.z = 2;
}

// render the scene and ask for animation frame
function render() {
	// only run when in play mode
	if (mode == Modes.Play) {
		frameNum++;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		// update the output to show veritce positions
		updatePoints();
		// rotate the cube by the given inputs
		cube.rotateX(rotation.getComponent(0));
		cube.rotateY(rotation.getComponent(1));
		cube.rotateZ(rotation.getComponent(2));
	}
}

// start the simulation running if not already doing so
function start() {
	if (mode != Modes.Play) {
		mode = Modes.Play;
		$('start').value = "Stop";
		render();
		$('start').removeEventListener('click',start);
		$('start').addEventListener('click',stop);
	}
}

// stop the simulation running if not already doing so
function stop() {
	if (mode != Modes.Stop) {
		mode = Modes.Stop;
		$('start').value = "Start";
		$('start').removeEventListener('click',stop);
		$('start').addEventListener('click',start);
	}
}

function keydown(e) {
	if (e.keyCode == 87) {
		// move camera forward
		if (camera.position.z > 0.3)
			camera.position.z -= 0.3;
	}
	if (e.keyCode == 65) {
		// move camera left
	}
	if (e.keyCode == 83) {
		// move camera back
		if (camera.position.z < 20)
			camera.position.z += 0.3;
	}
	if (e.keyCode == 68) {
		// move camera right
	}
}

// get the rotation amount for the axes
function updateRotation() {
	rotation.setComponent(0, $('xRotation').value);
	rotation.setComponent(1, $('yRotation').value);
	rotation.setComponent(2, $('zRotation').value);
	console.log("Updated rotation to ("+rotation.getComponent(0)+","+rotation.getComponent(1)+","+rotation.getComponent(2)+")");
}

// update the color and style of the cube
function updateColor() {
	var color;
	// set the color used for drawing
	if (!$('blackWhite').checked) {
		// colorful!
		color = $('cubeColor').value;
	}
	else {
		// Black and white
		color = '#ffffff';
	}
	// set the material used for rendering the cube
	if($('colored').checked) {
		// Solid color
		cube.material = new THREE.MeshBasicMaterial( { color: color });
	}
	else {
		// include wireframe with color
		cube.material = new THREE.MeshBasicMaterial( { color: color, wireframe: true} );
	}
}

// update the display for the position of all veritces
function updatePoints() {
	for(var vert = 0; vert < cube.geometry.vartices.length; vert++) {
		$("v"+(vert+1)+"x").innerHTML = cube.geometry.vertices[vert].x;
		$("v"+(vert+1)+"y").innerHTML = cube.geometry.vertices[vert].y;
		$("v"+(vert+1)+"z").innerHTML = cube.geometry.vertices[vert].z;
	}
	$('v1x').innerHTML = cube.geometry.vertices[0].x;
	$('v1y').innerHTML = cube.geometry.vertices[0].y;
	$('v1z').innerHTML = cube.geometry.vertices[0].z;
	$('v2x').innerHTML = cube.geometry.vertices[1].x;
	$('v2y').innerHTML = cube.geometry.vertices[1].y;
	$('v2z').innerHTML = cube.geometry.vertices[1].z;
	$('v3x').innerHTML = cube.geometry.vertices[2].x;
	$('v3y').innerHTML = cube.geometry.vertices[2].y;
	$('v3z').innerHTML = cube.geometry.vertices[2].z;
	$('v4x').innerHTML = cube.geometry.vertices[3].x;
	$('v4y').innerHTML = cube.geometry.vertices[3].y;
	$('v4z').innerHTML = cube.geometry.vertices[3].z;
	$('v5x').innerHTML = cube.geometry.vertices[4].x;
	$('v5y').innerHTML = cube.geometry.vertices[4].y;
	$('v5z').innerHTML = cube.geometry.vertices[4].z;
	$('v6x').innerHTML = cube.geometry.vertices[5].x;
	$('v6y').innerHTML = cube.geometry.vertices[5].y;
	$('v6z').innerHTML = cube.geometry.vertices[5].z;
	$('v7x').innerHTML = cube.geometry.vertices[6].x;
	$('v7y').innerHTML = cube.geometry.vertices[6].y;
	$('v7z').innerHTML = cube.geometry.vertices[6].z;
	$('v8x').innerHTML = cube.geometry.vertices[7].x;
	$('v8y').innerHTML = cube.geometry.vertices[7].y;
	$('v8z').innerHTML = cube.geometry.vertices[7].z;
}