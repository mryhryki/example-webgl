import "./App.css";
import { useEffect, useState } from "react";
import * as THREE from "three";

const width = 1280;
const height = 800;

function App() {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef == null) return;

    const camera = new THREE.PerspectiveCamera(90, width / height, 0.01, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // const geometry = new THREE.PlaneGeometry(width, height);
    // const material = new THREE.MeshNormalMaterial();
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("/images/854x1280.jpg"),
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef });
    renderer.setSize(width, height);

    function animation(time: number) {
      mesh.rotation.x = time / 4000;
      mesh.rotation.y = time / 4000;
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animation);
  }, [
    canvasRef,
  ]);

  return (
    <>
      <h1>Example WebGL</h1>
      <canvas ref={setCanvasRef} style={{ width, height }}/>
    </>

  );
}


export default App;
