// SISTEMAS GRÁFICOS
// PRÁCTICA 2 - "PARRIBA"
// Autor: Juan Ocaña Valenzuela

// Game.js
// Escena principal del juego, en la que se gestiona su estado y elementos

/**
 * Clase principal del juego
 * @class Game
 */
class Game extends THREE.Scene {
    /**
     * Constructor
     * @param myCanvas Canvas HTML
     */
    constructor(myCanvas) {
        super();

        // Atributos del juego
        this.renderer = this.createRenderer(myCanvas);
        this.status = Game.IDLE;
        this.gameElements = [];
        this.tower = [];
        
        this.octree = null;
        this.gui = null;
        this.camera = null;
        this.ambientLight = null;
        this.spotLight = null;

        // Elementos auxiliares
        this.lineMaterial = new THREE.LineBasicMaterial({color: 0xFF0000});
        this.lines = [];

        // Creación de cámara
        this.createCamera();

        // Creación de GUI
        // this.createGUI();

        // Creación de Octree
        this.createOctree();

        // Elementos básicos de la escena
        this.createBasicElements();

        // Elementos del nivel
        this.populateLevel();
        
        // Luces
        this.createLights();
    }

    /**
     * Crea el renderizador de la escena en un Canvas HTML
     * @param {HTMLCanvasElement} canvas Canvas HTML
     */
    createRenderer(canvas) {
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        $(canvas).append(renderer.domElement);    
        return renderer;
    }

    /**
     * Crea y posiciona una cámara y la añade al grafo
     */
    createCamera() {
        let viewport = 2;
        this.camera = new THREE.OrthographicCamera(
            window.innerWidth / - viewport, 
            window.innerWidth / viewport, 
            window.innerHeight / viewport, 
            window.innerHeight / - viewport, 
            1, 
            500
        );
        this.camera.position.set(0,0,200);
        let look = new THREE.Vector3(0,0,0);
        this.camera.lookAt(look);
    }

    /**
     * Crea la GUI
     */
    createGUI() {
        throw new Error("TO DO");
    }

    /**
     * Crea y establece la configuración del Octree
     */
    createOctree() {
        this.octree = new THREE.Octree({
            undeferred: false,
            depthMax: Infinity,
            objectsThreshold: 4,
            overlapPct: 0.2,
        });
    }

    /**
     * Crea los elementos básicos del juego (paredes, decoración, etc.)
     */
    createBasicElements() {
        // Suelo
        let floorG = new THREE.BoxGeometry(window.innerWidth, 250, 10);
        floorG.translate(0, -(window.innerHeight / 2) + 5, 0);
        let floorM = new THREE.MeshPhongMaterial({color: 0x3322DD});
        this.floor = new THREE.Mesh(floorG, floorM);

        this.add(this.floor);
    }

    /**
     * Crea el nivel con sus elementos y objetivos
     */
    populateLevel() {
        // Bolas del nivel
        let x = -750;
        let y = -250;
        let increment = 150;

        for(let i = 0; i < 4; ++i) {
            this.gameElements.push(new FreeBall(x, y));
            this.gameElements.push(new FreeBall(x + increment, y));
            y += increment;
        }

        // Estructura inicial
        let b1 = new TowerBall(750, -100);
        let b2 = new TowerBall(750, -250);
        let b3 = new TowerBall(600, -100);
        let b4 = new TowerBall(600, -250);

        this.createStick(b1.getPosition(), b2.getPosition());
        this.createStick(b2.getPosition(), b3.getPosition());
        this.createStick(b3.getPosition(), b4.getPosition());
        this.createStick(b4.getPosition(), b1.getPosition());
        this.createStick(b1.getPosition(), b3.getPosition());
        this.createStick(b2.getPosition(), b4.getPosition());

        this.tower.push(b1);
        this.tower.push(b2);
        this.tower.push(b3);
        this.tower.push(b4);


        // Añadir FreeBalls
        for(let element of this.gameElements) {
            this.add(element);
            this.octree.add(element.getMesh(), {useFaces: true});
        }

        // Añadir torre
        for(let element of this.tower) {
            this.add(element);
            this.octree.add(element.getMesh(), {useFaces: true});
        }
    }

