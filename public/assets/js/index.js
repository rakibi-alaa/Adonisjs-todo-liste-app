document.addEventListener('DOMContentLoaded', function() {
    var modalelems = document.querySelectorAll('.modal');
    var selectelems = document.querySelectorAll('select');
    var modalinstances = M.Modal.init(modalelems,{});
    var selectinstances = M.FormSelect.init(selectelems, {});
  });
