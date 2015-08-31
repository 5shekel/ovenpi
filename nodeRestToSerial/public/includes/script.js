/**
 * @author user
 */


$(window).on("orientationchange",function(){
  if(window.orientation == 0) // Portrait
  {
    $("#controls").css("display","block");
    $("#lower").css("display","block");
    $("#streambox").css("height",streamboxheight + "px");
  }
  else // Landscape
  {
  	$("#controls").css("display","none");
    $("#lower").css("display","none");
    $("#streambox").css("height","100%");
    
  }
});

var isrunning = false;
var foundminheight = false;
var streamboxheight;
var minheight;

$( document ).ready(function() {
	
    $(".ui-input-text").attr("class",'inp');
    
    
//     
    // $(".clickable").click(function(){
        // if (window.console) console.log($(this).attr('data-value'));
        // var req = new XMLHttpRequest();
		// // GET /output/value, and make an asynchronous request:
		// req.open("GET", '/output/' + $(this).attr('data-value'), true);
		// // close the request:
		// req.send( null );
    // });
    
    $('#add30').click(function(){
		var temp = $('#sec').val();
		var tempnum = parseInt(temp);
		if(!tempnum){
			tempnum = 0;
		}else if (tempnum > 59){
			tempnum = 59;
			$('#sec').val(tempnum);
		}
		
		var temp2 = $('#min').val();
		var tempnum2 = parseInt(temp2);
		if(!tempnum2){
			tempnum2 = 0;
		}
		$('#min').val(tempnum2);
		if (temp > 59){
			console.log("error in seconds!");
			return;
		}else if(temp > 29){
			tempnum2 =tempnum2 + 1;
			$('#min').val(tempnum2);
			tempnum = (tempnum + 30) - 60;
		}else{
			tempnum = tempnum + 30;
		}
		if (tempnum < 10){
			temp = "0"+tempnum;
			$('#sec').val(temp);
			return;
		}
		$('#sec').val(tempnum);
		
	});
	
	$('#add10').click(function(){
		var temp = $('#sec').val();
		var tempnum = parseInt(temp);
		if(!tempnum){
			tempnum = 0;
		}else if (tempnum > 59){
			tempnum = 59;
			$('#sec').val(tempnum);
		}
		
		var temp2 = $('#min').val();
		var tempnum2 = parseInt(temp2);
		if(!tempnum2){
			tempnum2 = 0;
		}
		$('#min').val(tempnum2);
		if (temp > 59){
			console.log("error in seconds!");
			return;
		}else if(temp > 49){
			tempnum2 =tempnum2 + 1;
			$('#min').val(tempnum2);
			tempnum = (tempnum + 10) - 60;
		}else{
			tempnum = tempnum + 10;
		}
		if (tempnum < 10){
			temp = "0"+tempnum;
			$('#sec').val(temp);
			return;
		}
		$('#sec').val(tempnum);
		
	});
	
	$("#clear > img").click(function(){
		if(isrunning){
			str = "Start";
			str2 ="start";
			isrunning = false;
			$('#startstop').css("color","#7cb342");
			$('#power').css("display","block");
			$('#stream').css("display","none");
			$('#startstop').text(str);
			$('#startstop').attr('data-value',str2);
			stopui();
		}else{
			$('#sec').val("00");
			$('#min').val("0");
		}
		
		
	});
	
	
	$('#startstop').click(function(){
		var str = $('#startstop').text();
		var str2;
		if (str.search("Start") != -1){
			str = "Stop";
			str2 ="stop";
			isrunning = true;
			$('#startstop').css("color","#fbc02d");
			$('#power').css("display","none");
			$('#stream').css("display","block");
			startui();
		}else{
			str = "Start";
			str2 ="start";
			isrunning = false;
			$('#startstop').css("color","#7cb342");
			$('#power').css("display","block");
			$('#stream').css("display","none");
			stopui();
		}
		$('#startstop').text(str);
		$('#startstop').attr('data-value',str2);
	});
	
	$('#popcorn').click(function(){
		if(!isrunning){
			$('#sec').val("00");
			$('#min').val("3");
			$('#popcorn').css("background-image",'url("images/popcorn_green.png")');
		}
		
		//$('#startstop').trigger('click');
	});
});



