import { useEffect, useRef } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"

interface HorizonSceneProps {
  className?: string
  style?: React.CSSProperties
  /** override default aspect/size via the parent's CSS dims. */
}

export function HorizonScene({ className, style }: HorizonSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.00025)

    const initialRect = wrapper.getBoundingClientRect()
    let width = initialRect.width || 600
    let height = initialRect.height || 480

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000)
    camera.position.set(0, 20, 100)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(width, height, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.6

    const composer = new EffectComposer(renderer)
    composer.setSize(width, height)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 0.8, 0.4, 0.85))

    /* ── Stars (3 layered point clouds) ── */
    const starFields: THREE.Points[] = []
    for (let i = 0; i < 3; i++) {
      const starCount = 2200
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(starCount * 3)
      const colors = new Float32Array(starCount * 3)
      const sizes = new Float32Array(starCount)
      for (let j = 0; j < starCount; j++) {
        const radius = 200 + Math.random() * 800
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[j * 3 + 2] = radius * Math.cos(phi)
        const color = new THREE.Color()
        const c = Math.random()
        if (c < 0.7) color.setHSL(0, 0, 0.8 + Math.random() * 0.2)
        else if (c < 0.9) color.setHSL(0.08, 0.5, 0.8)
        else color.setHSL(0.6, 0.5, 0.8)
        colors[j * 3] = color.r
        colors[j * 3 + 1] = color.g
        colors[j * 3 + 2] = color.b
        sizes[j] = Math.random() * 2 + 0.5
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vec3 pos = position;
            float angle = time * 0.05 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, opacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const stars = new THREE.Points(geometry, material)
      scene.add(stars)
      starFields.push(stars)
    }

    /* ── Nebula plane ── */
    const nebulaGeo = new THREE.PlaneGeometry(8000, 4000, 100, 100)
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x5b5bf5) },
        color2: { value: new THREE.Color(0xa855f7) },
        opacity: { value: 0.3 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
          pos.z += elevation;
          vElevation = elevation;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
          vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
          float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          alpha *= 1.0 + vElevation * 0.01;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat)
    nebula.position.z = -1050
    scene.add(nebula)

    /* ── Mountains (4 layered silhouettes) ── */
    const mountains: THREE.Mesh[] = []
    const layers = [
      { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
      { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
      { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
      { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
    ]
    layers.forEach((layer) => {
      const points: THREE.Vector2[] = []
      const segments = 50
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 1000
        const y =
          Math.sin(i * 0.1) * layer.height +
          Math.sin(i * 0.05) * layer.height * 0.5 +
          Math.random() * layer.height * 0.2 -
          100
        points.push(new THREE.Vector2(x, y))
      }
      points.push(new THREE.Vector2(5000, -300))
      points.push(new THREE.Vector2(-5000, -300))
      const shape = new THREE.Shape(points)
      const geometry = new THREE.ShapeGeometry(shape)
      const material = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide,
      })
      const mountain = new THREE.Mesh(geometry, material)
      mountain.position.z = layer.distance
      mountain.position.y = layer.distance
      scene.add(mountain)
      mountains.push(mountain)
    })

    /* ── Atmosphere glow shell ── */
    const atmosphereGeo = new THREE.SphereGeometry(600, 32, 32)
    const atmosphereMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 atmosphere = vec3(0.36, 0.36, 0.96) * intensity;
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          atmosphere *= pulse;
          gl_FragColor = vec4(atmosphere, intensity * 0.25);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
    scene.add(new THREE.Mesh(atmosphereGeo, atmosphereMat))

    /* ── Animate ── */
    const animate = () => {
      const t = performance.now() * 0.001
      starFields.forEach((sf) => {
        const m = sf.material as THREE.ShaderMaterial
        m.uniforms.time.value = t
      })
      ;(nebulaMat as THREE.ShaderMaterial).uniforms.time.value = t * 0.5
      ;(atmosphereMat as THREE.ShaderMaterial).uniforms.time.value = t

      const floatX = Math.sin(t * 0.1) * 2
      const floatY = Math.cos(t * 0.15) * 1
      camera.position.x = floatX
      camera.position.y = 20 + floatY
      camera.position.z = 100
      camera.lookAt(0, 10, -600)

      mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5
        mountain.position.x = Math.sin(t * 0.1) * 2 * parallaxFactor
        mountain.position.y = layers[i].distance + Math.cos(t * 0.15) * 1 * parallaxFactor
      })

      composer.render()
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    /* ── Resize via ResizeObserver ── */
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width
        const h = entry.contentRect.height
        if (w && h) {
          width = w
          height = h
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height, false)
          composer.setSize(width, height)
        }
      }
    })
    ro.observe(wrapper)

    return () => {
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      starFields.forEach((sf) => {
        sf.geometry.dispose()
        ;(sf.material as THREE.Material).dispose()
      })
      mountains.forEach((m) => {
        m.geometry.dispose()
        ;(m.material as THREE.Material).dispose()
      })
      nebula.geometry.dispose()
      ;(nebula.material as THREE.Material).dispose()
      atmosphereGeo.dispose()
      atmosphereMat.dispose()
      composer.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#000",
        ...style,
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  )
}
