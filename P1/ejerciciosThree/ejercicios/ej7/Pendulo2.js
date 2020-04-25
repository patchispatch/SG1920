class Pendulo2 extends THREE.Object3D {
    constructor(h) {
        super();

        // Altura del péndulo
        this.blueH = h;
        this.blueScale = 1;

        // Mesh
        var p2Geom = new THREE.BoxGeometry(4, this.blueH, 2);
        var blueMat = new THREE.MeshPhongMaterial({color: 0x6891e3});
        this.blueBox = new THREE.Mesh(p2Geom, blueMat);

        // blueBox se encuentra en el lateral del péndulo 1
        // Inicialmente "cuelga" de la mitad del segmento rojo
        this.blueBox.position.z = 3;
        this.blueBox.position.y = -this.blueH/2 + 1;

        // Añadimos a la escena
        this.add(this.blueBox);
    }

    getHeight() {
        return this.blueH * this.blueScale;
    }

    setHeight(scale) {
        this.blueScale = scale;
    }

    update() {
        this.blueBox.scale.y = this.blueScale;
        this.blueBox.position.y = -(this.blueH * this.blueScale)/2 + 1;
    }
}