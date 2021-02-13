var gl;
//created by Ivan Madrid
window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    //color of canvas
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    //triangleback
    var triangleVerticiesback = [
      //x,y      //rgb
      0.0, 0.0,   0.0, 0.0, 1.0,
      1.0, 0.0,   0.0, 1.0, 0.0,
      1.0, 1.0,   1.0, 0.0, 0.0
    ];

    var triangleBufferback = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBufferback);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticiesback), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColors = gl.getAttribLocation( program, "vColor" );

    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0 );
    gl.vertexAttribPointer( vColors, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray( vPosition );
    gl.enableVertexAttribArray( vColors );

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES,0,3);

    //triangleback2
    var triangleVerticiesback2 = [
      //x,y      //rgb
      0.0, 0.0,   0.0, 0.0, 1.0,
      -1.0, 0.0,   0.0, 1.0, 0.0,
      -1.0, -1.0,   1.0, 0.0, 0.0
    ];
    var triangleBufferback2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBufferback2);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticiesback2), gl.STATIC_DRAW);
    render();

    //triangleback3
    var triangleVerticiesback3 = [
      //x,y      //rgb
      0.0, 0.0,   0.0, 0.0, 1.0,
      1.0, 0.0,   0.0, 1.0, 0.0,
      1.0, -1.0,   1.0, 0.0, 0.0
    ];
    var triangleBufferback3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBufferback3);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticiesback3), gl.STATIC_DRAW);
    render();

    //triangleback4
    var triangleVerticiesback4 = [
      //x,y      //rgb
      0.0, 0.0,   0.0, 0.0, 1.0,
      -1.0, 0.0,   0.0, 1.0, 0.0,
      -1.0, 1.0,   1.0, 0.0, 0.0
    ];
    var triangleBufferback4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBufferback4);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticiesback4), gl.STATIC_DRAW);
    render();

    //triangle1
    var triangleVerticies = [
      //x,y      //rgb
      0.0, 0.5,   0.0, 0.0, 1.0,
      0.0, 1.0,   1.0, 0.0, 0.0,
      0.5, 1.0,   0.0, 1.0, 0.0
    ];
    var triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies), gl.STATIC_DRAW);
    render();

    //triangle2
    var triangleVerticies2 = [
      //x,y      //rgb
      0.0, 0.5,   0.0, 0.0, 1.0,
      0.0, 1.0,   1.0, 0.0, 0.0,
      -0.5, 1.0,  0.0, 1.0, 0.0
    ];
    var triangleBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies2), gl.STATIC_DRAW);
    render();

    //triangle3
    var triangleVerticies3 = [
      //x,y      //rgb
      0.0, -0.5,   0.0, 0.0, 1.0,
      0.0, -1.0,   1.0, 0.0, 0.0,
      -0.5, -1.0,  0.0, 1.0, 0.0
    ];
    var triangleBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer3);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies3), gl.STATIC_DRAW);
    render();

    //triangle4
    var triangleVerticies4 = [
      //x,y      //rgb
      0.0, -0.5,   0.0, 0.0, 1.0,
      0.0, -1.0,   1.0, 0.0, 0.0,
      0.5, -1.0,  0.0, 1.0, 0.0
    ];
    var triangleBuffer4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer4);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies4), gl.STATIC_DRAW);
    render();

    //triangle5
    var triangleVerticies5 = [
      //x,y      //rgb
      0.0, 0.4,   0.0, 0.0, 1.0,
      0.7, 0.88,   1.0, 0.0, 0.0,
      0.7, 0.99,   0.0, 1.0, 0.0
    ];
    var triangleBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer5);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies5), gl.STATIC_DRAW);
    render();

    //triangle6
    var triangleVerticies6 = [
      //x,y      //rgb
      0.0, 0.4,   0.0, 0.0, 1.0,
      -0.7, 0.88,   1.0, 0.0, 0.0,
      -0.7, 0.99,   0.0, 1.0, 0.0
    ];
    var triangleBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer6);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies6), gl.STATIC_DRAW);
    render();

    //triangle7
    var triangleVerticies7 = [
      //x,y      //rgb
      0.0, -0.4,   0.0, 0.0, 1.0,
      -0.7, -0.88,   1.0, 0.0, 0.0,
      -0.7, -0.99,   0.0, 1.0, 0.0
    ];
    var triangleBuffer7 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer7);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies7), gl.STATIC_DRAW);
    render();

    //triangle8
    var triangleVerticies8 = [
      //x,y      //rgb
      0.0, -0.4,   0.0, 0.0, 1.0,
      0.7, -0.88,   1.0, 0.0, 0.0,
      0.7, -0.99,   0.0, 1.0, 0.0
    ];
    var triangleBuffer8 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer8);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies8), gl.STATIC_DRAW);
    render();

    //triangle9
    var triangleVerticies9 = [
      //x,y      //rgb
      0.9, 0.9,   1.0, 0.0, 0.0,
      0.9, 0.4,   0.0, 1.0, 0.0,
      0.0, 0.3,   0.0, 0.0, 1.0
    ];
    var triangleBuffer9 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer9);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies9), gl.STATIC_DRAW);
    render();

    //triangle10
    var triangleVerticies10 = [
      //x,y      //rgb
      -0.9, 0.9,   1.0, 0.0, 0.0,
      -0.9, 0.4,   0.0, 1.0, 0.0,
      0.0, 0.3,   0.0, 0.0, 1.0
    ];
    var triangleBuffer10 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer10);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies10), gl.STATIC_DRAW);
    render();

    //triangle11
    var triangleVerticies11 = [
      //x,y      //rgb
      -0.9, -0.9,   1.0, 0.0, 0.0,
      -0.9, -0.4,   0.0, 1.0, 0.0,
      0.0, -0.3,   0.0, 0.0, 1.0
    ];
    var triangleBuffer11 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer11);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies11), gl.STATIC_DRAW);
    render();

    //triangle12
    var triangleVerticies12 = [
      //x,y      //rgb
      0.9, -0.9,   1.0, 0.0, 0.0,
      0.9, -0.4,   0.0, 1.0, 0.0,
      0.0, -0.3,   0.0, 0.0, 1.0
    ];
    var triangleBuffer12 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer12);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies12), gl.STATIC_DRAW);
    render();

    //triangle13
    var triangleVerticies13 = [
      //x,y      //rgb
      0.0, 0.0,   0.0, 0.0, 1.0,
      0.5, 0.4,   0.0, 1.0, 0.0,
      0.5, 0.6,   1.0, 0.0, 0.0
    ];
    var triangleBuffer13 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer13);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies13), gl.STATIC_DRAW);
    render();

    //triangle14
    var triangleVerticies14 = [
      //x,y      //rgb
      0.0, 0.0,   0.0, 0.0, 1.0,
      -0.5, 0.4,   0.0, 1.0, 0.0,
      -0.5, 0.6,   1.0, 0.0, 0.0
    ];
    var triangleBuffer14 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer14);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies14), gl.STATIC_DRAW);
    render();

    //triangle15
    var triangleVerticies15 = [
      //x,y      //rgb
      0.0, 0.0,   0.0, 0.0, 1.0,
      -0.5, -0.4,   0.0, 1.0, 0.0,
      -0.5, -0.6,   1.0, 0.0, 0.0
    ];
    var triangleBuffer15 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer15);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies15), gl.STATIC_DRAW);
    render();

    //triangle16
    var triangleVerticies16 = [
      //x,y      //rgb
      0.0, 0.0,   0.0, 0.0, 1.0,
      0.5, -0.4,   0.0, 1.0, 0.0,
      0.5, -0.6,   1.0, 0.0, 0.0
    ];
    var triangleBuffer16 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer16);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies16), gl.STATIC_DRAW);
    render();

    //triangle17
    var triangleVerticies17 = [
      //x,y      //rgb
      0.0, 0.2,   0.0, 0.0, 1.0,
      0.4, 0.4,   0.0, 1.0, 0.0,
      0.7, 0.6,   1.0, 0.0, 0.0
    ];
    var triangleBuffer17 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer17);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies17), gl.STATIC_DRAW);
    render();

    //triangle18
    var triangleVerticies18 = [
      //x,y      //rgb
      0.0, 0.2,   0.0, 0.0, 1.0,
      -0.4, 0.4,   0.0, 1.0, 0.0,
      -0.7, 0.6,   1.0, 0.0, 0.0
    ];
    var triangleBuffer18 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer18);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies18), gl.STATIC_DRAW);
    render();

    //triangle18
    var triangleVerticies18 = [
      //x,y      //rgb
      0.0, -0.2,   0.0, 0.0, 1.0,
      -0.4, -0.4,   0.0, 1.0, 0.0,
      -0.7, -0.6,   1.0, 0.0, 0.0
    ];
    var triangleBuffer18 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer18);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies18), gl.STATIC_DRAW);
    render();

    //triangle19
    var triangleVerticies19 = [
      //x,y      //rgb
      0.0, -0.2,   0.0, 0.0, 1.0,
      0.4, -0.4,   0.0, 1.0, 0.0,
      0.7, -0.6,   1.0, 0.0, 0.0
    ];
    var triangleBuffer19 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer19);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies19), gl.STATIC_DRAW);
    render();

    //triangle20
    var triangleVerticies20 = [
      //x,y      //rgb
      -1.0, -0.2,   0.0, 1.0, 0.0,
      -0.6, -0.3,   0.0, 0.0, 1.0,
      0.0, 0.0,   1.0, 0.0, 0.0
    ];
    var triangleBuffer20 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer20);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies20), gl.STATIC_DRAW);
    render();

    //triangle21
    var triangleVerticies21 = [
      //x,y      //rgb
      1.0, 0.2,   0.0, 1.0, 0.0,
      0.6, 0.3,   0.0, 0.0, 1.0,
      0.0, 0.0,   1.0, 0.0, 0.0
    ];
    var triangleBuffer21 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer21);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies21), gl.STATIC_DRAW);
    render();

    //triangle22
    var triangleVerticies22 = [
      //x,y      //rgb
      -1.0, 0.2,   0.0, 1.0, 0.0,
      -0.6, 0.3,   0.0, 0.0, 1.0,
      0.0, 0.0,   1.0, 0.0, 0.0
    ];
    var triangleBuffer22 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer22);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies22), gl.STATIC_DRAW);
    render();

    //triangle23
    var triangleVerticies23 = [
      //x,y      //rgb
      1.0, -0.2,   0.0, 1.0, 0.0,
      0.6, -0.3,   0.0, 0.0, 1.0,
      0.0, 0.0,   1.0, 0.0, 0.0
    ];
    var triangleBuffer23 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleBuffer23);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVerticies23), gl.STATIC_DRAW);
    render();

};
//render function allows all the triangles to render onto the screen, put in function (redundant code)
function render() {
  var vPosition = gl.getAttribLocation( program, "vPosition" );
  var vColors = gl.getAttribLocation( program, "vColor" );

  gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0 );
  gl.vertexAttribPointer( vColors, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

  gl.enableVertexAttribArray( vPosition );
  gl.enableVertexAttribArray( vColors );

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES,0,3);

}
