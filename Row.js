var         
change=function(model){
	var self=this
	this.parseData(model.attributes, function(err, d){
		if (err) return console.error(err)
    	self.el.innerHTML=self.deps.tpl(d)
	})
}
        
return{     
    tagName:'li',
	signals:['deselectother'],
    deps:{  
        data:'model',
        tpl:'file',
		selected:'param'
    },      
    create:function(deps,params){
		var data=deps.data
		change.call(this, data)
		this.listenTo(data,'change',change)
		this.listenTo(data,'destroy',this.remove)
		if (this.checkSelection(data,deps.selected)) this.select()
    },
	events:{
		click:function(e){
			this.select()
		}
	},
	slots:{
		deselect:function(from,sender){
			this.el.classList.remove('selected')
		}
	},
	checkSelection:function(model,selected){
		return model.id == selected
	},
	select:function(){
		this.el.classList.add('selected')
		this.signals.deselectother().send(this.host)
	},
    parseData:function(data,cb){
        cb(null,data)
    }           
}               
