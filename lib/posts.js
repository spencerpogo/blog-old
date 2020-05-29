import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { postsDirectory } from '../info.js'


export function filenameToId(filename) {
	return filename.replace(/\.md$/, '')
}


export function idToFilename(id) {
	return `${id}.md`
}


export function sortByDate(postsData) {
	return postsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1
		} else {
			return -1
		}
	})
}


export async function getAllPostData(opts={}) {
	// Get file names under /posts
	const filenames = getAllFilenames()
	const res = filenames.map(async filename => 
				Object.assign({ filename }, await getPostData(filename, opts)))
	return Promise.all(res)
}


export async function getSortedPostsData(opts={}) {
	return sortByDate((await getAllPostData(opts)))
}


export function getAllFilenames() {
	return fs.readdirSync(postsDirectory)
}


export function getAllPostIds() {
	const filenames = getAllFilenames();
	return filenames.map(filename => {
		return filenameToId(filename)
	})
}


export async function getPostData(filename, { renderMD }) {
	const fullPath = path.join(postsDirectory, filename)
	const fileContents = fs.readFileSync(fullPath, 'utf8')

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents)
	let data = {};

	if (renderMD) {
		// parse markdown to HTML
		const processedContent = await remark()
			.use(html)
			.process(matterResult.content)
		const contentHtml = processedContent.toString()
		data = { contentHtml }
	}

	return {
		...data,
		...matterResult.data
	}
}
