/**
 * @authors GHFHAIFENG
 * @date    2018-02-17 21:07:00
 * @version 0.2.0
 */

!(function(window) {
	'use strict';

	var $header = $('#header'),
        $checkBox = $('#check-box'),
        $loginBtn = $('#login_btn'),
        $navTabs = $('.nav-tabs'),
        $findPwd = $("#find_pwd");

	var $backToTop = $('#backToTop');

	var sui = {
		// 初始化
		init: function() {
			sui.bindEvent();
			sui.valid();
			$('[data-toggle="tip"]').tip();
			$('[data-toggle="alert"]').alert();
			sui.page('#page');
			prettyPrint();
		},

		//事件绑定
		bindEvent: function() {
			$header.find('.nav a').click(function() {
				var _id = $(this).attr('data-id'),
					T = $('#' + _id).offset().top;

				$('body,html')
					.stop()
					.animate(
						{
							scrollTop: T - 15
						},
						500,
						'linear',
						function() {
							// $('#navbar').removeClass('in');
						}
					);
			});

			/**
			 * 登录
			 */
			$loginBtn.click(function(event) {
				if ($('#login_form').valid()) {
					console.log($('#login_form').serialize());
				}
			});

            /**
             * Tab 选择
             */
            $navTabs.find("li").click(function(event){
                event.preventDefault();
                if ($(this).attr("class") == "active") {
                    return;
                } else {
                    $(this).parent().parent().next("div").find("div").removeClass("active");
	                $(this).parent().find("li").removeClass("active");
                    $(this).addClass("active");
                    $($(this).find("a").attr("name")).addClass("active");
                }
            });

			/**
			 * 忘记密码
			 */
			$findPwd.click(function(event) {
                $("#login").slideUp();
				$("#find_pwd_form").slideDown();
			});

            /** 
             * 返回登录
            */
            $("#go_login").click(function(){
                $("#login").slideDown();
				$("#find_pwd_form").slideUp();
            });

			/**
			 * 复选框
			 */
			$checkBox.on('click', 'a', function(event) {
				var $this = $(this),
					color = $this.data('color');

				$checkBox.find('label').each(function(index, el) {
					$(el)
						.removeClass(
							'box-primary box-success box-warning box-danger  box-violet box-black box-grey'
						)
						.addClass(color);
				});
			});

			//弹窗
			var modal = null;
			$('#dialog-btn').click(function(event) {
                var _html = '<div >您觉的sui好用吗？</div>';
				modal = new Modal({
					id: 'modal1',
					type: 0,
					title: '提示',
					content: _html,
					complete: function() {},
					confirm: function() {
						new Modal({
							id: 'modal2',
							title: '提示',
							content: '感谢您的支持！',

							confirm: function() {
								this.hide();
							}
						});
					},
					cancel: function() {
						new Modal({
							id: 'modal3',
							type: '1',
							content: '取消成功',
							cancelButton: false,
							confirm: function() {
								this.hide();
							}
						});
					}
				});
			});

			//滚动文档
			$(window).on('scroll', function(event) {
				var scrollTopVal = $(window).scrollTop();
				if (scrollTopVal > 200) {
					$backToTop.addClass('in');
				} else {
					$backToTop.removeClass('in');
				}
			});

			//回到顶部
			$backToTop.click(function(event) {
				$('body,html')
					.stop()
					.animate(
						{
							scrollTop: 0
						},
						500,
						'linear',
						function() {}
					);
			});

			$('body').click(function(event) {
				$('#tip1').tip('hide');
			});
		},

		//表单验证
		valid: function() {
			$('#login-form').validate({
				rules: {
					user: 'required',
					password: {
						required: true,
						minlength: 6
					}
				},
				messages: {
					user: '不能为空',
					password: '密码至少6位数以上'
				}
			});
		},

		// 分页
		page: function(element) {
			$(element).page({
				pageCount: 26,
				current: 1,
				showNum: 10,
				callback: function(tPage) {
					console.log(tPage);
				}
			});
		}
	};

	window.sui = sui.init;
})(this);
