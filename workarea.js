import React, { Component } from "react";
import axios from "axios";


var apikey = "4e173856-35fb-4844-8f48-3e1471c4dd25";
// import "./App.css";

// import Header from "./Header/Header";
// import Compose from "./Compose/Compose";
// import Post from "./Post/Post";

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       posts: []
//     };

//     this.baseurl = "https://practiceapi.devmountain.com/api";

//     this.updatePost = this.updatePost.bind(this);
//     this.deletePost = this.deletePost.bind(this);
//     this.createPost = this.createPost.bind(this);

//     this.searchPost = this.searchPost.bind(this);
//   }

  // componentDidMount() {
    axios
      .get(`https://api.thecatapi.com/v1/images/search?api-key=${apikey}`)
      .then(response => {
        this.setState({ posts: response.data });
        console.log("componentDidMount() GET: " + response);
      });
  // }

  updatePost(id, text) {
    console.log(text);
    axios
      .put(`${this.baseurl}/posts?id=${id}`, { text })
      .then(resp => {
        console.log(resp);
        this.setState({ posts: resp.data });
        // console.log("updatePost() put: " + resp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deletePost(id) {
    axios
      .delete(`${this.baseurl}/posts?id=${id}`)
      .then(resp => {
        console.log(resp);
        this.setState({ posts: resp.data });
        // console.log("updatePost() put: " + resp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  createPost(text) {
    axios
      .post(`${this.baseurl}/posts`, { text })
      .then(resp => {
        console.log(resp);
        this.setState({ posts: resp.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchPost(text) {
    var sPosts = [];

    axios
      .get(`${this.baseurl}/posts`)
      .then(resp => {
        resp.data.map(elm => {
          if (elm.text.includes(text)) {
            sPosts.push(elm);
          }
        });
        //console.log(sPosts);
        this.setState({ posts: sPosts });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { posts } = this.state;
    console.log(posts);

    return (
      <div className="App__parent">
        <Header searchPostFn={this.searchPost} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(elm => (
            <Post
              key={elm.id}
              text={elm.text}
              date={elm.date}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
              id={elm.id}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
