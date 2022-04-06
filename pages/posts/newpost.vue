
<template>
  <div class="home">
    <div style="padding:12%">

      <div>
        <br />
        Title:
        <input
          class="input ng-invalid ng-dirty ng-touched"
          style="background: none; style='width:30em' border:none; font-size:2rem; color:var(--h-color); font-family:var(--font-head);font-weight:400;"
          v-model="title"
          type="text"
          placeholder="Post Title"
        >

        <br>
        Tags:
        <input
          v-model="tags"
          type="text"
          class="input ng-invalid ng-dirty ng-touched"
          placeholder="Tags, separated by commas"
        >
      </div>
      <br>

      <button
        class="btn btn-green-outline"
        style="float: right;"
        @click="editPost"
        type="button"
      >Update</button>
      <br><br>

      <br>
      <button
        v-bind:class="editor ? 'btn btn-green-outline' :'btn btn-orange-outline'"
        @click="editor=!editor;"
      >
        Source
      </button>
      <button
        v-bind:class="upload ? 'btn btn-green-outline' :'btn btn-orange-outline'"
        @click="upload=!upload;"
      >
        Upload
      </button>
      <br>
      <div
        v-if="upload"
        class="tweet-card editor"
      >
        <p class="text-center">
          upload file
        </p>
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
        <button
          class="btn btn-red"
          v-on:click="submitFile()"
        >Upload</button>
        <input
          class="input"
          type="text"
          v-model="uploaded_file"
          placeholder="uploaded url"
        >
      </div>
      <div v-if="editor">
        <eeditor
          v-model="content"
          skin="oxide-dark"
          api-key="d2fjjluyhoxtj3actapx756tb8ekv15saa331h5mc6s9a57t"
          :init="{
        selector: 'textarea#format-custom',
        content_css: '/tinymce.css',
        menubar:true,
        height: 600,

  formats: {
    // Changes the default format for h1 to have a class of heading
    li: { block: 'li', classes:'bullet' }
  },
        plugins: [
          'colorpicker codesample advlist autolink lists link image imagetools charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code wordcount importcss media imagetools ',
        ],
        toolbar:
          'format undo redo | formatselect | underline bold italic | forecolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | codesample image imagetools media code link',

          }"
        />
      </div>

      <hr>
      <br>
      <h1 style="display: inline">{{title}}</h1>
      <br><br>
      <div
        class="tweet-card editor"
        v-html="content"
      ></div>
    </div>

  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "home",
  components: {
    eeditor: Editor,
  },
  mounted: function () {
    document.title = "Create New Post";
  },
  data() {
    return {
      content: "",
      title: "",
      tags: "",
      file_url: "",
      uploaded_file: "",
      editor: true,
      upload: false,

      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],

        ["bold", "italic", "underline"],
        ["code-block"],
        [
          {
            color: [
              "red",
              "color:var(--h-color)",
              "#E48C76",
              "#1d3557",
              "#8d99ae",
              "#00afb9",
              "#ffd166",
              "#38a3a5",
              "#90be6d",
              "#373f51",
            ],
          },
        ],
        [{ align: "" }, { align: "center" }, { align: "right" }],
        [{ direction: "rtl" }],
        ["link", "image", "video"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

        ["clean"],
      ],

    };
  },
  methods: {
    handleFileUpload() {
      this.file_url = this.$refs.file.files[0];
    },
    submitFile() {
     var name =
        Math.random().toString(36) +
        Math.random().toString(36) +
        Math.random().toString(36);
      this.$fire.storage
        .ref("postImages/" + name)
        .put(this.file_url)
        .then((response) => {
          response.ref
            .getDownloadURL()
            .then((downloadURL) => {
              this.uploaded_file = downloadURL;
            })
            .catch((err) => console.log(err));
        });
    },
    editPost() {
      const post = this.$fire.firestore.collection("posts").doc();
      post.set({
        title: this.title,
        tags: this.tags.replace(" ", "").split(","),
        content: this.content.replace("#fff"),
      });
      this.open_post(post.id);
    },
    open_post(id) {
      console.log(id);
      this.$router.push({ path: "/posts/post", query: { id: id } });
    },
    handleImageRemoved: function (imageUrl) {
      const ref =  this.$fire.storage.refFromURL(imageUrl);
      ref.delete();
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);
       this.$fire.storage
        .ref("postImages/" + file.name)
        .put(file)
        .then((response) => {
          response.ref
            .getDownloadURL()
            .then((downloadURL) => {
              Editor.insertEmbed(cursorLocation, "image", downloadURL);
            })
            .catch((err) => console.log(err));
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
h2,
h3,
h4,
h5,
h6,
p {
  padding: 0;
  margin: 0;
  font-family: var(--font-body);
  font-weight: 400;
  color: var(--text-color);
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
