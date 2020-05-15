$(function() {
    $(window).on("load",function() {
        if (document.URL.match("/sales/setting")) {
            $(".sales-inner").show();
            $(".sales-title").addClass("sidebar_active");
            $(".sales-content2").removeClass("content");
            $(".sales-content2").addClass("add-content");
            $(".sales-content2").addClass("sidebar_active");
        } else if (document.URL.match("/sales/")) {
            $(".sales-inner").show();
            $(".sales-title").addClass("sidebar_active");
            $(".sales-content1").removeClass("content");
            $(".sales-content1").addClass("add-content");
            $(".sales-content1").addClass("sidebar_active");
        }

        if (document.URL.match("/clients/")) {
            $(".clients-inner").show();
            $(".clients-title").addClass("sidebar_active");
            $(".clients-content1").removeClass("content");
            $(".clients-content1").addClass("add-content");
            $(".clients-content1").addClass("sidebar_active");
        }

        if (document.URL.match("/partner_companies/")) {
            $(".partner_companies-inner").show();
            $(".partner_companies-title").addClass("sidebar_active");
            $(".partner_companies-content1").removeClass("content");
            $(".partner_companies-content1").addClass("add-content");
            $(".partner_companies-content1").addClass("sidebar_active");
        }

        if (document.URL.match("/constructions/")) {
            $(".constructions-inner").show();
            $(".constructions-title").addClass("sidebar_active");
        }

        if (document.URL.match("/accounting/user")) {
            $(".accounting-inner").show();
            $(".accounting-title").addClass("sidebar_active");
            $(".accounting-content1").removeClass("content");
            $(".accounting-content1").addClass("add-content");
            $(".accounting-content1").addClass("sidebar_active");
        }

        if (document.URL.match("/accounting/employee_groups") || document.URL.match("/accounting/employee_group")) {
            $(".accounting-inner").show();
            $(".accounting-title").addClass("sidebar_active");
            $(".accounting-content2").removeClass("content");
            $(".accounting-content2").addClass("add-content");
            $(".accounting-content2").addClass("sidebar_active");
        }

        if (document.URL.match("/accounting/password_modify") || document.URL.match("/accounting/password_edit")) {
            $(".accounting-inner").show();
            $(".accounting-title").addClass("sidebar_active");
            $(".accounting-content3").removeClass("content");
            $(".accounting-content3").addClass("add-content");
            $(".accounting-content3").addClass("sidebar_active");
        }
    });

    $(".sideBar_accordion p").click(function() {
        $(".sideBar_accordion p").removeClass("sidebar_active");
        if ($(this).hasClass("sidebar_active")) { // クリックされた要素がclickedクラスだったら
            $(this).removeClass("sidebar_active");
        } else {
            $(this).addClass("sidebar_active");
        }

        $(this).next(".sideBar_accordion .inner").slideToggle();
        //クリックされた.accordion2の中のp要素以外の.accordion2の中のp要素に隣接する.accordion2の中の.innerを閉じる
        $(".sideBar_accordion p").not($(this)).next(".sideBar_accordion .inner").slideUp();
    }); 

    $(".inner li").click(function() {
        $(".inner li").removeClass("sidebar_active");
        if ($(this).hasClass("sidebar_active")) { // クリックされた要素がclickedクラスだったら
            $(this).removeClass("sidebar_active");
        } else {
            $(this).addClass("sidebar_active");
        }
    }); 
    
    $(document).ready(function() {
        $(".drawer").drawer();
    });

    var d = $(".wrapper").height();
    // padding内側の高さを設定
    $("#sidebar_wrapper.sideBar").height(d);

});

