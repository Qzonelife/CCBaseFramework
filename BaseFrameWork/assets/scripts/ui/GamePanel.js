// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var resourcesLoader = require("resourcesLoader");

cc.Class({
    extends: cc.Component,

    properties: {
        
        width:4,
        height:4,
        unit:{
            type:cc.Node,
            default:null
        },
        container:{
            type:cc.Node,
            default:null
        },
        mapArray:[],
        startX:0,
        startY:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.initGame();
        // var bgNode = cc.find("background",this.node);
        // bgNode.on(cc.Node.EventType.TOUCH_START,this.touchStart,this)
        // bgNode.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
    
    },

    // touchStart(event){
    //     var pos = event.getLocation();
    //     this.startX = pos.x;
    //     this.startY = pos.y;
    // },
    // touchEnd(event){
    //     var pos = event.getLocation();
    //     var xDis =  pos.x - this.startX;
    //     var yDis =  pos.y - this.startY ;
    //     zlog.log("xdis:"+xDis+"ydis:"+yDis);
    //     if(Math.abs(xDis)>100 || Math.abs(yDis)>100){
    //         if(Math.abs(xDis)>Math.abs(yDis)){
    //             if(xDis>0){
    //                 this.touchToDir(4);
    //             }else{
    //                 this.touchToDir(3);
    //             }
    //         }else{
    //             if(yDis>0){
    //                 this.touchToDir(1);
    //             }else{
    //                 this.touchToDir(2);
    //             }
    //         }
    //     }
    // },

    // //1234,上下左右
    // touchToDir(dir){
    //     switch(dir){
    //         case 1:zlog.log("上");
    //             break;
    //         case 2:zlog.log("下");
    //             break;
    //         case 3:zlog.log("左");
    //             break;
    //         case 4:zlog.log("右");
    //             break;
    //     }
    // },
    initGame(){
        var total = this.width*this.height;
        var nowIndex = 0;
        var orgx = -250;
        var orgy = -250;
        var xspace = 165;
        var yspace = 165;
         for(var i=0;i<this.width;i++){
             for(var j=0;j<this.height;j++){
                 var obj = cc.instantiate(this.unit);
                 var unitLogic = obj.getComponent('gamePanelUnit');
                 unitLogic.setParent(this.container);
                 unitLogic.setPosition(cc.v2(orgx+xspace*i,orgy+yspace*j));
                 this.mapArray[nowIndex] = unitLogic;
                 nowIndex ++;
             }
         }
    }
    // update (dt) {},
});
