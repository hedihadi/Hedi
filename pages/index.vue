<template>
  <div>
    <br /><br /><br />
    <h2 class="text-center home-heading">My Posts</h2>
    <h4 class="home-sub-heading text-center">
      i ocassionaly create rich-info posts for myself to refer back to.
    </h4>
    <PostsHomepage />
    <hr />
    <h2 class="text-center home-heading">My Projects</h2>
    <h4 class="home-sub-heading text-center">
      i post updates of my projects, to know what i was doing.
    </h4>
    <ProjectsHomePage />

    <footer>
      <BottomFooter />
    </footer>
  </div>
</template>

<script>
import PostsHomepage from "./posts/PostsHomepage.vue";
import ProjectsHomePage from "./projects/ProjectsHomePage.vue";

import BottomFooter from "./BottomFooter.vue";

export default {
  name: "IndexPage",
  components: {
    PostsHomepage: PostsHomepage,
    ProjectsHomePage: ProjectsHomePage,

    BottomFooter: BottomFooter,
  },
};
</script>
