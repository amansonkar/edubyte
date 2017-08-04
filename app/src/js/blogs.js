function auth_page() {
  window.location.href = '/authentication';
}

function blog_full() {
  window.location.href = '/blog';
}

var blg = document.getElementById('child');
window.onload = function () {
  var fetchblogs = new XMLHttpRequest();
  var blogs_all;
  var blg = document.getElementById('child');
  fetchblogs.onreadystatechange = function () {
    if (fetchblogs.readyState === XMLHttpRequest.DONE) {

      if (fetchblogs.status === 200) {
        console.log(fetchblogs.responseText);
        var items;
        blogs_all=JSON.parse(this.responseText);
        console.log(blogs_all);
        var blog_lst = blogs_all;
        var n = blog_lst.length;

        for(var i=0;i<n;i++){
          var blog_image;
          if(blog_lst[i].blog_catgory){
            blog_image= image;
          }
          items+="<div class='item'>"+
            "<div class='ui small image'>"+
              "<img src='../img/image.jpg'>"+
            "</div>"+
            "<div class='content'>"+
              "<a class='header' onclick='full_article()'>"+blog_lst[i].blog_title+"</a>"+
              "<div class='meta'>"+
                "<a>"+blog_lst[i].date_created+"</a>"+
                "<a>"+blog_lst[i].blog_category+"</a>"+
              "</div>"+
              "<div class='description'>"+blog_lst[i].blog_content.slice(0,150)+
              "</div>"+
              "<div class='extra'>"+
                "<div class='ui right floated primary button' onclick='blog_full()'>"+
                  "Read more"+
                  "<i class='right chevron icon'></i>"+
                "</div>"+
                "<img src='https://semantic-ui.com/examples/assets/images/wireframe/square-image.png' class='ui circular avatar image'>"+
                 +blog_lst[i].user_id+
              "</div>"+
            "</div>"+
          "</div>"
        }
        blg.innerHTML = items;
      } else {
        console.log(fetchblogs.responseText);
        document.getElementById("blog_loader").className = "hidden";
        blg.innerHTML = 'No more blogs available';
      }
    }
  };

  fetchblogs.open('POST', 'https://data.beehive82.hasura-app.io/v1/query', true);
  fetchblogs.setRequestHeader('Content-type', 'application/json');
  fetchblogs.send(JSON.stringify(
    {
      "type": "select",
      "args": {
        "table": "blogs",
        "columns": ["*"],
        "order_by": ["-date_created"]
      }
    }
  ));
}
