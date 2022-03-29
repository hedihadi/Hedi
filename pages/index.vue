<template>
<div>

  <br><br><br>
      <h2 class="text-center home-heading">My Posts</h2>
    <h4 class="home-sub-heading text-center">i ocassionaly create rich-info posts for myself to refer back to.</h4>
    <PostsHomepage/>
    <footer>
      <BottomFooter/>
      </footer>

</div>

</template>

<script>
import PostsHomepage from "./posts/PostsHomepage.vue";
import BottomFooter from "./BottomFooter.vue";

export default {
  name: 'IndexPage',
  components:{
  PostsHomepage:PostsHomepage,
    BottomFooter:BottomFooter,

  },
}
</script>
