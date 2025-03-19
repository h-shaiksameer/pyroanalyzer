// "use client"

// import { useEffect, useRef } from "react"
// import * as THREE from "three"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// export function Globe() {
//   const containerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (!containerRef.current) return

//     // Scene setup
//     const scene = new THREE.Scene()

//     // Camera setup
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
//     camera.position.z = 200

//     // Renderer setup
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     renderer.setPixelRatio(window.devicePixelRatio)
//     containerRef.current.appendChild(renderer.domElement)

//     // Earth geometry
//     const earthGeometry = new THREE.SphereGeometry(80, 64, 64)

//     // Earth material with custom shader for fire-like effect
//     const earthMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         time: { value: 0 },
//       },
//       vertexShader: `
//         varying vec2 vUv;
//         varying vec3 vPosition;
        
//         void main() {
//           vUv = uv;
//           vPosition = position;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         uniform float time;
//         varying vec2 vUv;
//         varying vec3 vPosition;
        
//         // Simplex noise function
//         vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//         vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//         vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
//         vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
//         float snoise(vec3 v) {
//           const vec2 C = vec2(1.0/6.0, 1.0/3.0);
//           const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          
//           // First corner
//           vec3 i  = floor(v + dot(v, C.yyy));
//           vec3 x0 = v - i + dot(i, C.xxx);
          
//           // Other corners
//           vec3 g = step(x0.yzx, x0.xyz);
//           vec3 l = 1.0 - g;
//           vec3 i1 = min(g.xyz, l.zxy);
//           vec3 i2 = max(g.xyz, l.zxy);
          
//           vec3 x1 = x0 - i1 + C.xxx;
//           vec3 x2 = x0 - i2 + C.yyy;
//           vec3 x3 = x0 - D.yyy;
          
//           // Permutations
//           i = mod289(i);
//           vec4 p = permute(permute(permute(
//                     i.z + vec4(0.0, i1.z, i2.z, 1.0))
//                   + i.y + vec4(0.0, i1.y, i2.y, 1.0))
//                 + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                
//           // Gradients: 7x7 points over a square, mapped onto an octahedron.
//           float n_ = 0.142857142857;
//           vec3 ns = n_ * D.wyz - D.xzx;
          
//           vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          
//           vec4 x_ = floor(j * ns.z);
//           vec4 y_ = floor(j - 7.0 * x_);
          
//           vec4 x = x_ *ns.x + ns.yyyy;
//           vec4 y = y_ *ns.x + ns.yyyy;
//           vec4 h = 1.0 - abs(x) - abs(y);
          
//           vec4 b0 = vec4(x.xy, y.xy);
//           vec4 b1 = vec4(x.zw, y.zw);
          
//           vec4 s0 = floor(b0)*2.0 + 1.0;
//           vec4 s1 = floor(b1)*2.0 + 1.0;
//           vec4 sh = -step(h, vec4(0.0));
          
//           vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
//           vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          
//           vec3 p0 = vec3(a0.xy, h.x);
//           vec3 p1 = vec3(a0.zw, h.y);
//           vec3 p2 = vec3(a1.xy, h.z);
//           vec3 p3 = vec3(a1.zw, h.w);
          
//           // Normalise gradients
//           vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
//           p0 *= norm.x;
//           p1 *= norm.y;
//           p2 *= norm.z;
//           p3 *= norm.w;
          
//           // Mix final noise value
//           vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
//           m = m * m;
//           return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
//         }
        
//         void main() {
//           // Create fire-like effect with noise
//           float noise = snoise(vec3(vUv * 5.0, time * 0.2));
          
//           // Base colors
//           vec3 baseColor = vec3(0.1, 0.0, 0.2); // Dark purple
//           vec3 fireColor1 = vec3(0.8, 0.0, 0.3); // Red-purple
//           vec3 fireColor2 = vec3(0.6, 0.0, 1.0); // Purple
          
//           // Mix colors based on noise
//           vec3 color = mix(baseColor, mix(fireColor1, fireColor2, noise), noise);
          
//           // Add glow effect
//           float glow = max(0.0, 1.0 - length(vPosition) / 80.0);
//           color += vec3(0.3, 0.0, 0.5) * glow * 0.5;
          
//           gl_FragColor = vec4(color, 0.9);
//         }
//       `,
//       transparent: true,
//     })

//     // Create earth mesh
//     const earth = new THREE.Mesh(earthGeometry, earthMaterial)
//     scene.add(earth)

//     // Add particles for stars
//     const starsGeometry = new THREE.BufferGeometry()
//     const starsMaterial = new THREE.PointsMaterial({
//       color: 0xffffff,
//       size: 1,
//       transparent: true,
//       opacity: 0.8,
//     })

