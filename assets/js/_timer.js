$(function(){
	var str_dates=[
	'07.10.2015, 00:00:00.000',
	'07.15.2015, 01:00:00.000',
	'07.10.2012, 00:00:00.000',
	'12.03.2014, 00:00:00.000',
	'12.02.2014, 00:05:00.000',
	'12.02.2014, 22:15:30.000',
	'12.02.2014, 22:16:00.000',
	'12.02.2014, 22:17:00.000',
	'12.02.2014, 22:18:30.000',
	'12.02.2014, 22:19:00.000',
	'07.10.2015, 00:00:00.000'
	]
	var dates=[];	
	OutDate = function (){
		var now = new Date(); 
		var min_date;
		for(i=0;i<str_dates.length;i++){
			dates[i]=new Date(str_dates[i]);
		}
		var min_date;
		var isExistDate=false;
		for(i=0;i<dates.length;i++){
			if(dates[i]>now){min_date=dates[i];isExistDate=true;break;}
		}
		for(i=0;i<dates.length;i++){
			if(dates[i]>now){
				if(dates[i]<min_date){
					min_date=dates[i];
				}
			}
		}
		
		$(".counter .c-m .days").html(getDaysB(now,min_date));
		$(".counter .c-m .hours").html(getHoursB(now,min_date));
		$(".counter .c-m .min").html(getMinutesB(now,min_date));
		$(".counter .c-m .sec").html(getSecondsB(now,min_date));
	}

	setInterval("OutDate()",500);
});
function getDaysB(da,db){
	return Math.floor(Math.abs(da.getTime()-db.getTime())/86400000);
}
function getHoursB(da,db){
	return Math.floor((Math.abs(da.getTime()-db.getTime())-getDaysB(da,db)*86400000)/3600000);
}
function getMinutesB(da,db){
	return Math.floor((Math.abs(da.getTime()-db.getTime())-getDaysB(da,db)*86400000-getHoursB(da,db)*3600000)/60000);
}
function getSecondsB(da,db){
	return Math.floor((Math.abs(da.getTime()-db.getTime())-getDaysB(da,db)*86400000-getHoursB(da,db)*3600000-getMinutesB(da,db)*60000)/1000);
}