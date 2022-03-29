<template>
  <div class="home">
<br><br><br>
  <h2 class="text-center">All My Posts</h2>
    <div
      class="centered"
      style="text-align:right;margin-right:34%"
    >
    </div>
    <br>
    <div
      class="row row-max-2"
      style="margin-top:30px"
      v-for="post in posts"
      :key="post.key"
    >

      <div class="card card-course">
        <div class="card-content">
          <h4>{{post.title}}</h4>
          <h6 style="display: inline; color: #e0e0e0">{{post.posted}}</h6>
          <h6 style="display: inline; color: #A8A8A8">
            ({{post.timeago}})
          </h6>
          <br />
          <a
            :href="'/posts/tags?tag=' + post.key"
            class="tag"
            v-for="tag in post.tags"
            :key="tag"
          >#{{tag}}</a>
          <a
            v-if="logged"
            :href="'/posts/editpost?id=' + post.key"
            class="btn btn-green"
            style="background-color: #DAD754;color:black"
          >Edit</a>
          <a
            v-if="logged"
            @click="deletePost(post.key)"
            class="btn btn-green"
            style="background-color: #DA6454;;color:black"
          >Delete</a>
          <br>
          <a
            :href="'/posts/post?id=' + post.key"
            class="btn btn-blue"
            style=";color:black"
          >Visit</a>

        </div>
      </div>

    </div>

  </div>
</template>
<script>
import moment from "moment";
import timeSince from '../../utils.js'
import Post from "./post.vue";

export default {
    name:'Posts',
    data() {
    return {
      logged:false,
      posts:this.$store.state.posts,

    }
  },
    components:{
  Post:Post,

  },
async created() {
    this.$fire.auth.onAuthStateChanged( (user) => {
      if (user) {
        this.logged=true;
        console.log("logged in - PostsHomePage");

      } else {
        this.logged = false;
                console.log("logged out - PostsHomePage");

      }
    });},

}
</script>