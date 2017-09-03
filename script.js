var date = new Date(), data = {}, HTMLlist = [], items = [], justDay = "MM-DD DAY", dayAndTime = "MM-DD-YYYY DAY H M ", justTime = "H M", html = "";
function minutes(){
  if(date.getMinutes()<10){
    return "0"+ date.getMinutes();
  } else {return date.getMinutes();}
}
function addHours(hours, add, mins){
  hour = hours + add;
  if (hour == 24){
    return "12:" + minutes() + " am";
  } else if(hour > 24){
    return hour - 24 + ":" + minutes() + " am";
  } else if (hour > 12){
      return hour - 12 + ":" + minutes() + " pm";
    } else {return hour + ":" + minutes() + " am";}
}
Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}
function dateConvert(dateobj){
  var year = dateobj.getFullYear();
  var month= ("0" + (dateobj.getMonth()+1)).slice(-2);
  var date = ("0" + dateobj.getDate()).slice(-2);
  var day = dateobj.getDay();
  var months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  var dates = ["sun","mon","tue","wed","thu","fri","sat"];

  return months[parseInt(month)-1] + "-" + date + " " + dates[parseInt(day)];

}
function altColorList(int){
  if(int % 2 === 0){
    return "list1"
  } else {return "list2"}
}

function start(){
  date = new Date();
  HTMLlist = []; items = [];
  $('ul').empty();

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

  function populateList(el, type, time){

    html = "<li class=" + altColorList(HTMLlist.indexOf(el)) + "><p><span id='" + el.item.substring(0, 4) + "'>" + el.item + "</span> <span class='time'>" + type + "</span></p><button class='delete fa fa-minus' id='" + el.item + "'></button></li>";

    $('ul').append(html);
  };

  HTMLlist.map(function(el){
    let type, time;

    if( el.type == "days" ){
      type = dateConvert(date.addDays( el.length ));
      time = false;
    } else {
      type = addHours(date.getHours(), el.length, date.getMinutes());
      time = true;
    }

    populateList(el, type, time);
  })

}; //end of start

$("form").on("submit", function(event) {
  event.preventDefault();
  let item = $("#item").val(), length = $("#length").val(), selectedVal, selected = $("#radioDiv input[type='radio']:checked");

  if (selected.length > 0) {
    selectedVal = selected.val();
  }
  data = {item: item, length: Number(length), type: selectedVal};
  localStorage.setItem(item, JSON.stringify(data));

  clearInterval(startTimes);
  timer();

  $('#item, #length').val('');
});

function timer() {
  start();
  startTimes = setInterval(start, 180000);
}

timer();

$(document).on('click', '.delete', function(event){
  event.preventDefault();
  localStorage.removeItem(this.id);

  clearInterval(startTimes);
  timer();
});
