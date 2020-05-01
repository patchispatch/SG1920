class Heart extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui) {
        super();

        // Interfaz
        this.createGUI(gui, titleGui);

        // Ejes
        this.axis = new THREE.AxesHelper(5);
        this.add(this.axis);

        // Mesh de la forma
        var x = 0, y = 0;

        var heartShape = new THREE.Shape();
        
        heartShape.moveTo( x + 5, y + 5 );
        heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
        heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
        heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
        heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
        heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
        heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
        
        var extrudeSettings = { depth: 4, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        
        var geometry = new THREE.ExtrudeBufferGeometry( heartShape, extrudeSettings );
        var material = new THREE.MeshNormalMaterial({
            flatShading: true,
        });
        this.heart = new THREE.Mesh(geometry, material);
        this.heart.rotateX(Math.PI);
        this.add(this.heart);

        // Árbol de nodos para rotaciones
        this.cd = new THREE.Object3D();
        this.cd.position.x = 10;
        this.cd.add(this.heart);

        this.e = new THREE.Object3D();
        this.e.add(this.cd);

        this.add(this.e);
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
        var alfa = Math.PI/8 * 0.1;
        var beta = Math.PI/8 * 0.01;
        this.e.rotation.z += beta;
        this.cd.rotation.z -= beta;
        this.heart.rotation.y += alfa;
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