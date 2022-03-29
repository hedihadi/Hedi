<template>
  <div class="home">
    <div style="padding:12%">
      <h1 style="display: inline">{{Post.title}}</h1>
      <div>
        <br />
        <h5 style="display: inline;">posted:</h5>
        <h5
          class="tag tag-sm tag-firebase"
          style="display: inline; "
        >{{Post.posted}}</h5>
        <h5 style="display: inline; color: #A8A8A8">
          ({{Post.timeago}})
        </h5>
        <p
          class="tag"
          v-for="tag in Post.tags"
          :key="tag"
        >{{tag}}</p>
        <a
          v-if="logged"
          :href="'/EditPost/?id=' + Post.key"
          class="btn btn-green"
          style="background-color: #ffcb2b; color:black"
        >Edit</a>
      </div>

      <div
        class="tweet-card editor"
        v-html="Post.content"
      ></div>

    </div>

  </div>
</template>
<script>
export default {
    data() {

  return {
  logged:false
  };
},
async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
  var Post={};
store.state.posts.forEach((element) => {

if(element.key==query.id){
  const PostData=element;
  console.log("it is",typeof[PostData])

    Post={
      title:PostData.title,
      key:PostData.key,
      tags:PostData.tags,
      posted:PostData.posted,
      timeago:PostData.timeago,
      content:PostData.content

  }
}

});
return{
  Post
}
},
 created() {
    this.$fire.auth.onAuthStateChanged( (user) => {
      if (user) {
        this.logged=true;
        console.log("logged in - default page");

      } else {
        this.logged = false;
                console.log("logged out - default page");

      }
    });
console.log("on client it is",this.Post);
    },

}

</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Poppins&family=Roboto:wght@100&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Poppins&family=Roboto:wght@500&family=Source+Sans+Pro&display=swap");
.editor >>> pre {
  padding: 20px;
  white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
  white-space: -pre-wrap; /* Opera */
  white-space: -o-pre-wrap; /* Opera */
  white-space: pre-wrap; /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
  word-wrap: break-word; /* IE 5.5+ */
  background-color: #272727;
  font-family: "Source Sans Pro", sans-serif;
  width: 50%;
  border-radius: 25px;
  color: #e07a5f;
}
.editor >>> hr {
  border: 2px dashed var(--gray6);
  width: 100%;
}
.editor >>> code {
  background-color: #272727;
  font-family: "Source Sans Pro", sans-serif;
  width: 50%;
  border-radius: 25px;
  color: #e07a5f;
}
.editor >>> li {
  color: var(--h-color);
  font-family: roboto;
  font-weight: 400;
  color: var(--blue);
}
.ql-syntax {
  padding: 20px;
  margin: 40px;
  white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
  white-space: -pre-wrap; /* Opera */
  white-space: -o-pre-wrap; /* Opera */
  white-space: pre-wrap; /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
  word-wrap: break-word; /* IE 5.5+ */
  background-color: #272727;
  font-family: "Source Sans Pro", sans-serif;
  width: 50%;
  border-radius: 25px;
  color: #e07a5f;
}
.editor >>> h2,
.editor >>> h3,
.editor >>> h4,
.editor >>> h5,
.editor >>> h6,
.editor >>> p {
  padding: 0;
  margin: 0;
  font-family: var(--font-body);
  font-weight: 400;
  color: var(--text-color);
}
.editor >>> h1 strong {
  font-family: var(--font-header);
}

strong {
  font-family: var(--font-head);
}
.centered {
  margin: auto;
  width: 50%;
  padding: 10px;

  /*! CSS Used from: https://getbootstrap.com/docs/4.0/dist/css/bootstrap.min.css */
}
</style>