    /**
     * Crea las luces necesarias y las añade al grafo
     */
    createLights() {
        // Luz ambiente
        this.ambientLight = new THREE.AmbientLight(0xCCDDEE, 0.8);
        this.add(this.ambientLight);

        // Luz focal tras la cámara
        this.spotLight = new THREE.SpotLight( 0xFFFFFF, 0.45);
        this.spotLight.position.set(0, 0, 500);
        this.spotLight.angle = Math.PI/2;
        this.spotLight.castShadow = false;

        // Resolución de las sombras
        this.spotLight.shadow.mapSize.width=2048
        this.spotLight.shadow.mapSize.height=2048;
        this.add(this.spotLight);
    }

    /**
     * Carga el nivel indicado
     * @param {String} level El nivel a cargar
     */
    loadLevel() {
        throw new Error("TO DO");
    }

    /**
     * Devuelve la cámara activa
     * @returns {THREE.OrthographicCamera} Cámara activa
     */
    getCamera() {
        return this.camera;
    }

    /**
     * Crea y devuelve una nueva línea
     * @param {THREE.Vector2} start Punto de inicio
     * @param {THREE.Vector2} end Punto de fin
     * @returns {THREE.Line} Línea entre los dos puntos
     */
    newLine(start, end) {
        let geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        return new THREE.Line(geometry, this.lineMaterial);
    }

    /**
     * Crea y devuelve una geometría de línea entre dos puntos
     * @param {THREE.Vector2} start 
     * @param {THREE.Vector2} end
     * @returns {THREE.BufferGeometry} Geometría entre dos puntos
     */
    newLineGeometry(start, end) {
        return new THREE.BufferGeometry().setFromPoints([start, end]);
    }

    /**
     * Se ejecuta cuando se mueve el ratón
     * @param {MouseEvent} event Evento del ratón
     */
    onMouseMove(event) {
        // Ratón serializado para raycaster
        let rayMouse = new THREE.Vector2();
        rayMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        rayMouse.y = 1 - 2 * (event.clientY / window.innerHeight);

        // Ratón serializado para coordenadas THREE
        let mouse = new THREE.Vector2();
        mouse.x = event.clientX - window.innerWidth/2;
        mouse.y = window.innerHeight/2 - event.clientY;

        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(rayMouse, this.camera);

        let octreeObjects = this.octree.search(
            raycaster.ray.origin,
            raycaster.ray.far,
            true,
            raycaster.ray.direction
        );

        let intersections = raycaster.intersectOctreeObjects(octreeObjects);
        let unionObjects = null;

        // Si no hay ninguna bola seleccionada y hay una coincidencia, se selecciona
        // STATUS CAMBIA A Game.BALL_SELECTED
        if(this.status == Game.IDLE && intersections.length > 0 && intersections[0].object.userData instanceof FreeBall) {
            this.selectedObject = intersections[0].object.userData;
            this.selectedObject.onHover();
            this.status = Game.BALL_SELECTED;
        }
        // Si hay una bola seleccionada y no hay coincidencias, se abandona
        // STATUS CAMBIA A Game.IDLE
        else if(this.status == Game.BALL_SELECTED && intersections.length <= 0) {
            this.selectedObject.onLeave();
            this.selectedObject = null;
            this.status = Game.IDLE;
        }
        else if(this.status == Game.BALL_PICKED) {
            this.selectedObject.move(mouse.x, mouse.y);
            unionObjects = this.octree.search(this.selectedObject.getPosition(), 150);

            // Guardar TowerBall cercanas
            let tbs = [];
            for(let tb of unionObjects) {
                if(tb.object.userData instanceof TowerBall) {
                    tbs.push(tb.object.userData);
                }
            }

            // Eliminar líneas inactivas
            for(let l of this.lines) {
                if(!tbs.includes(l.target)) {
                    this.remove(l.line);
                    this.lines.splice(this.lines.indexOf(l), 1);
                }
            }
            
            // Posibles uniones con Tower
            // Si hay TowerBall 
            if(tbs.length > 0) {
                // Cambiar estado de FreeBall
                this.selectedObject.onDetection();

                for(let tb of tbs) {
                    // Si existe una línea, se actualiza su geometría
                    let l = this.lines.find(line => line.target == tb);
                    if(l !== undefined) {
                        l.line.geometry = this.newLineGeometry(this.selectedObject.getPosition(), tb.getPosition());
                        l.line.verticesNeedUpdate = true;
                    }
                    // Si no, se crea una nueva línea
                    else {
                        this.lines.push({
                            target: tb,
                            line: this.newLine( 
                                this.selectedObject.getPosition(),
                                tb.getPosition()
                            )
                        });
                    }
                }

                // Actualizar líneas
                for(let l of this.lines) {
                    this.add(l.line);
                }
            }
            else if(tbs.length <= 0 && this.selectedObject.getStatus() == FreeBall.POSSIBLE_UNION) {
                this.selectedObject.onPick();
            }
        }
    }

