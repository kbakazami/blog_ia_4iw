import {Request, Response, RequestHandler} from "express";
import ArticleModel from "../models/article";
import {Article, Articles} from "../types/article";
import openai from "../config/openai";


export const getArticles: RequestHandler = async (req: Request, res: Response) => {
    try {
        const articles: Articles = await ArticleModel.find();
        await res.json(articles);
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error.message);
        }
    }
}

export const getArticle: RequestHandler = async (req: Request, res: Response) => {
    try {
        const article: Article | null = await ArticleModel.findById(req.params.id);

        if (!article) {
            return res.status(404).json({message: 'Article not found'});
        }

        await res.json(article);
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error.message);
        }
    }
}

/**
 * /api/article/generate
 * description: Genere un article sur le sujet passé en paramètre grace à la méthode createCompletion de l'API OpenAI, on utilise le modèle text-davinci-002 et on passe en paramètre le titre de l'article.
 */
export const generateArticle: RequestHandler = async (req: Request, res: Response) => {
    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-002',
            prompt: 'Crée un article sur le sujet suivant : ' + req.body.title,
        });
        await res.send(completion);
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error.message);
        }
    }
}


export const createArticle: RequestHandler = async (req: Request, res: Response) => {
    try {
        const article = await ArticleModel.create(req.body);
        await res.status(201).json(article);
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error.message);
        }
    }
}

export const updateArticle: RequestHandler = async (req: Request, res: Response) => {
    try {
        const article = await ArticleModel.findByIdAndUpdate(req.params.id, req.body);
        await res.status(200).json(article);
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error.message);
        }
    }
}

export const deleteArticle: RequestHandler = async (req: Request, res: Response) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(req.params.id);
        await res.status(200).json(article);
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error.message);
        }
    }
}
