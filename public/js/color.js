// JavaScript Document
var colorbar=['green','yellow','blue','red'];/*#11ca5b,#dbb700,#00b3db,#E13434*/
var color={
    changecolor:function(k){
	   
	   $('body').addClass(colorbar[k]);
	   $('#icon').attr('href','http://www.jiandou.com/logo/icon'+k+'.ico');
	   console.log(k,$('#icon').attr('href'));
	},
    selectcolor:function(){
/*	    maxNum=colorbar.length-1;
		if(k<maxNum){
		   k++;
		}else{
		   k=0;
		}
		return(k);*/
		k=colorbar.length-1;
		return GetRandomNum(0,k);
		
	}
}
/*var colorcokie={
	savecolor:function(){
	
	},
	deletecolor:function(){
	
	},
	getcolor:function(){
	
	}
}*/


function GetRandomNum(Min,Max)
{   
var Range = Max - Min;   
var Rand = Math.random();   
return(Min + Math.round(Rand * Range));   
}