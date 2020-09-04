<template>
	<div class="home-page">
		<div class="banner">
			<div class="container">
				<h1 class="logo-font">conduit</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>

		<div class="container page">
			<div class="row">
				<div class="col-md-9">
					<div class="feed-toggle">
						<ul class="nav nav-pills outline-active">
							<li v-if="user" class="nav-item">
								<nuxt-link 
									class="nav-link"
									:class="{
										active: tab === 'your_feed'
									}"
									exact
									:to="{
										query: {
											tab: 'your_feed'
										}
									}"
									>Your Feed
								</nuxt-link>
							</li>
							<li class="nav-item">
								<nuxt-link 
									class="nav-link"
									:class="{
										active: tab === 'global_feed'
									}"
									exact
									to="/"
									>Global Feed
								</nuxt-link>
							</li>
							<li v-if="tag" class="nav-item">
								<nuxt-link 
									class="nav-link"
									:class="{
										active: tab === 'tag'
									}"
									exact
									:to="{
										query: { 
											tab: 'tag',
											tag
										}
									}"
									># {{ tag }}
								</nuxt-link>
							</li>
						</ul>
					</div>
					<div class="article-preview" 
						v-for="article in articles" 
						:key="article.slug">
						<div class="article-meta">
							<nuxt-link :to="{
								name: 'profile-id',
								params: {
									id: article.author.username
								}
							}">
								<img :src="article.author.image" />
							</nuxt-link>
							<div class="info">
								<nuxt-link class="author" 
									:to="{name: 'profile-id',
										params: {
											id: article.author.username
										}}">
									{{ article.author.username }}
								</nuxt-link>
								<span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
							</div>
							<button 
								class="btn btn-outline-primary btn-sm pull-xs-right"
								:class="{active: article.favorited}"
								@click="onFavorite(article)"
								:disabled="article.favoriteDisabled"
							>
								<i class="ion-heart"></i> 
								{{ article.favoritesCount }}
							</button>
						</div>
						<nuxt-link 
							class="preview-link"
							:to="{
								name: 'article-slug', 
								params: {
									slug: article.slug
								}
						}">
							<h1>{{ article.title }}</h1>
							<p>{{ article.description }}</p>
							<span>Read more...</span>
							<ul class="tag-list">
								<li
									v-for="tag in article.tagList"
									:key="tag"
									class="tag-default tag-pill tag-outline">
									{{ tag }}
								</li>
							</ul>
						</nuxt-link>
					</div>

					<nav>
						<ul class="pagination">
							<li class="page-item"
								v-for="item in totalPage"
								:key="item"
								:class="{active: item === page}"
							>
								<nuxt-link 
									class="page-link" 
									:to="{
										query: {
											page: item,
											tag: $route.query.tag,
											tab
										} 
								}">
									{{ item }}
								</nuxt-link>
							</li>
						</ul>
					</nav>
				</div>
				
				

				<div class="col-md-3">
					<div class="sidebar">
						<p>Popular Tags</p>

						<div class="tag-list">
							<nuxt-link
								class="tag-pill tag-default"
								v-for="item in tags"
								:key="item"
								:to="{
									query: {
										tab: 'tag',
										tag: item
									}
								}
							">
								{{ item }}
							</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { 
	getArticles, 
	getYourFeedArticles, 
	addFavorite, 
	deleteFavorite 
} from '@/api/article'
import { getTags } from '@/api/tags'
import { mapState } from 'vuex'

export default {
	name: "Home",
	async asyncData ({ query }) {
		const page = Number.parseInt(query.page || 1)
		const limit = 20
		const tab = query.tab || 'global_feed'
		const tag = query.tag
		const loadArticles = tab === 'global_feed' ? getArticles : getYourFeedArticles

		const [ articleRes, tagsRes ] = await Promise.all([
			loadArticles({
				limit,
				offset: (page - 1) * limit,
				tag: tag
			}),
			getTags()
		])

		const { articles, articlesCount } = articleRes.data
		const { tags } = tagsRes.data

		articles.forEach(article => article.favoriteDisabled = false)
	
		return {
			articles,
			articlesCount,
			limit,
			page,
			tags,
			tab,
			tag
		}
	},
	watchQuery: ['page', 'tag', 'tab'],
	computed: {
		...mapState(['user']),
		totalPage () {
			return Math.ceil(this.articlesCount / this.limit)
		}
	},
	methods: {
		async onFavorite (article) {
			article.favoriteDisabled = true
			if (article.favorited) {
				await deleteFavorite(article.slug)
				article.favorited = false
				article.favoritesCount += -1
			} else {
				await addFavorite(article.slug)
				article.favorited = true
				article.favoritesCount += 1
			}
			article.favoriteDisabled = false
		}
	}
};
</script>

<style></style>
