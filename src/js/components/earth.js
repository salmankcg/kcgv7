// ------------------------------ \\\
// ---------- IMPORTS ----------- \\\
// ------------------------------ \\\
import $ from "jquery"
import * as THREE from "../libs/three.module"
import {BufferGeometryUtils} from "../libs/BufferGeometryUtils";



// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var renderer                = new THREE.WebGLRenderer({alpha:true, antialias: true});
var clock                   = new THREE.Clock(true);

var scene                   = null;
var _width                  = window.innerHeight;
var _height                 = window.innerHeight;
var aspect                  = _width / _height;
var camera                  = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
var earth                   = null;
var earthUniforms           = null;
var atmosphereUniforms      = null;
var atmosphere              = null;
var amount                  = $('#canvas').data('people');
var mapC, group;

var _countLoad            = 0;

var  earthVertexShader      = `uniform vec3 lightDirection;

                            varying vec2 vUv;
                            varying vec3 vEyeDirectionEyeSpace;
                            varying vec3 vLightDirection;
                            attribute vec4 tangent;

                            // all in eye space
                            varying mat3 tbn;

                            void main(){

                              vUv = uv;
                              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

                              vLightDirection = mat3(viewMatrix) * lightDirection; // should be computed outside of shader
                              vEyeDirectionEyeSpace = mat3(viewMatrix) * normalize(position - cameraPosition).xyz;

                              // normal mapping
                              vec3 t = normalize(tangent.xyz);
                              vec3 n = normalize(normal.xyz);
                              vec3 b = normalize(cross(t, n));

                              // everything in eye space
                              t = normalize(normalMatrix * t);
                              b = normalize(normalMatrix * b);
                              n = normalize(normalMatrix * n);

                              tbn = mat3(t, b, n);

                                }`;

var earthFragmentShader     = ` uniform sampler2D diffuseTexture;
                            uniform sampler2D diffuseNight;
                            uniform sampler2D specularMap;
                            uniform sampler2D cloudsMap;
                            uniform sampler2D normalMap;

                            varying vec2 vUv;
                            varying vec3 vEyeDirectionEyeSpace;
                            varying vec3 vLightDirection;

                            // tangent-bitangent-normal matrix
                            varying mat3 tbn;

                            void main(){

                              vec3 lightDir = normalize(vLightDirection);

                              vec3 n        = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
                              vec3 normal   = normalize(tbn * n);


                              // directional light
                              float lightIntensity  = dot(normal, lightDir);
                              float selectImage     = dot(tbn[2], lightDir);

                              gl_FragColor = texture2D(diffuseTexture, vUv) * selectImage + texture2D(diffuseNight, vUv) * (1.0-selectImage);

                              //gl_FragColor = vec4(vec3(0.5), 1.0 );
                              gl_FragColor *= (1.0 + 10.0*(lightIntensity - selectImage));

                              // specular
                              vec3 reflection = reflect(lightDir, normal);
                              float specPower = texture2D(specularMap, vUv).r;

                              float spec  = 10.2;
                              float gloss = 0.1 * texture2D(specularMap, vUv).a;

                              float specular  =  pow(clamp(dot(reflection, normalize(vEyeDirectionEyeSpace)), 0.0, 1.0), spec) * gloss;
                              gl_FragColor    = gl_FragColor + specular * vec4(0.26, 0.96, 0.99, 1);

                              // cloud colors + a small bump
                              vec4 cloudsColor = texture2D(cloudsMap, vUv) * vec4(1.0, 1.5, 1.2, 1.0);

                              vec4 cloudsShadow = texture2D(cloudsMap, vec2(vUv.x+ normal.x * 0.005, vUv.y + normal.y * 0.005));

                              if (cloudsColor.r < 0.1 && cloudsShadow.r > 0.1){
                                gl_FragColor *= 0.75;
                                cloudsShadow = vec4(0);
                              }

                              gl_FragColor = gl_FragColor * (vec4(1.2) - cloudsColor) + cloudsColor * (lightIntensity * 2.0);

                                }`;

const atmosphereVertexShader  = `uniform vec3 earthCenter;
                                uniform float earthRadius;
                                uniform float atmosphereRadius;
                                uniform vec3 lightDirection;

                                varying float atmosphereThickness;
                                varying vec3 vLightDirection;
                                varying vec3 vNormalEyeSpace;


                                void main(){
                                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

                                  vec3 positionW = (modelMatrix * vec4(position, 1.0)).xyz;

                                  vec3 vCameraEarth   = cameraPosition.xyz - earthCenter;
                                  vec3 vCameraVertex  = normalize(cameraPosition.xyz - positionW);

                                  float tca = dot(vCameraEarth,  vCameraVertex);

                                  if (tca < 0.0){
                                    // not intesect, looking in opposite direction
                                    atmosphereThickness = 0.0;
                                    return;
                                  }

                                  float dsq = dot(vCameraEarth, vCameraEarth) - tca * tca;
                                  float thc_sq_atmosphere = max(atmosphereRadius * atmosphereRadius - dsq, 0.0);
                                  float thc_sq_earth = max(earthRadius * earthRadius - dsq, 0.0);

                                  float thc_atmosphere = 2.0 * sqrt(thc_sq_atmosphere);
                                  float thc_earth = 2.0 * sqrt(max(0.0,thc_sq_earth));

                                  float thc           = (thc_atmosphere - thc_earth) * 0.09; // 0.01 - density factor
                                  atmosphereThickness = thc;

                                  // light calculation
                                  vLightDirection = mat3(viewMatrix) * lightDirection;
                                  vNormalEyeSpace = normalize(normalMatrix * normal);

                                }`;
                                
