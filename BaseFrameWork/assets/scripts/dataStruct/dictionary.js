cc.Class({
 
    ctor(){
        this.keyArr = [];
        this.valueArr=[];
    },
    add:function(key,value){
        if(!this.exist(key)){
            this.keyArr.push(key);
            this.valueArr.push(value);
        }
    },
    remove:function(key){
        if(this.exist(key)){
            var index = this.indexof(key,this.keyArr);
            this.keyArr.splice(index,1);
            this.valueArr.splice(index,1);
        }
    },
    exist:function(key){
        for(var i=0;i<this.keyArr.length;i++){
            if(this.keyArr[i]==key){
                return true;
            }
        }
        return false;
    },
    indexof:function(key,arr){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==key){
                return i;
            }
        }
        return -1;
    },
    getValue(key){
        var index = this.indexof(key,this.keyArr);
        if(index!=-1){
            return this.valueArr[index];
        }
        return undefined;
    },
    printDictInfo:function(){
        for(var i=0;i<this.valueArr.length;i++){
            zlog.log("key:"+this.keyArr[i]+",value:"+this.valueArr[i]+"\n");
        }
    }
});

