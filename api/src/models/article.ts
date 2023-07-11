import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    isPublished: Boolean,
    createdAt: Date,
});

const ArticleModel = mongoose.model('Article', articleSchema);

export default ArticleModel;