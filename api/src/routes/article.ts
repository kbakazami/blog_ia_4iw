import express from 'express';
import {
    createArticle,
    getArticles,
    getArticle,
    updateArticle,
    deleteArticle,
    generateArticle
} from "../controllers/article";


const articleRoutes = express.Router();

articleRoutes.get('/', getArticles);
articleRoutes.get('/generate', generateArticle);
articleRoutes.get('/:id', getArticle);
articleRoutes.post('/', createArticle);
articleRoutes.put('/:id', updateArticle);
articleRoutes.delete('/:id', deleteArticle);

export default articleRoutes;