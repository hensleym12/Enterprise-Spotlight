// Error Messages
var GENERAL_ERROR_TEXT = "Forget Something?",
      RT_ERROR_TEXT = "Numbers Only...",
      errorTextList = [GENERAL_ERROR_TEXT, RT_ERROR_TEXT];

$( document ).ready( function () {
   $("#search").click( function () {
      var searchTermField = $('#searchTerm'),
            input = searchTermField.val() != null ? searchTermField.val().trim() : AlertInvalidText(searchTermField),
            searchURL = $('#searchMode').find(":selected").val();

      NavigateToItem(input, searchURL);
   });

   $("#searchTerm").focus( function () {
      if ($.inArray($('#searchTerm').val(), errorTextList) != -1) {
         $('#searchTerm').val("")
                                 .attr('class', 'valid');

      }
   });

   $("#searchMode").change( function () {
      var selectedText = $('#searchMode').find(":selected").text()
      if (selectedText.indexOf('ID') > -1 || selectedText.indexOf('RT') > -1) {
         $('#search').text('Go To');
      }
      else  {
         $('#search').text('Search');
      }
      $('#searchTerm').focus();
   });

   $("#searchTerm").keypress( function () {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
         $("#search").click();   
         $('#search').focus();
      }
   });

}); // End document ready



function NavigateToItem (searchTerm, destination) {
   if (!ValidSearchTerms(searchTerm, destination)) {
      return;
   }

   if (destination.slice(-1) === '=') {
      window.open(destination + searchTerm);
   }
   else {
      window.open(destination + searchTerm + '/View.aspx');
   }
}



function AlertInvalidText (outputElement, errorText) {
   $('#searchTerm').val(errorText)
                           .attr('class', 'invalid');
}



function ValidSearchTerms(terms, destination) {
   var message = '',
         valid = true;
   if (terms === null || terms === "") {
      message = GENERAL_ERROR_TEXT;
      valid = false;
   }
   else if (isNaN(terms) && destination.indexOf('rt') > 0) {
      message = RT_ERROR_TEXT;
      valid = false;
   }
   else if ($.inArray(terms, errorTextList) != -1) {
      return false;
   }

   if (!valid) {
      AlertInvalidText (terms, message);
      return false;
   }

   return true;
}