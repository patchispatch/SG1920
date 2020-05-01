class Road extends THREE.Object3D {
    constructor() {
        super();

        // Propiedades
        this.sphereRadius = 1;
        this.animations = [];

        // Curva derecha
        let r = 5;
        this.animations.push({
            curve: new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(r + r*Math.cos(5*Math.PI/4), r*Math.sin(5*Math.PI/4), 0),
                new THREE.Vector3(r + r*Math.cos(3*Math.PI/2), r*Math.sin(3*Math.PI/2), 0),
                new THREE.Vector3(r + r*Math.cos(7*Math.PI/4), r*Math.sin(7*Math.PI/4), 0),
                new THREE.Vector3(r + r*Math.cos(0), r*Math.sin(0), 0),
                new THREE.Vector3(r + r*Math.cos(Math.PI/4), r*Math.sin(Math.PI/4), 0),
                new THREE.Vector3(r + r*Math.cos(Math.PI/2), r*Math.sin(Math.PI/2), 0),
                new THREE.Vector3(r + r*Math.cos(3*Math.PI/4), r*Math.sin(3*Math.PI/4), 0),
                new THREE.Vector3(0, 0, 0),
            ]),
            looptime: 4000,
        });

        // Curva izquierda
        this.animations.push({
            curve: new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(-r + r*Math.cos(7*Math.PI/4), r*Math.sin(7*Math.PI/4), 0),
                new THREE.Vector3(-r + r*Math.cos(3*Math.PI/2), r*Math.sin(3*Math.PI/2), 0),
                new THREE.Vector3(-r + r*Math.cos(5*Math.PI/4), r*Math.sin(5*Math.PI/4), 0),
                new THREE.Vector3(-r + r*Math.cos(Math.PI), r*Math.sin(Math.PI), 0),
                new THREE.Vector3(-r + r*Math.cos(3*Math.PI/4), r*Math.sin(3*Math.PI/4), 0),
                new THREE.Vector3(-r + r*Math.cos(Math.PI/2), r*Math.sin(Math.PI/2), 0),
                new THREE.Vector3(-r + r*Math.cos(Math.PI/4), r*Math.sin(Math.PI/4), 0),
                new THREE.Vector3(0, 0, 0),
            ]),
            looptime: 8000,
        });

        // Visualizar la curva completa
        let path = new THREE.CurvePath();
        path.curves = [this.animations[0].curve, this.animations[1].curve];
        let points = path.getPoints(100);
        let lineG = new THREE.BufferGeometry().setFromPoints(points);
        let lineMat = new THREE.LineBasicMaterial({color: 0xFF00FF});

        this.line = new THREE.Line(lineG, lineMat);
        this.add(this.line);
    }

    update() {

    }
}