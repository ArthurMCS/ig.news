import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismc from '@prismicio/client';
import { RichText } from 'prismic-dom';

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}

interface PostsProps {
    posts: Post[]
}


export default function Posts({ posts }: PostsProps) {
  return (
    <>
        <Head>
            <title>Posts | Ignews</title>
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
               {posts.map(post => (
                 <a key={post.slug}>
                    <time>{post.updatedAt}</time>
                    <strong>{post.title}</strong>
                    <p>{post.excerpt}</p>
                </a>
               ))}
            </div>
        </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query(
        [
            Prismc.predicates.at('document.type', 'post')
        ],
        {
            fetch: ['post.title', 'post.content'],
            pageSize: 100,
        }
    )
    

    const posts = response.results.map(post => ({
        slug: post.id,
        title: post.uid[0].toUpperCase() + post.uid.substr(1),
        excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
        updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }))

    return {
        props: {
            posts
        }
    }
}