    /**
     * Se ejecuta cuando se pulsa un botón del ratón
     * @param {MouseEvent} event Evento del ratón
     */
    onMouseDown(event) {
        let button = event.which;

        // Si se ha seleccionado con el botón izquierdo
        // STATUS CAMBIA A Game.BALL_PICKED
        if(button == 1) {
            if(this.status == Game.BALL_SELECTED) {
                this.selectedObject.onPick();
                this.status = Game.BALL_PICKED;
            }
        }
    }

    /**
     * Se ejecuta cuando se suelta un botón del ratón
     * @param {MouseEvent} event Evento del ratón
     */
    onMouseUp(event) {
        let button = event.which;

        // Si se ha soltado el botón izquierdo en el estado Game.BALL_PICKED
        // STATUS CAMBIA A Game.IDLE
        if(button == 1) {
            if(this.status == Game.BALL_PICKED) {
                // Si la unión era posible, hacerla
                if(this.selectedObject.getStatus() == FreeBall.POSSIBLE_UNION) {
                    this.joinTower();
                }
                else {
                    this.selectedObject.onDrop();
                }

                // Eliminar líneas si las hubiera
                for(let l of this.lines) {
                    this.remove(l.line);
                }
                this.lines = [];

                this.status = Game.IDLE;
            }
        }
    }

    /**
     * Añade una FreeBall a la torre
     */
    joinTower() {
        // Crear TowerBall
        let tb = new TowerBall(this.selectedObject.getPosition().x, this.selectedObject.getPosition().y);
        this.gameElements.push(tb);
        this.octree.add(tb.mesh, {useFaces: true});
        this.add(tb);

        // Crear palos
        for(let l of this.lines) {
            this.createStick(this.selectedObject.getPosition(), l.target.getPosition());
        }

        // Eliminar FreeBall
        this.gameElements.splice(this.gameElements.indexOf(this.selectedObject), 1);
        this.remove(this.selectedObject);
        this.selectedObject = null;
    }

    /**
     * Crea un palo entre dos posiciones y lo añade a la escena, indexado
     */
    createStick(start, end) {
        let stick = new Stick(start, end);
        this.tower.push(stick);
        this.octree.add(stick);
        this.add(stick);
    }

    /**
     * Define la lógica del juego según los diferentes estados posibles
     */
    gameLogic() {
        throw new Error("Hay que mover la lógica aquí");
    }


    /**
     * Actualiza el estado del juego cada frame
     */
    update() {
        requestAnimationFrame(() => this.update());

        // Renderizar la escena
        this.renderer.render(this, this.getCamera());
        
        // Actualización del Octree
        this.octree.update();

        // Lógica del juego
        // this.gameLogic();

        // Actualización de objetos de la escena
        for(let element of this.gameElements) {
            element.update();
        }
    }


}

// Estados del juego
Game.IDLE = 0;
Game.BALL_SELECTED = 1;
Game.BALL_PICKED = 2
Game.POSSIBLE_UNION = 3;
Game.UNION = 4;

/**
 * Función principal
 */
$(function() {
    // Instancia de la escena
    let game = new Game("#WebGL-output");

    // Listeners
    window.addEventListener("mousemove", (event) => game.onMouseMove(event));
    window.addEventListener("mousedown", (event) => game.onMouseDown(event));
    window.addEventListener("mouseup", (event) => game.onMouseUp(event));

    // Primera visualización
    game.update();
});