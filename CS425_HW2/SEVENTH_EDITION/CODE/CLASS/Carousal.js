class Carousal{
    constructor(gl,program){
        this.program = program;
        this.gl = gl;
        this.cone = new Cone(9,gl,program,0);
        this.horses = [];

        //cylinder
        // this.cylinder = new Cylinder(72, 3, gl,program);
        // this.cb = mult(translate(0,0.1,0), scalem(5, -0.1, 5));
        // this.ct = mult(translate(0,5,0), scalem(5,2,5));
        //myCylinder.scale(0.5, 1.0, 0.5);
        //myCylinder.rotate(45.0, [ 1, 1, 1]);
        //myCylinder.translate(0.0, 0.0, 0.0);

        //base and top of carousal
        this.baseXform = mult(translate(0,0.1,0), scalem(5, -0.1, 5));
        this.topXform = mult(translate(0,5,0), scalem(5,2,5));

        //horses
        var horseScale = scalem(.75,2,.75);
        var horseTranslastions = [[4,2.5,1],[1,2.5,-4],[-4,2.5,-1],[-1,2.5,4]];
        var horseAxes = [[-1,0,0],[0,0,1],[1,0,0],[0,0,-1]];
        var horseColors = [[1,0,1],[0,1,1],[1,0.1,0],[0,0,0]];

        this.horseXform= [];
        for(var i =0; i<4; i++){
            var horseTranslastion = translate(horseTranslastions[i][0],
                                              horseTranslastions[i][1],
                                              horseTranslastions[i][2]);
            var horseRotation = rotate(90,horseAxes[i]);
            var Xform= mult(horseRotation, horseScale);
            this.horseXform[i] = mult(horseTranslastion, Xform);
            this.horses[i] = new Cone(9,gl,program, horseColors[i]);
        }//end for

        return;
    }//end constructor

    render(time, position){
        //rotation, position, transform
        var C_rotation = rotateY(time);
        var C_translation = mat4();
        if(Array.isArray(position) && position.length == 3){
            C_translation = translate(position[0], position[1], position[2]);
        }//end if

        var C_Xform = mult(C_translation, C_rotation);

        //base
        var vTransformation = gl.getUniformLocation( program, "vTransformation" );
        var transformation = mult(C_Xform, this.baseXform);
        gl.uniformMatrix4fv( vTransformation, false, flatten( transformation ) );
        this.cone.render();

        //top
        var transformation = mult(C_Xform, this.topXform);
        gl.uniformMatrix4fv( vTransformation, false, flatten( transformation ) );
        this.cone.render();

        //horses to go up and down
        for(var i=0; i<4; i++){
            transformation = mult(translate(0,Math.sin(0.05 * (time + i * 90)),0), this.horseXform[i]);
            transformation = mult(C_Xform, transformation);
            gl.uniformMatrix4fv(vTransformation,false,flatten(transformation));
            this.horses[i].render();
        }

        // //cbase
        // var vTransformation = gl.getUniformLocation( program, "vTransformation" );
        // var transformation = mult(C_Xform, this.cb);
        // gl.uniformMatrix4fv( vTransformation, false, flatten( transformation ) );
        // this.cylinder.render();

        // //ctop
        // var transformation = mult(C_Xform, this.ct);
        // gl.uniformMatrix4fv( vTransformation, false, flatten( transformation ) );
        // this.cylinder.render();



    }//end render

}//end Carousal class