//     const starsVertices = []
//     for (let i = 0; i < 1000; i++) {
//       const x = (Math.random() - 0.5) * 2000
//       const y = (Math.random() - 0.5) * 2000
//       const z = (Math.random() - 0.5) * 2000
//       starsVertices.push(x, y, z)
//     }

//     starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3))
//     const stars = new THREE.Points(starsGeometry, starsMaterial)
//     scene.add(stars)

//     // Controls
//     const controls = new OrbitControls(camera, renderer.domElement)
//     controls.enableDamping = true
//     controls.dampingFactor = 0.05
//     controls.rotateSpeed = 0.5
//     controls.enableZoom = false
//     controls.autoRotate = true
//     controls.autoRotateSpeed = 0.5

//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight
//       camera.updateProjectionMatrix()
//       renderer.setSize(window.innerWidth, window.innerHeight)
//     }

//     window.addEventListener("resize", handleResize)

//     // Animation loop
//     const clock = new THREE.Clock()

//     const animate = () => {
//       requestAnimationFrame(animate)

//       const elapsedTime = clock.getElapsedTime()
//       earthMaterial.uniforms.time.value = elapsedTime

//       controls.update()
//       renderer.render(scene, camera)
//     }

//     animate()

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", handleResize)
//       if (containerRef.current) {
//         containerRef.current.removeChild(renderer.domElement)
//       }
//     }
//   }, [])

//   return <div ref={containerRef} className="absolute inset-0" />
// }
"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"
import { TextureLoader } from "three"
import dynamic from "next/dynamic"

// Atmosphere shaders
const atmosphereVertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const atmosphereFragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}
`;

const Earth = ({ dayTexture, nightTexture, bumpTexture, cloudsTexture, specularTexture }) => {
  const earthRef = useRef()
  const nightLightsRef = useRef()
  const cloudsRef = useRef()
  const atmosphereRef = useRef()

  // Sun position for realistic lighting
  const [sunPosition, setSunPosition] = useState(new THREE.Vector3(1, 0, 0))

  useEffect(() => {
    const updateSunPosition = () => {
      const now = new Date()
      const hours = now.getUTCHours()
      const minutes = now.getUTCMinutes()
      const angle = ((hours + minutes / 60) / 24) * Math.PI * 2
      const x = Math.cos(angle)
      const z = Math.sin(angle)
      setSunPosition(new THREE.Vector3(x, 0.2, z).normalize().multiplyScalar(5))
    }

    updateSunPosition()
    const interval = setInterval(updateSunPosition, 60000)
    return () => clearInterval(interval)
  }, [])

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.0005
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.00055
  })

  return (
    <group>
      {/* Stars Background */}
      <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />

      {/* Sunlight */}
      <directionalLight position={sunPosition} intensity={1.5} color="#ffffff" castShadow />
      <ambientLight intensity={0.1} />

      {/* Earth */}
      <mesh ref={earthRef} receiveShadow castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={dayTexture}
          bumpMap={bumpTexture}
          bumpScale={0.05}
          specularMap={specularTexture}
          specular={new THREE.Color(0x333333)}
          shininess={15}
        />
      </mesh>

      {/* Night Lights */}
      <mesh ref={nightLightsRef}>
        <sphereGeometry args={[1.001, 64, 64]} />
        <meshBasicMaterial map={nightTexture} blending={THREE.AdditiveBlending} transparent opacity={0.8} />
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.02, 64, 64]} />
        <meshStandardMaterial map={cloudsTexture} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
        />
      </mesh>
    </group>
  )
}

export function Globe() {
  const containerRef = useRef(null)
  const [textures, setTextures] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return

    const textureLoader = new TextureLoader()
    Promise.all([
      textureLoader.loadAsync("/earth-day.jpg"),
      textureLoader.loadAsync("/earth-night.jpg"),
      textureLoader.loadAsync("/earth-bump.jpg"),
      textureLoader.loadAsync("/earth-clouds.jpg"),
      textureLoader.loadAsync("/earth-specular.jpg"),
    ]).then(([dayMap, nightMap, bumpMap, cloudsMap, specularMap]) => {
      setTextures({
        dayTexture: dayMap,
        nightTexture: nightMap,
        bumpTexture: bumpMap,
        cloudsTexture: cloudsMap,
        specularTexture: specularMap,
      })
      setLoading(false)
    }).catch((err) => console.error("Error loading textures:", err))
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
          <Earth {...textures} />
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.4} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      )}
    </div>
  )
}
