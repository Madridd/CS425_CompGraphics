var gl;         //gl graphics
var program;    //shader progam

var theAxes;    //axes object
var theCarousal; //carosaul object
var theCarousal2;

var x = 20;
var y =4;
var z =15;

//initialization when page is loaded
window.onload = function init(){

    var canvas = document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
		alert( "No WebGL" );
    }//end if

    gl.viewport( 0, 0, canvas.width, canvas.height );
	aspectRatio = canvas.width / canvas.height ;
    gl.clearColor( 1.0, 1.0, 0.5, 1.0 );
    
    // Load the shaders, create a GLSL program, and use it.
	program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    //camera perspective
    var projection = perspective( 60, aspectRatio, 0.1, 100.0 );
	var vProjection = gl.getUniformLocation( program, "vProjection" );
    gl.uniformMatrix4fv( vProjection, false, flatten( projection ) );
    
    theCarousal = new Carousal(gl, program);
    theCarousal2 = new Carousal(gl, program);

    gl.enable(gl.DEPTH_TEST);

    render();
    
}//end init()

var time = 0.5;

function render(){
    time += 1;

    // Clear out the color buffers and the depth buffers.
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    
    // Create modelView using lookAt( eye, at, up );
	// Push it to the GPU as a uniform variable.
	//var modelView = mat4( ); // Identity matrix unless changed otherwise.
	var modelView = lookAt( vec3( x, y, z ), vec3( 0, 2, 0 ), vec3( 0, 1, 0 ) );
	var vModelView = gl.getUniformLocation( program, "vModelView" );
    gl.uniformMatrix4fv( vModelView, false, flatten( modelView ) );
    
    //
    var transformation = mat4( );
	var vTransformation = gl.getUniformLocation( program, "vTransformation" );
    gl.uniformMatrix4fv( vTransformation, false, flatten( transformation ) );
    

    theCarousal.render(time, [4,-3,-3]);
    //theCarousal2.render(time, [2,-3,9]);
    theCarousal2.render(time, [4,2,-3]);

    requestAnimFrame(render);
}//end render

// movement - please calibrate these values
var xSpeed = 1;
var ySpeed = 1;
var zSpeed = 1;

window.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    //forward
    if (keyCode == 87) {
        x += xSpeed;
        z += zSpeed;
    } 
    //backward
    else if (keyCode == 83) {
        x -= xSpeed;
        z -= zSpeed;
    } 
    //left
    else if (keyCode == 65) {
        z += zSpeed;
        x -= xSpeed;
    }
    //right 
    else if (keyCode == 68) {
        z -= zSpeed;
        x += xSpeed;
    }
    //reset
    else if (keyCode == 82) {
        z = 15;
        x = 20;
    }
    //quit 
    else if (keyCode == 81) {
        window.close();
    }
};//end of eventlistener