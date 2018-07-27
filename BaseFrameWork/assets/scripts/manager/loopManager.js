// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Dictionary = require('dictionary');
var loopManager = cc.Class({

    statics:{
        _instance:null
    },
    ctor(){
        this.loopDict = new Dictionary();
        this.secondLoopDict = new Dictionary();
        this.timeRecorder = 0;
    },
    addToFrame:function(key,func){
        this.loopDict.add(key,func);
    },
    removeFromFrame:function(key){
        this.loopDict.remove(key);
        
    },
    addToSecond:function(key,func){
        this.secondLoopDict.add(key,func);
    },
    removeFromSecond:function(key){
        this.secondLoopDict.remove(key);
    },
    frameUpdate:function(){
        var valueArr = this.loopDict.valueArr;
        for(var i=0;i<valueArr.length;i++){
            valueArr[i](this.loopDict.keyArr[i]);
        }
        var nowTime = Date.now();
        if(nowTime >= this.timeRecorder+1000){
            this.secondUpdate();
            this.timeRecorder = nowTime;
        }
    },
    secondUpdate:function(){
        var valueArr = this.secondLoopDict.valueArr;
        for(var i=0;i<valueArr.length;i++){
            valueArr[i](this.secondLoopDict.keyArr[i]);
        }
    },

});

loopManager._instance = new loopManager();
module.exports = loopManager;