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
var resourcesLoader = cc.Class({

    statics:{
        _instance:null
    },
    ctor(){
        this.resDict = new Dictionary();
    },
    createUI(uiName,obj,callBack){
        var self = this;
        //字典中不存在资源
        if(!this.resDict.exist(uiName)){
            cc.loader.loadRes(uiName,function(err,prefab){
                if(prefab!=undefined){
                    self.resDict.add(uiName,prefab);
                    var ins = cc.instantiate(prefab);
                    callBack(obj,ins);
                }
            });
        }else if(this.resDict.getValue(key)!=undefined){
            var ins = cc.instantiate(this.resDict.getValue(key));
            callBack(obj,ins);
        }else{
            callBack(obj,undefined);
        }
        
    },


   

});

resourcesLoader._instance = new resourcesLoader();
module.exports = resourcesLoader;