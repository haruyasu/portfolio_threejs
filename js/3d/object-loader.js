(function () {
    "use strict";

    var container;
    var camera, scene, renderer;
    // var loader, mesh;
    // var light1, light2, light3, light4;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var scene,
        camera,
        controls,
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane,
        shadowLight,
        backLight,
        light,
        renderer,
        hero,
        div,
        container;

    //SCENE
    var floor, bird1, bird2;

    //SCREEN VARIABLES

    var HEIGHT,
        WIDTH,
        windowHalfX,
        windowHalfY,
        mousePos = { x: 0, y: 0 };


    init();
    createLights();
    createMain();
    loop();

    function init() {
        scene = new THREE.Scene();
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        aspectRatio = WIDTH / HEIGHT;
        fieldOfView = 60;
        nearPlane = 1;
        farPlane = 2000;
        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.x = 0;
        camera.position.z = 500;
        camera.position.y = 300;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(WIDTH, HEIGHT);
        renderer.shadowMap.enabled = true;

        hero = document.getElementById("hero");
        container = document.createElement("div");
        container.className = "hero__three-container";
        hero.appendChild(container);
        container.appendChild(renderer.domElement);

        window.addEventListener("resize", onWindowResize, false);
        document.addEventListener("mousemove", onDocumentMouseMove, false);
    }

    function onWindowResize() {
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    }

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 4;
        mouseY = (event.clientY - windowHalfY) / 4;
    }

    function createLights() {
        light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);

        shadowLight = new THREE.DirectionalLight(0xffffff, 0.8);
        shadowLight.position.set(200, 200, 200);
        shadowLight.castShadow = true;
        shadowLight.shadowDarkness = 0.2;

        backLight = new THREE.DirectionalLight(0xffffff, 0.4);
        backLight.position.set(-100, 200, 50);
        backLight.shadowDarkness = 0.1;
        backLight.castShadow = true;

        scene.add(backLight);
        scene.add(light);
        scene.add(shadowLight);
    }


    var Bird = function () {
        this.mesh = new THREE.Group();
        this.body = new THREE.Group();

        this.yellowMat = new THREE.MeshLambertMaterial({
            color: 0xffde79,
            shading: THREE.FlatShading
        });

        var box = new THREE.BoxGeometry(100, 100, 100);
        var test = new THREE.Mesh(box, yellowMat);
        this.body.add(test);
        this.mesh.add(this.body);
    };

    function createMain() {
        bird1 = new Bird();
        p_scale = 1;
        bird1.mesh.scale.set(p_scale, p_scale, p_scale);
        scene.add(bird1.mesh);
    }


    function loop() {
        camera.position.x += (-mouseX - camera.position.x) * .1;
        camera.position.y += (mouseY - 80 - camera.position.y) * .1;

        render();
        requestAnimationFrame(loop);
    }

    function render() {
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

})();
