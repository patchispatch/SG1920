class Cilindrosfera extends THREE.Object3D {
    
    // Constructor
    constructor(gui, titleGui, obj) {
        super();

        // Crear GUI
        this.createGui(gui, titleGui)

        // Atributos de la clase
        this.xRadius = 5;
        this.yRadius = 8;
        this.cylinderHeight = 8;
        this.looptime = 2000;
        this.sphereRadius = 1;
        this.cylinderMaterial = new THREE.MeshNormalMaterial({
            opacity: 0.35, 
            transparent: true,
        });
        this.sphereMaterial = new THREE.MeshPhongMaterial({color: 0x70c2b4});

        // Control de velocidad
        this.goesUp = true;

        // Inicializar variables pasadas mediante objeto
        if(obj !== undefined) {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                  this[prop] = obj[prop];
                }
            }
        }

        // Esfera
        let sphereG = new THREE.SphereBufferGeometry(this.sphereRadius, 32, 32);
        this.sphere = new THREE.Mesh(sphereG, this.sphereMaterial);

        // Cilindro elíptico
        let ellipse = new THREE.EllipseCurve(0, 0, this.xRadius, this.yRadius);

        let points = [];
        for(let p of ellipse.getPoints(100)) {
            points.push(new THREE.Vector3(p.x, 0, p.y));
        }

        this.curve = new THREE.CatmullRomCurve3(points);
        let shape = new THREE.Shape(ellipse.getPoints(100));

        let settings = {
            depth: this.cylinderHeight,
            bevelEnabled: false,
        }

        let cylG = new THREE.ExtrudeBufferGeometry(shape, settings);
        cylG.translate(0, 0,-this.cylinderHeight/2);
        cylG.rotateX(-Math.PI/2);
        this.cyl = new THREE.Mesh(cylG, this.cylinderMaterial);

        // Esfera en órbita
        let lineMat = new THREE.LineBasicMaterial({
            color: 0x0000ff,
        });
        let lineGeom = new THREE.BufferGeometry().setFromPoints(points);
        this.line = new THREE.Line(lineGeom, lineMat);
        
        this.add(this.sphere);
        this.add(this.line);
        this.add(this.cyl);
    }

    createGui(gui, titleGui) {
        this.guiControls = new function() {
            this.xRadius = 5;
            this.yRadius = 5;

            this.reset = function() {
                this.xRadius = 5;
                this.yRadius = 5;
            }
        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls, 'xRadius', 5, 20, 1).name('Radio X').listen();
        folder.add(this.guiControls, 'yRadius', 5, 20, 1).name('Radio Y').listen();
        folder.add(this.guiControls, 'reset').name('[ Reset ]');
    }

    // Actualizar el radio de rotación con el del cilindro
    updateRadius() {
        // Actualizar radios
        this.xRadius = this.guiControls.xRadius;
        this.yRadius = this.guiControls.yRadius;

        // Rehacer geometrías y curvas
        let ellipse = new THREE.EllipseCurve(0, 0, this.xRadius, this.yRadius);

        let points = [];
        for(let p of ellipse.getPoints(100)) {
            points.push(new THREE.Vector3(p.x, 0, p.y));
        }

        this.curve = new THREE.CatmullRomCurve3(points);
        let shape = new THREE.Shape(ellipse.getPoints(100));

        let settings = {
            depth: this.cylinderHeight,
            bevelEnabled: false,
        }

        let cylG = new THREE.ExtrudeBufferGeometry(shape, settings);
        cylG.translate(0, 0,-this.cylinderHeight/2);
        cylG.rotateX(-Math.PI/2);
        this.cyl.geometry = cylG;

        let lineGeom = new THREE.BufferGeometry().setFromPoints(points);
        this.line.geometry = lineGeom;
    }

    // Animación del satélite: rotación
    animate() {
        // Posición en la curva
        let time = Date.now();
        let t = (time % this.looptime) / this.looptime;

        // Obtener punto de la curva
        let pos = this.curve.getPointAt(t);
        this.sphere.position.copy(pos);

        // Tangente
        let tangent = this.curve.getTangentAt(t);
        pos.add(tangent);

        // Mirar al punto de la tangente
        this.sphere.lookAt(pos);
    }

    update() {
        // Si se ha cambiado el radio, actualizar
        if(this.guiControls.xRadius != this.xRadius || this.guiControls.yRadius != this.yRadius) {
            this.updateRadius();
        }

        this.animate();
    }
}