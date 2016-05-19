


THREE.PathControl = function (camera) {
    
    this.camera = camera;
	//this.domElement = ( domElement !== undefined ) ? domElement : document;
    this.speed = 1;
    this.duration = 30.0;
    this.controlPoints = new Array();
    this.turnr = 45;
    this.clear_point = function (){
        this.controlPoints.clear();
    }
    this.add_point = function(x,y,z) {
        var vec = new THREE.Vector3(x,y,z);
        this.controlPoints.push(vec);
    }
    
    this.reset = function (){
        this._init();
        for (var i=0;i<this.controlPoints.length - 1;i++)
        {
            this._pathlength += this.controlPoints[i].distanceTo(this.controlPoints[i+1]);
        }
        this._disperms = this._pathlength / this.duration / 1000.0;
        this._time  =false;
    }
    this._init = function (){
        this._disperms = -1;
        this._pathlength = 0;
        this._iterpos = 0.0;
    }
    this.update = function (){
        if (!this._time ){
            this._time = new Date().getTime();
            return;
        }
        var ntime = new Date().getTime();
        var dftime = ntime - this._time;
        if (dftime < 5)
            return;
        
        this._iterpos += dftime / this.duration / 1000.0;
        if (this._iterpos >= 0.9999) {
            //this.reset();
            return;            
        }


        this._getlookat(this._iterpos);

        this._time = ntime;
        
        
    }
    this._getlookat = function(pos) {
        
        var low = 0.0;
        var up = 0.0;
        var lowp,upp;
        var i = 0;
        for (;i<this.controlPoints.length - 1;i++)
        {
            lowp = this.controlPoints[i];
            upp = this.controlPoints[i+1];
            up = low + lowp.distanceTo(upp) / this._pathlength;
            if (pos <= up) {
                
                break;
            }
            low = up;
        }
        var r = (pos - low) / (up -low);
        this.camera.position.copy(this._get_midd_vec(lowp,upp,r));
        var dis = this.camera.position.distanceTo(upp);
        if (dis > this.turnr) {
            this.camera.lookAt(upp);
        } else if (i < this.controlPoints.length - 2){
            var t = (this.turnr - dis)/this.turnr/2.0;
            var c = this._get_midd_vec(upp,this.controlPoints[i+2],t);
            this.camera.lookAt(c);
        }
        
    }
    this._multi_vec = function (vec,v) {
        return new THREE.Vector3(vec.x * v,vec.y * v,vec.z * v);
    }
    this._add_vec = function (v1,v2){
        return new THREE.Vector3(v1.x + v2.x,v1.y + v2.y,v1.z + v2.z);
    }
    this._get_midd_vec= function(v1,v2,t){
        return this._add_vec(this._multi_vec(v2,t),this._multi_vec(v1,1 - t));
    }
}