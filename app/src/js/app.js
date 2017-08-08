function check_login() {
  var loggedin_user = Cookies.get('hasura_username');
  if(loggedin_user!=Cookies.get('nothing')){
    document.getElementById('auth_user_sec').innerHTML = "<div class='ui inline floating dropdown link item'>"+
      "<i class='spy icon'></i>"+
      "<div>"+loggedin_user+"</div>"+
      "<div class='menu'>"+
        "<div class='item'>View Profile</div>"+
        "<div onclick='add_blog_modal()' class='item'>Publish Blog</div>"+
        "<div onclick='log_out()' class='item'>Sign Out <i class='power icon red'></i></div>"+
      "</div>"+
    "</div>";
  }
};

function add_blog_modal(){
  $('.ui.long.modal').modal('show');
};

function log_out() {
  var logout_req = new XMLHttpRequest();
  logout_req.onreadystatechange = function () {
    if (logout_req.readyState === XMLHttpRequest.DONE) {
      if (logout_req.status === 200) {
        alert('You have logged out Successfully.')
        console.log(logout_req.responseText);
        Cookies.remove('edubyte');
        Cookies.remove('hasura_username');
        window.location.reload();
      } else {
        console.log('Request failed');
      }
    }
  }
  var Bearer = "Bearer ";
  Bearer+=JSON.parse(Cookies.get('edubyte')).auth_token;

  logout_req.open('POST', 'https://auth.antecedent20.hasura-app.io/user/logout', true);
  logout_req.withCredentials = true;
  logout_req.setRequestHeader('Authorization', Bearer);
  logout_req.send(null);
};

function navigate_home() {
  window.location.href = '/';
};

function navigate_auth() {
  window.location.href = '/authentication';
};

function blog_full(b_id) {
  Cookies.set('blog_id',b_id);
  window.location.href = '/blog';
};

function fetch_blogs() {
  var fetchblogs = new XMLHttpRequest();
  var blogs_all;
  var blg = document.getElementById('child');
  fetchblogs.onreadystatechange = function () {
    if (fetchblogs.readyState === XMLHttpRequest.DONE) {

      if (fetchblogs.status === 200) {
        //console.log(fetchblogs.responseText);
        var items="";
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
              "<img src='../category/"+blog_lst[i].blog_category+".jpg'>"+
            "</div>"+
            "<div class='content'>"+
              "<a class='header' onclick=blog_full("+blog_lst[i].blog_id+")>"+blog_lst[i].blog_title+"</a>"+
              "<div class='meta'>"+
                "<a>"+blog_lst[i].date_created+"</a>"+
                "<a>"+blog_lst[i].blog_category+"</a>"+
              "</div>"+
              "<div class='description'>"+blog_lst[i].blog_content.slice(0,150)+
              "</div>"+
              "<div class='extra'>"+
                "<div class='ui right floated primary button' onclick=blog_full("+blog_lst[i].blog_id+")>"+
                  "Read more"+
                  "<i class='right chevron icon'></i>"+
                "</div>"+
                "<img src='https://semantic-ui.com/examples/assets/images/wireframe/square-image.png' class='ui circular avatar image'>"+
                 blog_lst[i].published_by.name+
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
  }

  fetchblogs.open('POST', 'https://data.antecedent20.hasura-app.io/v1/query', true);
  fetchblogs.setRequestHeader('Content-type', 'application/json');
  fetchblogs.send(JSON.stringify(
    {
      "type": "select",
      "args": {
        "table": "blogs",
        "columns": ["*",
                            {"name":"published_by","columns":["name"]}
                   ],
        "order_by": ["-date_created"]
      }
    }
  ));
};

function fetch_blog() {
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

  fetchblog.open('POST', 'https://data.antecedent20.hasura-app.io/v1/query', true);
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
};

function publish_blog() {
  var publish = new XMLHttpRequest();
  publish.onreadystatechange = function () {
    if (publish.readyState === XMLHttpRequest.DONE) {
      if (publish.status === 200) {
        alert("Blog Published Successfully");
        //console.log(fetchblogs.responseText);
        var items="";
        blogs_all=JSON.parse(this.responseText);
        window.location.reload();
      } else {
        console.log(this.responseText);
        document.getElementById("blog_loader").className = "hidden";
        blg.innerHTML = 'No more blogs available';
      }
    }
  }
  var Bearer = "Bearer ";
  var hasura = JSON.parse(Cookies.get('edubyte'));
  Bearer+= hasura.auth_token;
  category = document.getElementById('blog_category_select').value;
  title = document.getElementById('blog_title_text').value;
  content = document.getElementById('blog_content_text').value;

  publish.open('POST', 'https://data.antecedent20.hasura-app.io/v1/query', true);
  publish.setRequestHeader('Content-type', 'application/json');
  publish.setRequestHeader('Authorization',Bearer);
  publish.send(JSON.stringify(
    {
    	"type": "insert",
    	"args": {
    		"table": "blogs",
    		"objects": [{
    			"user_id": hasura.hasura_id,
          "blog_category": category,
    			"blog_title": title,
    			"blog_content": content
    		}]
    	}
    }
  ));
};
