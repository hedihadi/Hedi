<template>
  <div class="home">
    <br /><br /><br />
    <h2 class="text-center">All My Projects</h2>
    <div class="text-center">
      <router-link
        to="/projects/manageproject"
        v-if="logged"
        class="btn btn-blue"
        >New Project</router-link
      >
    </div>
    <div class="centered" style="text-align: right; margin-right: 34%"></div>
    <br />
   <div class="row row-max-2">
      <div
      v-for="project in projects"
      :key="project.key"
    >
      <article>
        <div class="card card-course">
          <div class="card-content">
            <h4>{{ project.title }}</h4>
            <h6 style="display: inline; color: var(--text-color)">
              last update:
            </h6>
            <h6 style="display: inline; color: #a7a7a7">
              {{ project.tabs[project.tabs.length - 1].posted }}
            </h6>
            <h6 style="display: inline; color: #a8a8a8">
              ({{ project.tabs[project.tabs.length - 1].timeago }})
            </h6>
            <br />
            <router-link
              :to="'/tags/?tag=' + project"
              class="tag"
              v-for="tag in project.tags"
              :key="tag"
              >#{{ tag }}</router-link
            >
            <a
              v-if="logged"
              :href="'/projects/manageproject?id=' + project.key"
              class="btn btn-green"
              style="background-color: #dad754; color: black"
              >Edit</a
            >
            <a
              v-if="logged"
              @click="deletePost(project.key)"
              class="btn btn-green"
              style="background-color: #da6454; color: black"
              >Delete</a
            >
            <br />
            <router-link
              :to="'/projects/project?id=' + project.key"
              class="btn btn-blue"
              style="color: black"
              >Visit</router-link
            >
          </div>
        </div>
      </article>
    </div>
   </div>
    <div class="text-center">
      <router-link
        to="/projects/allprojects"
        class="btn btn-green text-center btn-lg"
        >View all Projects</router-link
      >
    </div>
  </div>
</template>
<script>
import moment from "moment";
import timeSince from "../../utils.js";
import Project from "./project.vue";

export default {
  name: "Projects",
  data() {
    return {
      logged: false,
      //show only 2 first projects, but check null for second project
      projects: this.$store.state.projects,
    };
  },
  components: {
    Project: Project,
  },

  async created() {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.logged = true;
        console.log("logged in - ProjectsHomePage");
      } else {
        this.logged = false;
        console.log("logged out - ProjectsHomePage");
      }
    });
  },
};
</script>