window.setInterval(function(){
	$('body').css('text-align','center');
	if(!foundminheight){
		minheight = $('#wrapper').css('min-height');
		var n = minheight.localeCompare("0px");
    	if (n != 0){
    		console.log(n);
    		foundminheight = true;
    		var i = 0;
    		var tempstr = '';
    		var tempnum2;
    		while(i<minheight.length){
    			if(minheight[i]=='p'){
    				break;
    			}
    			i++;
    		}
    		tempstr = minheight.substr(0,i);
    		tempnum2 = parseInt(tempstr);
    		minheight = tempnum2;
    		//console.log(tempnum2);
    		var again;
    		var tempnum3 = tempnum2 * 0.3644;
    		$("#controls").css('min-height',tempnum3 + "px");
    		again = tempnum3 * 0.163;
    		$('form').css('margin-top',again + "px");
    		$('#plus').css('margin-top',again + "px");
    		again = tempnum3 * 0.375;
    		$('form').css('height',again + "px");
    		$('#plus').css('height',again + "px");
    		var stam = again * 0.70;
    		$('input[type="number"]').css('font-size',stam + "px");
    		again = again * 0.4;
    		
    		$('#add30').css('height',again + "px");
    		$('#add10').css('height',again + "px");
    		$('#add30').css('line-height',again + "px");
    		$('#add10').css('line-height',again + "px");
    		again = again * 0.5;
    		$('#add30').css('margin-top',again + "px");
    		$('.inp').css('height','100%');
    		$('input[type="number"]').css('height','100%');
    		again = tempnum3 * 0.049;
    		$('#startstop1').css('margin-top',again + "px");
    		again = tempnum3 * 0.25;
    		$('#startstop1').css('height',again + "px");
    		$('#startstop1').css('line-height',again + "px");
    		again=again*0.5;
    		$('#startstop1').css('font-size',again + "px");
    		$('#clear > img').css('height',"97%");
    		
    		
    		tempnum3 = tempnum2 * 0.2469;
    		streamboxheight = tempnum3;
    		$("#streambox").css('min-height',tempnum3 + "px");
    		//$("#stream").css('width','100%');
    		$("#stream").css('height',tempnum3 + "px");
    		$("#power > img").css('height',tempnum3 + "px");
    		
    		tempnum3 = tempnum2 * 0.3887;
    		again = tempnum3 * 0.178;
    		$("h1").css('height',again + "px");
    		again = again * 0.5;
    		$("h1").css('font-size',again + "px");
    		again = tempnum3 * 0.274;
    		$("#lower").css('height',tempnum3 + "px");
    		$("#lower > div").css('width','32.5%');
    		$("#lower > div").css('height',again + "px");
    		again = again * 0.3;
    		$("#lower > div > p").css('margin-top',again + "px");
    		$(".diff > img").css('margin-top',again + "px");
    		again = tempnum3 * 0.32;
    		again = again * 0.2;
    		$("#lower > div").css('font-size',again + "px");
    		
    	}
	}
	
    
	if(isrunning){
	  	var temp = $('#sec').val();
		var tempnum = parseInt(temp);
		if(!tempnum){
			tempnum = 0;
		}else if (tempnum > 59){
			tempnum = 59;
			$('#sec').val(tempnum);
		}
		var temp2 = $('#min').val();
		var tempnum2 = parseInt(temp2);
		if(!tempnum2){
			tempnum2 = 0;
		}
		$('#min').val(tempnum2);
		if (tempnum > 0){
			tempnum = tempnum - 1;
			if (tempnum < 10){
				temp = "0"+tempnum;
				$('#sec').val(temp);
				return;
			}
			$('#sec').val(tempnum);
		}else if (tempnum2 > 0){
			tempnum2 = tempnum2 -1;
			$('#min').val(tempnum2);
			$('#sec').val("59");
		}else{
			$('#startstop').text("Start");
			isrunning = false;
			$('#startstop').css("color","#7cb342");
			$('#power').css("display","block");
			$('#stream').css("display","none");
			stopui();
		}
	}
}, 1000);

function startui(){
	$("#streambox").insertBefore("#controls");
	$('#popcorn').css("background-image",'url("images/popcorn_gray.png")');
	$('#lower').css('display','none');
	var temp = minheight * 0.45;
	$('#stream').css('height', temp + "px");
}
function stopui(){
	$("#streambox").insertAfter("#controls");
	$('#lower').css('display','block');
}

function dothething(){
	
};
// function stam(){
	// console.log("pressed");
	// alert("pressed");
// };
