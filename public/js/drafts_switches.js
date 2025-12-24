/* Switch Languages */
$(document).ready(function(){

  // By default
  $('.en_lang').addClass("active-lang");
  $('#lang-switch .en').addClass("active-flag");
  
  // Function switch
  $(function() {
    // French button
    $("#lang-switch .kor").click(function() {
      // Enable French
      $('.kor_lang').addClass("active-lang"); 
      
      // Disable English
      $('.en_lang').removeClass("active-lang") 
      
      // Active or remove the opacity on the flags.
      $('#lang-switch .kor').addClass("active-flag");
      $('#lang-switch .en').removeClass("active-flag");
    });
    
    // English button
    $("#lang-switch .en").click(function() {
      
      // Enable English
      $('.en_lang').addClass("active-lang");
      
      // Disable French
      $('.kor_lang').removeClass("active-lang")
      
      // Active or remove the opacity on the flags.
      $('#lang-switch .en').addClass("active-flag");
      $('#lang-switch .kor').removeClass("active-flag");
    });
  });
});

/* Switch Portfolio */
$(document).ready(function(){
  
  // By default
  $('.port_home').addClass("active-port");
  $('#port-switch .hm').addClass("active-port-flag");
  
  // Function switches
  $(function() {
    // Home button
    $("#port-switch .hm").click(function() {
      // Enable UXUI
      $('.port_home').addClass("active-port"); 
      
      // Disable branding and graphic
      $('.port_uxui').removeClass("active-port");
      $('.port_branding').removeClass("active-port");
      $('.port_graphic').removeClass("active-port");
      
      // Active or remove the opacity on the flags.
      $('#port-switch .hm').addClass("active-port-flag");

      $('#port-switch .uxui').removeClass("active-port-flag");
      $('#port-switch .br').removeClass("active-port-flag");
      $('#port-switch .gr').removeClass("active-port-flag");
    });

    // UXUI button
    $("#port-switch .uxui").click(function() {
      // Enable UXUI
      $('.port_uxui').addClass("active-port");

      // AOS enabling (UXUI)
      $(document).ready(function() {
        $('.feature-port-section').attr({
            "data-aos": "flip-down",
            "data-aos-duration": "800"
        });
      
        $('.feature-port-section-reverse').attr({
          "data-aos": "flip-up",
          "data-aos-duration": "800"
        });
      
        setTimeout(() => {
            AOS.init(); 
        }, 100);
      });
      
      // Disable branding and graphic
      $('.port_home').removeClass("active-port");
      $('.port_branding').removeClass("active-port");
      $('.port_graphic').removeClass("active-port");
      
      // Active or remove the opacity on the flags.
      $('#port-switch .uxui').addClass("active-port-flag");

      $('#port-switch .hm').removeClass("active-port-flag");
      $('#port-switch .br').removeClass("active-port-flag");
      $('#port-switch .gr').removeClass("active-port-flag");
    });
    
    // Branding button
    $("#port-switch .br").click(function() {
      
      // Enable Branding
      $('.port_branding').addClass("active-port");

      // AOS enabling (Branding)
      $(document).ready(function() {
        $('.feature-port-section').attr({
            "data-aos": "flip-down",
            "data-aos-duration": "800"
        });
      
        $('.feature-port-section-reverse').attr({
          "data-aos": "flip-up",
          "data-aos-duration": "800"
        });
      
        setTimeout(() => {
            AOS.init(); 
        }, 100);
      });
      
      // Disable UXUI / Graphic
      $('.port_home').removeClass("active-port");
      $('.port_uxui').removeClass("active-port");
      $('.port_graphic').removeClass("active-port");
      
      // Active or remove the opacity on the flags.
      $('#port-switch .br').addClass("active-port-flag");

      $('#port-switch .hm').removeClass("active-port-flag");
      $('#port-switch .uxui').removeClass("active-port-flag");
      $('#port-switch .gr').removeClass("active-port-flag");
    });

    // Graphic button
    $("#port-switch .gr").click(function() {
      
      // Enable Graphic
      $('.port_graphic').addClass("active-port");

      // AOS enabling (Graphic)
      $(document).ready(function() {
        $('.feature-port-section').attr({
            "data-aos": "flip-down",
            "data-aos-duration": "800"
        });
      
        $('.feature-port-section-reverse').attr({
          "data-aos": "flip-up",
          "data-aos-duration": "800"
        });
      
        setTimeout(() => {
            AOS.init(); 
        }, 100);
      });
      
      // Disable UXUI / Graphic
      $('.port_home').removeClass("active-port");
      $('.port_uxui').removeClass("active-port");
      $('.port_branding').removeClass("active-port");
      
      // Active or remove the opacity on the flags.
      $('#port-switch .gr').addClass("active-port-flag");

      $('#port-switch .hm').removeClass("active-port-flag");
      $('#port-switch .uxui').removeClass("active-port-flag");
      $('#port-switch .br').removeClass("active-port-flag");
    });
  });
});

