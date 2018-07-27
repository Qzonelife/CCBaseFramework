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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        btnStart:{
            type:cc.Button,
            default:null,
        },
        gamePanel:cc.Class
    },

    
    touchStart(event){
        var pos = event.getLocation();
        this.startX = pos.x;
        this.startY = pos.y;
    },
    touchEnd(event){
        var pos = event.getLocation();
        var xDis =  pos.x - this.startX;
        var yDis =  pos.y - this.startY ;
        zlog.log("xdis:"+xDis+"ydis:"+yDis);
        if(Math.abs(xDis)>100 || Math.abs(yDis)>100){
            if(Math.abs(xDis)>Math.abs(yDis)){
                zlog.log(1);
                if(xDis>0){
                    this.touchToDir(4);
                }else{
                    this.touchToDir(3);
                }
            }else{
                zlog.log(2);
                if(yDis>0){
                    this.touchToDir(1);
                }else{
                    this.touchToDir(2);
                }
            }
        }
    },

    //1234,上下左右
    touchToDir(dir){
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
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.btnStart.node.on(cc.Node.EventType.TOUCH_END,this.onClickGameStart,this);
        var bgNode = cc.find("background",this.node);
        bgNode.on(cc.Node.EventType.TOUCH_START,this.touchStart,this)
        bgNode.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
    },
    onClickGameStart(){
        zlog.log("you click start");
        var self = this;
        if(this.gamePanel == undefined){
            zlog.log(this.gamePanel);
            resourcesLoader._instance.createUI("prefabs/ui/GamePanel",this,function(obj,prefabs){
                var obj = cc.instantiate(prefabs);
                obj.setParent(self.node);
                self.gamePanel = obj.getComponent('GamePanel');
                //self.gamePanel.setPosition(cc.v2(0,0));
                self.startGameLogic();
                
            });
        }else{
            this.startGameLogic();
        }
    },
    startGameLogic(){
        zlog.log("startGameLogic~~~~~~~~~~~~~~~~~~~~~~~~~");
    }
    // update (dt) {},
});
