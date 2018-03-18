
 $( document ).ready(function() {
 
    $("#MainLoading").show();
    $('#result').hide(); 






/*
* InitWeather 
* This is Initiate Function to get Egypt Weather Information from  http://api.openweathermap.org 
* @param string  city .
* @param string  country .
* @return Json
*/

 var InitWeather= function(city=null,country=null){
    var Param ;
    if(city != null && country != null ){
          Param =   city +','+ country;
        //Fixed Dropdwn City Name...City begin with El 
        Param = Param.replace(/^El+/, '');
    } else {
      Param = 'cairo,egypt';
    }
    
    $.ajax({
        url: EndPoint_Weather,
        method: "GET",
        data: { q: Param, APPID: APIKey_Weather,lang:Language ,units:Units},
        dataType:'json',
        success: function (data, status, xhr) {
         //   console.log(data)
        $("#cname1").html(data.name);
        $("#temp").html(data.main.temp);
        $("#img1").attr('src','http://openweathermap.org/img/w/'+data.weather[0].icon+'.png');
        $("#wstatus").html(data.weather[0].description);
        $("#wname").html(data.name);
        
        },
        complete:function(){
            $("#MainLoading").slideUp(1000);
        },
        error: function (jqXhr, textStatus, errorMessage) {
            swal("حالة الطقس", "معلومات الطقس لهذة المدينة غير متوفرة", "info",{className:'FontNormal'});
            //console.log('Error' + errorMessage)
        }
    })


 }   

//--------------------------------------------------------------------


/*
* InitPrayer
* This is Initiate Function to get Prayer Times  Egypt  Api http://api.aladhan.com 
* @param string  country_text  Country name.
* @param string  city .
* @return Json
*/

var InitPrayer = function(city=null,country=null) {
  
    
    var Param ;
    if(city != null && country != null ){
          Param =   city +','+ country;
       
         
    } else {
      Param = InitData;
    }

    $.ajax({
        url: EndPoint_Prayer,
        method: "GET",
        data: { address:Param ,method:1},
        dataType:'json',
        success: function (result, status, xhr) {
        // console.log(result.name)
        
        $('#item0').html(convertTime(result.data.timings.Fajr))
        $('#item1').html(convertTime(result.data.timings.Sunset))
        $('#item2').html(convertTime(result.data.timings.Dhuhr))
        $('#item3').html(convertTime(result.data.timings.Asr))
        $('#item4').html(convertTime(result.data.timings.Maghrib))
        $('#item5').html(convertTime(result.data.timings.Isha))
        },
        complete:function(){
            $("#MainLoading").slideUp(1000);
        },
        error: function (jqXhr, textStatus, errorMessage) {
            swal(textStatus, errorMessage, "info",{className:'FontNormal'});
         
        }
    })

    }

//----------------------------------------------------------------------

/*
* getPrayer
* This is Function  get Prayer Times by call Api http://api.aladhan.com 
* @param string  country_text  Country name.
* @param string  city .
* @return Json
*/

var getPrayer = function(country_text,city) {
 console.log(country_text,city)
    var Param =   city +','+ country_text;
  
    
    $.ajax({
        url: EndPoint_Prayer,
        method: "GET",
        data: { address:Param ,method:1},
        dataType:'json',
        cache: false,
        success: function (result, status, xhr) {
      //  console.log(result)
         $('#Citem0').html(convertTime(result.data.timings.Fajr))
        $('#Citem1').html(convertTime(result.data.timings.Sunset))
        $('#Citem2').html(convertTime(result.data.timings.Dhuhr))
        $('#Citem3').html(convertTime(result.data.timings.Asr))
        $('#Citem4').html(convertTime(result.data.timings.Maghrib))
        $('#Citem5').html(convertTime(result.data.timings.Isha))
        },
        complete:function(){
            $("#Loading").hide();
            $("#result").show(1000);
        },
        error: function (jqXhr, textStatus, errorMessage) {
            swal(textStatus, errorMessage, "info",{className:'FontNormal'});
           
        }
    })

    }

//--------------------------------------------------------------------------

/*
* getWeather 
* This is Function get  Weather Information from  http://api.openweathermap.org 
* @param string  city .
* @param string  country .
* @return Json
*/

var getWeather = function(city,country){
  var Param =  city + ',' + country;
  //Fixed Dropdwn City Name...City begin with El 
  Param = Param.replace(/^El+/, '');
 // Param = Param.replace(/\s/g,'');  
   console.log(Param)
    $.ajax({
        url: EndPoint_Weather,
        method: "GET",
        data: { q: Param.toLowerCase(), APPID: APIKey_Weather,lang:Language ,units:Units},
        dataType:'json',
        success: function (data, status, xhr) {
            console.log(data)
        $("#Ctemp").html(data.main.temp);
        $("#Cimg1").attr('src','http://openweathermap.org/img/w/'+data.weather[0].icon+'.png');
        $("#Cwstatus").html(data.weather[0].description);
        $("#Cwname").html(data.name);

        },
        complete:function(){
            $("#Loading").hide();
            $("#result").show(1000);
        },
        error: function (jqXhr, textStatus, errorMessage) {
            swal("حالة الطقس", "معلومات الطقس لهذة المدينة غير متوفرة", "info",{className:'FontNormal'});
           // console.log('Error' + errorMessage)
           $("#result").hide();
        }
    })


 }  

//-------------------------------------------------------------------------

/*
* convertTime 
* This is helper Function  to Convert Time AM/PM
* @param string  Time 
* @return String
*/

var convertTime =  function (time24){
    var tmpArr = time24.split(':'), time12;
    if(+tmpArr[0] == 12) {
    time12 = tmpArr[0] + ':' + tmpArr[1] + ' PM';
    } else {
    if(+tmpArr[0] == 00) {
    time12 = '12:' + tmpArr[1] + ' AM';
    } else {
    if(+tmpArr[0] > 12) {
    time12 = (+tmpArr[0]-12) + ':' + tmpArr[1] + ' PM';
    } else {
    time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' AM';
    }
    }
    }
    return time12;
    }


//--------------------------------------------------------------------------- 

InitWeather();
InitPrayer();
//-------------------------------------------------------------------------


$(document).on('click','#doRequest',function(e){
    $("#Loading").show();
var country_val   =  $('select[name=country_selected]').val();
var country_text  = $( "#country_selected option:selected" ).text();
var city          = $('select[id=one]').val();

//Call Function
getWeather(city,country_val)
getPrayer(country_text , city);

 


})

//--------------------------------------------------------------
$(document).on('click','#LocalRequest',function(e){
    $("#MainLoading").show();

    var country_val  = 'eg';
    var country_text = 'egypt'

    var city = $('select[id=cs]').val();

    //Call Function
    InitWeather(city,country_text);
    InitPrayer(city,country_text );
})


















//end jquery
});








 
