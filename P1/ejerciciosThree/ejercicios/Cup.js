class Cup extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        // Geometrías de la taza:
        var cylinder1 = new THREE.CylinderGeometry(3.3, 3, 8, 32);
        var cylinder2 = new THREE.CylinderGeometry(2.3, 2, 8, 32);
        var torus1 = new THREE.TorusGeometry(2, 0.4, 16, 100);

        // Movemos las geometrías a su lugar correspondiente
        cylinder2.translate(0, -0.5, 0);
        torus1.translate(-3, 0, 0);

        // Creamos las geometrías BSP
        var c1 = new ThreeBSP(cylinder1);
        var c2 = new ThreeBSP(cylinder2);
        var t1 = new ThreeBSP(torus1);

        // Realizamos las operaciones booleanas para construir la taza
        var c3 = c1.union(t1);
        var cupG = c3.subtract(c2);

        // Creamos el mesh con el material y la geometría
        var material = new THREE.MeshNormalMaterial({
            flatShading: true,
        });
        this.cup = cupG.toMesh(material);
        this.cup.geometry.computeVertexNormals();

        // Finalmente se añade a la escena
        this.add(this.cup);

        // Ejes:
        this.axis = new THREE.AxesHelper(5);
        this.add(this.axis);
    }
    
    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.animate = false;
            
            // Un botón para dejarlo todo en su posición inicial
            // Cuando se pulse se ejecutará esta función.
            this.reset = function () {
            this.animate = false;
            }
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add(this.guiControls, 'animate').name("Animaciones");
    }
    
    animate() {
        this.square.rotateX(0.01);
        this.square.rotateY(0.01);
        this.square.rotateZ(0.01);
    }

    update () {
        // Animaciones
        if(this.guiControls.animations) {
            this.animate();
        }
    }
}