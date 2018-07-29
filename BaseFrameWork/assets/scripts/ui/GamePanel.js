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
        desArray:[], //销毁列表
        upGradeArray:[], //升级列表
        dealArrLen:0,
        mapArray:[],
        actTag:false,
        startX:0,
        startY:0,
        orgx:-250,
        orgy:-250,
        xspace:165,
        yspace:165,
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

    //1234,上下左右
    touchToDir(dir){
        this.moveAllToDir(dir);
        this.schedule(function(){
            if(this.actTag){
                this.mixSquair();
                this.createRandToPos(2);
                this.actTag = false;
            }
           
        },0.05,0);
        switch(dir){
            case 1:zlog.log("上");
                break;
            case 2:zlog.log("下");
                break;
            case 3:zlog.log("左");
                break;
            case 4:zlog.log("右");
                break;
        }
    },

    moveAllToDir(dir){
        if(dir == 1){  //向上移动，往下遍历
            var maxY = this.height-1;
            for(var i=this.height-2;i>=0;i--){
                for(var j=0;j<this.width;j++){
                    var checkY = i+1;
                    var nNode = this.getUnitByXY(j,i);
                    if(nNode!=null){
                        //移动到底部的方块
                        var checkNode = this.getUnitByXY(j,checkY); //检测点的对象
                        while(checkNode==undefined && checkY<maxY){
                            checkY ++;
                            checkNode = this.getUnitByXY(j,checkY); //检测点的对象
                            if(checkNode!=undefined){
                                break;
                            }
                        }
                        if(checkNode!=undefined){
                            if(!checkNode.isValueSame(nNode)){
                                checkY--;
                            }
                        }
                        var index1 = this.getListIndexByXY(j,i); //当前节点
                        var index2 = this.getListIndexByXY(j,checkY); //检测的点
                        this.moveIndexTo(index1,index2);

                    }
                }
            }
        }else if(dir == 2){
            var minY = 0;
            for(var i=1;i<this.height;i++){
                for(var j=0;j<this.width;j++){
                    var checkY = i-1;
                    var nNode = this.getUnitByXY(j,i);
                    if(nNode!=null){
                        //移动到底部的方块
                        var checkNode = this.getUnitByXY(j,checkY); //检测点的对象
                        while(checkNode==undefined && checkY>minY){
                            checkY --;
                            checkNode = this.getUnitByXY(j,checkY); //检测点的对象
                            if(checkNode!=undefined){
                                break;
                            }
                        }
                        if(checkNode!=undefined){
                            if(!checkNode.isValueSame(nNode)){
                                checkY++;
                            }
                        }
                        var index1 = this.getListIndexByXY(j,i); //当前节点
                        var index2 = this.getListIndexByXY(j,checkY); //检测的点
                        this.moveIndexTo(index1,index2);

                    }
                }
            }
        }else if(dir == 3){
            var minX = 0;
            for(var i=1;i<this.width;i++){
                for(var j=0;j<this.height;j++){
                    var checkX = i-1;
                    var nNode = this.getUnitByXY(i,j);
                    if(nNode!=null){
                        //移动到底部的方块
                        var checkNode = this.getUnitByXY(checkX,j); //检测点的对象
                        while(checkNode==undefined && checkX > minX){
                            checkX --;
                            checkNode = this.getUnitByXY(checkX,j); //检测点的对象
                            if(checkNode!=undefined){
                                break;
                            }
                        }
                        if(checkNode!=undefined){
                            if(!checkNode.isValueSame(nNode)){
                                checkX++;
                            }
                        }
                        var index1 = this.getListIndexByXY(i,j); //当前节点
                        var index2 = this.getListIndexByXY(checkX,j); //检测的点
                        this.moveIndexTo(index1,index2);

                    }
                }
            }
        }else if(dir ==4){
            var maxX = this.width-1;
            for(var i=this.width-2;i>=0;i--){
                for(var j=0;j<this.height;j++){
                    var checkX = i+1;
                    var nNode = this.getUnitByXY(i,j);
                    if(nNode!=null){
                        //移动到底部的方块
                        var checkNode = this.getUnitByXY(checkX,j); //检测点的对象
                        while(checkNode==undefined && checkX < maxX){
                            checkX ++;
                            checkNode = this.getUnitByXY(checkX,j); //检测点的对象
                            if(checkNode!=undefined){
                                break;
                            }
                        }
                        if(checkNode!=undefined){
                            if(!checkNode.isValueSame(nNode)){
                                checkX--;
                            }
                        }
                        var index1 = this.getListIndexByXY(i,j); //当前节点
                        var index2 = this.getListIndexByXY(checkX,j); //检测的点
                        this.moveIndexTo(index1,index2);

                    }
                }
            }
        }
    },
    //移动格子index1 -> index2
    moveIndexTo(index1,index2){
        if(index1 == index2){
            return;
        }
        this.actTag = true;
        var unit1 = this.mapArray[index1];
        var unit2 = this.mapArray[index2];
        if(unit1!=undefined){
            
            if(unit2!=undefined){
                this.addToDesList(unit1,unit2);
                this.mapArray[index1] = undefined;
                var act = cc.moveTo(0.02,this.getPosByIndex(index2));
                unit1.node.runAction(act);
            }else{
                var act = cc.moveTo(0.02,this.getPosByIndex(index2));
                var tmp = unit2;
                this.mapArray[index2] = unit1;
                this.mapArray[index1] = tmp;
                unit1.node.runAction(act);
            }
        }else{

        }

    },
    //方块销毁，合成过程完毕之后销毁方块
    mixSquair(){
        for(var i=0;i<this.dealArrLen;i++){
            var desObj = this.desArray[i];
            var upObj = this.upGradeArray[i];
            desObj.node.destroy();
            upObj.upgrade();
            this.desArray[i] = undefined;
            this.upGradeArray[i] = undefined;
        }
        this.dealArrLen = 0;
    },
    addToDesList(objDes,objUp){
        this.upGradeArray[this.dealArrLen] = objUp;
        this.desArray[this.dealArrLen] = objDes;
        this.dealArrLen++;
    },
    initGame(){
        // var total = this.width*this.height;
        // var nowIndex = 0;
        // var orgx = -250;
        // var orgy = -250;
        // var xspace = 165;
        // var yspace = 165;
        
        //  for(var i=0;i<this.width;i++){
        //      for(var j=0;j<this.height;j++){
        //         var id = this.getListIndexByXY(i,j);
        //         if(this.mapArray[id]!=undefined){
        //             this.mapArray[id].destroy();
        //         }
        //      }
        //  }
        // this.mapArray.splice(0,this.mapArray.length);
        // var pos = this.getRandPos();
        // var pos2 = this.getRandPos();
        // this.createToPos(pos.x,pos.y,2);
        // this.createToPos(pos2.x,pos2.y,4);

    },
    startGame(){
        for(var i=0;i<this.width;i++){
            for(var j=0;j<this.height;j++){
               var id = this.getListIndexByXY(i,j);
               if(this.mapArray[id]!=undefined){
                   this.mapArray[id].node.destroy();
               }
            }
        }
       this.mapArray.splice(0,this.width*this.height);
       this.createRandToPos(2);
       this.createRandToPos(2);
    //    this.createRandToPos(2);
    //    this.createRandToPos(2);
    //    this.createRandToPos(3);
    //    this.createRandToPos(3);
    },
    
    createRandToPos(value){
        var index = this.getEmptyRandPos();
        var pos = this.getXYByListIndex(index);
        this.createToPos(pos.x,pos.y,value);
        
    },
    createToPos(x,y,value) {
        var id = this.getListIndexByXY(x,y);
        var obj = cc.instantiate(this.unit);
        var unitLogic = obj.getComponent('gamePanelUnit');
        unitLogic.setParent(this.container);
        var pos = this.getPosByXY(x,y);
        unitLogic.setPosition(pos);
        if(value == undefined){
            value = id;
        }
        unitLogic.setValue(value);
        this.mapArray[id] = unitLogic;
    },
    getEmptyRandPos(){
        var emptList = this.getEmptyPosLs();
        var randIndex = Math.floor(Math.random()*emptList.length);
        return emptList[randIndex];
    },
    getEmptyPosLs(){
        var emptPos = [];
        var eptId = 0;
        var ttl = this.width*this.height;
        for(var i =0;i<ttl;i++){
            if(this.mapArray[i] == undefined){
                emptPos[eptId] = i;
                eptId++;
            }
        }
        return emptPos;
    },
  
    getPosByXY(x,y){
        return cc.v2(this.orgx+this.xspace*x,this.orgy+this.yspace*y);
    },
    getPosByIndex(index){
        var pos = this.getXYByListIndex(index);
        zlog.log("pos is:"+pos);
        return this.getPosByXY(pos.x,pos.y);
    },
    getUnitByXY(x,y){
        var index = this.getListIndexByXY(x,y);
        return this.mapArray[index];
    },
    getListIndexByXY(x,y){
        return this.width*x+y;
    },
    getXYByListIndex(index){
        var x = Math.floor(index/this.width);
        var y = index%this.width;
        return cc.v2(x,y);
    }
    // update (dt) {},
});
