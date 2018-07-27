// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var loopManager = require('loopManager');
var uiManager = require('uiManager');
var resourcesLoader = require('resourcesLoader');
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
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      this.gameStart();
      uiManager._instance.init();
      resourcesLoader._instance.createUI("prefabs/ui/EntranceBg",this,function(obj,ins){
            uiManager._instance.root.addChild(ins);
             zlog.log(ins.position);
             
       });
       
    },
    gameStart:function(){
        
    },
    update(){
        loopManager._instance.frameUpdate();
    },
   
});