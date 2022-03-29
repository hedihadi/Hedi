import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import timeSince from '../utils'
import moment from "moment";

export const state = () => ({
    posts: [],
})

export const mutations = {
    SET_POSTS(state, value) {
        console.log('SET_POSTS', value)
        state.posts = value
    },

}

export const actions = {
    async nuxtServerInit({ commit }) {
        console.log("calling database");
        var app = initializeApp({
            apiKey: "AIzaSyB0BoFiJ2LeEVflDnSikVsr4le7i5i8K-k",
            authDomain: "hedi-bc317.firebaseapp.com",
            projectId: "hedi-bc317",
            storageBucket: "hedi-bc317.appspot.com",
            messagingSenderId: "313801605853",
            appId: "1:313801605853:web:eae7a9fee24a7b06535134",
            measurementId: "G-93L924PZWJ"
        })

        var firestore = await getFirestore(app);
        var col = collection(firestore, "posts");
        var docs = await getDocs(col)
        var posts = [];
        docs.forEach((doc) => {
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