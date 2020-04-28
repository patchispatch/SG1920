class Satellite extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui, obj) {
        super();

        // Atributos de la clase
        this.orbitRadius = 1;
        this.satRadius = 1;
        this.rotationSpeed = 1;
        this.translationSpeed = 1;
        this.material = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
        this.texture = null;

        if(obj !== undefined) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                  this[prop] = obj[prop];
                }
            }
        }

        // Interfaz
        this.createGui(gui, titleGui);

        // Satélite
        var satG = new THREE.SphereBufferGeometry(this.satRadius, 32, 32);
        this.sat = new THREE.Mesh(satG, this.material);
        this.add(this.sat);

    }

    createGui(gui, titleGui) {
        // Controles de giro y escala para el péndulo 1:
        this.guiControls = new function() {
            this.noSirve = true;

            this.reset = function() {
                this.noSirve = true;
            }
        }

        var folder = gui.addFolder(titleGui);
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update() {
        console.log("E");
    }
}