class Car extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        // Cargamos el modelo .obj
        var that = this;
        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();
        materialLoader.load('../models/porsche911/911.mtl',
            function(materials) {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
                    function(object) {
                        that.modelo = object;
                        that.add(that.modelo);
                    }, null, null);
            }
        );
        this.position.y = 5;

        // Ejes:
        this.axis = new THREE.AxesHelper(5);
        this.add(this.axis);
    }
    
    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.animate = false;
            this.flatShading = true;
            
            // Un botón para dejarlo todo en su posición inicial
            // Cuando se pulse se ejecutará esta función.
            this.reset = function () {
                this.animate = false;
                this.flatShading = true;
            }
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add(this.guiControls, 'animate').name("Animaciones");
        folder.add(this.guiControls, 'flatShading').name("Sombreado plano");
    }
    
    animate() {
    }

    update () {
        // Animaciones
        if(this.guiControls.animations) {
            this.animate();
        }
    }
}