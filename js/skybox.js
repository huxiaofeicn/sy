var cameraCube, sceneCube;

function init_skybox(){
    cameraCube = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
    sceneCube = new THREE.Scene();
    var r = "img/sky/";
    var urls = [ r + "sky_0.jpg", r + "sky_1.jpg",
                 r + "sky_3.jpg", r + "sky_2.jpg",
                 r + "sky_4.jpg", r + "sky_5.jpg" ];

    var textureCube = new THREE.CubeTextureLoader().load( urls );
    textureCube.format = THREE.RGBFormat;
    textureCube.mapping = THREE.CubeReflectionMapping;
    
    var cubeShader = THREE.ShaderLib[ "cube" ];
    var cubeMaterial = new THREE.ShaderMaterial( {
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    } );
    cubeMaterial.uniforms[ "tCube" ].value = textureCube;
    var cubeMesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), cubeMaterial );
    sceneCube.add( cubeMesh );

}

function render_skybox(renderer,camera){
    cameraCube.rotation.copy( camera.rotation );
    renderer.render( sceneCube, cameraCube );
}

function resize_skybox() {
    cameraCube.aspect = window.innerWidth / window.innerHeight;
    cameraCube.updateProjectionMatrix();
}