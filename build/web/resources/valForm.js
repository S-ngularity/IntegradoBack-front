var keyAscii = {"0":48, "9":57, ",":44};

var  digitaEvento = function(event)
{
	if(event.keyCode < keyAscii["0"] || event.keyCode > keyAscii["9"])
	{
		if(this.value == "")
		{
			event.preventDefault();
			return;
		}

		if(event.keyCode != keyAscii[","])
		{
			event.preventDefault();
			return;
		}
	}
	console.log(this.value);

	if(this.value == "")
		this.value = "R$ ";
};

var evalEmptyFields = function(form)
{
	var flag = true;
	if(form.valorMin.value == "")
	{
		$("label[for='valorMin']").css('color','red');
		flag = false;
	}
	else
		$("label[for='valorMin']").css('color','#333');

	if(form.valorMax.value == "")
	{
		$("label[for='valorMax']").css('color','red');
		flag = false;
	}
	else
		$("label[for='valorMax']").css('color','#333');

	if(form.dataInicio.value == "")
	{
		$("label[for='dataInicio']").css('color','red');
		flag = false;
	}
	else
		$("label[for='dataInicio']").css('color','#333');

	if(form.dataFim.value == "")
	{
		$("label[for='dataFim']").css('color','red');
		flag = false;
	}
	else
		$("label[for='dataFim']").css('color','#333');

	if(form.cbConsultaVal.value == "empty")
	{
		$("select[for='consultaValor']").css('color', 'red');
		flag = false;
	}
	else
		$("select[for='consultaValor']").css('color','#000');

	if(!flag)
		$("#alerta1").css('visibility', 'visible');
	else
		$("#alerta1").css('visibility', 'hidden');



	return flag;
};

var evalContentFields = function(form)
{
	var regexp = /R\$\s\d+,\d\d/;

	if(regexp.test(form.valorMin.value))
	{
		if(regexp.test(form.valorMax.value))
			return true;
		else
		{
			$("label[for='valorMax']").css('color','orange');
			$("#alerta2").css('visibility', 'visible');
			return false;
		}
	}
	else
	{
		$("label[for='valorMin']").css('color','orange');
		$("#alerta2").css('visibility', 'visible');
		return false;
	}
	
};
var validaValorForm = function(event)
{	
	var form =
        {
                valorMin :  $("#valorMin").get( 0 ),
                valorMax :   $("#valorMax").get( 0 ),
                dataInicio:  $("#dataInicio").get(0),
                dataFim:  $("#dataFim").get(0),
                cbConsultaVal: $("select[for='consultaValor']").get(0),
                submit : function(){$("#formulario").submit();}
          
         };
         
	var flag = true;

	flag = evalEmptyFields(form);


	 if(flag && evalContentFields(form))
         {  
             
             
             form.valorMin.value = form.valorMin.value.substring(3).replace(",",".");
             form.valorMax.value = form.valorMax.value.substring(3).replace(",",".");
             form.submit();
         } 
         else
             event.preventDefault();
};

$(document).ready(function()
{
	$("#valorMin").keypress(digitaEvento.bind($("#valorMin").get( 0 )));
	$("#valorMax").keypress(digitaEvento.bind($("#valorMax").get( 0 )));
	$("#dataInicio").keypress(function(evt){evt.preventDefault();});
	$("#dataFim").keypress(function(evt){evt.preventDefault();});
	$("button").click(validaValorForm);
        
});