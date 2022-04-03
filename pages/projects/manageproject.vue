
<template>
  <div class="home">
    <div style="padding: 12%">
      <div>
        <br />
        Title:
        <input
          class="input ng-invalid ng-dirty ng-touched"
          style="background: none; style='width:30em' border:none; font-size:2rem; color:var(--h-color); font-family:var(--font-head);font-weight:400;"
          v-model="title"
          type="text"
          placeholder="Project Title"
        />

        <br />
        Tags:
        <input
          v-model="tags"
          type="text"
          class="input ng-invalid ng-dirty ng-touched"
          placeholder="Tags, separated by commas"
        />
      </div>
      <br />

      <button
        class="btn btn-green-outline"
        style="float: right"
        @click="publishProject"
        type="button"
      >
        Publish
      </button>
      <br /><br />

      <br />
      <button
        v-bind:class="
          editor ? 'btn btn-green-outline' : 'btn btn-orange-outline'
        "
        @click="editor = !editor"
      >
        Source
      </button>
      <button
        v-bind:class="
          upload ? 'btn btn-green-outline' : 'btn btn-orange-outline'
        "
        @click="upload = !upload"
      >
        Upload
      </button>
      <br />
      <div v-if="upload" class="tweet-card editor">
        <p class="text-center">upload file</p>
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
        <button class="btn btn-red" v-on:click="submitFile()">Upload</button>
        <input
          class="input"
          type="text"
          v-model="uploaded_file"
          placeholder="uploaded url"
        />
      </div>
      <div v-for="content in contents" :key="content.posted.milliSeconds">
        <div v-if="editor">
          <editorComponent
            v-model="content.content"
            skin="oxide-dark"
            api-key="d2fjjluyhoxtj3actapx756tb8ekv15saa331h5mc6s9a57t"
            :init="{
              selector: 'textarea#format-custom',
              content_css: '/tinymce.css',
              menubar: true,
              height: 600,

              formats: {
                // Changes the default format for h1 to have a class of heading
                li: { block: 'li', classes: 'bullet' },
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
          <button
            class="btn btn-green-outline"
            style="float: right; border: 2px solid red"
            @click="removeTab(content.tabid)"
            type="button"
          >
            Remove
          </button>
          <br /><br />
        </div>
        <h5
          class="tag tag-sm tag-firebase"
          style="display: inline; color: black"
        >
          {{ content.postedSTR }}
        </h5>
        <h5 style="display: inline; color: #a8a8a8">({{ content.timeago }})</h5>
        <div class="tweet-card editor" v-html="content.content"></div>
      </div>
      <button
        class="btn btn-green-outline"
        style="float: right"
        @click="addNewTab"
        type="button"
      >
        Add
      </button>

      <hr />
      <br />
      <h1 style="display: inline">{{ title }}</h1>
      <br /><br />
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import timeSince from "~/utils.js";
import moment from "moment";

export default {
  name: "home",
  components: {
    editorComponent: Editor,
  },
  created: function () {
    ///if we have an id in the query, use that id.
    ///if there's no id, that means user is trying to make a new post
    if (this.$route.query.id == null) {
      const { Timestamp } = this.$fireModule.firestore;

      //no id, create a new document
      const newDocument = this.$fire.firestore.collection("projects").doc();
      this.projectid = newDocument.id;
    } else {
      //id is available, retrieve data
      this.$fire.firestore
        .collection("projects")
        .doc(this.$route.query.id)
        .get()
        .then((projectDocument) => {
          this.projectid = projectDocument.id;

          var data = projectDocument.data();
          this.title = data.title;
          data.tags.forEach((value, index) => {
            this.tags = this.tags + value;
            if (!(index == data.tags.length - 1)) {
              this.tags = this.tags + ", ";
            }
          });
          this.$fire.firestore
            .collection("projects")
            .doc(this.$route.query.id)
            .collection("tabs")
            .get()
            .then((querySnapshot) => {
              const tabs = querySnapshot.docs.map((doc) => doc.data());
              tabs.forEach((tab, index) => {
                this.contents.push({
                  tabid: querySnapshot.docs[index].id,
                  content: tab.content,
                  postedSTR: moment(tab.posted.toDate()).format(
                    "DD/MM/YYYY hh:mm"
                  ),
                  timeago: timeSince(tab.posted.toDate()),
                  posted: tab.posted,
                });
              });
            });
        });
    }
  },
  mounted: function () {
    document.title = "Create New Post";
  },
  data() {
    return {
      projectid: "",
      editors: 0,
      contents: [],
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
    removeTab(tabid) {
      this.contents.forEach((content, index) => {
        if (content.tabid == tabid) {
          this.$delete(this.contents, index);
        }
      });
      this.$fire.firestore
        .collection("projects")
        .doc(this.projectid)
        .collection("tabs")
        .doc(tabid)
        .delete();
    },
    addNewTab() {
      const { Timestamp } = this.$fireModule.firestore;
      const doc = this.$fire.firestore
        .collection("projects")
        .doc(this.projectid)
        .collection("tabs")
        .doc();
      const tabid = doc.id;

      this.contents.push({
        content: "",
        postedSTR: moment(Timestamp.now().toDate()).format("DD/MM/YYYY hh:mm"),
        timeago: timeSince(Timestamp.now().toDate()),
        tabid: tabid,
        posted: Timestamp.now(),
      });
    },
    handleFileUpload() {
      this.file_url = this.$refs.file.files[0];
    },
    submitFile() {
      //generate a random string for the file name
      var name =
        Math.random().toString(36) +
        Math.random().toString(36) +
        Math.random().toString(36);
      this.$fire.storage
        .ref("projectImages/" + name)
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
    async publishProject() {
      const post = this.$fire.firestore
        .collection("projects")
        .doc(this.projectid);
      await post.set({
        title: this.title,
        tags: this.tags.replace(" ", "").split(","),
      });
      this.contents.forEach((content) => {
        if (content.content == "") {
          return;
        }
        const tab = post.collection("tabs").doc(content.tabid);
        tab.set({
          content: content.content,
          posted: content.posted,
        });
      });

      this.open_post(post.id);
    },
    open_post(id) {
      console.log(id);
      this.$router.push({ path: "/projects/project", query: { id: id } });
    },
    handleImageRemoved: function (imageUrl) {
      const ref = this.$fire.storage.refFromURL(imageUrl);
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
