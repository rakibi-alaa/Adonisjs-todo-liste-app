document.addEventListener('DOMContentLoaded', function() {
    var modalelems = document.querySelectorAll('.modal');
    var selectelems = document.querySelectorAll('select');
    var dateelems = document.querySelectorAll('.datepicker');
    var modalinstances = M.Modal.init(modalelems,{});
    var selectinstances = M.FormSelect.init(selectelems, {});
    let initialDate = dateelems[0] ? dateelems[0].getAttribute('data-initialDate') : null;
    initialDate ? initialDate = new Date(initialDate) : null;
    let today = new Date();
    
    
    var dateinstances = M.Datepicker.init(dateelems, { 
      format : 'mmmm dd, yyyy' , 
      minDate : today > initialDate ? initialDate : today , 
      disableDayFn: function(date) {
        if(date >= today) 
            return false;
        else if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear() && today.getHours() > 9 && today.getHours() < 17)
            return false;
        else
          return true
      },
      defaultDate : initialDate ? initialDate : today,
      setDefaultDate : initialDate ? true : false
    });

});
