type Article = {
    title: string,
    content: string,
    author: string,
    isPublished: boolean,
    createdAt: Date,
}

type Articles = Article[];

export {Article, Articles};