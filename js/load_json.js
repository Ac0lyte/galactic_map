getJSON('data/stars.json',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    // console.log(data)

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
    var controls = new THREE.OrbitControls( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.setSize( 500 * (window.innerWidth / window.innerHeight), 500 );
    document.body.appendChild( renderer.domElement );
    
    var distance = 20;
    camera.position.set( 0, 0, distance * 2);
    controls.update();

    var line = new THREE.LineSegments( new THREE.WireframeGeometry( new THREE.SphereBufferGeometry( distance, 36, 36 ) ), 
                                       new THREE.LineBasicMaterial( { color: 0x333366 } )
                                     );
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;
    
    scene.add( line );


    var starCount = data.stars.length;
    console.log("stars : " + starCount);

    var added = 0;

    for( var i = 0; i < starCount; i++) {
        if( Math.sqrt( ( data.stars[i].x * data.stars[i].x ) + 
                       ( data.stars[i].y * data.stars[i].y ) + 
                       ( data.stars[i].z * data.stars[i].z ) ) <= distance) {

            var lightColor = 0xffffff;
            var starColor = 0xffffff;
            var starSize = 0.002 * distance;
            if(data.stars[i].spect) {
                var colorTemp = 5800;
                var starClass = data.stars[i].spect.substring(0,1);
                var starTemp = data.stars[i].spect.substring(1,2);
                var starLumin = data.stars[i].spect.substring(2);

                switch(starClass){
                    case 'O':
                        colorTemp = 30000;
                        starSize = starSize * 6.6;
                        break;
                    case 'B':
                        colorTemp = 10000;
                        starSize = starSize * 3.2;
                        break;
                    case 'A':
                        colorTemp = 7500;
                        starSize = starSize * 1.6;
                        break;
                    case 'F':
                        colorTemp = 6000;
                        starSize = starSize * 1.3;
                        break;
                    case 'G':
                        colorTemp = 5200;
                        starSize = starSize * 1.05;
                        break;
                    case 'K':
                        colorTemp = 3700;
                        starSize = starSize * 0.85;
                        break;
                    case 'M':
                        colorTemp = 2400;
                        starSize = starSize * 0.7;
                        break;
                }
                colorTemp = colorTemperatureToRGB(colorTemp);
                starColor = (colorTemp.r * 65536) + (colorTemp.g * 256) + colorTemp.b;
            }
            var sphere = new THREE.SphereGeometry( starSize, 8,6 );
            var material = new THREE.MeshBasicMaterial( { color: starColor } );
    
            var star = new THREE.PointLight( lightColor, 3, 0 );
            star.add( new THREE.Mesh(sphere,material));
            star.position.x = data.stars[i].x;
            star.position.y = data.stars[i].y;
            star.position.z = data.stars[i].z;

            scene.add( star );
            added ++;
        }
    }

    console.log('Stars added: ' + added);

    var animate = function () {
    	requestAnimationFrame( animate );
    
        controls.update();
    	renderer.render(scene, camera);
    };
    
    animate();

  }
});

