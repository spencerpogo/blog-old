import Head from 'next/head'  
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData, idToFilename } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import { siteTitle } from '../../info.js'


export default function Post({ postData }) {
	return (
		<Layout>
			<Head>
				<title>{postData.title} | {siteTitle}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
		</Layout>
	)
}


export async function getStaticPaths() {
	const ids = getAllPostIds()
	let paths = ids.map(id => {
		return {
			params: {
				id: id
			}
		}
	})
	return {
		paths,
		fallback: false
	}
}


export async function getStaticProps({ params }) {
	const postData = await getPostData(idToFilename(params.id), { renderMD: true });
	return {
		props: {
			postData: Object.assign({ id: params.id }, postData)
		}
	}
}
