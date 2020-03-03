class MySphere extends THREE.Object3D {
    // Constructor de la esfera
    constructor (gui, titleGui) {
        super();

        // Interfaz que controla la esfera
        this.createGUI(gui, titleGui);

        // Los ejes
        this.axis = new THREE.AxesHelper(5);
        this.add(this.axis);

        // Capas:
        this.widthSegments = 16;
        this.heightSegments = 16;

        // Mesh de la esfera: geometría y material
        var sphereGeom = new THREE.SphereGeometry(1, this.widthSegments, this.heightSegments);
        var sphereMat = new THREE.MeshNormalMaterial({
            flatShading: true,
        });
        this.sphere = new THREE.Mesh(sphereGeom, sphereMat);
        this.add(this.sphere);
    }

    createGUI(gui, titleGui) {
        // Controles para el tamaño, orientación y posición de la esfera
        this.guiControls = new function() {
            this.sizeX = 1.0;
            this.sizeY = 1.0;
            this.sizeZ = 1.0;

            this.widthSegments = 16;
            this.heightSegments = 16;

            this.flatShading = true;

            // Un botón para dejarlo todo en su posición inicial
            // Cuando se pulse se ejecutará esta función.
            this.reset = function () {
                this.sizeX = 1.0;
                this.sizeY = 1.0;
                this.sizeZ = 1.0;

                this.widthSegments = 16;
                this.heightSegments = 16;

                this.flatShading = true;
            }
        }

        // Se crea una sección para los controles de la esfera
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
        folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
        folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();

        folder.add (this.guiControls, 'widthSegments', 4, 64, 4).name ('Segmentos verticales: ').listen();
        folder.add (this.guiControls, 'heightSegments', 4, 64, 4).name ('Segmentos horizontales: ').listen();

        folder.add(this.guiControls, 'flatShading', )
        
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update() {
        this.sphere.geometry = new THREE.SphereGeometry(1, this.guiControls.widthSegments, this.guiControls.heightSegments);
        this.sphere.scale.set(this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
        this.sphere.rotateY(0.01);
    }
}