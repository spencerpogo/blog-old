import Layout from '../components/layout.js'
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import TechStack from '../components/TechStack.js'
import utilStyles from '../styles/utils.module.css'
import indexStyles from '../styles/index.module.css'
import { siteTitle } from '../info.js'
import { getAllPostData, sortByDate, filenameToId } from '../lib/posts.js'



export default function Home({ allPostsData }) {
	return (
		<Layout home>
		<Head>
			<title>{siteTitle}</title>
		</Head>

		<section className={utilStyles.headingMd}>
			<h2 className={utilStyles.headingLg}>Hi, I'm Scoder12.</h2>
			<p>
				I'm a passionate developer with 7 years of experience
			</p>
			<p>
				I work with: 
			</p>
			<TechStack />
		</section>

		<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
			<h2 className={utilStyles.headingLg}>Blog</h2>
			<ul className={utilStyles.list}>
				{allPostsData.map(({ id, date, title }) => (
					<li className={utilStyles.listItem} key={id}>
					<Link href="/posts/[id]" as={`/posts/${id}`}>
						<a>{title}</a>
					</Link>
					<br />
					<small className={utilStyles.lightText}>
						<Date dateString={date} />
					</small>
					</li>
				))}
			</ul>
		</section>

		<section>
			<h2 className={utilStyles.headingLg}>Contact</h2>
			<div>
				<a href="https://discord.gg/czzv7FT"><img src="https://img.shields.io/badge/Contact_me-On_Discord-blue?logo=discord&style=for-the-badge" /></a>
			</div>
		</section>

		</Layout>
	)
}


export async function getStaticProps() {
	// don't render markdown as we aren't using it
	const sortedPostData = sortByDate(await getAllPostData({ renderMD: false }))
	// add id to props for each
	const allPostsData = sortedPostData.map(post => Object.assign({ 
			id: filenameToId(post.filename)
		}, post));
	return {
		props: {
			allPostsData
		}
	}
}
