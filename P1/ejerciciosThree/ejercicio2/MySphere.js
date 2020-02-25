class MySphere extends THREE.Object3D {
    // Constructor de la esfera
    constructor (gui, titleGui) {
        super();

        // Interfaz que controla la esfera
        this.createGUI(gui, titleGui);

        // Mesh de la esfera: geometría y material
        var sphereGeom = new THREE.SphereGeometry(5, 32, 32);
        var sphereMat = new THREE.MeshPhongMaterial({color: 0x428af5});
        var sphere = new THREE.Mesh(sphereGeom, sphereMat);
        this.add(sphere);

        // Subimos el mesh hasta 5:
        sphere.position.y = 5.0;
    }

    createGUI(gui, titleGui) {
        // Controles para el tamaño, orientación y posición de la esfera
        this.guiControls = new function() {
            this.sizeX = 1.0;
            this.sizeY = 1.0;
            this.sizeZ = 1.0;
            
            this.rotX = 0.0;
            this.rotY = 0.0;
            this.rotZ = 0.0;
            
            this.posX = 0.0;
            this.posY = 0.0;
            this.posZ = 0.0;

            // Un botón para dejarlo todo en su posición inicial
            // Cuando se pulse se ejecutará esta función.
            this.reset = function () {
                this.sizeX = 1.0;
                this.sizeY = 1.0;
                this.sizeZ = 1.0;
                
                this.rotX = 0.0;
                this.rotY = 0.0;
                this.rotZ = 0.0;
                
                this.posX = 0.0;
                this.posY = 0.0;
                this.posZ = 0.0;
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
        
        folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
        folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
        folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();
        
        folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
        folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
        folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();
        
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update() {
        this.position.set(this.guiControls.posX, this.guiControls.posY, this.guiControls.posZ);
        this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
        this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ)
    }
}