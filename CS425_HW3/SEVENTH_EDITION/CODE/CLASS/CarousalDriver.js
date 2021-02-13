var gl;         //gl graphics
var program;    //shader progam

var theAxes;    //axes object
var theCarousal; //carosaul object
var theCarousal2;

var lightPosition = vec4(1.0, 1.0, 1.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 0.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.2, 0.3, 1.0 );
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 20.0;

var materialAmbient2 = vec4( 1.0, 0.0, 0.0, 1.0 );
var materialDiffuse2 = vec4( 1.0, 0.3, 0.8, 1.0 );
var materialSpecular2 = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess2 = 100.0;


// var x = 20;
// var y =4;
// var z =15;

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


    
    //first gl.getblablahblah
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniform4fv( gl.getUniformLocation(program, 
        "ambientProduct"),flatten(ambientProduct) );
     gl.uniform4fv( gl.getUniformLocation(program, 
        "diffuseProduct"),flatten(diffuseProduct) );
     gl.uniform4fv( gl.getUniformLocation(program, 
        "specularProduct"),flatten(specularProduct) );	
     gl.uniform4fv( gl.getUniformLocation(program, 
        "lightPosition"),flatten(lightPosition) );
     gl.uniform1f( gl.getUniformLocation(program, 
        "shininess"),materialShininess );

    theCarousal = new Carousal(gl, program);

    //second gl.getblablahblah
    ambientProduct = mult(lightAmbient, materialAmbient2);
    diffuseProduct = mult(lightDiffuse, materialDiffuse2);
    specularProduct = mult(lightSpecular, materialSpecular2);

    gl.uniform4fv( gl.getUniformLocation(program, 
        "ambientProduct"),flatten(ambientProduct) );
     gl.uniform4fv( gl.getUniformLocation(program, 
        "diffuseProduct"),flatten(diffuseProduct) );
     gl.uniform4fv( gl.getUniformLocation(program, 
        "specularProduct"),flatten(specularProduct) );	
     gl.uniform4fv( gl.getUniformLocation(program, 
        "lightPosition"),flatten(lightPosition) );
     gl.uniform1f( gl.getUniformLocation(program, 
        "shininess"),materialShininess );

    theCarousal2 = new Carousal(gl, program);

    gl.enable(gl.DEPTH_TEST);

    render();
    
}//end init()

var time = 0.5;

function render(){
    time += 1;

    // Clear out the color buffers and the depth buffers.
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    switch(key){
        case 0:
            break;
        case 'w':
        case 'W':
            for(var i = 0; i < 3; i++){
                eye[i] = eye[i] * 0.9;
            }
            break;

        case 's':
        case 'S':
            for(var i = 0; i < 3; i++){
                eye[i] = eye[i] / 0.9;
            }
            break;

        case 'a':
        case 'A':
            eye = mult(rotateY(-10), eye);
            break;

        case 'd':
        case 'D':
            eye = mult(rotateY(10), eye);
            break;

        case 'r':
        case 'R':
            eye = ogEye;
            break;
    }
    key = 0;
    
    // Create modelView using lookAt( eye, at, up );
	// Push it to the GPU as a uniform variable.
	//var modelView = mat4( ); // Identity matrix unless changed otherwise.
    //var modelView = lookAt( vec3( x, y, z ), vec3( 0, 2, 0 ), vec3( 0, 1, 0 ) );
    var modelView = lookAt( vec3(eye), vec3( 0, 0, 0 ), vec3( 0, 1, 0 ) );
	var vModelView = gl.getUniformLocation( program, "vModelView" );
    gl.uniformMatrix4fv( vModelView, false, flatten( modelView ) );
    
    //
    var transformation = mat4( );
	var vTransformation = gl.getUniformLocation( program, "vTransformation" );
    gl.uniformMatrix4fv( vTransformation, false, flatten( transformation ) );

    var normalTransformation = mat4();
    var vNormalTransformation = gl.getUniformLocation(program, "vNormalTransformation");
    gl.uniformMatrix4fv(vNormalTransformation, false, flatten(normalTransformation));

    normalTransformation = rotateY(time);
    gl.uniformMatrix4fv(vNormalTransformation, false, flatten(normalTransformation));
    

    theCarousal.render(time, [4,-3,-3]);
    //theCarousal2.render(time, [2,-3,9]);

    normalTransformation = rotateX(time);
    gl.uniformMatrix4fv(vNormalTransformation, false, flatten(normalTransformation));
    theCarousal2.render(time, [-7,-3,3]);

    requestAnimFrame(render);
}//end render

var key = 0;
var eye = vec4(20.0, 7.0, 15.0);
var ogEye = eye;

window.onkeydown = function(event){
    key = String.fromCharCode(event.keyCode);
}

// window.addEventListener("keydown", onDocumentKeyDown, false);
// function onDocumentKeyDown(event) {
//     var keyCode = event.which;
//     //forward
//     if (keyCode == 87) {
//         x += xSpeed;
//         z += zSpeed;
//     } 
//     //backward
//     else if (keyCode == 83) {
//         x -= xSpeed;
//         z -= zSpeed;
//     } 
//     //left
//     else if (keyCode == 65) {
//         z += zSpeed;
//         x -= xSpeed;
//     }
//     //right 
//     else if (keyCode == 68) {
//         z -= zSpeed;
//         x += xSpeed;
//     }
//     //reset
//     else if (keyCode == 82) {
//         z = 15;
//         x = 20;
//     }
//     //quit 
//     else if (keyCode == 81) {
//         window.close();
//     }
// };//end of eventlistener