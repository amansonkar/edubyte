window.onload = function () {
  var fetchblog = new XMLHttpRequest();
  var blog_full;
  var blg_full = document.getElementById('blog_full');
  fetchblog.onreadystatechange = function () {
    if (fetchblog.readyState === XMLHttpRequest.DONE) {

      if (fetchblog.status === 200) {
        console.log(fetchblog.responseText);
        var item;
        blog_full=JSON.parse(this.responseText);
        console.log(blog_full);
        var blog_lst = blog_full;

        item="<div class='image blog_image' style='background-image: url(../category/"+blog_lst[0].blog_category+".jpg)'>"+
          "<div class='ui huge header' style='font-size:7em'>"+blog_lst[0].blog_title+"</div>"+
          "<div class='ui huge header'>"+"<span class='tagline'>"+blog_lst[0].blog_category+"</span>"+"</div>"+
        "</div>"+
        "<div class='content' style='margin-top:25px'>"+
          "<div class='description' style='font-size:2em;padding:1em'>"+
            "<p>"+blog_lst[0].blog_content+"</p>"+
          "</div>"+
        "</div>"+

        "<div class='ui segment extra content' style='padding:1em 0'>"+

          "<div class='ui centered divided grid'>"+

            "<div class='right floated left aligned six wide column'>"+

                "<span class='right floated'>"+
                  "<i class='heart outline like icon'></i>"+
                  "17 likes"+
                "</span>"+
            "</div>"+

            "<div class='left floated right aligned six wide column'>"+

              "<i class='comment icon'></i>"+
              "3 comments"+

            "</div>"+

          "</div>"+

          "<div class='ui inverted divider'></div>"+

          "<div class='ui fluid large transparent left icon input' style='margin:0 1em'>"+
            "<i class='heart outline icon'></i>"+
            "<input type='text' placeholder='Add Comment...'>"+
          "</div>"+

        "</div>"+

        "<div class='ui comments' style='margin:0 auto'>"+
          "<div class='comment'>"+
            "<a class='avatar'>"+
              "<img src='/images/avatar/small/matt.jpg'>"+
            "</a>"+
            "<div class='content'>"+
              "<a class='author'>Matt</a>"+
              "<div class='metadata'>"+
                "<span class='date'>Today at 5:42PM</span>"+
              "</div>"+
              "<div class='text'>"+
                "How artistic!"+
              "</div>"+
              "<div class='actions'>"+
                "<a class='reply'>Reply</a>"+
              "</div>"+
            "</div>"+
          "</div>"+
          "<div class='comment'>"+
            "<a class='avatar'>"+
              "<img src='/images/avatar/small/matt.jpg'>"+
            "</a>"+
            "<div class='content'>"+
              "<a class='author'>Matt</a>"+
              "<div class='metadata'>"+
                "<span class='date'>Today at 5:42PM</span>"+
              "</div>"+
              "<div class='text'>"+
                "How artistic!"+
              "</div>"+
              "<div class='actions'>"+
                "<a class='reply'>Reply</a>"+
              "</div>"+
            "</div>"+
          "</div>"+
          "<div class='comment'>"+
            "<a class='avatar'>"+
              "<img src='/images/avatar/small/matt.jpg'>"+
            "</a>"+
            "<div class='content'>"+
              "<a class='author'>Matt</a>"+
              "<div class='metadata'>"+
                "<span class='date'>Today at 5:42PM</span>"+
              "</div>"+
              "<div class='text'>"+
                "How artistic!"+
              "</div>"+
              "<div class='actions'>"+
                "<a class='reply'>Reply</a>"+
              "</div>"+
            "</div>"+
          "</div>"+
          "<div class='comment'>"+
            "<a class='avatar'>"+
              "<img src='/images/avatar/small/matt.jpg'>"+
            "</a>"+
            "<div class='content'>"+
              "<a class='author'>Matt</a>"+
              "<div class='metadata'>"+
                "<span class='date'>Today at 5:42PM</span>"+
              "</div>"+
              "<div class='text'>"+
                "How artistic!"+
              "</div>"+
              "<div class='actions'>"+
                "<a class='reply'>Reply</a>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>";

        blg_full.innerHTML = item;
      } else {
        console.log(fetchblogs.responseText);
        alert('some error occured');
      }
    }
  };

  fetchblog.open('POST', 'https://data.beehive82.hasura-app.io/v1/query', true);
  fetchblog.setRequestHeader('Content-type', 'application/json');
  fetchblog.send(JSON.stringify(
    {
    "type": "select",
    "args": {
        "table": "blogs",
        "columns": [
            "*"
        ],
        "where":{
            "blog_id": Cookies.get('blog_id')
        }
    }
}
  ));
}
