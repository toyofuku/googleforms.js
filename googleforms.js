
(function($){
	$.fn.googleforms = function(config){
		var div_ss_form = this,
		form_data,
		putFormData = function(html){
			var name = $(html).attr('name');
			var val = $(html).val();
			form_data[name] = val;
		},
		postForm = function(url){
			$.ajax({
				type:"POST",
				url:url,
				data:form_data,
				success:createForm
			});
		},
		createForm = function(data){
			var form = $("form#ss-form",data),
			resp = $("div.ss-custom-resp",data);

			form_data = {};

			$(div_ss_form)
			.empty()
			.append(form[0])
			.append(resp[0]);

			$("input[type=submit]").click(function(){
				putFormData(this);
			});

			$("form#ss-form").submit(function(){
				var form_action = $(this).attr('action');
				$("input[type=text]",this).each(function(){
					putFormData(this);
				});
				$("input[type=hidden]",this).each(function(){
					putFormData(this);
				});
				$(":checked",this).each(function(){
					putFormData(this);
				});
				postForm(form_action);
				return false;
			});	
		};

		$.get(config.url,createForm);
	};
})(jQuery);
