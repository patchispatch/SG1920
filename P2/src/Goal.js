// SISTEMAS GRÁFICOS
// PRÁCTICA 2 - "PARRIBA"
// Autor: Juan Ocaña Valenzuela

// Goal.js
/**
 * Define la meta de un nivel
 */
class Goal extends Element {
    /**
     * Constructor con un parámetro
     * @constructor
     */
    constructor(x, y, game) {
        super();

        this.radius = 100;
        this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        this.material = new THREE.MeshToonMaterial({
            color: 0x00D9C0,
            transparent: true,
            opacity: 0.5,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.userData = this;

        this.game = game;

        this.mesh.position.x = x;
        this.mesh.position.y = y;

        this.add(this.mesh);
    }

    /**
     * Devuelve el radio de la meta
     * @returns Radio actual
     */
    getRadius() {
        return this.radius;
    }

    inside(point) {
        let distance = (point.x - this.mesh.position.x) * (point.x - this.mesh.position.x) +
                       (point.y - this.mesh.position.y) * (point.y - this.mesh.position.y);
        return distance < (this.radius * this.radius);
    }

    update() {
        // ...
    }
}