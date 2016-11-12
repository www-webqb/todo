$(function(){
	var dj=$(".ff");
	var sr=$("#aa");
	var xs=$(".xs");
	dj.on("touchend",function(){
		sr.css("display","block");
	})
	xs.on("touchend",function(){
		sr.css("display","none");
	})
	
	
	var dd=$(".dd");
	var sz=$(".szbf");
	dd.on("touchend",function(){
        sz.addClass("donhua").removeClass("donhua1");
	})
	sz.on("touchend",function(){
		sz.addClass("donhua1").removeClass("donhua");
	})
	
	
	//全部便签部分
	var qb=$(".qb");
	var xl=$(".xlxx");
	qb.on("touchend",function(){
		xl.addClass("donhua2").removeClass("donhua3");
	})
	xl.on("touchend",function(){
		xl.addClass("donhua3").removeClass("donhua2");
	})
	
	//添加按钮
	var add=$(".yuan");
	//输入框
	var input=$("#aa input");
	//生成内容部分
	var ul=$("#nr");
	//创建数组
	var todos=[];
//	接触其实位置
	var a;
	
	
	//完成、未完成切换
	
	ul.on("touchstart",'li',function(e){
		
		 a = e.originalEvent.changedTouches[0].clientX;
		
		
	})
	ul.on("touchend",'li',function(e){
		
		var b = e.originalEvent.changedTouches[0].clientX;
		if(b-a>50){				
			$(this).addClass("done");
			todos[$(this).index()].state=1;
			localStorage.todos=JSON.stringify(todos);
		}
		if(b-a<-50){
			$(this).removeClass("done");
			todos[$(this).index()].state=0;
			localStorage.todos=JSON.stringify(todos);
		}
	})
	
	
	//添加数据
	
	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos);
		for(var i=0;i<todos.length;i++){
			var c=(todos[i].state)?'done':'';
			$('<li class="'+c+'"><div class="content">'+todos[i].name+'</div><div class="delete">&#xe63e;</div></li>').appendTo(ul);
		}
		
	}
	
	//添加内容
	
	add.on("touchend",function(){
		var v=$.trim(input.val())
		if(!v){
			return;
		}
		var todo={
			name:v,
			state:0
		}
		todos.push(todo);
		localStorage.todos=JSON.stringify(todos)
		$('<li><div class="content">'+v+'</div><div class="delete">&#xe63e;</div></li>').appendTo(ul);
		input.val('').focus();		
	})
	
	
	var divs=$("#floor div");
 
	divs.on("touchend",function(){
		
		
		divs.removeClass("index");
		$(this).addClass("index");
		var data=$(this).attr('data-role');
		ul.find("li").show();
//		console.log(this)
		if(data==='ac'){
			$(this).addClass("index");
			ul.find("li").hide();
			ul.find("li.done").show();
		}
		if(data==='co'){
			$(this).addClass("index");	
			ul.find("li").show();
			ul.find("li.done").hide();
		}
	})
	
	//li右侧消除按钮
	
	ul.on("touchend",".delete",function(){
		var index=$(this).closest("li").index();
		todos.splice(index,1);
		localStorage.todos=JSON.stringify(todos);
		$(this).closest("li").addClass("delete-d")
		$(this).closest("li").delay(600).queue(function(){
			$(this).remove().dequeue();
		})
		
		
	})
	
	//删除已完成
	var clear=$(".all-clear");
	clear.on("touchend",function(){
		var newtodos=[];
		for(var i=0;i<todos.length;i++){
			if(todos[i].state===0)
			newtodos.push(todos[i]);
		}
		todos=newtodos;
		localStorage.todos=JSON.stringify(todos);
		var lis=ul.find("li.done")
		
		lis.delay(600).queue(function(){
			$(this).addClass("delete-d").dequeue().delay(600).addClass("delete-d").queue(function(){
				$(this).remove().dequeue();
			});
		})
		
	})
})
