
// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.

document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("f7ed77fb-0f7b-4c23-b5ae-65c06ec39379")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
}, false);

$(document).ready(function(){
	var url="http://razverlz.beget.tech/web_app/auth.php?callback=?";


    //Login Function
    $("#aut").click(function(){

    	var email=$("#login").val();
    	var password=$("#password").val();
    	var dataString="email="+email+"&password="+password+"&login=";
    	if($.trim(email).length>0 & $.trim(password).length>0)
		{
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#aut").html('Вход...');},
				success: function(data){
					var json = JSON.parse(data);
					if(json['resp'] == "success")
					{
						localStorage.login="true";
						localStorage.email=email;
						localStorage.user_id=json['uid'];
						window.location.href = "index.html";
					}
					else if(json['resp'] = "failed")
					{
						alert("Неверный логин или пароль");
						$("#aut").html('Войти');
					}
				}
			});
		}return false;

    });



    $("#go_task").click(function(){

    	var id_t=$("#id_t").val();
    	var u_id=localStorage.user_id;


    	var dataString="id_t="+id_t+"&u_id="+u_id+"&go_task=";

			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#go_task").html('Подождите...');},
				success: function(data){
					//var json = JSON.parse(data);
					if(data == "success")
					{
						console.log('success');
						$('#hidden_info').css('display','block');
						$("#go_task").html('Завершить заказ');
					}
					else if(data = "ended")
					{
						console.log('ended');
						alert('Вы завершили заказ!');
						$("#go_task").html('Заказ выполнен');
					}
				}
			});


    });

    //logout function
    $("#logout").click(function(){
    	localStorage.login="false";
    	localStorage.removeItem('user_id');
    	localStorage.removeItem('email');
    	window.location.href = "login.html";
    });

});