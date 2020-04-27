class Pendulo1 extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui) {
        super();

        // Interfaz
        this.createGui(gui, titleGui);

        // Alturas:
        this.redH = 5;
        this.blueH = 10;

        // Velocidades de animación (rad/s)
        this.p1Speed = 1;
        this.p2Speed = 1;

        // Máxima rotación de cada péndulo
        this.p1MaxRot = Math.PI/4;
        this.p2MaxRot = Math.PI/4;

        // El péndulo se compone de tres mesh, dos cubos verdes
        // de dimensiones 4x4x4, y un prisma rojo de escala en Y 
        // variable.
        var boxGeom = new THREE.BoxGeometry(4, 4, 4);
        var prismGeom = new THREE.BoxGeometry(4, this.redH, 4);


        // Materiales
        var greenMat = new THREE.MeshPhongMaterial({color: 0x3bce60});
        var redMat = new THREE.MeshPhongMaterial({color: 0xe84a4a});


        // Péndulo 1
        this.box1 = new THREE.Mesh(boxGeom, greenMat);
        this.redBox = new THREE.Mesh(prismGeom, redMat);
        this.box2 = new THREE.Mesh(boxGeom, greenMat);

        // Péndulo 2

        this.p2 = new Pendulo2(this.blueH);

        
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

        // Añadimos las figuras a la escena
        this.add(this.box1);
        this.add(this.p2);
        this.add(this.redBox);
        this.add(this.box2);

        // Medimos el instante
        this.fTime = Date.now();
    }

    createGui(gui, titleGui) {
        // Controles de giro y escala para el péndulo 1:
        this.guiControls = new function() {
            this.p1Rotation = 0;
            this.redScale = 1;

            this.p2Rotation = 0;
            this.blueScale = 1;
            this.p2Pos = 0;

            this.p1Anim = false;
            this.p2Anim = false;

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

        var anim = gui.addFolder('Animaciones');
        anim.add(this.guiControls, 'p1Anim').name("Animación de P1");
        anim.add(this.guiControls, 'p2Anim').name('Animación de P2');
    }

    update() {
        var time = Date.now();
        var sec = (time - this.fTime)/1000;

        // Posición
        this.redBox.scale.y = this.guiControls.redScale;
        this.redBox.position.y = -2 -(this.redH * this.guiControls.redScale)/2;
        this.box2.position.y = -4 - this.guiControls.redScale * this.redH;
        this.p2.position.y = -2 - (this.redH * this.guiControls.redScale)/2 +
        this.guiControls.p2Pos * this.redH * this.guiControls.redScale;
        this.p2.setHeight(this.guiControls.blueScale);

        // Animación
        if(this.guiControls.p1Anim) {
            this.rotateZ(this.p1Speed * sec);

            // Cambiar de sentido
            if(this.rotation.z >= this.p1MaxRot || this.rotation.z <= -this.p1MaxRot)
                this.p1Speed = -this.p1Speed;
        }
        else {
            this.rotation.z = this.guiControls.p1Rotation;
        }

        if(this.guiControls.p2Anim) {
            this.p2.rotateZ(this.p2Speed * sec);

            // Cambiar de sentido
            if(this.p2.rotation.z >= this.p2MaxRot || this.p2.rotation.z <= -this.p2MaxRot)
                this.p2Speed = -this.p2Speed;
        }
        else {
            this.p2.rotation.z = this.guiControls.p2Rotation;
        }

        this.guiControls.p1Rotation = this.rotation.z;
        this.guiControls.p2Rotation = this.p2.rotation.z;

        this.p2.update();
        this.fTime = time;
    }
}