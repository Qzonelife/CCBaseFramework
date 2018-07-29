// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       txt:{
           type:cc.Label,
           default:null
       },
       value:0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    setValue(value){
        this.value = value;
        this.setTextInfo(value);
    },
    setTextInfo(txt){
        this.txt.string = txt;
    },
    setParent(parent){
        this.node.setParent(parent);
    },
    setPosition(pos){
        this.node.position = pos;
    },
    isValueSame(obj){
        return obj.value == this.value;
    },
    upgrade(){
        this.value = this.value*2;
        this.setTextInfo(this.value);
    }
    // update (dt) {},
});
