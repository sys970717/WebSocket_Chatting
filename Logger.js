var Logger = function() {
    this.logType = "";
    this.className = "";
    this.header = "";
};

Logger.prototype.getLogger = function(className){
    this.className = className;
    this.header = "[ "+timeLog()+"";
};

Logger.prototype.info = function(msg) {
    let level = 'INFO';
    console.info(this.header+" "+level+" "+this.className+" ]\n"+msg);
};

Logger.prototype.debug = function(msg) {
    let level = 'DEBUG';
    console.info(this.header+" "+level+" "+this.className+" ]\n"+msg);
};

Logger.prototype.error = function(msg) {
    let level = 'ERROR';
    console.info(this.header+" "+level+" "+this.className+" ]\n"+msg);
}

function timeLog() {
    let d = new Date();
    let year = d.getFullYear();
    let month = leadingZeros(d.getMonth()+1, 2);
    let date = leadingZeros(d.getDate(), 2);

    let hour = leadingZeros(d.getHours(), 2);
    let minute = leadingZeros(d.getMinutes(), 2);
    let second = leadingZeros(d.getSeconds(), 2);

    return year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second;
}

function leadingZeros(n, digits) {
    let zero = '';
    n = n.toString();

    if(n.length < digits) {
        for(let i=0; i<digits - n.length; i++) {
            zero += '0';
        }
    }
    return zero+n;
}
