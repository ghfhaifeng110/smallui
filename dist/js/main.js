!function(n) {
    "use strict";
    var o = $("#header"),
    i = $("#check-box"),
    t = $("#login-btn"),
    a = $("#backToTop"),
    e = {
        init: function() {
            e.bindEvent(), e.valid(), $('[data-toggle="tip"]').tip(), $('[data-toggle="alert"]').alert(), e.page("#page"), prettyPrint()
        },
        bindEvent: function() {
            o.find(".nav a").click(function() {
                var n = $(this).attr("data-id"),
                    o = $("#" + n).offset().top;
                $("body,html").stop().animate({
                    scrollTop: o - 15
                }, 500, "linear", function() {})
            }), t.click(function(n) {
                $("#login-form").valid() && console.log($("#login-form").serialize())
            }), i.on("click", "a", function(n) {
                var o = $(this),
                    t = o.data("color");
                i.find("label").each(function(n, o) {
                    $(o).removeClass("box-primary box-success box-warning box-danger  box-violet box-black box-grey").addClass(t)
                })
            });
            var e = null;
            $("#dialog-btn").click(function(n) {
                var o = "<div >您觉的SUI好用吗？</div>";
                e = new Modal({
                    id: "modal1",
                    type: 0,
                    title: "提示",
                    content: o,
                    complete: function() {},
                    confirm: function() {
                        new Modal({
                            id: "modal2",
                            title: "提示",
                            content: "感谢您的支持！",
                            confirm: function() {
                                this.hide()
                            }
                        })
                    },
                    cancel: function() {
                        new Modal({
                            id: "modal3",
                            type: "1",
                            content: "取消成功",
                            cancelButton: !1,
                            confirm: function() {
                                this.hide()
                            }
                        })
                    }
                })
            }), $(n).on("scroll", function(o) {
                var i = $(n).scrollTop();
                i > 200 ? a.addClass("in") : a.removeClass("in")
            }), a.click(function(n) {
                $("body,html").stop().animate({
                    scrollTop: 0
                }, 500, "linear", function() {})
            }), $("body").click(function(n) {
                $("#tip1").tip("hide")
            })
        },
        valid: function() {
            $("#login-form").validate({
                rules: {
                    user: "required",
                    password: {
                        required: !0,
                        minlength: 6
                    }
                },
                messages: {
                    user: "不能为空",
                    password: "密码至少6位数以上"
                }
            })
        },
        page: function(n) {
            $(n).page({
                pageCount: 26,
                current: 1,
                showNum: 10,
                callback: function(n) {
                    console.log(n)
                }
            })
        }
    };
    n.sui = e.init
}(this);