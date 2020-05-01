class Cilindrosfera extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui, obj) {
        super();

        // Crear GUI
        this.createGui(gui, titleGui)

        // Atributos de la clase
        this.rotationSpeed = 1;
        this.verticalSpeed = 12;
        this.cylinderRadius = 5;
        this.cylinderHeight = 8;
        this.sphereRadius = 1;
        this.cylinderMaterial = new THREE.MeshNormalMaterial({
            opacity: 0.35, 
            transparent: true,
        });
        this.sphereMaterial = new THREE.MeshPhongMaterial({color: 0x333333});

        // Control de velocidad
        this.goesUp = true;

        if(obj !== undefined) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                  this[prop] = obj[prop];
                }
            }
        }

        // Esfera
        var sphereG = new THREE.SphereBufferGeometry(this.sphereRadius, 32, 32);
        this.sphere = new THREE.Mesh(sphereG, this.material);

        // Cilindro
        var cylinderG = new THREE.CylinderBufferGeometry(this.cylinderRadius, this.cylinderRadius, this.cylinderHeight, 32);
        this.cyl = new THREE.Mesh(cylinderG, this.cylinderMaterial);

        this.sphere.position.z = this.cylinderRadius;
        this.orb = new THREE.Object3D();
        this.orb.add(this.sphere);
        
        this.cyl.add(this.orb);
        this.add(this.cyl);
    }

    createGui(gui, titleGui) {
        this.guiControls = new function() {
            this.radius = 5;

            this.reset = function() {
                this.radius = 5;
            }
        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls, 'radius', 5, 20, 1).name('Radio del cilindro').listen();
        folder.add(this.guiControls, 'reset').name('[ Reset ]');
    }

    // Actualizar el radio de rotación con el del cilindro
    updateRadius() {
        // Actualizar rotación de la esfera
        this.sphere.position.z = this.guiControls.radius;

        // Actualizar radio del cilindro
        this.cylinderRadius = this.guiControls.radius;
        this.cyl.geometry = new THREE.CylinderBufferGeometry(this.cylinderRadius, this.cylinderRadius, this.cylinderHeight, 32);
    }

    // Animación del satélite: rotación
    animate(frac) {
        // Rotación
        this.orb.rotateY(this.rotationSpeed * frac);

        // Movimiento vertical
        this.sphere.translateY(this.verticalSpeed * frac);

        if(this.sphere.position.y >= this.cylinderHeight/2 && this.goesUp) {
            this.verticalSpeed = -this.verticalSpeed;
            this.goesUp = false;
        }
        else if(this.sphere.position.y <= -this.cylinderHeight/2 && !this.goesUp) {
            this.verticalSpeed = -this.verticalSpeed;
            this.goesUp = true;
        }
    }

    update(deltaTime) {
        // Si se ha cambiado el radio, actualizar
        if(this.guiControls.radius != this.cylinderRadius) {
            this.updateRadius();
        }

        // Fracción de segundos pasados
        let frac = deltaTime / 1000;
        this.animate(frac);
    }
}