import * as T from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function mountKobot(host: HTMLDivElement) {
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.append(renderer.domElement);
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(33, 1, .1, 30);
  camera.position.set(0, 1.6, 8.8);
  camera.lookAt(0, 1.5, 0);
  const room = new RoomEnvironment();
  const pmrem = new T.PMREMGenerator(renderer);
  const env = pmrem.fromScene(room, .04);
  scene.environment = env.texture;
  scene.environmentIntensity = .85;
  const key = new T.DirectionalLight(0xfffaf1, 3.6);
  key.position.set(-3, 5, 5); scene.add(key);
  const rim = new T.DirectionalLight(0xb9f3ee, 2.5);
  rim.position.set(4, 3, -3); scene.add(rim);
  scene.add(new T.HemisphereLight(0xffffff, 0x5b827f, 1));
  const teal = new T.MeshPhysicalMaterial({ color: 0x2c9fa3, roughness: .3, metalness: .06, clearcoat: .45, clearcoatRoughness: .28 });
  const white = new T.MeshStandardMaterial({ color: 0xfffefa, roughness: .36 });
  const dark = new T.MeshStandardMaterial({ color: 0x123a3d, roughness: .45 });
  const coral = new T.MeshPhysicalMaterial({ color: 0xcf5e61, roughness: .3, clearcoat: .5 });
  const root = new T.Group(); scene.add(root);
  const mesh = (geo: T.BufferGeometry, mat: T.Material, parent: T.Object3D, pos: [number, number, number]) => {
    const part = new T.Mesh(geo, mat); part.position.set(...pos); parent.add(part); return part;
  };
  const sphere = (parent: T.Object3D, material: T.Material, pos: [number,number,number], scale: [number,number,number]) => {
    const part = mesh(new T.SphereGeometry(1, 40, 24), material, parent, pos); part.scale.set(...scale); return part;
  };
  sphere(root, teal, [0, .73, 0], [.7, .82, .48]);
  const belly = mesh(new T.CylinderGeometry(.36, .36, .065, 48), white, root, [0, .86, .447]);
  belly.rotation.x = Math.PI / 2;
  const letter = new T.Shape();
  [[-.16,-.23],[-.07,-.23],[-.07,-.02],[.09,-.23],[.22,-.23],[.015,.035],[.21,.23],[.08,.23],[-.07,.065],[-.07,.23],[-.16,.23]].forEach(([x,y], i) => i ? letter.lineTo(x,y) : letter.moveTo(x,y));
  letter.closePath();
  mesh(new T.ExtrudeGeometry(letter, { depth: .014, bevelEnabled: true, bevelThickness: .008, bevelSize: .008, bevelSegments: 2 }), dark, root, [0, .86, .489]);
  const head = new T.Group(); head.position.set(0, 2.02, 0); root.add(head);
  const shell = mesh(new RoundedBoxGeometry(2.14, 1.47, 1.02, 6, .38), teal, head, [0, 0, 0]);
  shell.scale.y = .97;
  mesh(new RoundedBoxGeometry(1.66, .72, .17, 6, .27), white, head, [0, -.055, .51]);
  const eyes = new T.Group(); eyes.position.set(0, -.015, .62); head.add(eyes);
  for (const x of [-.43, .43]) {
    const points = Array.from({length:17}, (_,i) => { const t = Math.PI * i / 16; return new T.Vector3(x + .155*Math.cos(t), -.02 + .145*Math.sin(t), 0); });
    mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points), 24, .044, 10, false), dark, eyes, [0,0,0]);
    for (const xx of [x-.155,x+.155]) sphere(eyes,dark,[xx,-.02,0],[.044,.044,.044]);
  }
  for (const side of [-1, 1]) {
    const antenna = new T.Group(); antenna.position.set(side*.67, .58, -.02); antenna.rotation.z = side*-.44; head.add(antenna);
    mesh(new T.CylinderGeometry(.049,.061,.62,16), coral, antenna, [0,.28,0]);
    sphere(antenna,coral,[0,.62,0],[.17,.17,.17]);
  }
  const arms: T.Group[] = [];
  for (const side of [-1,1]) {
    const arm = new T.Group(); arm.position.set(side*.56, 1.08, -.02); root.add(arm); arms.push(arm);
    arm.rotation.z = side === -1 ? -1.12 : .45;
    sphere(arm,teal,[side*.12,-.24,0],[.21,.38,.21]);
    const palm = new T.Group(); palm.position.set(side*.24,-.48,.09); arm.add(palm);
    sphere(palm,teal,[0,0,0],[.25,.27,.18]);
    sphere(palm,teal,[-side*.19,.02,.03],[.11,.16,.11]);
    for(let f=0;f<3;f++) sphere(palm,teal,[(f-1)*.11,-.18,.025],[.067,.12,.09]);
  }
  const shadow = mesh(new T.CircleGeometry(1.08,48), new T.MeshBasicMaterial({color:0x123a3d,transparent:true,opacity:.055,depthWrite:false}), scene,[0,-.22,0]);
  shadow.rotation.x = -Math.PI/2; shadow.scale.y=.48;
  root.rotation.y = -.22; root.rotation.z = -.04;
  let width=0,height=0;
  const resize = () => { const box=host.getBoundingClientRect(); if(!box.width||!box.height)return; width=box.width;height=box.height; renderer.setSize(width,height,false);camera.aspect=width/height; camera.updateProjectionMatrix(); };
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  let frame=0,last=0,elapsed=0,yaw=-.22,targetYaw=-.22,spin=0,scroll=0,pointerX=0,pointerY=0;
  let paused=false,reduced=false,visible=true,disposed=false;
  const draw = (now:number) => {
    if(disposed)return;
    const delta = last ? Math.min((now-last)/1000,.04) : 0; last=now;
    if(!paused&&!reduced)elapsed+=delta;
    targetYaw = -.22 + (paused||reduced ? 0 : scroll*.9+pointerX*.32+Math.sin(elapsed*.65)*.1) + spin;
    yaw += (targetYaw-yaw)*Math.min(1,delta*5);
    root.rotation.y=yaw;
    root.position.y=paused||reduced ? 0 : Math.sin(elapsed*1.4)*.055;
    head.rotation.z=paused||reduced ? -.055 : -.055+Math.sin(elapsed*.8)*.035;
    head.rotation.x=paused||reduced ? 0 : pointerY*.08;
    const phase=elapsed%5.7;
    eyes.scale.y=!paused&&!reduced&&phase>5.3 ? Math.max(.09,Math.abs((phase-5.5)/.2)) : 1;
    arms[0].rotation.z=-1.12+(!paused&&!reduced&&elapsed%12<2.6 ? Math.sin(elapsed*7)*.16 : 0);
    shadow.scale.x=1+Math.sin(elapsed*1.4)*.02;
    renderer.render(scene,camera);
    if(visible&&!document.hidden&&!paused&&!reduced)frame=requestAnimationFrame(draw);
  };
  const render = () => {cancelAnimationFrame(frame);last=0;frame=requestAnimationFrame(draw);};
  const onScroll=()=>{const rect=host.getBoundingClientRect();scroll=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height))); if(paused||reduced)return; if(!frame)render();};
  const onPointer=(event:PointerEvent)=>{const rect=host.getBoundingClientRect();pointerX=(event.clientX-rect.left)/rect.width-.5;pointerY=(event.clientY-rect.top)/rect.height-.5;};
  const onLeave=()=>{pointerX=0;pointerY=0;};
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const motion=()=>{reduced=media.matches;render();}; reduced=media.matches;media.addEventListener('change',motion);
  const visibility = new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)render();else cancelAnimationFrame(frame);},{rootMargin:'50px'});visibility.observe(host);
  const tabVisibility=()=>{if(!document.hidden&&visible)render();else cancelAnimationFrame(frame);};
  document.addEventListener('visibilitychange',tabVisibility);window.addEventListener('scroll',onScroll,{passive:true});host.addEventListener('pointermove',onPointer);host.addEventListener('pointerleave',onLeave);
  render();
  return {
    pause(value:boolean){paused=value;render();},
    turn(){spin+=Math.PI*2;if(paused||reduced){yaw=spin-.22;}render();},
    dispose(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();media.removeEventListener('change',motion);document.removeEventListener('visibilitychange',tabVisibility);window.removeEventListener('scroll',onScroll);host.removeEventListener('pointermove',onPointer);host.removeEventListener('pointerleave',onLeave);scene.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();}});[teal,white,dark,coral,shadow.material].forEach(m=>m.dispose());env.dispose();room.dispose();pmrem.dispose();renderer.dispose();renderer.domElement.remove();}
  };
}
