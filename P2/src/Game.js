// SISTEMAS GRÁFICOS
// PRÁCTICA 2 - "PARRIBA"
// Autor: Juan Ocaña Valenzuela

// Game.js
// Escena principal del juego, en la que se gestiona su estado y elementos
var level = 0;

function setLevel(l) {
    level = l;
}

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
        this.status = Game.MENU;
        this.gameElements = [];
        this.tower = [];
        this.goal = null;

        // Rebobinado
        this.lastMoveElements = [];
        
        this.octree = null;
        this.gui = null;
        this.camera = null;
        this.ambientLight = null;
        this.spotLight = null;
        this.mouse = null;
        this.sound = null;

        // Creación de cámara
        this.createCamera();

        this.createAudio();

        // Compositor
        this.composer = this.createComposer(myCanvas);

        // Elementos auxiliares
        this.lineMaterial = new THREE.LineBasicMaterial({color: 0xFF4365});
        this.lines = [];
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
     * Crea el compositor de la escena
     * @param {HTMLCanvasElement} canvas Canvas HTML
     * @returns compositor de la escena
     */ 
    createComposer(myCanvas) {
        let renderer = this.createRenderer(myCanvas);
        let composer = new THREE.EffectComposer(renderer);

        // Passes
        let renderPass = new THREE.RenderPass(this, this.getCamera());
        renderPass.renderToScreen = true;
        composer.addPass(renderPass);

        return composer;
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
     * Crea el audio del juego
     */
    createAudio() {
        // create an AudioListener and add it to the camera
        let listener = new THREE.AudioListener();
        this.camera.add(listener);

        // create a global audio source
        this.sound = new THREE.Audio(listener);
    }

    /**
     * Crea el fondo del juego
     * @param {string} image Imagen de fondo
     */
    createBackground(image) {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(image);
        this.background = texture;
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
    createLevel() {
        // Audio
        this.createAudio();

        // Creación de Octree
        this.createOctree();
        
        // Luces
        this.createLights();
    }

    /**
     * Carga el menú
     */
    loadMenu() {
        this.status = Game.MENU;
        level = 0;
        document.getElementById("WebGL-output").style.display = "none";
        document.getElementById("menu").style.display = "block";
    }

    /**
     * Crea el nivel 1 con sus elementos y objetivos
     */
    populateLevel1() {
        // Bolas del nivel
        let x = -750;
        let y = -300;
        let increment = 100;

        for(let i = 0; i < 6; ++i) {
            this.gameElements.push(new FreeBall(x, y));
            this.gameElements.push(new FreeBall(x + increment, y));
            y += increment;
        }

        // Estructura inicial
        let b1 = new TowerBall(750, -150);
        let b2 = new TowerBall(750, -300);
        let b3 = new TowerBall(600, -150);
        let b4 = new TowerBall(600, -300);

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

        // Añadir meta
        this.goal = new Goal(0, 250, this);
        this.octree.add(this.goal.getMesh(), {useFaces: true});
        this.add(this.goal);

        // load a sound and set it as the Audio object's buffer
        let audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'assets/music.mp3', (buffer) => {
            this.sound.setBuffer( buffer );
            this.sound.setLoop( true );
            this.sound.setVolume( 0.5 );
            this.sound.play();
        });

        // Cargar fondo
        this.createBackground("assets/level1.jpg");
    }

    /**
     * Crea el nivel 2 con sus elementos y objetivos
     */
    populateLevel2() {
        // Bolas del nivel
        let x = -750;
        let y = -300;
        let increment = 100;

        for(let i = 0; i < 4; ++i) {
            this.gameElements.push(new FreeBall(x, y));
            this.gameElements.push(new FreeBall(x + increment, y));
            y += increment;
        }

        // Estructura inicial
        let b1 = new TowerBall(750, -150);
        let b2 = new TowerBall(750, -300);
        let b3 = new TowerBall(600, -150);
        let b4 = new TowerBall(600, -300);

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

        // Añadir meta
        this.goal = new Goal(0, 250, this);
        this.octree.add(this.goal.getMesh(), {useFaces: true});
        this.add(this.goal);

        // load a sound and set it as the Audio object's buffer
        let audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'assets/funnybunny.mp3', (buffer) => {
            this.sound.setBuffer( buffer );
            this.sound.setLoop( true );
            this.sound.setVolume( 0.5 );
            this.sound.play();
        });
                
        // Cargar fondo
        this.createBackground("assets/level2.jpg");
    }

    /**
     * Crea el nivel 3 con sus elementos y objetivos
     */
    populateLevel3() {
        // Bolas del nivel
        let x = -750;
        let y = -300;
        let increment = 100;

        for(let i = 0; i < 5; ++i) {
            this.gameElements.push(new FreeBall(x, y));
            this.gameElements.push(new FreeBall(x + increment, y));
            y += increment;
        }

        // Estructura inicial
        let b1 = new TowerBall(750, -150);
        let b2 = new TowerBall(750, -300);
        let b3 = new TowerBall(600, -150);
        let b4 = new TowerBall(600, -300);

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

        // Añadir meta
        this.goal = new Goal(-100, 250, this);
        this.octree.add(this.goal.getMesh(), {useFaces: true});
        this.add(this.goal);

        // load a sound and set it as the Audio object's buffer
        let audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'assets/bakamitai.mp3', (buffer) => {
            this.sound.setBuffer( buffer );
            this.sound.setLoop( true );
            this.sound.setVolume( 0.5 );
            this.sound.play();
        });

        // Cargar fondo
        this.createBackground("assets/level3.jpg");
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
     * @param {Number} level El nivel a cargar
     */
    loadLevel(n) {
        this.createLevel();

        if(n == 1) {
            this.populateLevel1();
        }
        else if(n == 2) {
            this.populateLevel2();
        }
        else if(n == 3) {
            this.populateLevel3();
        }

        // Cargar fondo
        // this.createBackground("assets/background.jpg");

        // Ocultar menú y mostrar juego
        document.getElementById("WebGL-output").style.display = "block";
        document.getElementById("menu").style.display = "none";
        this.status = Game.IDLE;
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
        if(this.status != Game.MENU) {
            // Ratón serializado para raycaster
            let rayMouse = new THREE.Vector2();
            rayMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            rayMouse.y = 1 - 2 * (event.clientY / window.innerHeight);

            // Ratón serializado para coordenadas THREE
            this.mouse = new THREE.Vector2();
            this.mouse.x = event.clientX - window.innerWidth/2;
            this.mouse.y = window.innerHeight/2 - event.clientY;

            let raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(rayMouse, this.camera);

            let octreeObjects = this.octree.search(
                raycaster.ray.origin,
                raycaster.ray.far,
                true,
                raycaster.ray.direction
            );

            let intersections = raycaster.intersectOctreeObjects(octreeObjects);
        
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
        // Hacer los últimos cambios permanentes
        this.lastMoveElements = [];

        // Crear TowerBall
        let tb = new TowerBall(this.selectedObject.getPosition().x, this.selectedObject.getPosition().y, this.selectedObject.getOriginalPosition());
        this.tower.push(tb);
        this.octree.add(tb.mesh, {useFaces: true});
        this.add(tb);
        this.lastMoveElements.push(tb);

        // Informar de posible rebobinado
        document.getElementById('Messages').innerHTML = 'Pulsa  U  para  rebobinar';

        // Crear palos
        for(let l of this.lines) {
            let s = this.createStick(this.selectedObject.getPosition(), l.target.getPosition());
            this.lastMoveElements.push(s);
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

        return stick;
    }

    /**
     * Define la lógica del juego según los diferentes estados posibles
     */
    gameLogic() {
        // Condición de victoria
        let search = this.octree.search(this.goal.getPosition(), this.goal.getRadius());
        // Fase gruesa
        if((search.length > 0) &&
            search.some((element) => element.object.userData instanceof TowerBall && 
            this.goal.inside(element.object.userData.getPosition()))) 
        {
            alert("¡Has ganado!");
            this.restart();
        }
        // Condición de derrota
        else if(this.gameElements.length == 0) {
            alert("Has perdido.");
            this.restart();
        }

        // BALL_PICKED
        if(this.status == Game.BALL_PICKED) {
            // Mover el ratón
            this.selectedObject.move(this.mouse.x, this.mouse.y);

            // Detectar uniones
            let unionObjects = this.octree.search(this.selectedObject.getPosition(), 150);
            
            let tbs = new Set();
            for(let tb of unionObjects) {
                if(tb.object.userData instanceof TowerBall && this.selectedObject.inside(tb.object.userData.getPosition())) {
                    tbs.add(tb.object.userData);
                }
            }

            // Eliminar líneas inactivas
            for(let l of this.lines) {
                if(!tbs.has(l.target)) {
                    this.remove(l.line);
                    this.lines.splice(this.lines.indexOf(l), 1);
                }
            }

            // Posibles uniones con Tower
            // Si hay TowerBall 
            if(tbs.size > 1) {
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
            else if(tbs.size <= 1 && this.selectedObject.getStatus() == FreeBall.POSSIBLE_UNION) {
                this.selectedObject.onPick();
            }
        }
    }

    /**
     * Deshace el último movimiento si fuese posible
     */
    undo() {
        if(this.lastMoveElements.length > 0) {
            let originalPos = null;
            // Eliminar de la torre y de la escena
            for(let element of this.lastMoveElements) {
                this.tower.splice(this.tower.indexOf(element), 1);
                this.remove(element);
                this.octree.remove(element.getMesh());
    
                if(element instanceof TowerBall) {
                    originalPos = element.getOriginalPosition();
                }
            }
    
            // Crear FreeBall de nuevo en su posición original
            let fb = new FreeBall(originalPos.x, originalPos.y);
            this.gameElements.push(fb);
            this.octree.add(fb.getMesh());
            this.add(fb);
    
            this.lastMoveElements = [];

            // Eliminar posible rebobinado
            document.getElementById('Messages').innerHTML = "";
        }
        else {
            alert("No se puede deshacer en este momento.");
        }
    }


    /**
     * Se ejecuta al presionar una tecla
     * @param {KeyboardEvent} event Evento de teclado
     */
    onKeyDown(event) {
        if(event.key == 'u') {
            this.undo();
        }
    }


    /**
     * Finaliza el juego y lo reestablece
     */
    restart() {
        
        // Vacía la escena
        while(this.children.length > 0){ 
            this.remove(this.children[0]); 
        }

        // Vacía las estructuras de datos
        this.gameElements = [];
        this.tower = [];
        this.status = Game.IDLE;
        this.createOctree();

        // Parar música
        this.sound.stop();

        // Reiniciar el nivel
        this.loadMenu();
        
        // Eliminar posible rebobinado
        document.getElementById('Messages').innerHTML = "";

        let audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'assets/music.mp3', (buffer) => {
            this.sound.setBuffer( buffer );
            this.sound.stop();
        });
    }

    /**
     * Actualiza el estado del juego cada frame
     */
    update() {
        requestAnimationFrame(() => this.update());
        if(this.status == Game.MENU) {
            if(level != 0) {
                this.loadLevel(level);
            }
        }
        else {
            // Renderizar la escena
            // this.renderer.render(this, this.getCamera());
            this.composer.render();
            
            // Actualización del Octree
            this.octree.update();

            // Lógica del juego
            this.gameLogic();

            // Actualización de objetos de la escena
            for(let element of this.gameElements) {
                element.update();
            }
        }
    }
}

// Estados del juego
Game.IDLE = 0;
Game.BALL_SELECTED = 1;
Game.BALL_PICKED = 2
Game.POSSIBLE_UNION = 3;
Game.MENU = 4;

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
    window.addEventListener("keydown", (event) => game.onKeyDown(event));


    // Primera visualización
    game.update();
});