(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{188:function(t,e,n){"use strict";n.d(e,"h",(function(){return c})),n.d(e,"j",(function(){return o})),n.d(e,"g",(function(){return l})),n.d(e,"a",(function(){return f})),n.d(e,"d",(function(){return d})),n.d(e,"c",(function(){return v})),n.d(e,"f",(function(){return m})),n.d(e,"i",(function(){return _})),n.d(e,"b",(function(){return h})),n.d(e,"e",(function(){return C}));var r=n(63),c=function(t){return Object(r.b)({method:"GET",url:"/api/articles",params:t})},o=function(t){return Object(r.b)({method:"GET",url:"/api/articles/feed",params:t})},l=function(t){return Object(r.b)({method:"GET",url:"/api/articles/".concat(t)})},f=function(data){return Object(r.b)({method:"POST",url:"/api/articles",data:data})},d=function(t){return Object(r.b)({method:"DELETE",url:"/api/articles/".concat(t)})},v=function(t){return Object(r.b)({method:"POST",url:"/api/articles/".concat(t,"/favorite")})},m=function(t){return Object(r.b)({method:"DELETE",url:"/api/articles/".concat(t,"/favorite")})},_=function(t){return Object(r.b)({method:"GET",url:"/api/articles/".concat(t,"/comments")})},h=function(t,data){return Object(r.b)({method:"POST",url:"/api/articles/".concat(t,"/comments"),data:data})},C=function(t,e){return Object(r.b)({method:"DELETE",url:"/api/articles/".concat(t,"/comments/").concat(e)})}},189:function(t,e,n){"use strict";n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return o})),n.d(e,"c",(function(){return l}));var r=n(63),c=function(t){return Object(r.b)({method:"GET",url:"/api/profiles/".concat(t)})},o=function(t){return Object(r.b)({method:"POST",url:"/api/profiles/".concat(t,"/follow")})},l=function(t){return Object(r.b)({method:"DELETE",url:"/api/profiles/".concat(t,"/follow")})}},264:function(t,e,n){"use strict";n.r(e);var r=n(26),c=(n(23),n(12),n(46),n(43)),o=(n(184),n(185),n(33),n(4)),l=n(189),f=n(188),d={middleware:"authenticated",name:"profileIndex",asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,d,v,m,_,h,C,w,O,j,x,k,E,y;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.params,d=t.query,v=Number.parseInt(d.page||1),m=10,_=d.tab||"my_articles",h="my_articles"===_?"author":"favorited",e.next=7,Promise.all([Object(l.b)(o.id),Object(f.h)((n={},Object(r.a)(n,h,o.id),Object(r.a)(n,"limit",m),Object(r.a)(n,"offset",(v-1)*m),n))]);case 7:return C=e.sent,w=Object(c.a)(C,2),O=w[0],j=w[1],x=O.data.profile,k=j.data,E=k.articles,y=k.articlesCount,x.followingDisabled=!1,E.forEach((function(article){return article.favoriteDisabled=!1})),e.abrupt("return",{profile:x,articles:E,articlesCount:y,limit:m,tab:_,page:v});case 16:case"end":return e.stop()}}),e)})))()},watchQuery:["tab","page"],computed:{totalPage:function(){return Math.ceil(this.articlesCount/this.limit)}},methods:{onFavorite:function(article){return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(article.favoriteDisabled=!0,!article.favorited){t.next=8;break}return t.next=4,Object(f.f)(article.slug);case 4:article.favorited=!1,article.favoritesCount+=-1,t.next=12;break;case 8:return t.next=10,Object(f.c)(article.slug);case 10:article.favorited=!0,article.favoritesCount+=1;case 12:article.favoriteDisabled=!1;case 13:case"end":return t.stop()}}),t)})))()},onFollow:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.followingDisabled=!0,!t.following){e.next=7;break}return e.next=4,Object(l.c)(t.username);case 4:t.following=!1,e.next=10;break;case 7:return e.next=9,Object(l.a)(t.username);case 9:t.following=!0;case 10:t.followingDisabled=!1;case 11:case"end":return e.stop()}}),e)})))()}}},v=n(24),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"profile-page"},[n("div",{staticClass:"user-info"},[n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-xs-12 col-md-10 offset-md-1"},[n("img",{staticClass:"user-img",attrs:{src:t.profile.image}}),t._v(" "),n("h4",[t._v(t._s(t.profile.username))]),t._v(" "),n("p",[t._v(t._s(t.profile.bio))]),t._v(" "),n("button",{staticClass:"btn btn-sm btn-secondary action-btn",attrs:{disabled:t.profile.followingDisabled},on:{click:function(e){return t.onFollow(t.profile)}}},[n("i",{class:[t.profile.following?"ion-minus-round":"ion-plus-round"]}),t._v("\n\t\t\t\t\t\t  "+t._s(t.profile.following?"UnFollow":"Follow")+"\n\t\t\t\t\t\t"+t._s(t.profile.username)+"\n\t\t\t\t\t")])])])])]),t._v(" "),n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-xs-12 col-md-10 offset-md-1"},[n("div",{staticClass:"articles-toggle"},[n("ul",{staticClass:"nav nav-pills outline-active"},[n("li",{staticClass:"nav-item"},[n("nuxt-link",{staticClass:"nav-link",class:{active:"my_articles"===t.tab},attrs:{exact:"",to:{query:{tab:"my_articles"}}}},[t._v("My Articles\n\t\t\t\t\t\t\t")])],1),t._v(" "),n("li",{staticClass:"nav-item"},[n("nuxt-link",{staticClass:"nav-link",class:{active:"favorited_articles"===t.tab},attrs:{exact:"",to:{query:{tab:"favorited_articles"}}}},[t._v("Favorited Article\n\t\t\t\t\t\t\t")])],1)])]),t._v(" "),t.articlesCount?[t._l(t.articles,(function(article){return n("div",{key:article.slug,staticClass:"article-preview"},[n("div",{staticClass:"article-meta"},[n("nuxt-link",{attrs:{to:{name:"profile-id",params:{id:article.author.username}}}},[n("img",{attrs:{src:article.author.image}})]),t._v(" "),n("div",{staticClass:"info"},[n("nuxt-link",{staticClass:"author",attrs:{to:{name:"profile-id",params:{id:article.author.username}}}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(article.author.username)+"\n\t\t\t\t\t\t\t\t")]),t._v(" "),n("span",{staticClass:"date"},[t._v(t._s(t._f("date")(article.createdAt,"MMM DD, YYYY")))])],1),t._v(" "),n("button",{staticClass:"btn btn-outline-primary btn-sm pull-xs-right",class:{active:article.favorited},attrs:{disabled:article.favoriteDisabled},on:{click:function(e){return t.onFavorite(article)}}},[n("i",{staticClass:"ion-heart"}),t._v("\n\t\t\t\t\t\t\t\t"+t._s(article.favoritesCount)+"\n\t\t\t\t\t\t\t")])],1),t._v(" "),n("nuxt-link",{staticClass:"preview-link",attrs:{to:{name:"article-slug",params:{slug:article.slug}}}},[n("h1",[t._v(t._s(article.title))]),t._v(" "),n("p",[t._v(t._s(article.description))]),t._v(" "),n("span",[t._v("Read more...")])])],1)})),t._v(" "),n("nav",[n("ul",{staticClass:"pagination"},t._l(t.totalPage,(function(e){return n("li",{key:e,staticClass:"page-item",class:{active:e===t.page}},[n("nuxt-link",{staticClass:"page-link",attrs:{to:{query:{page:e,tab:t.tab}}}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e)+"\n\t\t\t\t\t\t\t\t")])],1)})),0)])]:[n("div",{staticClass:"article-preview"},[t._v("\n\t\t\t\t\t\tNo articles are here... yet.\n\t\t\t\t\t")])]],2)])])])}),[],!1,null,null,null);e.default=component.exports}}]);