const atmosphereFragShader    = ` varying float atmosphereThickness;
                                varying vec3 vLightDirection;
                                varying vec3 vNormalEyeSpace;

                                void main(){

                                  vec3 lightDir = normalize(vLightDirection);
                                  vec3 normal = normalize(vNormalEyeSpace);
                                  float lightIntensity = max(dot(normal, lightDir) * 1.5, -0.7);
                                  gl_FragColor = vec4( (vec3(57.0, 97.0, 162.0) / 256.0) * (1.0 + lightIntensity), atmosphereThickness);

                                }`;



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
async function init() {

  // initialize the renderer
  renderer.setSize(_width, _height);
  renderer.autoClear = false;
  document.getElementById("canvas").appendChild(renderer.domElement);

  scene     = await loadObject("assets/earth_and_water.json");
  scene.fog = new THREE.Fog( 0x000000, 1500, 2100 );

  const textureLoader = new THREE.TextureLoader();
	
  group = new THREE.Group();

  for ( let a = 0; a < amount.length; a ++ ) {

    const x = Math.random() - 0.5;
    const y = getRandomInt(-0.15, 0.15);
    const z = Math.random() - 0.5;
    

    if(amount[0].place == 'south-america'){

    } else if(amount[0].place == 'north-america'){

    } else if(amount[0].place == 'europe'){
      
    } else if(amount[0].place == 'asia'){
      
    } else if(amount[0].place == 'africa'){
      
    } else if(amount[0].place == 'oceania'){
      
    }
    

    let material;

    mapC          = textureLoader.load( amount[a].thumb );

    material      = new THREE.SpriteMaterial( { map: mapC, color: 0xffffff, fog: true } );

    const sprite  = new THREE.Sprite( material );

    sprite.position.set( x, y, z );
    sprite.position.normalize();
    sprite.position.multiplyScalar( 12.2 );

    group.add( sprite );

  }

  scene.add( group );

  camera.position.set(5,0,44);

  earth       = scene.getObjectByName("Earth");
  atmosphere  = scene.getObjectByName("Atmosphere");

  // Mesh Configurations
  earth.receiveShadow = true;
  earth.castShadow    = true;

  camera.lookAt(earth.position);

  fixMaterials().then( () => {
    renderer.autoClear = false;
    render();
  });

}

function resize() {

  _width    = $(window).height();
  _height   = $(window).height();

  renderer.setSize(_width, _height);

  // console.log(_width)

  if(camera != null) {
    camera.aspect = _width / _height;
    camera.updateProjectionMatrix();
  }
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function update(dt){

  let lightPos  = new THREE.Vector3( -10, 10, -3 );
  let lightPosU = new THREE.Uniform(newVector(lightPos));

  earthUniforms.lightDirection = lightPosU;
  earth.rotation.y += 0.05 * dt;

  atmosphereUniforms.lightDirection = lightPosU;
  atmosphere.rotation.y += 0.05 * dt;

    for ( let i = 0, l = group.children.length; i < l; i ++ ) {

      const sprite 	= group.children[ i ];

      sprite.scale.set( 2, 2, 1 );

    }

    group.rotation.y += 0.05 * dt;

}

function render(){

  requestAnimationFrame(render);
  
  update(clock.getDelta())
  renderer.clear();

  renderer.render(scene, camera);
  
}

function newVector(v){
  return new THREE.Vector3(v.x, v.y, v.z);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loadTexture(texture){
  let imgLoader = new THREE.TextureLoader();
  
  return new Promise( (resolve, reject) => imgLoader.load(texture, 
    
    function (tex){

      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      
      resolve(tex);

      
      if(_countLoad >= 4){
        // console.log('LOADER ASSETS');
        $(window).trigger('LOADER_ALL');
      }

      // console.log(_countLoad);

      _countLoad++;
    

    }, null, reject))
}

async function fixMaterials() {


  atmosphereUniforms = {

    earthCenter: new THREE.Uniform(earth.position),
    earthRadius: new THREE.Uniform(10.0),
    atmosphereRadius: new THREE.Uniform(10.4),

  }

  earthUniforms = {

    diffuseTexture: {
      type: "t",
      value: await loadTexture("assets/earth/earth_diffuse.jpg")
    },
    diffuseNight: {
      type: "t",
      value: await loadTexture("assets/earth/earth_diffuse_night.jpg")
    },
    normalMap: {
      type: "t",
      value: await loadTexture("assets/earth/earth_normal_map.jpg")
    },
    specularMap: {
      type: "t",
      value: await loadTexture( "assets/earth/earth_specular_map.png")
    },
    cloudsMap: {
      type: "t",
      value: await loadTexture( "assets/earth/earth_diffuse_clouds.jpg")
    }

  }

  update(0);

  BufferGeometryUtils.computeTangents(earth.geometry);

  earth.material      = new THREE.ShaderMaterial({
    uniforms          : earthUniforms,
    vertexShader      : earthVertexShader,
    fragmentShader    : earthFragmentShader,
    side              : THREE.FrontSide
  });

  atmosphere.material = new THREE.ShaderMaterial({
    uniforms          : atmosphereUniforms,
    vertexShader      : atmosphereVertexShader,
    fragmentShader    : atmosphereFragShader,
    blending          : THREE.CustomBlending,
    blendEquation     : THREE.AddEquation,
    blendSrc          : THREE.SrcAlphaFactor,
    blendDst          : THREE.OneMinusSrcAlphaFactor,
    side              : THREE.FrontSide,
    transparent       : true,
  });

}

async function loadObject(json){
  let objLoader = new THREE.ObjectLoader();
  return new Promise( (accept, reject) => objLoader.load(json, accept, null ,reject));

}



// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }
