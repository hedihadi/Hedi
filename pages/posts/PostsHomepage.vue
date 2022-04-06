<template>
  <div class="home text-center">

    <div class="text-center">
      <router-link
        to="/posts/newpost"
        v-if="logged"
        class="btn btn-blue"
      >New Post</router-link>
    </div>
    <br>
    <div class="row row-max-2">
      <div
        v-for="post in posts"
        :key="post.key"
      >

        <article>
          <div class="card card-course">
            <div class="card-content">
              <h4>{{post.title}}</h4>
              <h6 style="display: inline; color: #e0e0e0">{{post.posted}}</h6>
              <h6 style="display: inline; color: #A8A8A8">
                ({{post.timeago}})
              </h6>
              <br />
              <router-link
                :to="'/tags/?tag=' + post.key"
                class="tag"
                v-for="tag in post.tags"
                :key="tag"
              >#{{tag}}</router-link>
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
              <router-link
                :to="'/posts/post?id=' + post.key"
                class="btn btn-blue"
                style=";color:black"
              >Visit</router-link>

            </div>
          </div>
        </article>

      </div>
    </div>
    <div class="text-center">
      <router-link
        to="/posts/allposts"
        class="btn btn-green text-center btn-lg"
      >View all posts</router-link>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import timeSince from "../../utils.js";
import Post from "./post.vue";

export default {
  name: "Posts",
  data() {
    return {
      logged: false,
      //show only 2 first posts, but check null for second post
      posts:
        this.$store.state.posts[1] != "undefined"
          ? [this.$store.state.posts[0], this.$store.state.posts[1]]
          : [this.$store.state.posts[0]],
    };
  },
  components: {
    Post: Post,
  },

  async created() {
    console.log(this.$store.state.posts[1]);
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.logged = true;
        console.log("logged in - PostsHomePage");
      } else {
        this.logged = false;
        console.log("logged out - PostsHomePage");
      }
    });
  },
};
</script>