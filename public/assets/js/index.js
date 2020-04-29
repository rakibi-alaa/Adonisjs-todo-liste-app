document.addEventListener('DOMContentLoaded', function() {
    var modalelems = document.querySelectorAll('.modal');
    var selectelems = document.querySelectorAll('select');
    var dateelems = document.querySelectorAll('.datepicker');
    var modalinstances = M.Modal.init(modalelems,{});
    var selectinstances = M.FormSelect.init(selectelems, {});
    var dateinstances = M.Datepicker.init(dateelems, { format : 'mmmm dd, yyyy' , minDate : new Date()});
  });
