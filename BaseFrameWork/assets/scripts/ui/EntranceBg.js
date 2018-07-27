// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var loopManager = require("loopManager");
var uiManager = require("uiManager");
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

        loadingBar:{
            type:cc.ProgressBar,
            default:null,
        },
        probarLabel:{
            type:cc.Label,
            default:null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        loopManager._instance.addToFrame(this,this.loading);
    },
    loading(self){
        self.loadingBar.progress +=0.05;
        self.probarLabel.string = "进度："+self.loadingBar.progress.toFixed(2);
        if(self.loadingBar.progress>=1){
            loopManager._instance.removeFromFrame(self);
            self.probarLabel.string = "加载完成";
            self.node.destroy();
            resourcesLoader._instance.createUI("prefabs/ui/MainMenu",this,function(obj,prefabs){
                uiManager._instance.root.addChild(prefabs);
            });
        }
    }
    // update (dt) {},
});
