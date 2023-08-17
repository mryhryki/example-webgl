import "./App.css";
import { useEffect, useState } from "react";
import * as THREE from "three";

const ViewAreaWidth = 800;
const ViewAreaHeight = 800;

const ImageURL = "/images/46081x6624.png";
const ImageWidth = 46081;
const ImageHeight = 6624;

function App() {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef == null) return;

    (async () => {
      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef });
      renderer.setSize(ViewAreaWidth, ViewAreaHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      const camera = new THREE.PerspectiveCamera(60, ViewAreaWidth / ViewAreaHeight, 1, ImageWidth / 2);
      camera.position.set(0, 0, Math.max(ImageHeight, ImageWidth) / 2);

      const scene = new THREE.Scene();

      const geometry = new THREE.PlaneGeometry(ImageWidth / 2, ImageHeight / 2);
      const map = await (new THREE.TextureLoader().loadAsync(ImageURL));
      const material = new THREE.MeshBasicMaterial({ map });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer.render(scene, camera);
    })();
  }, [canvasRef]);

  return (
    <>
      <h1>Example WebGL</h1>
      <canvas ref={setCanvasRef} style={{ width: ViewAreaWidth, height: ViewAreaHeight }}/>
    </>
  );
}


export default App;
