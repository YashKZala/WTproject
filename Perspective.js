const bodies = {
	sun: { name: 'Sun', texture: 'PlanetMap/sun.jpg', diameter: '1,391,000 km', gravity: '274 m/s²', surface: 'Plasma, sunspots, flares' },
	mercury: { name: 'Mercury', texture: 'PlanetMap/mercury.jpg', diameter: '4,880 km', gravity: '3.7 m/s²', surface: 'Cratered rock, dust plains' },
	venus: { name: 'Venus', texture: 'PlanetMap/venus.jpg', diameter: '12,104 km', gravity: '8.87 m/s²', surface: 'Dense clouds, rocky highlands' },
	earth: { name: 'Earth', texture: 'PlanetMap/earth.jpg', diameter: '12,742 km', gravity: '9.8 m/s²', surface: 'Water, continents, cloud cover' },
	moon: { name: 'Moon', texture: 'PlanetMap/moon.jpg', diameter: '3,474 km', gravity: '1.62 m/s²', surface: 'Dusty regolith, craters' },
	mars: { name: 'Mars', texture: 'PlanetMap/mars.jpg', diameter: '6,779 km', gravity: '3.7 m/s²', surface: 'Iron-rich dust, canyons' },
	jupiter: { name: 'Jupiter', texture: 'PlanetMap/jupiter.jpg', diameter: '139,820 km', gravity: '24.79 m/s²', surface: 'Gas bands, Great Red Spot' },
	saturn: { name: 'Saturn', texture: 'PlanetMap/saturn.jpg', diameter: '116,460 km', gravity: '10.44 m/s²', surface: 'Clouds, rings, gaseous atmosphere' },
	uranus: { name: 'Uranus', texture: 'PlanetMap/uranus.jpg', diameter: '50,724 km', gravity: '8.69 m/s²', surface: 'Icy atmosphere, pale clouds' },
	neptune: { name: 'Neptune', texture: 'PlanetMap/neptune.jpg', diameter: '49,244 km', gravity: '11.15 m/s²', surface: 'Blue atmosphere, icy winds' },
	pluto: { name: 'Pluto', texture: 'PlanetMap/pluto.jpg', diameter: '2,377 km', gravity: '0.62 m/s²', surface: 'Ice plains, rocky regions' }
};

const shell = document.querySelector('.sphere-shell');
const nameEl = document.getElementById('planetName');
const diaEl = document.getElementById('planetDiameter');
const gravEl = document.getElementById('planetGravity');
const surfEl = document.getElementById('planetSurface');
const buttons = document.querySelectorAll('.planet-button');

// Size = square fitting inside the shell
const size = () => { const r = shell.getBoundingClientRect(); return Math.max(60, Math.min(r.width, r.height)); };

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(size(), size());
shell.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = 2.8;

scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const sun = new THREE.DirectionalLight(0xffffff, 1.6);
sun.position.set(3, 2, 2);
scene.add(sun);

const mat = new THREE.MeshStandardMaterial({ roughness: 0.8 });
const globe = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), mat);
scene.add(globe);

const loader = new THREE.TextureLoader();

function loadBody(id) {
	const b = bodies[id];
	loader.load(b.texture, tex => { mat.map = tex; mat.needsUpdate = true; });
	nameEl.textContent = b.name;
	diaEl.textContent = b.diameter;
	gravEl.textContent = b.gravity;
	surfEl.textContent = b.surface;
	buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.body === id));
}

(function animate() {
	requestAnimationFrame(animate);
	globe.rotation.y += 0.002;
	renderer.render(scene, camera);
})();

new ResizeObserver(() => {
	const s = size();
	renderer.setSize(s, s);
}).observe(shell);

buttons.forEach(b => b.addEventListener('click', () => loadBody(b.dataset.body)));
loadBody('earth');