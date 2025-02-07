jQuery(document).ready(function(){
    number=0
    $('.span1').click(function(){
        number+=1

        if(number%2==1){
            $(this).addClass('active')
        }
        else{
            $(this).removeClass('active')
        }

    })
    
});