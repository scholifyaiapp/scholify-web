import { useEffect, useRef } from "react"
import * as THREE from "three"

/*
 * Lara's 3D orb — a gently morphing, iridescent sphere rendered with three.js.
 * Default export so it can be React.lazy'd (keeps three out of the main bundle).
 * Falls back to a CSS orb via the <LaraOrb> wrapper while this chunk loads or
 * when WebGL is unavailable. Honors prefers-reduced-motion (renders a still).
 */

export default function LaraOrb3D({ size = 96 }: { size?: number }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return // no WebGL — wrapper's CSS fallback stays
    }

    const reduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(size, size)
    renderer.domElement.style.display = "block"
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100)
    camera.position.z = 3.1

    // Morphing core.
    const geo = new THREE.IcosahedronGeometry(1, 3)
    const basePos = (geo.attributes.position.array as Float32Array).slice()
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C80000"),
      emissive: new THREE.Color("#5B21B6"),
      emissiveIntensity: 0.45,
      roughness: 0.3,
      metalness: 0.5,
    })
    const core = new THREE.Mesh(geo, mat)
    scene.add(core)

    // Soft glow shell.
    const glowGeo = new THREE.SphereGeometry(1.32, 32, 32)
    const glowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#F4A405"), transparent: true, opacity: 0.1 })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    scene.add(glow)

    // Iridescent lighting.
    const skyLight = new THREE.PointLight(0x38bdf8, 2.4)
    skyLight.position.set(3, 2, 4)
    scene.add(skyLight)
    const violetLight = new THREE.PointLight(0xc084fc, 2.0)
    violetLight.position.set(-3, -1.5, 2)
    scene.add(violetLight)
    scene.add(new THREE.AmbientLight(0xffffff, 0.55))

    const posAttr = geo.attributes.position as THREE.BufferAttribute
    const v = new THREE.Vector3()
    const start = performance.now()
    let raf = 0

    const frame = () => {
      const t = (performance.now() - start) / 1000
      core.rotation.y = t * 0.5
      core.rotation.x = Math.sin(t * 0.3) * 0.25
      for (let i = 0; i < posAttr.count; i++) {
        const ix = i * 3
        v.set(basePos[ix], basePos[ix + 1], basePos[ix + 2])
        const wobble = 1 + 0.07 * Math.sin(t * 2 + v.x * 3 + v.y * 2) + 0.04 * Math.cos(t * 1.6 + v.z * 3)
        v.multiplyScalar(wobble)
        posAttr.setXYZ(i, v.x, v.y, v.z)
      }
      posAttr.needsUpdate = true
      geo.computeVertexNormals()
      glow.scale.setScalar(1 + 0.05 * Math.sin(t * 1.5))
      renderer.render(scene, camera)
      if (!reduced) raf = requestAnimationFrame(frame)
    }
    frame() // at least one render; loops unless reduced motion

    return () => {
      cancelAnimationFrame(raf)
      geo.dispose()
      mat.dispose()
      glowGeo.dispose()
      glowMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }, [size])

  return <div ref={mountRef} style={{ width: size, height: size }} aria-hidden />
}
