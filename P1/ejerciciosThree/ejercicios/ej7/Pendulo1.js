class Pendulo1 extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui) {
        super();

        // Interfaz
        this.createGui(gui, titleGui);

        // Altura del prisma rojo:
        this.redH = 5;

        // El péndulo se compone de tres mesh, dos cubos verdes
        // de dimensiones 4x4x4, y un prisma rojo de escala en Y 
        // variable.
        var boxGeom = new THREE.BoxGeometry(4, 4, 4);
        var prismGeom = new THREE.BoxGeometry(4, this.redH, 4);

        var greenMat = new THREE.MeshPhongMaterial({color: 0x3bce60});
        var redMat = new THREE.MeshPhongMaterial({color: 0xe84a4a});

        this.box1 = new THREE.Mesh(boxGeom, greenMat);
        this.redBox = new THREE.Mesh(prismGeom, redMat);
        this.box3 = new THREE.Mesh(boxGeom, greenMat);

        // Posición y jerarquía de los elementos
        // box1 se encuentra en su sitio, ya que BoxGeometry se crea centrada
        // en el origen.
        // redBox debe desplazarse en Y justo debajo, la mitad de la altura de 
        // box1
        this.redBox.position.y = -this.redH/2 - 2;

        // La longitud en y de redBox es variable según la GUI
        this.redBox.scale.y = this.guiControls.redScale;

        // box3 debe situarse justo debajo de las dos figuras anteriores
        this.box3.position.y = -4 - this.guiControls.redScale * this.redH;

        // Añadimos las figuras a la escena
        this.add(this.box1);
        this.add(this.redBox);
        this.add(this.box3);
    }

    createGui(gui, titleGui) {
        // Controles de giro y escala para el péndulo 1:
        this.guiControls = new function() {
            this.rotation = 0;
            this.redScale = 1;

            this.reset = function() {
                this.rotation = 0.0;
                this.redScale = 1.0;
            }
        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls, 'rotation', -Math.PI, Math.PI, 0.1).name('Rotación').listen();
        folder.add(this.guiControls, 'redScale', 1.0, 2.0, 0.2).name('Longitud del segmento rojo').listen();
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update() {
        this.redBox.scale.y = this.guiControls.redScale;
        this.redBox.position.y = -2 -(this.redH * this.guiControls.redScale)/2;
        this.box3.position.y = -4 - this.guiControls.redScale * this.redH;
        this.rotation.z = this.guiControls.rotation;
    }
}