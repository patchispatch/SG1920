class Road extends THREE.Object3D {
    constructor() {
        super();

        // Propiedades
        this.sphereRadius = 1;
        this.curves = [];

        // Curva derecha
        let r = 5;
        this.curves.push(new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(r + r*Math.cos(5*Math.PI/4), r*Math.sin(5*Math.PI/4), 0),
            new THREE.Vector3(r + r*Math.cos(3*Math.PI/2), r*Math.sin(3*Math.PI/2), 0),
            new THREE.Vector3(r + r*Math.cos(7*Math.PI/4), r*Math.sin(7*Math.PI/4), 0),
            new THREE.Vector3(r + r*Math.cos(0), r*Math.sin(0), 0),
            new THREE.Vector3(r + r*Math.cos(Math.PI/4), r*Math.sin(Math.PI/4), 0),
            new THREE.Vector3(r + r*Math.cos(Math.PI/2), r*Math.sin(Math.PI/2), 0),
            new THREE.Vector3(r + r*Math.cos(3*Math.PI/4), r*Math.sin(3*Math.PI/4), 0),
            new THREE.Vector3(0, 0, 0),
        ]));

        // Curva izquierda
        this.curves.push(new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(-r + r*Math.cos(7*Math.PI/4), r*Math.sin(7*Math.PI/4), 0),
            new THREE.Vector3(-r + r*Math.cos(3*Math.PI/2), r*Math.sin(3*Math.PI/2), 0),
            new THREE.Vector3(-r + r*Math.cos(5*Math.PI/4), r*Math.sin(5*Math.PI/4), 0),
            new THREE.Vector3(-r + r*Math.cos(Math.PI), r*Math.sin(Math.PI), 0),
            new THREE.Vector3(-r + r*Math.cos(3*Math.PI/4), r*Math.sin(3*Math.PI/4), 0),
            new THREE.Vector3(-r + r*Math.cos(Math.PI/2), r*Math.sin(Math.PI/2), 0),
            new THREE.Vector3(-r + r*Math.cos(Math.PI/4), r*Math.sin(Math.PI/4), 0),
            new THREE.Vector3(0, 0, 0),
        ]));

        // Esfera
        let sphereG = new THREE.SphereBufferGeometry(this.sphereRadius, 32);
        let redMat = new THREE.MeshPhongMaterial({color: 0xFF0000});
        this.sphere = new THREE.Mesh(sphereG, redMat);
        this.add(this.sphere);

        // Visualizar la curva completa
        let path = new THREE.CurvePath();
        path.curves = [this.curves[0], this.curves[1]];
        let points = path.getPoints(100);
        let lineG = new THREE.BufferGeometry().setFromPoints(points);
        let lineMat = new THREE.LineBasicMaterial({color: 0xFF00FF});

        this.line = new THREE.Line(lineG, lineMat);
        this.add(this.line);

        // Animaciones
        let origen = {t: 0};
        let destino = {t: 1};
        let that = this;
        
        // A1
        this.a1 = new TWEEN.Tween(origen).to(destino, 4000);
        this.a1.easing(TWEEN.Easing.Quadratic.InOut);
        
        this.a1.onUpdate(function() {
            // Obtener punto de la curva
            let pos = that.curves[0].getPointAt(origen.t);
            that.sphere.position.copy(pos);

            // Tangente
            let tangent = that.curves[0].getTangentAt(origen.t);
            pos.add(tangent);

            // Mirar al punto de la tangente
            that.sphere.lookAt(pos);
        });

        this.a1.onComplete(function() {
            origen.t = 0;
        });

        // A2
        this.a2 = new TWEEN.Tween(origen).to(destino, 8000);
        this.a2.easing(TWEEN.Easing.Quadratic.InOut);
        
        this.a2.onUpdate(function() {
            // Obtener punto de la curva
            let pos = that.curves[1].getPointAt(origen.t);
            that.sphere.position.copy(pos);

            // Tangente
            let tangent = that.curves[1].getTangentAt(origen.t);
            pos.add(tangent);

            // Mirar al punto de la tangente
            that.sphere.lookAt(pos);
        });

        this.a2.onComplete(function() {
            origen.t = 0;
        });

        this.a1.chain(this.a2);
        this.a1.start();
    }

    update() {
        
    }
}