/* Switch Project Details (Overview / Tasks / Purpose) */
$(document).ready(function(){
  
  // By default
  $('.project_overview').addClass("active-project");
  $('#project-intro-switch .ov').addClass("active-project-flag");
  
  // Function switches
  $(function() {
    // Home button
    $("#project-intro-switch .ov").click(function() {
      // Enable Overview
      $('.project_overview').addClass("active-project"); 
      
      // Disable Tasks Box
      $('.project_tasks').removeClass("active-project");
      $('.project_purpose').removeClass("active-project");
      
      // Active or remove the opacity on the flags.
      $('#project-intro-switch .ov').addClass("active-project-flag");
      $('#project-intro-switch .tasks').removeClass("active-project-flag");
      $('#project-intro-switch .purpose').removeClass("active-project-flag");
    });

    // Purpose button
    $("#project-intro-switch .purpose").click(function() {
      // Enable Purpose Button
      $('.project_purpose').addClass("active-project");

      // AOS enabling (Purpose)
      $(document).ready(function() {
        $('.project-aos-flip-up').attr({
            "data-aos": "fade-up",
            "data-aos-duration": "1200"
        });
      
        setTimeout(() => {
            AOS.init(); 
        }, 100);
      });
      
      // Disable branding and graphic
      $('.project_overview').removeClass("active-project");
      $('.project_tasks').removeClass("active-project");
      
      // Active or remove the opacity on the flags.
      $('#project-intro-switch .purpose').addClass("active-project-flag");
      $('#project-intro-switch .ov').removeClass("active-project-flag");
      $('#project-intro-switch .tasks').removeClass("active-project-flag");
    });

    // Tasks button
    $("#project-intro-switch .tasks").click(function() {
      // Enable UXUI
      $('.project_tasks').addClass("active-project");

      // AOS enabling (Tasks)
      $(document).ready(function() {
        $('.project-aos-flip-up').attr({
            "data-aos": "fade-up",
            "data-aos-duration": "1200"
        });
      
        setTimeout(() => {
            AOS.init(); 
        }, 100);
      });
      
      // Disable branding and graphic
      $('.project_overview').removeClass("active-project");
      $('.project_purpose').removeClass("active-project");
      
      // Active or remove the opacity on the flags.
      $('#project-intro-switch .tasks').addClass("active-project-flag");
      $('#project-intro-switch .ov').removeClass("active-project-flag");
      $('#project-intro-switch .purpose').removeClass("active-project-flag");
    });
  });
});

/* Switch Project Drafts */
$(document).ready(function(){
  
  // By default
  $('.project_final_draft').addClass("active-draft");
  $('#project-drafts-switch .final-d').addClass("active-draft-flag");
  
  // Function switches
  $(function() {
    // Home (Final Draft) button
    $("#project-drafts-switch .final-d").click(function() {
      
      // Enable Final Draft
      $('.project_final_draft').addClass("active-draft"); 
      
      // Disable the others
      $('.project_first_draft').removeClass("active-draft");
      $('.project_second_draft').removeClass("active-draft");
      
      // Active or remove the opacity on the flags.
      $('#project-drafts-switch .final-d').addClass("active-draft-flag");

      $('#project-drafts-switch .first-d').removeClass("active-draft-flag");
      $('#project-drafts-switch .second-d').removeClass("active-draft-flag");

      // AOS enabling (Purpose)
      $(document).ready(function() {
        $('.port-dw-ma-process-p-textbox').attr({
            "data-aos": "fade-up",
            "data-aos-duration": "1200"
        });
      
        setTimeout(() => {
            AOS.init(); 
        }, 100);
      });
    });

    // First Draft button
    $("#project-drafts-switch .first-d").click(function() {
      // Enable First Draft
      $('.project_first_draft').addClass("active-draft");
      
      // Disable branding and graphic
      $('.project_final_draft').removeClass("active-draft");
      $('.project_second_draft').removeClass("active-draft");
      
      // Active or remove the opacity on the flags.
      $('#project-drafts-switch .first-d').addClass("active-draft-flag");

      $('#project-drafts-switch .final-d').removeClass("active-draft-flag");
      $('#project-drafts-switch .second-d').removeClass("active-draft-flag");

      $(document).ready(function() {
        $('.port-dw-ma-process-p-textbox').attr({
            "data-aos": "fade-up",
            "data-aos-duration": "1200"
        });
      
        setTimeout(() => {
            AOS.init(); 
        }, 100);
      });
    });
    
    // Second Draft button
    $("#project-drafts-switch .second-d").click(function() {
      
      // Enable Second Draft
      $('.project_second_draft').addClass("active-draft");
      
      // Disable The others
      $('.project_final_draft').removeClass("active-draft");
      $('.project_first_draft').removeClass("active-draft");
      
      // Active or remove the opacity on the flags.
      $('#project-drafts-switch .second-d').addClass("active-draft-flag");

      $('#project-drafts-switch .final-d').removeClass("active-draft-flag");
      $('#project-drafts-switch .first-d').removeClass("active-draft-flag");

      $(document).ready(function() {
        $('.port-dw-ma-process-p-textbox').attr({
            "data-aos": "fade-up",
            "data-aos-duration": "1200"
        });
      
        setTimeout(() => {
            AOS.init(); 
        }, 100);
      });
    });
  });
});