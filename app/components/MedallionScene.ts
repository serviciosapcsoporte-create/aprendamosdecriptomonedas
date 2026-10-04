/* Escena del medallón 3D: solo se ejecuta en el cliente y en su propio chunk.
 *
 * Importa `three` con imports nombrados (estáticos) para que Rollup pueda
 * podar el código que no usamos: importar el namespace completo hace que el
 * chunk suba a ~192 kB gzip.
 */
import {
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  CylinderGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  WebGLRenderer,
} from "three";

const NAVY = "#0d1b33";
const ACCENT = "#f97415";

/** Cara de la moneda: círculo navy + aro terracota + logo centrado. */
function makeFaceTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;

  let dead = false;

  const draw = (image?: HTMLImageElement) => {
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = NAVY;
    ctx.fillRect(0, 0, size, size);

    if (image) {
      const box = size * 0.88;
      ctx.drawImage(image, (size - box) / 2, (size - box) / 2, box, box);
    }

    // Filete tenue: el aro protagonista lo aporta el torus 3D.
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = size * 0.012;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.485, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    texture.needsUpdate = true;
  };

  draw();

  const image = new Image();
  image.decoding = "async";
  image.onload = () => {
    if (!dead) draw(image);
  };
  image.src = "/logo.png";

  return {
    texture,
    dispose: () => {
      dead = true;
      image.onload = null;
      texture.dispose();
    },
  };
}

/** Monta la escena dentro de `host`. Devuelve la función de limpieza. */
export function initMedallion(host: HTMLElement, reduced: boolean) {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  host.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 6.4);

  const face = makeFaceTexture();

  // `rig` agrupa moneda + aro: el aro debe compartir la pose de la moneda para
  // quedar coaxial con su borde (copiar la rotación del cilindro lo dejaba
  // girado 90° y cruzaba la cara por la mitad).
  const rig = new Group();
  scene.add(rig);

  const body: BufferGeometry = new CylinderGeometry(2, 2, 0.34, 96);
  const edgeMat = new MeshStandardMaterial({
    color: 0xf97415,
    metalness: 0.55,
    roughness: 0.4,
  });
  const faceMat = new MeshStandardMaterial({
    map: face.texture,
    metalness: 0.1,
    roughness: 0.6,
  });
  const coin = new Mesh(body, [edgeMat, faceMat, faceMat]);
  coin.rotation.x = Math.PI / 2;
  rig.add(coin);

  const rimGeo: BufferGeometry = new TorusGeometry(2.04, 0.05, 16, 100);
  const rimMat = new MeshStandardMaterial({
    color: 0xf97415,
    emissive: 0xf97415,
    emissiveIntensity: 0.35,
    metalness: 0.5,
    roughness: 0.35,
  });
  const rim = new Mesh(rimGeo, rimMat);
  rig.add(rim);

  scene.add(new AmbientLight(0xffffff, 1.1));
  const key = new DirectionalLight(0xffffff, 2.1);
  key.position.set(4, 4, 5);
  scene.add(key);
  const fill = new DirectionalLight(0xf97415, 1.3);
  fill.position.set(-5, -2, 3);
  scene.add(fill);

  let targetRotY = 0;
  let targetRotX = 0.1;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let autoSpin = !reduced;
  let raf = 0;
  let visible = true;
  let dead = false;

  const applyPose = () => {
    rig.rotation.set(targetRotX, 0, targetRotY);
    rig.position.y = Math.sin(performance.now() * 0.0009) * 0.12;
  };

  const paint = () => {
    applyPose();
    renderer.render(scene, camera);
  };

  const tick = () => {
    if (dead) return;
    if (!visible) {
      raf = 0;
      return;
    }
    if (autoSpin) targetRotY += 0.0035;
    rig.rotation.z += (targetRotY - rig.rotation.z) * 0.08;
    rig.rotation.x += (targetRotX - rig.rotation.x) * 0.08;
    rig.position.y = Math.sin(performance.now() * 0.0009) * 0.12;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };

  const start = () => {
    if (dead || raf || reduced || !visible) return;
    raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };

  const onPointerDown = (event: PointerEvent) => {
    dragging = true;
    autoSpin = false;
    lastX = event.clientX;
    lastY = event.clientY;
  };
  const onPointerUp = () => {
    dragging = false;
  };
  const onPointerMove = (event: PointerEvent) => {
    if (!dragging) return;
    targetRotY += (event.clientX - lastX) * 0.008;
    targetRotX += (event.clientY - lastY) * 0.008;
    lastX = event.clientX;
    lastY = event.clientY;
    if (reduced) paint();
  };

  const resize = () => {
    const size = host.clientWidth || 1;
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  };

  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            visible = entries[0]?.isIntersecting ?? true;
            if (visible) start();
            else stop();
          },
          { threshold: 0.05 },
        )
      : null;
  observer?.observe(host);

  const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
  resizeObserver?.observe(host);

  host.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointermove", onPointerMove);

  resize();
  paint();
  start();

  return () => {
    dead = true;
    stop();
    observer?.disconnect();
    resizeObserver?.disconnect();
    host.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointermove", onPointerMove);

    body.dispose();
    rimGeo.dispose();
    edgeMat.dispose();
    faceMat.dispose();
    rimMat.dispose();
    face.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
