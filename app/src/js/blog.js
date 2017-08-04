window.onload = function () {
  var fetchblog = new XMLHttpRequest();
  var blog_full;
  var blg_full = document.getElementById('blog_full');
  fetchblog.onreadystatechange = function () {
    if (fetchblog.readyState === XMLHttpRequest.DONE) {

      if (fetchblog.status === 200) {
        console.log(fetchblog.responseText);
        var items;
        blog_full=JSON.parse(this.responseText);
        console.log(blogs_full);
        var blog_lst = blogs_full;
        var n = blog_lst.length;

        for(var i=0;i<n;i++){
          var blog_image;
          if(blog_lst[i].blog_catgory){
            blog_image= image;
          }
          items+="<div class='item'>"+
            "<div class='ui small image'>"+
              "<img src='../category/"+blog_lst[i].blog_category+".jpg'>"+
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
