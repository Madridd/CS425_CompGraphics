
var gl;				// WebGL graphics environment
var nPoints = 0;	// Number of points in the vertex arrays
var program;		// The shader program
var aspectRatio;	// Aspect ratio of viewport

// Initialization function runs whenever the page is loaded

window.onload = function init( ) {

	var points = [ ];	// Vertex location data
	var colors = [ ];	// Vertex color data
	var texCoords = [ ];	// Vertex texture coordinate data

	// Set up the canvas, viewport, and clear color
	var canvas = document.getElementById( "gl-canvas" );
	gl=WebGLUtils.setupWebGL( canvas );
	if( !gl ) {
		alert( "No WebGL" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	aspectRatio = canvas.width / canvas.height ;
	gl.clearColor( 0.5, 0.5, 1.0, 1.0 );	// Pale yellow

	// Load the shaders
	program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );


	// Generate Points
	points.push( vec3( 2, 0, 0 ) );	// Lower right
	colors.push( vec3( 1.0, 0, 0 ) );
	texCoords.push( vec2( 1.0, 0.0 ) );

	points.push( vec3( 0, 0, 0 ) );		// Lower left
	colors.push( vec3( 0.0, 1, 0 ) );
	texCoords.push( vec2( 0.0, 0.0 ) );

	points.push( vec3( 2, 2, 0 ) );		// Upper right
	colors.push( vec3( 0.0, 0, 1 ) );
	texCoords.push( vec2( 1.0, 1.0 ) );

	points.push( vec3( 0, 2, 0 ) );		// Upper left
	colors.push( vec3( 1.0, 1, 1 ) );
	texCoords.push( vec2( 0.0, 1.0 ) );

	nPoints = 4;

	// Push Vertex Location Data to GPU, and attach the buffer to the vPosition attribute
	var vbufferID = gl.createBuffer( );
	gl.bindBuffer( gl.ARRAY_BUFFER, vbufferID );
	gl.bufferData( gl.ARRAY_BUFFER, flatten( points ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	// Push Vertex Color Data to GPU, and attach the buffer to the vColor attribute
	var cbufferID = gl.createBuffer( );
	gl.bindBuffer( gl.ARRAY_BUFFER, cbufferID );
	gl.bufferData( gl.ARRAY_BUFFER, flatten( colors ), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );

	// Push Vertex texture coordinate data to GPU, and attach the buffer to the vTexCoords attribute
	var tbufferID = gl.createBuffer( );
	gl.bindBuffer( gl.ARRAY_BUFFER, tbufferID );
	gl.bufferData( gl.ARRAY_BUFFER, flatten( texCoords ), gl.STATIC_DRAW );

	var vTex = gl.getAttribLocation( program, "vTexCoords" );
	gl.vertexAttribPointer( vTex, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vTex );


	//checkerboard
	var texData = new Uint8Array( [ 0  ,   0,    0, 255,
								    255, 255,  255, 255,
								    0  ,   0,    0, 255,
								    255, 255,  255, 255,
									255, 255,  255, 255,
								    0  ,   0,    0, 255,
									255, 255,  255, 255,
								    0  ,   0,    0, 255,
									0  ,   0,    0, 255,
								    255, 255,  255, 255,
									0  ,   0,    0, 255,
								    255, 255,  255, 255,
									255, 255,  255, 255,
								    0  ,   0,    0, 255,
									255, 255,  255, 255,
									0  ,   0,    0, 255
									] ); // black and white



	var texture = gl.createTexture( );
	gl.activeTexture( gl.TEXTURE0 );
	gl.bindTexture( gl.TEXTURE_2D, texture );
	gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 4, 4, 0, gl.RGBA, gl.UNSIGNED_BYTE, texData );
	gl.uniform1i( gl.getUniformLocation( program, "texMap" ), 0 );

	gl.generateMipmap( gl.TEXTURE_2D );
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

	// Unbind the buffer
	gl.bindBuffer( gl.ARRAY_BUFFER, null );

	gl.enable( gl.DEPTH_TEST );

	//render
	render();
}

function render( ) {

	// Clear out the color buffers and the depth buffers.
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

	var modelView = lookAt( vec3( 1, 0.5, 2.5 ), vec3( 1, 0, 0 ), vec3( 0, 1, 0 ) );

	// Push the transformation matrices to the GPU as uniform variables
	var vModelView = gl.getUniformLocation( program, "vModelView" );
	gl.uniformMatrix4fv( vModelView, false, flatten( modelView ) );

	var projection = perspective( 60, aspectRatio, 0.1, 10.0 );
	var vProjection = gl.getUniformLocation( program, "vProjection" );
	gl.uniformMatrix4fv( vProjection, false, flatten( projection ) );

	//var transformation = mat4( );
	var transformation = rotateX(90);
	var vTransformation = gl.getUniformLocation( program, "vTransformation" );
	gl.uniformMatrix4fv( vTransformation, false, flatten( transformation ) );

	// Do the drawing
	gl.drawArrays( gl.TRIANGLE_STRIP,0, nPoints );

}
