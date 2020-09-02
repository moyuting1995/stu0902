// JavaScript Document	
      window.onload=function(){
        var banner=document.querySelector('#banner');
        var list=document.querySelector('#banner-list');
        var slideBtn=document.querySelector('#slideBtn').querySelectorAll('span');
        var prev=document.querySelector('#prev');
        var next=document.querySelector('#next');
        var index=1;
        var animated=false;
        prev.onclick=function(){                //设置点击前一张的事件，先通过判断当前index是否为第一个，如果是就把index指向最后一个，否则直接index-1，
          if(!animated){
            if(index===1){
            index=3;
          }else{
            index-=1;
          }
            animate(750);
            showBtn();
          }
          		//这如果animated是false，表示当前没有动画正在进行，可以进行图片移动，如果是true，即表示有动画在进行，即使我进行点击也是没
           			//有意义，必须当动画停止下来再可以执行，然后根据情况改变index，设置图片的位移，改变下标样式
        }
        next.onclick=function(){
          if(index===3){
            index=1;
          }else{
            index+=1;			//同上
          }
          if(!animated){
           animate(-750);
          }
          showBtn();
        }
        function showBtn(){
          for(var i=0;i<slideBtn.length;i++){			//根据当前的index，用排他思想，把所有的下标设为没有active，再把第index-1个设为有的
            if(slideBtn[i].className==='active'){
              slideBtn[i].className='';
              break;
            }
          }
          slideBtn[index-1].className='active';
        }
        function animate(offset){
          animated=true;
          var newLeft=offset+list.offsetLeft;//位移后的位置
          var time=500; //移动总时长
          var interval=10; //移动的间隔时间
          var speed=offset/(time/interval); //每一次移动的位移
          //位移时每一次移动speed都调用该函数，为递归函数
 
          function go(){   
            if((speed<0&&list.offsetLeft>newLeft)||(speed>0&&list.offsetLeft<newLeft)){  //左边是代表向左移动，右边是向右，list.offsetLeft>newLeft代表当前
											//位置还没达到目标位置
              list.style.left=list.offsetLeft+speed+'px';		//既然没达到，那就需要移动图片	
            setTimeout(go,interval);					//递归调用此函数，每次移动一点点，直到当前位移等于目标，就跳到else
             }
             else{
              animated=false;						//动画结束，设为fales
              list.style.left=newLeft+'px';				//设置当前位移
              if(newLeft>-750){
                list.style.left='-2250px';				//如果当前图片是附属图片，那就切换到他真正的位置，因为两张图片是一样的，切换是一瞬间
              }								//的事情，所以看不出来
              if(newLeft<-2250){
                list.style.left='-750px';
              }
             }
          }
          go();
 
        }
        for(var i=0;i<slideBtn.length;i++){		//给下标绑定点击事件，用点击的index减去当前的index，再乘每张图片的-width，就可以得出应该位移的距离
          var button=slideBtn[i];			//因为乘的是负数，因此不用考虑向左移还是向右移这个问题。最后的offset如果是正的，就代表向右移，反之
          button.onclick=function(){
            if(this.className==='active'){
              return;
            }
            
            var myIndex=parseInt(this.getAttribute('index'));
 
            var offset=-750*(myIndex-index);
            if(!animated){
               animate(offset);
            }
           
            index=myIndex;
            showBtn();
          }
        }
          var timer;
          function play(){				//设置一个定时器，自动执行next.onclick事件，自动轮播
            timer=setInterval(function(){
                next.onclick();
            },5000);
          }
          function stop(){
            clearInterval(timer);
          }
          banner.onmouseover=stop;
          banner.onmouseout=play;
          play();
      }