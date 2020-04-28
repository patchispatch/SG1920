class Satellite extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui, obj) {
        super();

        // Atributos de la clase
        this.orbitRadius = 0;
        this.satRadius = 1;
        this.initialRotation = 0;
        this.rotationSpeed = 1;
        this.translationSpeed = 0;
        this.material = new THREE.MeshPhongMaterial({color: 0xFFFFFF});

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

        // Rotar si es necesario
        if(this.initialRotation != 0) {
            this.sat.rotation.y = this.initialRotation;
        }

        // Órbita
        if(this.orbitRadius != 0) {
            this.orb = new THREE.Object3D();
            this.sat.position.z = this.orbitRadius;
            this.orb.add(this.sat);
            this.add(this.orb);
        }
        else {
            this.add(this.sat);
        }
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

    // Animación del satélite: rotación
    animateSat(frac) {
        this.sat.rotateY(this.rotationSpeed * frac);
    }

    animateOrb(frac) {
        this.orb.rotateY(this.translationSpeed * frac);
    }

    update(deltaTime) {
        // Fracción de segundos pasados
        let frac = deltaTime / 1000;
        
        console.log(this.rotationSpeed);

        if(this.rotationSpeed != 0) {
            console.log("rotando");
            this.animateSat(frac);
        }

        if(this.translationSpeed != 0) {
            console.log("Trasladando");
            this.animateOrb(frac);
        }
    }
}