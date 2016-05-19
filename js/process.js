THREE.ShaderLib[ 'process' ] = {
	vertexShader: [
		'uniform float inter;',
        'varying vec4 v_Color;',
		'void main()',
		'{',
		'	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
		'	gl_Position = projectionMatrix * mvPosition;',
        '	vec4 color = vec4(0,1,0,0);',
        '	if (position.x > inter) {',
        '	    color = vec4(0.4,0.4,0.4,0);',
        '	}',
        '	v_Color = color;',
		'}'
	].join( '\n' ),

	fragmentShader: [
        'varying vec4 v_Color;',
        'void main()',
        '{',
        '   gl_FragColor = v_Color;',
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