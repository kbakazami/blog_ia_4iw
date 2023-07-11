import { defineStore } from "pinia";
import axios from 'axios';

const API_URL = "CHANGEME";

export const useArticlesStore = defineStore("articles", {
  state: ()=> ({
    articles: [
      {
        id:1,
        title: 'This framework is amazing',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ligula nisi, convallis sed justo eget, hendrerit sodales dui. Praesent odio orci, sagittis at purus in, volutpat semper metus. Duis mauris urna, cursus at metus eu, maximus placerat enim. Aliquam fermentum metus non massa tristique faucibus. Nam lacinia justo tempor dolor ullamcorper commodo sit amet eu felis. Nam efficitur, urna nec tempus laoreet, erat diam tincidunt sapien, eget placerat augue velit ac ante. Integer efficitur, ex sed imperdiet tempor, felis diam faucibus magna, a dictum risus est non risus.',
        author: 'John Doe',
        createdAt: '10/07/2023',
        isPublished: true,
      },
      {
        id:2,
        title: 'This framework is MORE amazing',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ligula nisi, convallis sed justo eget, hendrerit sodales dui. Praesent odio orci, sagittis at purus in, volutpat semper metus. Duis mauris urna, cursus at metus eu, maximus placerat enim. Aliquam fermentum metus non massa tristique faucibus. Nam lacinia justo tempor dolor ullamcorper commodo sit amet eu felis. Nam efficitur, urna nec tempus laoreet, erat diam tincidunt sapien, eget placerat augue velit ac ante. Integer efficitur, ex sed imperdiet tempor, felis diam faucibus magna, a dictum risus est non risus.',
        author: 'Jane Dane',
        createdAt: '11/07/2023',
        isPublished: true,
      },
      {
        id:3,
        title: 'This is a test title',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ligula nisi, convallis sed justo eget, hendrerit sodales dui. Praesent odio orci, sagittis at purus in, volutpat semper metus. Duis mauris urna, cursus at metus eu, maximus placerat enim. Aliquam fermentum metus non massa tristique faucibus. Nam lacinia justo tempor dolor ullamcorper commodo sit amet eu felis. Nam efficitur, urna nec tempus laoreet, erat diam tincidunt sapien, eget placerat augue velit ac ante. Integer efficitur, ex sed imperdiet tempor, felis diam faucibus magna, a dictum risus est non risus.',
        author: 'Jane Dane',
        createdAt: '12/07/2023',
        isPublished: true,
      },
      {
        id:4,
        title: 'This is a title',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ligula nisi, convallis sed justo eget, hendrerit sodales dui. Praesent odio orci, sagittis at purus in, volutpat semper metus. Duis mauris urna, cursus at metus eu, maximus placerat enim. Aliquam fermentum metus non massa tristique faucibus. Nam lacinia justo tempor dolor ullamcorper commodo sit amet eu felis. Nam efficitur, urna nec tempus laoreet, erat diam tincidunt sapien, eget placerat augue velit ac ante. Integer efficitur, ex sed imperdiet tempor, felis diam faucibus magna, a dictum risus est non risus.',
        author: 'Jane Dane',
        createdAt: '12/07/2023',
        isPublished: true,
      }
    ],
    singleArticle: null,
  }),
  actions: {
    async createArticle(newArticle) {
      // try {
      //   const response = await axios.post(`${API_URL}`)
      // }
      this.articles.push(newArticle);
    },
    async getAllArticles() {
      try {
        const response = await axios.get(`${API_URL}/articles`);
        this.articles = response.data;
      } catch (error) {
        console.error('Can\'t get the donations :', error);
      }
    },
    async getAllPublishedArticles()
    {
      this.articles.forEach(article => {
        if(!article.isPublished) {
          const index = this.articles.indexOf(article);
          this.articles.splice(index, 1);
        }
      });
    },
    async getArticle(articleId) {
      const index = this.articles.findIndex((article) => article.id === parseInt(articleId));
      this.singleArticle = this.articles[index];
    },
    async deleteArticle(articleId) {
      const index = this.articles.findIndex((article) => article.id === articleId);
      if (index !== -1) {
        this.articles.splice(index, 1);
      }
    },
    async updateArticle(updatedArticle) {
        const index = this.articles.findIndex((article) => article.id === updatedArticle.id);
        if (index !== -1) {
          this.articles.splice(index, 1, updatedArticle);
        }
    },
    changeVisibility(articleId) {
      const index = this.articles.findIndex((article) => article.id === articleId);

      const singleArticle = this.articles[index];

      if(singleArticle.isPublished) {
        singleArticle.isPublished = false;
      }
      else {
        singleArticle.isPublished = true;
      }
    }
  }
})
