class SquareShape extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui) {
        super();

        // Interfaz
        this.createGUI(gui, titleGui);

        // Ejes
        this.axis = new THREE.AxesHelper(5);
        this.add(this.axis);

        // Mesh de la forma
        var pts = [
            new THREE.Vector3(0, -20, 0),
            new THREE.Vector3(20, 0, 0),
            new THREE.Vector3(0, 20, 0),
            new THREE.Vector3(-20, 0, 0),
        ];

        var SquareShape = new THREE.Shape(pts);


        // Curva de extrusión
        var curve = new THREE.CatmullRomCurve3 ([
            new THREE.Vector3(0, 0, 100),
            new THREE.Vector3(100, 0, 200),
            new THREE.Vector3(0, 0, 300),
            new THREE.Vector3(-100, 0, 400),
        ]);

        var extrudeSettings = { 
            depth: 4, 
            bevelEnabled: false, 
            steps: 50, 
            extrudePath: curve,
        };

        var geometry = new THREE.ExtrudeGeometry(SquareShape, extrudeSettings);
        var material = new THREE.MeshNormalMaterial({
            flatShading: true,
        });
        this.square = new THREE.Mesh(geometry, material);
        this.add(this.square);
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
        this.square.rotateX(0.01);
        this.square.rotateY(0.01);
        this.square.rotateZ(0.01);
    }

    update() {
        // Actualizar sombreado
        if(this.square.material.flatShading != this.guiControls.flatShading) {
            this.square.material.flatShading = this.guiControls.flatShading;
            this.square.material.needsUpdate = true;
        }

        // Animaciones
        if(this.guiControls.animations) {
            this.animate();
        }
    }
}