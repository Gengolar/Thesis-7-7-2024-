// 3d_septic_tank.js

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 200);
document.getElementById('3d-container').appendChild(renderer.domElement);

// Create the septic tank (a cylinder)
const geometry = new THREE.CylinderGeometry(1, 1, 2, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const septicTank = new THREE.Mesh(geometry, material);
scene.add(septicTank);

// Position the camera
camera.position.z = 5;

// Function to update the septic tank based on capacity
function updateSepticTank(capacity) {
    const color = capacity > 80 ? 0xff0000 : (capacity > 50 ? 0xffff00 : 0x00ff00);
    septicTank.material.color.setHex(color);

    // Update tooltip
    septicTank.userData.tooltip = capacity > 80 ? "Warning: About to overflow" : "Safe";
}

// Tooltip element
const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
tooltip.style.color = '#fff';
tooltip.style.padding = '5px';
tooltip.style.borderRadius = '3px';
tooltip.style.pointerEvents = 'none';
tooltip.style.display = 'none';
document.body.appendChild(tooltip);

// Mouse move event
renderer.domElement.addEventListener('mousemove', (event) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(septicTank);

    if (intersects.length > 0) {
        tooltip.style.left = `${event.clientX}px`;
        tooltip.style.top = `${event.clientY - 40}px`;
        tooltip.innerHTML = intersects[0].object.userData.tooltip;
        tooltip.style.display = 'block';
    } else {
        tooltip.style.display = 'none';
    }
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    septicTank.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Update the septic tank with initial capacity
updateSepticTank(30); // For example, set initial capacity to 30%
