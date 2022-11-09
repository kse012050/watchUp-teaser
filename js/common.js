$(document).ready(function(){
    
    // 풀페이지
    fullPage();

    // 홈 애니메이션
    homeAnimate()

    // 화면 고정 텍스트
    fixedText()

    // 멤버쉽
    membership();

    // 쇼룸 슬라이더
    showSlider();

    // 예약 
    reservationEvent();
    
});


// 풀페이지
function fullPage(){
    let delta;
    let fullIdx = 0;
    let moveTop = 0;
    let fullSelector = $('.fullPage > *');
    // 총 페이저 수
    $('header .bottomArea div span').html('0' + fullSelector.length)

    // 모바일인 경우
    $('.fullPage').children().height($(window).height())
    if (/Mobi|Android/i.test(navigator.userAgent)) {
    }

    // 마우스 휠 이벤트
    fullSelector.on('mousewheel DOMMouseScroll',function(e){
        // mousewheel 크롬 엣지 , DOMMouseScroll 파이어폭스
        if($('.fullPage').is(':animated')) return;
        
        // 크롬 , 엣지
        delta = e.originalEvent.wheelDelta;
        // 파이어폭스
        if(delta === undefined){
            delta = -(e.originalEvent.detail);
        }

        fullPage($(this),e , delta)
    });
    // 마우스 휠 이벤트 fin


    // 터치 이벤트
    let touchValue = {
        startX : 0,
        startY : 0,
        endX : 0,
        endY : 0
    }

    fullSelector.on('touchstart',function(e){
        touchValue.startX = e.changedTouches[0].clientX;
        touchValue.startY = e.changedTouches[0].clientY;
    });
    
    fullSelector.on('touchend',function(e){
        if($('.fullPage').is(':animated')) return;
        touchValue.endX = e.changedTouches[0].clientX;
        touchValue.endY = e.changedTouches[0].clientY;
        if(Math.abs(touchValue.startY - touchValue.endY) > Math.abs(touchValue.startX - touchValue.endX)){
            if(touchValue.startY - touchValue.endY < 0){
                delta = 120;
            }else{
                delta = -120;
            }
        }else{
            return;
        }
        
        fullPage($(this),e , delta)
    })
    // 터치 이벤트 fin

    // 브라우저 사이즈 쭐였을 때
    $(window).resize(function(){
        $('.fullPage').children().height($(window).height())
        $('.fullPage').stop().css('top' ,$(window).height() * -fullIdx)
        moveTop = parseInt($('.fullPage').css('top'));
    }) // 브라우저 사이즈 쭐였을 때
    
    // 풀페이지 이벤트
    function fullPage(target,e , delta){
        if(delta > 0){
            // 위로
            if(target.prev().position()){
                fullIdx = target.index() - 1;
                if(fullIdx == 0){
                    $('body').removeClass('overflowHidden');
                }
                moveTop = -(target.prev().position().top)
            }
        }else{
            if(target.next().position()){
                $('body').addClass('overflowHidden');
                moveTop = -(target.next().position().top)
                fullIdx = target.index() + 1;
            }
        }

        if((target.prev().position()) || (target.next().position())){
            $('header .bottomArea mark').html('0'+ (fullIdx + 1))
            $('.fullPage').stop().animate({top : moveTop})

            if(fullSelector.length == fullIdx + 1){
                $('.fixedText').fadeOut();
            }else{
                $('.fixedText').fadeIn();
            }
        }
    }   // 풀페이지 이벤트

    // 상단 이동 버튼
    $('.topMove').click(function(){
        fullIdx = 0;
        $('header .bottomArea mark').html('0'+ (fullIdx + 1))
        $('.fullPage').stop().animate({top : 0})
    })

}   // 풀페이지


// 홈 애니메이션
function homeAnimate(){
    setTimeout(()=>{
        $('.homeArea p.firstText').addClass('step1')
    }, 500)
    setTimeout(()=>{
        $('.homeArea p.firstText').addClass('step2')
    }, 1800)
    setTimeout(()=>{
        $('.homeArea div.homeBG').addClass('active')
    },2700)
    setTimeout(()=>{
        $('.homeArea div.secondText p').addClass('step1')
    },4300)
    setTimeout(()=>{
        $('.fixedText').fadeIn().css('display','flex');
    },5500)
} //홈 애니메이션



// 화면 고정 텍스트
function fixedText(){
    let textLength = $('.fixedText mark').text().length;
    let test = $('.fixedText mark').text().replace(/\S/g,"<span>$&</span>");
    $('.fixedText mark').html(test)

    function fixedTextResponsive(){
        $('.fixedText mark span').each(function(i){
          /*   if($(window).width() > 1280){
                // PC
                $(this).css('transform','rotate('+i * (360 / textLength)+'deg) translateY(60px)')
            }else  */if($(window).width() > 720){
                // 테블릿
                $(this).css('transform','rotate('+i * (360 / textLength)+'deg) translateY(60px)')
                $(this).css('transform','rotate('+i * (360 / (textLength))+'deg) translateY(-80px)')
            }else{
                // 모바일
                $(this).css('transform','rotate('+i * (360 / textLength)+'deg) translateY(35px)')
                // $(this).css('transform','rotate('+i * (360 / textLength)+'deg) translateY(-55px)')
            }
        })
    }

    fixedTextResponsive();
    $(window).resize(function(){
        fixedTextResponsive();
    })

    $('.fixedText').click(function(){
        fullIdx = ($('.fullPage > *').length - 1);
        $('header .bottomArea mark').html('0'+ (fullIdx + 1))
        $('.fullPage').stop().animate({top : -fullIdx * $(window).height()})
    })
}   // 화면 고정 텍스트


// 쇼룸
function showSlider(){
    var showSwiper;

    function swiperCreate(){
        showSwiper = new Swiper(".showSwiper .swiper", {
            // spaceBetween: $(window).width() * 0.1171875,
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
            navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            },
        });
    }

    swiperCreate();
    $(window).resize(function(){
        // swiperCreate();
    })
}  // 쇼룸 


// 멤버쉽
function membership(){
    $('.membershipArea li').hover(function(){
        $('.membershipArea li').removeClass('active');
        $('.membershipArea li').children('p').stop().slideUp();
        $(this).children('p').stop().slideDown();
        $(this).addClass('active')
    })
    $('.membershipArea li').on('touchend',function(e){
        e.stopPropagation();
    })
}   // 멤버쉽


// 예약
function reservationEvent(){
    // 팝업을 나올 때 스크롤 이벤트 막기
    $('[data-popupName="second"]').on('mousewheel DOMMouseScroll',function(e){
        e.stopPropagation();
    })
    $('[data-popupName="second"]').on('touchend',function(e){
        e.stopPropagation();
    })

    $('[data-open="second"]').on('touchend',function(e){
        e.stopPropagation();
    })

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
}   // 예약