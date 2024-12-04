import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import px from "../../assets/cubemap/px.png";
import nx from "../../assets/cubemap/nx.png";
import py from "../../assets/cubemap/py.png";
import ny from "../../assets/cubemap/ny.png";
import pz from "../../assets/cubemap/pz.png";
import nz from "../../assets/cubemap/nz.png";

const SkyBox = () => {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([px, nx, py, ny, pz, nz]);
    scene.background = texture;
  }, [scene]);

  return null;
};

export default SkyBox;