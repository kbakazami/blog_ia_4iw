import { defineStore } from "pinia";
import axios from 'axios';

const API_URL = "http://localhost:8000/api/article";

export const useArticlesStore = defineStore("articles", {
  state: ()=> ({
    articles: [],
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
      try {
        await this.getAllArticles();
        this.articles.forEach(article => {
          if(!article.isPublished) {
            const index = this.articles.indexOf(article);
            this.articles.splice(index, 1);
          }
        });
      }catch (error) {
        console.error("Couldn't get the published articles : ", error);
      }
    },
    async getArticle(articleId) {
      try {
        const response = await axios.get(`${API_URL}/${articleId}`);
        const index = this.articles.findIndex((article) => article._id === articleId);
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

        const index = this.articles.findIndex((article) => article._id === articleId);

        if (index !== -1) {
          this.articles.splice(index, 1);
        }
      } catch (error) {
        console.error("Couldn't delete the article : ", error);
      }
    },
    async updateArticle(updatedArticle) {
      try {
        const response = await axios.put(`${API_URL}/${updatedArticle._id}`, updatedArticle);

        const index = this.articles.findIndex((article) => article._id === updatedArticle._id);
        if (index !== -1) {
          this.articles.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error("Couldn't update the article : ", error);
      }
    }
  }
})
