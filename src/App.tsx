import "./App.css";
import { useEffect, useState } from "react";
import * as THREE from "three";

const width = 1280;
const height = 800;

function App() {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef == null) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera();
    camera.position.set(0, 0, 1);

    // const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const geometry = new THREE.PlaneGeometry(1, 1);
    // const material = new THREE.MeshNormalMaterial();
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/images/854x1280.jpg"),
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.render(scene, camera);
    // function animation(time: number) {
    //   mesh.rotation.x = time / 4000;
    //   mesh.rotation.y = time / 4000;
    //   renderer.render(scene, camera);
    // }
    //
    // renderer.setAnimationLoop(animation);
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
