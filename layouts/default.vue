<template>
<div>

    <nav
      class="topnav"
      style="top: 0px;"
    >

      <div class="topnav-logo">
        <a
          href="/"
          class="item logo"
          style="opacity: 1;"
        >
          <svg
            id="fireship-logo"
            data-name="fireship logo"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1024 1025"
          >
            <defs>

              <linearGradient
                id="logo-linear-gradient"
                x1="70.38"
                y1="512.5"
                x2="953.62"
                y2="512.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.01"
                  stop-color="#eb844e"
                ></stop>
                <stop
                  offset="1"
                  stop-color="#ee4358"
                ></stop>
              </linearGradient>
            </defs>
            <title>fireship</title>
            <path
              class="cls-1"
              d="M404,44.27c-1.65-1.4-5.44-1.34-8.59-2-1.65,2.44-3.78,4.37-4.3,6.5a122,122,0,0,0-2.67,16.34c-12.19,122.65-57.84,236.48-146.68,340.66-49.28,57.78-98.33,116.85-134.6,179.62-90,155.75-9.91,314.8,186.41,384.32,6.46,2.27,13.72,3.31,29.91,7.09C256.89,916.59,222.6,855.39,234.16,783c11-69.07,45.95-130.69,98.87-186.88,3.9,7.82,4.14,14.63,3.87,21.44-2.58,61.62,17.81,116,80.82,158.94,29.13,19.84,55.29,42.31,81.63,64.39,26.76,22.5,34.51,49.54,26.91,79-3.66,14.32-9,28.39-14.78,46.07,44.84-4.43,86.31-10.62,114.15-35.39,26.61-23.65,46.31-51.73,74.72-84.4,2,27.66,5.89,49.18,4.38,70.5-1.59,22.17-8.44,44.11-13,66.19C828,962.32,948.21,828.63,953.49,691.85c3.87-99.81-81.06-246-152.38-260.18,4,9.36,7.72,18.24,11.71,27,24.75,54.5,32,109.76,16.34,166.79C813.51,682.19,734.08,745.82,664,753.87c2.37-5.69,3.36-11,6.61-15.33C746.09,636.85,747,530.42,704.1,421.81,646.74,276.6,536.61,155.21,404,44.27Z"
            >
            </path>
          </svg>

        </a>
      </div>

      <div class="topnav-links flex-center hide-sm">
        <a
          href="/"
          class="item item-text"
          aria-label="home"
        >
          Home
        </a>
        <a
          href="/posts/allposts"
          class="item item-text"
          aria-label="All Posts"
        >
          Posts
        </a>

      </div>
      <div class="topnav-icons flex-center">

        <a
          ng-version="12.2.4"
          style="visibility: visible;"
        >
          <span
            @click="toggle_theme"
            slot="dark"
            class="item"
          ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path
                  d="M502.42 240.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.41-94.8a17.31 17.31 0 0 0-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4a17.31 17.31 0 0 0 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.41-33.5 47.3 94.7a17.31 17.31 0 0 0 31 0l47.31-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3a17.33 17.33 0 0 0 .2-31.1zm-155.9 106c-49.91 49.9-131.11 49.9-181 0a128.13 128.13 0 0 1 0-181c49.9-49.9 131.1-49.9 181 0a128.13 128.13 0 0 1 0 181z"
                  class="fk-secondary"
                ></path>
                <path
                  d="M352 256a96 96 0 1 1-96-96 96.15 96.15 0 0 1 96 96z"
                  class="fk-primary"
                >
                </path>
              </g>
            </svg></span>

        </a>
