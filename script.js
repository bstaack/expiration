$(function() {
  navigator.serviceWorker && navigator.serviceWorker.register('./sw.js').then(function(registration) {
    });
  var date, data = {}, HTMLlist = [], items = [], html = "";
  Date.prototype.addTime= function(h){
      this.setHours(this.getHours()+h);
      return this;
  }
  // function altColorList(int){
  //   if(int % 2 === 0){
  //     return "list1"
  //   } else {return "list2"}
  // }

  function start(){
    date = new Date(), HTMLlist = [], items = [];

    $('#myUL ul').empty();

    function addItemsList(){
      for (var key in localStorage){
       items.push(key);
      }
    }

    addItemsList();
    items.sort();

    for(i=0; i < localStorage.length; i++){
      HTMLlist.push(JSON.parse(localStorage.getItem(items[i])));
    }

    function populateList(el, type, time, category){

      html = "<li class=" + category + "><p><span id='" + el.item.substring(0, 4) + "'><a>" + el.item + "</a></span><span class='time'>" + type + "</span></p><button class='delete fa fa-minus' id='" + el.item + "'></button></li>";

      let selector = "#" + category;

      $(selector).append(html);

    };

    HTMLlist.map(function(el){
      let type, time, category = el.category;

      if( el.type == "days" ){
        type = date.addTime(el.length * 24).toString('MM-d dddd h:mm tt');
        time = false;
      } else {
        type = date.addTime(el.length).toString('MM-d dddd h:mm tt');
        time = true;
      }

      populateList(el, type, time, category);
      date = new Date();
    })
  };
////////////////////////end of start ////////////////////////

  $("form").on("submit", function(event) {
    event.preventDefault();
    let item = $("#item").val(), length = $("#length").val(), selectedVal, selected = $("#radioDiv input[type='radio']:checked"), category = $("#category option:selected").val();

    if (selected.length > 0) {
      selectedVal = selected.val();
    }
    data = {item: item, length: Number(length), type: selectedVal, category: category};
    localStorage.setItem(item, JSON.stringify(data));

    clearInterval(startTimes);
    timer();

    $('#item, #length').val('');
  });

  function timer() {
    start();
    startTimes = setInterval(start, 90000);
  }

  timer();

  $(document).on('click', '.delete', function(event){
    event.preventDefault();
    localStorage.removeItem(this.id);

    clearInterval(startTimes);
    timer();
  });

  $('#edit').click(function(){
    $('.delete').toggle();
  })


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var modal = document.getElementById('myModal');
var btn = document.getElementById("addItems");
btn.onclick = function() {
    modal.style.display = "block";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}








});
