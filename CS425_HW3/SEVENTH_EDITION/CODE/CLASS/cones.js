class Cone{
    constructor(nSectors, gl, program, color){
        this.nSectors = nSectors;
        this.gl = gl;
        this.program = program;

        var points = []; //vertex locations
        var colors = []; //vertex colors

        //make points and colors
        var validColor = false;

        if ( Array.isArray( color ) && color.length == 3
		    && color[0] >= 0 && color[1] >= 0 && color[2] >=0
		    && color[0] <= 1 && color[1] <= 1 && color[2] <=1 ) {

		validColor = true;
        }//end if
        
        // If the passed color is valid, use it to make a vec3.  Otherwise use calls to Math.random( ).
	    for( var i = 0; i < nSectors + 2; i++ ) {
		    if( validColor ){
			// Push a valid color here, as a vec3
			colors.push(vec3(color));
		    }
		    else{
			// Push a random color here, as a vec3
			colors.push(vec3(Math.random(250), Math.random(250), Math.random(250)));
		    }
        }//end for
        
        // Then the vertex locations, starting with the apex
        points.push(vec3(0,1,0));
        
        // Then the base points
	    var dTheta = radians( 360 / nSectors );
	    for( i = 0; i < nSectors + 1; i++ ) { // Duplicate ( 1, 0, 0 ) to close loop.
		    var theta = i * dTheta;
		    // push a vertex here, using Math.cos( theta ) for X and Math.sin( theta ) for Y
		    points.push(vec3(Math.cos(theta), 0, Math.sin(theta)));
        }//end for
        
        this.vbufferID = gl.createBuffer( );
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vbufferID );
        gl.bufferData( gl.ARRAY_BUFFER, flatten( points ), gl.STATIC_DRAW );

        // Push Vertex Color Data to GPU
        // Hold off on connecting the data to the shader variables

        this.cbufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cbufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

        // Unbind the buffer, for safety sake.
        gl.bindBuffer( gl.ARRAY_BUFFER, null );

        return ;

    }//end constructor

    render(){
        var gl = this.gl;

        //vertex data - positions
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbufferID);
        var vPosition = gl.getAttribLocation(this.program, "vPosition");
        gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        //vertex data - colors
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cbufferID);
        var vColor = gl.getAttribLocation(this.program, "vColor");
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);

        // Unbind the array buffer, for safety sake.
        gl.bindBuffer( gl.ARRAY_BUFFER, null );
        
        // And finally to draw the cone
        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.nSectors+2);	// Sides
        gl.drawArrays(gl.TRIANGLE_FAN, 1, this.nSectors+1);  // bottom

    }//end render

}//end cone class