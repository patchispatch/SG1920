class HeartShape extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui) {
        super();

        // Interfaz
        this.createGUI(gui, titleGui);

        // Ejes
        this.axis = new THREE.AxesHelper(5);
        this.add(this.axis);

        // Mesh de la forma
        var heartShape = new THREE.Shape();
        heartShape.moveTo( 25, 25 );
        heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
        heartShape.bezierCurveTo( 30, 0, 30, 35,30,35 );
        heartShape.bezierCurveTo( 30, 55, 10, 77, 25, 95 );
        heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
        heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
        heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

        // Curva de extrusión
        var curve = new THREE.CatmullRomCurve3 ([
            new THREE.Vector3( - 60, - 100, 60 ),
            new THREE.Vector3( - 40, 20, 60 ),
            new THREE.Vector3( - 60, 120, 60 ),
        ]);

        var extrudeSettings = { 
            depth: 8, 
            bevelEnabled: true, 
            bevelSegments: 2, 
            steps: 2, 
            bevelSize: 1, 
            bevelThickness: 1,
            extrudePath: curve,
        };

        var geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        var material = new THREE.MeshNormalMaterial({
            flatShading: true,
        });
        this.heart = new THREE.Mesh(geometry, material);
        this.add(this.heart);
    }

    createGUI(gui, titleGui) {
        // Control de animaciones:
        this.guiControls = new function() {
            this.animations = false;
            this.flatShading = false;
    
            this.reset = function() {
                this.animations = false;
                this.flatShading = false;
            }
        }

        var folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, 'animations').name("Animaciones");
        folder.add(this.guiControls, 'flatShading').name('Sombreado plano');
    }

    animate() {
        this.heart.rotateX(0.01);
        this.heart.rotateY(0.01);
        this.heart.rotateZ(0.01);
    }

    update() {
        // Actualizar sombreado
        if(this.heart.material.flatShading != this.guiControls.flatShading) {
            this.heart.material.flatShading = this.guiControls.flatShading;
            this.heart.material.needsUpdate = true;
        }

        // Animaciones
        if(this.guiControls.animations) {
            this.animate();
        }
    }
}