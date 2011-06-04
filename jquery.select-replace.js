/*
 * jQuery select replacement
 * http://crgdesign.com.br/blog/
 *
 * Copyright (c) 2009 Carlos Roberto Gomes J�nior
 * 
 * Version: 1.1
 */
(function() {

jQuery.fn.selectreplace = function(options) {

  settings = jQuery.extend({
     width: 188,
     borderSize:0,
     forceZindex:-1,
     float:'none',
     mouseOutClass:'msout',
     mouseOverClass:'msover',
     scrollAfter: 19,
     autoZindex:true,
     lastZindex:200
      }, options);
    
    /* TODO: marcar op��o selecionada como citado em http://www.brainfault.com/2007/07/23/select-box-replacement/ */
    
  return this.each(function(){  
     
     var select_element = $(this);
     
     //alert($(this).children("option[selected]").length);
     if($(this).children("option[selected]").length >0){
      var selected_text = $(this).children("option[selected]").text();
     } else {
      var selected_text = $(this).children("option:first").text();
     }
     
     var select_body = '<div class="selbox"><div class="selected"><a href="#" class="selected-focus">'+selected_text+'</a></div><ul></ul></div>';
          
     select_element.after(select_body).hide();
     
     var select = select_element.next(".selbox");
     var sel_option = select.children(".selected");
     
     if($.browser.msie && $.browser.version <= 6){
       sel_option.height(sel_option.innerHeight());
     } else {
       sel_option.height(sel_option.height());
     }
     
     var ul = select.children("ul");
     
     //select.css({border:"1px solid red"});
     //sel_option.css({border:"1px solid blue"});
     sel_option
     .addClass("msout")
     .hover(function(){
       $(this).addClass("msover").removeClass("msout");
     }, function(){
       $(this).addClass("msout").removeClass("msover");
     })
     .click(function(){
         if( ul.css('display') == 'none' ) {
           // $('.selbox ul').hide();
            ul
            .show()
            .children("li")
            .addClass("m_out")
            .removeClass("m_over")
            .eq(select_element.attr("selectedIndex"))
            .addClass("m_over")
            .removeClass("m_out");
         } else {
            ul.hide();
         }
     });
     
     sel_option.children('.selected-focus').keydown(function(event){
         switch(event.keyCode) {
            case 38: // up
               if( ul.css('display') == 'none' ) {
                  // $('.selbox ul').hide();
                   ul
                   .show()
                   .children("li")
                   .addClass("m_out")
                   .removeClass("m_over")
                   .eq(select_element.attr("selectedIndex"))
                   .addClass("m_over")
                   .removeClass("m_out");
                } else {
                   if(ul.children("li.m_over").prev().length > 0){
                     ul.children("li.m_over").addClass("m_out").removeClass("m_over").prev().addClass("m_over").removeClass("m_out");                     
                   } else {
                     ul.children("li.m_over").addClass("m_out").removeClass("m_over")
                     ul.children("li:last").addClass("m_over").removeClass("m_out");
                   }
                }
               event.preventDefault();
               break;
            case 40: // down
               if( ul.css('display') == 'none' ) {
                  // $('.selbox ul').hide();
                   ul
                   .show()
                   .children("li")
                   .addClass("m_out")
                   .removeClass("m_over")
                   .eq(select_element.attr("selectedIndex"))
                   .addClass("m_over")
                   .removeClass("m_out");
                } else {
                   if(ul.children("li.m_over").next().length > 0){
                     ul.children("li.m_over").addClass("m_out").removeClass("m_over").next().addClass("m_over").removeClass("m_out");
                     
                   } else {
                     ul.children("li.m_over").addClass("m_out").removeClass("m_over")
                     ul.children("li:first").addClass("m_over").removeClass("m_out");
                     window.scrollTo(0,0);
                   }
                }

               break;
            //case 9:  // tab 
            case 13: // return
               ul.children("li.m_over").trigger('click');
               event.preventDefault(); // seems not working in mac !
               break;
            
            case 27: // return
               ul.hide();
               event.preventDefault(); // seems not working in mac !
               break;


            case 9: // return
               ul.hide();
               break;

         }

     });
     
     if($.browser.msie && $.browser.version <= 7){
      sel_option.css({display:'inline-block'});
     }
     
     var list = new Array();
     
     $(this).children().each(function(){
      if(this.nodeName == "OPTION"){
         list.push('<li>'+$(this).text()+'</li>');
      }
     });
     
     function teste (obj) {
        alert('teste');
     }
     
     
     select.css({width:settings.width, float:settings.float});
     


     if(settings.autoZindex){
         var selboxObjects = $('.selbox');
         if(selboxObjects.length > 1) {
            selboxObjects.eq( selboxObjects.length - 1 ).css({zIndex:(settings.lastZindex - (selboxObjects.length - 1) )});
         } else {
           selboxObjects.eq(selboxObjects.length - 1).css({zIndex:settings.lastZindex});
         }
     }

     if(settings.forceZindex >= 0 ){
       select.css({zIndex:settings.forceZindex});
     }

     $("*").not(".selbox").click(function( e ){
       if( !e.target.className.match(/selected/) ) {
         ul.hide(); 
       }
     });
     
     ul
     .css({width:(settings.width - settings.borderSize), visibility:'hidden'})  
     .append(list.join(''));
     
      if(settings.scrollAfter > 0 && ul.find('li').length > settings.scrollAfter ){
         var hsum = 0;
         for(i=0; i < settings.scrollAfter; i++ ){
            hsum += ul.find('li').eq(i).innerHeight()
         }
         ul.addClass('scroll').height(hsum);
      }
      
      ul.css({visibility:'visible'})
      .hide();

     
     ul.children("li").click(function(){
        var index = ul.children().index(this);
        select_element.attr("selectedIndex", index);
        sel_option.children('.selected-focus').text($(this).text());
        ul.hide();
        select_element.trigger("change");
     })
     .css({position:'relative'})
     .hover(function(){
       $(this).addClass("m_over").removeClass("m_out");
     }, function(){
       $(this).addClass("m_out").removeClass("m_over");
     }).blur(function(){ $(this).addClass("m_out").removeClass("m_over"); });
  });
  
};

})(jQuery);