THREE.ShaderLib[ 'process' ] = {
	vertexShader: [
		'uniform float inter;',
		'void main()',
		'{',
		'	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
		'	gl_Position = projectionMatrix * mvPosition;',
        '	vec3 color = vec3(0,1,0);',
        '	if (position.x > inter) {',
        '	    color = vec3(1,0,0);',
        '	}',
        '	gl_FrontColor = vec3(1,0,0);',
		'}'
	].join( '\n' ),

	fragmentShader: [
        'void main()',
        '{',
        '   gl_FragColor = gl_Color;',
        '}'
	].join( '\n' )
};

var process_material = null;

function init_process_material() {
    var proShader = THREE.ShaderLib[ "process" ];
    process_material = new THREE.ShaderMaterial({
        fragmentShader: proShader.fragmentShader,
        vertexShader:proShader.vertexShader,
        uniforms:{
            inter:{type:'f',value:1800.0}
        }
    });
};