<div @click="log">
  <span class="item last">
            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="user-visor" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><g class="fk-group"><path d="M342.94531,174.59766C340.64063,175.125,338.46094,176,336,176H112c-2.46094,0-4.64062-.875-6.94531-1.40234C123.71875,222.18359,169.79688,256,224,256S324.28125,222.18359,342.94531,174.59766ZM224,0c-40.25,0-75.71875,18.95312-99.17969,48H323.17969C299.71875,18.95312,264.25,0,224,0ZM325.92188,353.5625A3.97907,3.97907,0,0,0,322.85938,352a4.30688,4.30688,0,0,0-3.14063,1.39062c-19.82813,23-31.82813,53.10938-35.70313,89.5a4.03446,4.03446,0,0,0,2.04688,3.92188,4.11332,4.11332,0,0,0,4.39063-.34375c24.85937-19.32813,33.75-23.8125,37.04687-24.8125a5.72785,5.72785,0,0,1,1.375-.375c2.23438,1.98437,7.67188,7.84375,19.85938,25.03125A4.01561,4.01561,0,0,0,352,448a4.06431,4.06431,0,0,0,1.28125-.20312A3.992,3.992,0,0,0,356,443.875C354.84375,408.53125,344.73438,378.15625,325.92188,353.5625Z" class="fk-secondary"></path><path  :class="account_logo_class" d="M313.59375,288h-16.6875a174.10379,174.10379,0,0,1-145.8125,0h-16.6875A134.44134,134.44134,0,0,0,0,422.40625V464a48.01238,48.01238,0,0,0,48,48H400a48.01238,48.01238,0,0,0,48-48V422.40625A134.44134,134.44134,0,0,0,313.59375,288Zm39.6875,159.79688A4.06431,4.06431,0,0,1,352,448a4.01561,4.01561,0,0,1-3.26562-1.6875c-12.1875-17.1875-17.625-23.04688-19.85938-25.03125a5.72785,5.72785,0,0,0-1.375.375c-3.29688,1-12.1875,5.48437-37.04687,24.8125a4.11332,4.11332,0,0,1-4.39063.34375,4.03446,4.03446,0,0,1-2.04688-3.92188c3.875-36.39062,15.875-66.5,35.70313-89.5A4.30688,4.30688,0,0,1,322.85938,352a3.97907,3.97907,0,0,1,3.0625,1.5625C344.73438,378.15625,354.84375,408.53125,356,443.875A3.992,3.992,0,0,1,353.28125,447.79688ZM112,176H336a32.00158,32.00158,0,0,0,32-32V80a32.00033,32.00033,0,0,0-32-32H112A32.00034,32.00034,0,0,0,80,80v64A32.00158,32.00158,0,0,0,112,176Zm16-80H320v32H128Z" ></path></g></svg>
          </span>
</div>

      </div>

    </nav>
    <nuxt-child/>
</div>
</template>

<script>

export default({
  data() {
    return {
      account_logo_class:"account-logout"
    }
  },
  methods: {
    toggle_theme() {
      const el = document.body;
      var theme = el.className;
      if (theme == "dark-theme") {
        theme = "light-theme";
      } else {
        theme = "dark-theme";
      }
      this.$cookies.set("theme", theme);
      el.className = theme;
    },


    log() {
      //logout if logged in, and otherwise
      if (this.logged) {
        this.$fire.auth.signOut();
      } else {
        let provider = new this.$fireModule.auth.GoogleAuthProvider();
        this.$fire.auth.signInWithPopup(provider)
          .then((result) => {
            if (result.user.uid != "SwWrjbQMm5dYc4Awh1nUtjPQmZY2") {
this.$fireAlert({
  type: 'error',
  title: 'Oops...',
  text: 'Sorry! only Hedi may Sign in.',
});
              this.$fire.auth.signOut();
            }
          })
          .catch((err) => {});
      }
    },
  },

  async created() {
    this.$fire.auth.onAuthStateChanged( (user) => {
      if (user) {
        this.logged=true;
            this.account_logo_class="account-login";

        console.log("logged in - default page");

      } else {
        this.logged = false;
             this.account_logo_class="account-logout";

                console.log("logged out - default page");

      }
    });},


})
</script>

<style scoped>
.account-login{
fill:rgb(83, 155, 75)
}
.account-logout{
fill:rgb(112, 112, 112)
}
</style>