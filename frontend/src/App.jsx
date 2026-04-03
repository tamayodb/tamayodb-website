import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

import { Command, Grid } from "lucide-react";
import { Home, User, Folder, MessageCircle, Globe, X } from "lucide-react";

import linkedinIcon from '/linkedin1.png'
import githubIcon from '/github1.png'
import gmailIcon from '/gmail1.png'

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Skills from './components/Skills'  
import Certifications from './components/Certifications'
import Achievements from './components/Achievements'
import Leadership from './components/Leadership'
import Contact from './components/Contact'    
import ScrollProgress from "./components/ScrollProgress"

import './styles/App.css'

extend({ MeshLineGeometry, MeshLineMaterial })

useGLTF.preload('/card.glb')
useTexture.preload('/name.png')
useTexture.preload('/id-logo.png')

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const coverTexture = useTexture('/id-logo.png')
  const textureScale = coverTexture?.image ? coverTexture.image.width / coverTexture.image.height : 1

  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef()
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3()
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
  ]))
  const [dragged, setDragged] = useState(false)
  const [hovered, setHovered] = useState(false)

  const { nodes, materials } = useGLTF('/card.glb')
  const ropeTexture = useTexture('/name.png')

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => { document.body.style.cursor = 'auto' }
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      })
    }

    if (fixed.current) {
      ;[j1, j2].forEach((ref) => {
        if (!ref.current?.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })

      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))

      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = 'chordal'
  ropeTexture.wrapS = ropeTexture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[0, 4.5, 0]}>
        <RigidBody ref={fixed} type="fixed" angularDamping={2} linearDamping={2} />

        <RigidBody position={[0, -1, 0]} ref={j1} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -2, 0]} ref={j2} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -3, 0]} ref={j3} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[0, -4.5, 0]}
          ref={card}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          angularDamping={2}
          linearDamping={2}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture?.(e.pointerId)
              setDragged(false)
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture?.(e.pointerId)
              setDragged(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />

            <mesh position={[0, 0.55, 0.01]} scale={[textureScale, 1, 1]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial map={coverTexture} transparent toneMapped={false} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={ropeTexture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

export default function App() {
  
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsNavOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { id: "hero", label: "HOME", icon: Home },
    { id: "experience", label: "EXPERIENCE", icon: User },
    { id: "projects", label: "PROJECTS", icon: Folder },
    { id: "skills", label: "SKILLS", icon: MessageCircle },
    { id: "certifications", label: "CERTIFICATIONS", icon: Grid },
    { id: "achievements", label: "ACHIEVEMENTS", icon: Globe },
    { id: "leadership", label: "LEADERSHIP", icon: Command },
  ];

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsNavOpen(false);
  };
 

  return (
    <div className="app-container">
      <ScrollProgress />
      <Navbar />

      <button
        className={`car-nav-button ${isNavOpen ? "open" : ""}`}
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-label="Toggle navigation"
      >
        <div className="car-icon-wrapper">
          <svg
            className="car-svg"
            viewBox="0 0 80 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground shadow */}
            <ellipse cx="40" cy="53" rx="26" ry="2.5" fill="rgba(0,0,0,0.12)" className="car-shadow" />

            {/* Car body group — bounces together */}
            <g className="car-body-group">
              {/* Main chassis */}
              <rect x="6" y="28" width="66" height="16" rx="4" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2" />

              {/* Cabin */}
              <path
                d="M18 28 C20 18, 26 14, 32 14 L50 14 C56 14, 60 18, 62 28 Z"
                fill="currentColor"
                opacity="0.06"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Window */}
              <path
                d="M22 27 C23 20, 27 17, 32 17 L50 17 C54 17, 57 20, 58 27 Z"
                fill="currentColor"
                opacity="0.12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Window divider */}
              <line x1="40" y1="17" x2="40" y2="27" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />

              {/* Door line */}
              <line x1="40" y1="28" x2="40" y2="44" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />

              {/* Door handle left */}
              <rect x="26" y="35" width="8" height="2.5" rx="1.25" fill="currentColor" opacity="0.4" />

              {/* Door handle right */}
              <rect x="46" y="35" width="8" height="2.5" rx="1.25" fill="currentColor" opacity="0.4" />

              {/* Headlight */}
              <ellipse cx="70" cy="34" rx="3" ry="2.5" className="headlight" fill="#fbbf24" />
              <ellipse cx="70" cy="34" rx="5" ry="4" className="headlight-glow" fill="#fbbf24" opacity="0.2" />

              {/* Taillight */}
              <rect x="6" y="32" width="3" height="6" rx="1.5" className="taillight" fill="#ef4444" />
            </g>

            {/* Exhaust smoke */}
            <g className="exhaust-group">
              <circle cx="7" cy="43" r="2" className="smoke smoke-1" fill="currentColor" opacity="0.25" />
              <circle cx="3.5" cy="41" r="1.5" className="smoke smoke-2" fill="currentColor" opacity="0.18" />
              <circle cx="1" cy="39.5" r="1" className="smoke smoke-3" fill="currentColor" opacity="0.12" />
            </g>

          {/* Left wheel */}
          <g className="wheel-left">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 22 46"
              to="360 22 46"
              dur="1.6s"
              repeatCount="indefinite"
            />
            <circle cx="22" cy="46" r="8" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.06" />
            <circle cx="22" cy="46" r="3" fill="currentColor" opacity="0.7" />
            <line x1="22" y1="39" x2="22" y2="53" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <line x1="15" y1="46" x2="29" y2="46" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          </g>

          {/* Right wheel */}
          <g className="wheel-right">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 58 46"
              to="360 58 46"
              dur="1.6s"
              repeatCount="indefinite"
            />
            <circle cx="58" cy="46" r="8" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.06" />
            <circle cx="58" cy="46" r="3" fill="currentColor" opacity="0.7" />
            <line x1="58" y1="39" x2="58" y2="53" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <line x1="51" y1="46" x2="65" y2="46" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          </g>
          </svg>
        </div>
      </button>

            {/* Vertical Navigation Bar */}
      <div className={`vertical-nav ${isNavOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <button 
            className="close-nav" 
            onClick={() => setIsNavOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="nav-items">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="nav-item"
                onClick={() => handleNavClick(item.id)}
                aria-label={item.label}
              >
                <Icon size={24} />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overlay */}
      {isNavOpen && (
        <div 
          className="nav-overlay" 
          onClick={() => setIsNavOpen(false)}
        />
      )}

      <main className="hero-layout" id="hero">
        {/* Left Side - Text Content */}
        <div className="hero-left">
          <h1 className="greeting">
            Hello, I'm <span className="name">Danyssa Tamayo</span>
          </h1>
          <h2 className="title">
            CS\ <span className="hollow-text">Machine Learning</span>
          </h2>
          <p className="bio">
            A designer and developer who enjoys building thoughtful digital experiences. I'm endlessly curious
            about where technology, design, and real-world problems collide, whether that means crafting
            interfaces, experimenting with AI, or exploring data-driven ideas. I like learning things I don't know
            yet, tinkering with them until they make sense, and turning that curiosity into projects that are both
            useful and a little bit delightful.
          </p>

         <div className="social-links">
            <a 
              href="https://linkedin.com/in/danyssa-tamayo-5970a4280  " 
              className="social-icon linkedin" 
              aria-label="LinkedIn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src="/linkedin1.png" alt="LinkedIn" className="social-icon-img" />
              <span className="social-text">danyssa-tamayo-5970a4280</span>
            </a>
            <a 
              href="https://github.com/tamayodb  " 
              className="social-icon github" 
              aria-label="GitHub" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src="/github1.png" alt="GitHub" className="social-icon-img" />
              <span className="social-text">tamayodb</span>
            </a>
            <a 
              href="mailto:tdanyssaaa@gmail.com" 
              className="social-icon gmail" 
              aria-label="Email"
            >
              <img src="/gmail1.png" alt="Email" className="social-icon-img" />
              <span className="social-text">tdanyssaaa@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="hero-right">
          <Canvas
            className="canvas"
            camera={{ position: [0, -1, 8], fov: 35 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={Math.PI} />

            <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
              <Band />
            </Physics>

            <Environment background={false} blur={0.75}>
              <Lightformer intensity={1} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
              <Lightformer intensity={2} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
              <Lightformer intensity={2} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
              <Lightformer intensity={5} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
            </Environment>
          </Canvas>
        </div>
      </main>

      <Experience /> 
      <Education /> 
      <Projects />
      <Skills />
      <Certifications />
      <Achievements />
      <Leadership />
      <Contact />
      <Footer />
    </div>
  )
}