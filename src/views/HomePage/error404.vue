<script setup>
    import * as THREE from "https://cdn.skypack.dev/three@0.139.2";
    import { onMounted, ref } from 'vue';
    import orbitControlsEs6 from "https://cdn.skypack.dev/orbit-controls-es6@2.0.1";

    const webGl = ref();

    const setCanvas = () => {
        // Set up the scene
        const scene = new THREE.Scene();

        // Set up the camera + position
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(75, vw / vh, 0.1, 1000);

        // Set up the camera position (revolving around the origin)
        const cameraDistance = 5;
        let cameraAngle = 0; // Initialize the camera angle
        let cameraCoordinateX = cameraDistance * Math.sin(cameraAngle);
        let cameraCoordinateY = cameraDistance * Math.cos(cameraAngle);
        camera.position.set(cameraCoordinateX, 0, cameraCoordinateY);

        // Renderer
        const canvas = webGl.value;
        var renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
        renderer.setSize(vw, vh);
        renderer.setClearColor(0xf1f5f9);

        // Lines
        const lines = 20;
        const directions = [
            new THREE.Vector3(0.1, 0, 0),       // right
            new THREE.Vector3(-0.1, 0, 0),      // left
            new THREE.Vector3(0, 0.1, 0),       // up
            new THREE.Vector3(0, -0.1, 0),      // down
            new THREE.Vector3(0, 0, 0.1),       // forward
            new THREE.Vector3(0, 0, -0.1),      // backward
        ];

        const pointsArray = Array.from({ length: lines }, () => []);

        for (let i = 0; i < lines; i++) {
            const initialPointA = new THREE.Vector3(0, 0, 0);
            const initialPointB = new THREE.Vector3(0, 0, 0);
            pointsArray[i].push(initialPointA, initialPointB);

            const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

            const geometry = new THREE.BufferGeometry().setFromPoints(pointsArray[i]);
            const material = new THREE.MeshBasicMaterial({
                color: color,
                opacity: 1,
                transparent: false,
            });
            const line = new THREE.Line(geometry, material);
            scene.add(line);
        }

        // Auto-revolving variables
        let rotationSpeed = 0.0025; // Adjust the speed of rotation here

        function draw() {
            pointsArray.forEach((points, index) => {
                const lastPoint = points[points.length - 1];
                const randomDirection = directions[Math.floor(Math.random() * directions.length)];
                const newPoint = lastPoint.clone().add(randomDirection);
                points.push(newPoint);
                const geometry = scene.children[index].geometry;
                geometry.setFromPoints(points);
            });
        }

        function animate() {
            // Update camera position to revolve around the origin
            cameraAngle += rotationSpeed;
            cameraCoordinateX = cameraDistance * Math.sin(cameraAngle);
            cameraCoordinateY = cameraDistance * Math.cos(cameraAngle);
            camera.position.set(cameraCoordinateX, 0, cameraCoordinateY);
            camera.lookAt(0, 0, 0); // Look at the origin (0, 0, 0)

            requestAnimationFrame(animate);
            draw(); // Extend the lines
            renderer.render(scene, camera);
        }

        new orbitControlsEs6(camera, renderer.domElement);

        animate();

        window.addEventListener("resize", () => {
            var width = window.innerWidth;
            var height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(window.devicePixelRatio);
        });
    };

    onMounted(setCanvas);
</script>


<template>
    <div class="flex-container">
        <div class="texts">
            <h1 class="header">Welcome to the void human.</h1>
            <router-link :to="{name: 'home'}" class="link">
                <span class="material-symbols-outlined">door_open</span>
            </router-link>
        </div>
        <canvas ref="webGl" class="webGl"></canvas>
    </div>
</template>
    
<style scoped>
    .flex-container {
        padding: 0;
        margin: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
    }

    .texts {
        position: absolute;
    }

    .header {
        font-size: 5rem;
        margin-bottom: -1rem;
        position: relative;
        width: 26ch;
        white-space: nowrap;
        overflow: hidden;
        border-right: 4px solid var(--dark);
        animation: typing 3s steps(26), cursor .5s step-end infinite alternate;
    }

    @keyframes cursor {
	    50% { border-color: transparent; }
    }

    @keyframes typing {
        from {width: 0}
    }

    .material-symbols-outlined {
        color: var(--dark);
        font-variation-settings: 'FILL' 1;
        font-size: 5em;
    }

    @media (max-width: 1000px) {
        .header {
            font-size: 2rem;
            width: 100%;
            padding-bottom: 1rem;
        }

        .material-symbols-outlined {
            font-size: 4em;
        }
    };

    @media (max-width: 500px) {
        .header {
            font-size: 1.5rem;
            width: 100%;
            padding-bottom: 1rem;
        }

        .material-symbols-outlined {
            font-size: 3rem;
        }
    };
    
</style>