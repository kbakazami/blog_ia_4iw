import {Schema, model} from 'mongoose';

const articleSchema: Schema = new Schema({
    title: String,
    content: String,
    author: String,
    isPublished: Boolean,
    createdAt: Date,
});

const ArticleModel = model('Article', articleSchema);

export default ArticleModel;