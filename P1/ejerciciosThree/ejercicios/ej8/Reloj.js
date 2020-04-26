class Reloj extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui) {
        super();

        // Interfaz
        this.createGui(gui, titleGui);

        // Ejes:
        this.axis = new THREE.AxesHelper(5);
        this.add(this.axis);

        // Radio del reloj
        this.clockRad = 20;
        this.angle = Math.PI/6;

        // Geometría y material de la corona del reloj
        var sphereGeom = new THREE.SphereGeometry(1, 32, 32);
        var greenMat = new THREE.MeshPhongMaterial({color: 0x31f683});

        // Producción de la corona del reloj:
        for(var i = 0; i < 12; ++i) {

            var s = new THREE.Mesh(sphereGeom, greenMat);
            s.position.z = this.clockRad;
            var sp = new THREE.Object3D();
            sp.add(s);

            // Rotar a su posición
            sp.rotation.y = i * this.angle;

            // Añadir a escena
            this.add(sp);
        }

        // Aguja del reloj
        this.needleRad = 15;
        var redMat = new THREE.MeshPhongMaterial({color: 0xff1453});

        this.needleBall = new THREE.Mesh(sphereGeom, redMat);
        this.needleBall.position.z = this.needleRad;
        this.needle = new THREE.Object3D();
        this.needle.add(this.needleBall);
        this.add(this.needle);
        this.tiempoAnterior = Date.now();
    }

    createGui(gui, titleGui) {
        // Controles de giro y escala para el péndulo 1:
        this.guiControls = new function() {
            this.clockSpeed = 1;

            this.reset = function() {
                this.clockSpeed = 1;
            }
        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls, 'clockSpeed', -12, 12, 1).name('Controles de velocidad');
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update() {
        var tiempoActual= Date.now();
        var segundosTranscurridos = (tiempoActual - this.tiempoAnterior)/1000;
        this.needle.rotateY(this.guiControls.clockSpeed * segundosTranscurridos);

        this.tiempoAnterior = tiempoActual;
    }
}