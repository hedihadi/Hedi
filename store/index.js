import firebase from 'firebase/compat/app';
import 'firebase/firestore'
import timeSince from '../utils'
import moment from "moment";

export const state = () => ({
    posts: [],
})

export const mutations = {
    SET_POSTS(state, value) {
        state.posts = value
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
        var a = await firestore.collection("posts").get()
        var posts = [];
        a.docs.forEach((doc) => {
            posts.push({
                key: doc.id,
                title: doc.data().title,
                tags: doc.data().tags,
                posted: moment(doc.data().posted.toDate()).format("DD/MM/YYYY hh:mm"),
                timeago: timeSince(doc.data().posted.toDate()),
                content: doc.data().content
            });
        });
        commit('SET_POSTS', posts);



    }
}