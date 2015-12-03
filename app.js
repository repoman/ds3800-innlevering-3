$(document).ready(function(e) {
    $('nav button').on('click', changeSectionClickHandler);
    $('.add-picture-button').on('click', addPictureClickHandler);
    $(".add-thing-button").on("click", addThing);
    $(".delete-all-button").on("click", deleteAll);

    db = localStorage;
    renderThings();
    //db.clear();
});

function changeSectionClickHandler(e) {
    var section = e.target.getAttribute('data-target')
    changeSection(section);
}

function changeSection(sectionName) {
    $('.active').removeClass('active');
    $('.' + sectionName).addClass('active');
}

function addPictureClickHandler(e) {
    var url = $('.add-picture-url').val();
    addPicture(url);
}

function addPicture(url) {
    var html = '<img src="' + url +'" />';
    $('section.pictures img:last').after(html);
    $('.add-picture-url').val('');
}

function addThing() {
  var data = JSON.parse(db.getItem("list"));
  if (data === null) {
    data = {};
  }
  var youtubeId = $('.youtube-id').val();
  var title = $('.title').val();
  var id = new Date().getTime();
  var thing = {
    id: id,
    youtubeId: youtubeId,
    title: title,
    added: new Date()
  };
  data[id] = thing;
  db.setItem("list", JSON.stringify(data));
  renderThings();
}

function renderThings() {
  var data = JSON.parse(db.getItem("list"));
  var html = "";
  for (i in data) {
    html = html.concat("<li><div>" + parseYoutubeId(data[i].youtubeId) + "</div><p>" + data[i].title + "</p><button class='remove-button' data-id=" + i + ">x</button></li>");
  }
  $(".stupid-list").html(html);
  $(".remove-button").on("click", function() {
    removeThing($(this).data("id"));
  });
}

function removeThing(id) {
  var data = JSON.parse(db.getItem("list"));
  delete data[id];
  db.setItem("list", JSON.stringify(data));
  renderThings();
}

function deleteAll() {
  db.clear();
  renderThings();
}

function parseYoutubeId(id) {
  return '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + id + '?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
}
