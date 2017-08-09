var comments = "";
var current_c_count;
var current_l_count;
var n_comment,i_c=0;
var blg = document.getElementById('child');
var blog_lst;
var items="";
var like_flag=0;

function check_login() {
  var loggedin_user = Cookies.get('hasura_username');
  if(loggedin_user!=Cookies.get('nothing')){
    document.getElementById('auth_user_sec').innerHTML = "<div class='ui inline floating dropdown link item'>"+
      "<i class='spy icon'></i>"+
      "<div>"+loggedin_user+"</div>"+
      "<div class='menu'>"+
        "<div onclick='profile()' class='item'>View Profile</div>"+
        "<div onclick='add_blog_modal()' class='item'>Publish Blog</div>"+
        "<div onclick='log_out()' class='item'>Sign Out <i class='power icon red'></i></div>"+
      "</div>"+
    "</div>";
  }
};

function add_blog_modal(){
  $('.ui.long.modal').modal('show');
};

function author_profile() {
  window.location.href = '/profile';
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

  fetchblogs.onreadystatechange = function () {
    if (fetchblogs.readyState === XMLHttpRequest.DONE) {

      if (fetchblogs.status === 200) {
        //console.log(fetchblogs.responseText);

        blogs_all=JSON.parse(this.responseText);
        console.log(blogs_all);
        blog_lst = blogs_all;
        n_comment = blog_lst.length;

        var x;
        if(n_comment-10>=0){
          x=10;
        }else x=n_comment%10;
        while(i_c<n_comment&&x--){
          items+="<div class='item'>"+
            "<div class='ui small image'>"+
              "<img src='../category/"+blog_lst[i_c].blog_category+".jpg'>"+
            "</div>"+
            "<div class='content'>"+
              "<a class='header' onclick=blog_full("+blog_lst[i_c].blog_id+")>"+blog_lst[i_c].blog_title+"</a>"+
              "<div class='meta'>"+
                "<a>"+blog_lst[i_c].date_created+"</a>"+
                "<a>"+blog_lst[i_c].blog_category+"</a>"+
              "</div>"+
              "<div class='description'>"+blog_lst[i_c].blog_content.slice(0,150)+
              "</div>"+
              "<div class='extra'>"+
                "<div class='ui right floated primary button' onclick=blog_full("+blog_lst[i_c].blog_id+")>"+
                  "Read more"+
                  "<i class='right chevron icon'></i>"+
                "</div>"+
                "<img src='https://semantic-ui.com/examples/assets/images/wireframe/square-image.png' class='ui circular avatar image'>"+
                 blog_lst[i_c].published_by.name+
              "</div>"+
            "</div>"+
          "</div>";
          i_c++;
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

function fetch_blog_s() {
  if(i_c>=n_comment){
    items+="<div>No More Blogs available.....</div>"
    blg.innerHTML = items;
    document.getElementById("fetch_blog_btn").className = "transition hidden";
  }else{
    var x;
    if(n_comment-10>=0){
      x=10;
    }else x=n_comment%10;
    while(i_c<n_comment&&x--){
      items+="<div class='item'>"+
        "<div class='ui small image'>"+
          "<img src='../category/"+blog_lst[i_c].blog_category+".jpg'>"+
        "</div>"+
        "<div class='content'>"+
          "<a class='header' onclick=blog_full("+blog_lst[i_c].blog_id+")>"+blog_lst[i_c].blog_title+"</a>"+
          "<div class='meta'>"+
            "<a>"+blog_lst[i_c].date_created+"</a>"+
            "<a>"+blog_lst[i_c].blog_category+"</a>"+
          "</div>"+
          "<div class='description'>"+blog_lst[i_c].blog_content.slice(0,150)+
          "</div>"+
          "<div class='extra'>"+
            "<div class='ui right floated primary button' onclick=blog_full("+blog_lst[i_c].blog_id+")>"+
              "Read more"+
              "<i class='right chevron icon'></i>"+
            "</div>"+
            "<img src='https://semantic-ui.com/examples/assets/images/wireframe/square-image.png' class='ui circular avatar image'>"+
             blog_lst[i_c].published_by.name+
          "</div>"+
        "</div>"+
      "</div>";
      i_c++;
    }
    blg.innerHTML = items;
  }

}

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
        current_c_count=blog_lst[0].comments.length;
        current_l_count = blog_lst[0].liked_by.length;
        var hasura;
        var has_id;
        if(Cookies.get('hasura_username')!=Cookies.get('nothing')){
          hasura = JSON.parse(Cookies.get('edubyte'));
          has_id = hasura.hasura_id;
        };
        for(var zz=0;zz<current_l_count;zz++){
          if(blog_lst[0].liked_by[zz].user_id===has_id){
            like_flag=1;
            break;
          }
        };

        item="<div class='image blog_image' style='background-image: url(../category/"+blog_lst[0].blog_category+".jpg)'>"+
          "<div class='ui huge header' style='font-size:7em'>"+blog_lst[0].blog_title+"</div>"+
          "<div class='ui huge header'>"+"<span class='tagline'>"+blog_lst[0].blog_category+"</span>"+"</div>"+
          "<div class='ui huge header'>"+"<span class='tagline'>"+blog_lst[0].date_created+"</span>"+"</div>"+
          "<div class='ui huge header'>"+"<span class='tagline'>"+blog_lst[0].published_by.name+"</span>"+"</div>"+
        "</div>"+
        "<div class='content'>"+
          "<div class='description ui text segment' style='border-radius:0;'>"+
            "<p>"+blog_lst[0].blog_content+"</p>"+
          "</div>"+
        "</div>"+
        "<div class='ui segment extra content' style='margin:0 0;padding-left:0;padding-right:0;border-radius:0;'>"+

          "<div class='ui centered divided grid'>"+

            "<div id='l_count' onclick='like()' class='right floated left aligned six wide column'>";

        if(like_flag){
          item+="<a  class='right floated'>"+
            "<i class='heart outline like icon'></i>"+current_l_count+" likes"+
          "</a>";
        }else{
          item+="<span  class='right floated'>"+
            "<i class='heart outline like icon'></i>"+current_l_count+" likes"+
          "</span>";
        }
        item+="</div>"+

            "<div onclick='show_comments()' class='left floated right aligned six wide column'>"+
              "<a id='c_count'>"+
                "<i class='comment icon'></i>"+current_c_count+" comments"+
              "</a>"+
            "</div>"+

          "</div>"+

          "<div class='ui inverted divider'></div>"+

          "<div class='ui fluid large transparent left icon input' style='margin:0 1em'>"+
            "<i class='heart outline icon'></i>"+
            "<input id='commented' type='text' onkeypress='handle(event)' placeholder='Add Comment...'>"+
          "</div>"+

        "</div>"+
        "<div id='comment_s' class='xyz ui comments transition hidden' style='margin:1em 15%'>"+"</div>"
        blg_full.innerHTML = item;

        var n = blog_lst[0].comments.length;
        for(var i=0;i<n;i++){
          comments += "<div class='comment'>"+
            "<a class='avatar'>"+
              "<img src='#'>"+
            "</a>"+
            "<div class='content'>"+
              "<a class='author'>"+blog_lst[0].comments[i].commented_by.name+"</a>"+
              "<div class='metadata'>"+
                "<span class='date'>"+blog_lst[0].comments[i].date_created+"</span>"+
              "</div>"+
              "<div class='text'>"+blog_lst[0].comments[i].comment+
              "</div>"+
            "</div>"+
          "</div>"+
          "<div class='ui divider'></div>";
        }
        document.getElementById('comment_s').innerHTML = comments;
      } else {
        console.log(fetchblog.responseText);
        alert('some error occured');
      }
    }
  }

  fetchblog.open('POST', 'https://data.antecedent20.hasura-app.io/v1/query', true);
  fetchblog.setRequestHeader('Content-type', 'application/json');
  fetchblog.send(JSON.stringify(
    {
      "type":"select",
      "args":
      {
        "table":"blogs",
        "columns":["blog_title","blog_content","date_created","user_id","blog_category",
        {
          "name":"published_by",
          "columns":["name"]
        },
        {
          "name":"comments",
          "columns":["date_created","comment",
          {
            "name":"commented_by",
            "columns":["name"]
          }
        ]
      },
      {
        "name":"liked_by",
        "columns":["user_id"]
      }
    ],
    "where":{"blog_id":{"$eq":Cookies.get('blog_id')}}
  }
}
  ));
};

function handle(e) {
  if(e.keyCode === 13){
    add_comment();
  }
  return false;
};

function show_comments(){
  $('#comment_s').transition('slide down');
};

function like(){
  var like_e = document.getElementById('l_count');
  if(like_flag===0){
    current_l_count++;
    var like_req = new XMLHttpRequest();
    like_req.onreadystatechange = function () {
      if (like_req.readyState === XMLHttpRequest.DONE) {
        if (like_req.status === 200) {
          console.log("like count Successfully");
          console.log(like_req.responseText);
          like_e.innerHTML = "<a  class='right floated'>"+
            "<i class='heart outline like icon'></i>"+current_l_count+" likes"+
          "</a>";
          like_flag=1;
        } else {
          console.log(this.responseText);
          alert("You must be sure to be login before comment and like any post");
        }
      }
    }
    var Bearer = "Bearer ";
    var hasura;
    var has_id;
    if(Cookies.get('hasura_username')!=Cookies.get('nothing')){
      hasura = JSON.parse(Cookies.get('edubyte'));
      Bearer+= hasura.auth_token;
      has_id = hasura.hasura_id;
    };

    like_req.open('POST', 'https://data.antecedent20.hasura-app.io/v1/query', true);
    like_req.setRequestHeader('Content-type', 'application/json');
    like_req.setRequestHeader('Authorization',Bearer);
    like_req.send(JSON.stringify(
      {
      	"type": "insert",
      	"args": {
      		"table": "likes",
      		"objects": [{
      			"user_id": has_id,
            "blog_id": Cookies.get('blog_id')
      		}]
      	}
      }
    ));
  }
  if(like_flag){
    current_l_count--;
    var like_req = new XMLHttpRequest();
    like_req.onreadystatechange = function () {
      if (like_req.readyState === XMLHttpRequest.DONE) {
        if (like_req.status === 200) {
          console.log("like minus-count Successfully");
          console.log(like_req.responseText);
          like_e.innerHTML = "<span  class='right floated'>"+
            "<i class='heart outline like icon'></i>"+current_l_count+" likes"+
          "</span>";
          like_flag=0;
        } else {
          console.log(this.responseText);
          alert("You must be sure to be login before comment and like any post");
        }
      }
    }
    var Bearer = "Bearer ";
    var hasura;
    var has_id;
    if(Cookies.get('hasura_username')!=Cookies.get('nothing')){
      hasura = JSON.parse(Cookies.get('edubyte'));
      Bearer+= hasura.auth_token;
      has_id = hasura.hasura_id;
    };

    like_req.open('POST', 'https://data.antecedent20.hasura-app.io/v1/query', true);
    like_req.setRequestHeader('Content-type', 'application/json');
    like_req.setRequestHeader('Authorization',Bearer);
    like_req.send(JSON.stringify(
      {
      	"type": "delete",
      	"args": {
      		"table": "likes",
          "where"     : { "blog_id" : { "$eq" : Cookies.get('blog_id') },"user_id" : {"$eq" : has_id} },
          "returning" : ["user_id"]
      	}
      }
    ));
  };
};

function add_comment(){
  var comm = document.getElementById('commented').value;
  comments = "<div class='comment'>"+
    "<a class='avatar'>"+
      "<img src='#'>"+
    "</a>"+
    "<div class='content'>"+
      "<a class='author'>"+"Aman Sonkar"+"</a>"+
      "<div class='metadata'>"+
        "<span class='date'>"+"Now"+"</span>"+
      "</div>"+
      "<div class='text'>"+comm+
      "</div>"+
    "</div>"+
  "</div>"+"<div class='ui divider'></div>"+comments;

  var comment_req = new XMLHttpRequest();
  comment_req.onreadystatechange = function () {
    if (comment_req.readyState === XMLHttpRequest.DONE) {
      if (comment_req.status === 200) {
        console.log("Comment Published Successfully");
        //console.log(fetchblogs.responseText);
        blogs_all=JSON.parse(this.responseText);

        document.getElementById('comment_s').innerHTML = comments;
        document.getElementById('c_count').innerHTML = "<i class='comment icon'></i>"+current_c_count+1+" comments";
        $('#comment_s').transition('slide down');
      } else {
        console.log(this.responseText);
        alert("You must be sure to be login before comment and like any post");
      }
    }
  }
  var Bearer = "Bearer ";
  var hasura;
  var has_id;
  if(Cookies.get('hasura_username')!=Cookies.get('nothing')){
    hasura = JSON.parse(Cookies.get('edubyte'));
    Bearer+= hasura.auth_token;
    has_id = hasura.hasura_id;
  };

  comment_req.open('POST', 'https://data.antecedent20.hasura-app.io/v1/query', true);
  comment_req.setRequestHeader('Content-type', 'application/json');
  comment_req.setRequestHeader('Authorization',Bearer);
  comment_req.send(JSON.stringify(
    {
    	"type": "insert",
    	"args": {
    		"table": "comments",
    		"objects": [{
    			"user_id": has_id,
          "blog_id": Cookies.get('blog_id'),
    			"comment": comm
    		}]
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
