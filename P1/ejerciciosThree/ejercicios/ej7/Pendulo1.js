class Pendulo1 extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui) {
        super();

        // Interfaz
        this.createGui(gui, titleGui);

        // Alturas:
        this.redH = 5;
        this.blueH = 10;

        // El péndulo se compone de tres mesh, dos cubos verdes
        // de dimensiones 4x4x4, y un prisma rojo de escala en Y 
        // variable.
        var boxGeom = new THREE.BoxGeometry(4, 4, 4);
        var prismGeom = new THREE.BoxGeometry(4, this.redH, 4);
        var p2Geom = new THREE.BoxGeometry(4, this.blueH, 2);

        // Materiales
        var greenMat = new THREE.MeshPhongMaterial({color: 0x3bce60});
        var redMat = new THREE.MeshPhongMaterial({color: 0xe84a4a});
        var blueMat = new THREE.MeshPhongMaterial({color: 0x6891e3});

        // Péndulo 1
        this.box1 = new THREE.Mesh(boxGeom, greenMat);
        this.redBox = new THREE.Mesh(prismGeom, redMat);
        this.box2 = new THREE.Mesh(boxGeom, greenMat);

        // Péndulo 2
        this.blueBox = new THREE.Mesh(p2Geom, blueMat);
        this.p2 = new THREE.Object3D();

        
        // Posición y jerarquía de los elementos
        // box1 se encuentra en su sitio, ya que BoxGeometry se crea centrada
        // en el origen.
        // redBox debe desplazarse en Y justo debajo, la mitad de la altura de 
        // box1
        this.redBox.position.y = -this.redH/2 - 2;

        // La longitud en y de redBox es variable según la GUI
        this.redBox.scale.y = this.guiControls.redScale;

        // box2 debe situarse justo debajo de las dos figuras anteriores
        this.box2.position.y = -4 - this.guiControls.redScale * this.redH;

        // blueBox se encuentra en el lateral del péndulo 1
        // Inicialmente "cuelga" de la mitad del segmento rojo
        this.blueBox.position.z = 3;
        this.blueBox.position.y = -this.blueH/2 + 1;

        // Añadimos las figuras a la escena
        this.add(this.box1);
        this.p2.add(this.blueBox);
        this.add(this.p2);
        this.add(this.redBox);
        this.add(this.box2);
    }

    createGui(gui, titleGui) {
        // Controles de giro y escala para el péndulo 1:
        this.guiControls = new function() {
            this.p1Rotation = 0;
            this.redScale = 1;

            this.p2Rotation = 0;
            this.blueScale = 1;
            this.p2Pos = 0;

            this.reset = function() {
                this.p1Rotation = 0.0;
                this.redScale = 1.0;
                
                this.p2Rotation = 0;
                this.blueScale = 1;
                this.p2Pos = 0;
            }
        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls, 'p1Rotation', -Math.PI/4, Math.PI/4, 0.1).name('Rotación de P1').listen();
        folder.add(this.guiControls, 'redScale', 1.0, 2.0, 0.2).name('Longitud del segmento rojo').listen();
        folder.add(this.guiControls, 'p2Rotation', -Math.PI/4, Math.PI/4, 0.1).name('Rotación de P2').listen();
        folder.add(this.guiControls, 'blueScale', 1.0, 2.0, 0.2).name('Longitud del segmento azul').listen();
        folder.add(this.guiControls, 'p2Pos', -0.45, 0.45, 0.05).name('Posición del segmento azul').listen();
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update() {
        this.redBox.scale.y = this.guiControls.redScale;
        this.redBox.position.y = -2 -(this.redH * this.guiControls.redScale)/2;
        this.box2.position.y = -4 - this.guiControls.redScale * this.redH;
        this.rotation.z = this.guiControls.p1Rotation;

        this.p2.scale.y = this.guiControls.blueScale;
        this.p2.rotation.z = this.guiControls.p2Rotation;
        this.p2.position.y = -2 - (this.redH * this.guiControls.redScale)/2 +
            this.guiControls.p2Pos * this.redH * this.guiControls.redScale;
    }
}