$(document).ready(function(){
    // 화면 고정 텍스트
    fixedText()

    // 쇼룸 슬라이더
    showSlider();

    // 예약 
    reservationEvent();

    $('.membershipArea li').hover(function(){
        $('.membershipArea li').removeClass('active');
        $('.membershipArea li').children('p').stop().slideUp();
        $(this).children('p').stop().slideDown();
        $(this).addClass('active')
    })
});

function fixedText(){
    let textLength = $('.fixedText mark').text().length;
    let test = $('.fixedText mark').text().replace(/\S/g,"<span>$&</span>");
    $('.fixedText mark').html(test)
    $('.fixedText mark span').each(function(i){
        $(this).css('transform','rotate('+i * (360 / textLength)+'deg) translateY(60px)')
    })
}

// 쇼룸
function showSlider(){
    var showSwiper = new Swiper(".showSwiper .swiper", {
        spaceBetween: 300,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });
}  // 쇼룸 fin

function reservationEvent(){
    // 팝업
    $('form button').click(function(e){
        e.preventDefault();
    })
    $('[data-open]').click(function(){
        let attrName = $(this).attr('data-open');
        $('[data-popupName="'+attrName+'"]').fadeIn().css('display','flex');
    })
 
    $('[data-close]').click(function(){
        let attrName = $(this).attr('data-close');
        $('[data-popupName="'+attrName+'"]').fadeOut();
        
        if(attrName === 'second'){
            $('[data-popupName]').fadeOut();
        }
    })

    // 핸드폰 번호
    $('#phone').keyup(function(e){
        if(!(this.value >= 0 && this.value <= 99999999999)) {
            phoneBlur();
        }
    })

    function phoneBlur(){
        $('[data-popupName="alert-phone"]').fadeIn();
            // 경고창 띄우기
            $('#phone').val('');
            // 입력값 초기화
            $('#phone').blur();
    }

    // 모두 동의
    $('#allAgree').change(function(){
        $(this).is(':checked') ? $(this).siblings().prop('checked',true) : $(this).siblings().prop('checked',false)
    })

    // submit
    $('[type="submit"]').click(function(e){
        if(!($('#phone').val().length == 11)){
            e.preventDefault();
            phoneBlur();
        }else if(!($('#event').is(':checked') && $('#event').is(':checked'))){
            e.preventDefault();
            $('[data-popupName="alert-entered"]').fadeIn();
        }

    })
}