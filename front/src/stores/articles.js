import { defineStore } from "pinia";
import axios from 'axios';

const API_URL = "http://localhost:8000/api/article";

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
    ],
    singleArticle: null,
  }),
  actions: {
    async createArticle(newArticle) {
      try {
        const response = await axios.post(`${API_URL}`, newArticle);
        this.articles.push(response.data);
      } catch (error) {
        console.log("Couldn't create the article : ", error);
      }

    },
    async getAllArticles() {
      try {
        const response = await axios.get(`${API_URL}`);
        this.articles = response.data;
      } catch (error) {
        console.error("Couldn't get the articles : ", error);
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
      try {
        const response = await axios.get(`${API_URL}/${articleId}`);
        const index = this.articles.findIndex((article) => article.id === parseInt(articleId));

        if (index !== -1) {
          this.singleArticle = response.data;
        }

      } catch (error) {
        console.error("Couldn't get the article by Id : ", error);
      }

    },
    async deleteArticle(articleId) {
      try {
        await axios.delete(`${API_URL}/${articleId}`);

        const index = this.articles.findIndex((article) => article.id === articleId);
        if (index !== -1) {
          this.articles.splice(index, 1);
        }
      } catch (error) {
        console.error("Couldn't delete the article : ", error);
      }
    },
    async updateArticle(updatedArticle) {
      try {
        const response = await axios.put(`${API_URL}/${updatedArticle.id}`, updatedArticle);

        const index = this.articles.findIndex((article) => article.id === updatedArticle.id);
        if (index !== -1) {
          this.articles.splice(index, 1, updatedArticle);
        }
      } catch (error) {
        console.error("Couldn't update the article : ", error);
      }
    },
    changeVisibility(articleId) {
      //TODO: REMOVE THIS AND PUT UPDATE INSTEAD LIKE A
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
