import "./App.css";
import { useEffect, useState } from "react";
import * as THREE from "three";

function App() {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef == null) return;

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef });
    renderer.setSize(window.innerWidth, window.innerHeight);

    function animation(time: number) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);
  }, [
    canvasRef,
  ]);

  return (
    <>
      <h1>Example WebGL</h1>
      {/*<canvas ref={setCanvasRef} style={{ width: 1280, height: 800 }}/>*/}
    </>

  );
}


export default App;
