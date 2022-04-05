import firebase from 'firebase/compat/app';
import 'firebase/firestore'
import timeSince from '../utils'
import moment from "moment";

export const state = () => ({
    posts: [],
    projects: [],
})

export const mutations = {
    SET_POSTS(state, value) {
        state.posts = value
    },
    SET_PROJECTS(state, value) {
        state.projects = value
    },
}

export const actions = {
    async nuxtServerInit({ commit }) {
        console.log("calling database");
        var app = firebase.initializeApp({
            apiKey: "AIzaSyB0BoFiJ2LeEVflDnSikVsr4le7i5i8K-k",
            authDomain: "hedi-bc317.firebaseapp.com",
            projectId: "hedi-bc317",
            storageBucket: "hedi-bc317.appspot.com",
            messagingSenderId: "313801605853",
            appId: "1:313801605853:web:eae7a9fee24a7b06535134",
            measurementId: "G-93L924PZWJ"
        })

        var firestore = app.firestore();
        var posts_collection = await firestore.collection("posts").orderBy("posted", "asc").get();
        var projects_collection = await firestore.collection("projects").get();

        var posts = [];
        var projects = [];

        posts_collection.docs.forEach((doc) => {
            posts.push({
                key: doc.id,
                title: doc.data().title,
                tags: doc.data().tags,
                posted: moment(doc.data().posted.toDate()).format("DD/MM/YYYY hh:mm"),
                timeago: timeSince(doc.data().posted.toDate()),
                content: doc.data().content
            });
        });
        for (var i = 0; i < projects_collection.docs.length; i++) {
            var project_doc = projects_collection.docs[i];
            //get the tabs

            var tabs_collection = await firestore.collection("projects").doc(projects_collection.docs[i].id).collection("tabs").orderBy("posted", "asc").get();

            var tabs = []
            for (var ii = 0; ii < tabs_collection.docs.length; ii++) {
                var tab_doc = tabs_collection.docs[ii];
                tabs.push({
                    key: tab_doc.id,
                    content: tab_doc.data().content,
                    posted: moment(tab_doc.data().posted.toDate()).format("DD/MM/YYYY hh:mm"),
                    timeago: timeSince(tab_doc.data().posted.toDate()),
                })
            }


            projects.push({
                key: project_doc.id,
                title: project_doc.data().title,
                tags: project_doc.data().tags,
                tabs: tabs,

            });
        }



        commit('SET_POSTS', posts);
        commit('SET_PROJECTS', projects);



    }
}