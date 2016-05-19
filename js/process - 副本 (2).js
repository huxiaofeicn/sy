THREE.ShaderLib[ 'process' ] = {
	vertexShader: [
		'void main()',
		'{',
		'	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
		'	gl_Position = projectionMatrix * mvPosition;',
		'}'
	].join( '\n' ),

	fragmentShader: [
        'void main()',
        '{',
        '   gl_FragColor = vec4(1,0,0,1);',
        '}'
	].join( '\n' )
};

var process_material = null;

function init_process_material() {
    var proShader = THREE.ShaderLib[ "process" ];
    process_material = new THREE.ShaderMaterial({
        fragmentShader: proShader.fragmentShader,
        vertexShader:proShader.vertexShader
    });
};