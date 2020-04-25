class Reloj extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui) {
        super();

        // Interfaz
        this.createGui(gui, titleGui);

        // Radio del reloj y de la aguja
        this.clockRad = 10;
        this.needleRad = 5;

        // Geometría y material de la corona del reloj
        var sphereGeom = new THREE.SphereGeometry(3, 32, 32);
        var greenMat = new THREE.MeshPhongMaterial({color: 0x31f683});

        // Producción de la corona del reloj:
        var angle = Math.PI/12;
        for(var i = 0; i < 12; ++i) {
            var s = new THREE.Mesh(sphereGeom, greenMat);
            s.position.y = this.clockRad;

            // Rotar a su posición
            s.rotation.y = i * angle;

            console.log(i);
            // Añadir a escena
            this.add(s);
        } 
    }

    createGui(gui, titleGui) {
        // Controles de giro y escala para el péndulo 1:
        this.guiControls = new function() {

            this.reset = function() {

            }
        }

        var folder = gui.addFolder(titleGui);
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update() {

    }
}