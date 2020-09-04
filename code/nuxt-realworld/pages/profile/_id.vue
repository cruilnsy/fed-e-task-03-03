<template>
	<div class="profile-page">
		<div class="user-info">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<img :src="profile.image" class="user-img" />
						<h4>{{ profile.username }}</h4>
						<p>{{ profile.bio }}</p>
						<button
							class="btn btn-sm btn-secondary action-btn"
							@click="onFollow(profile)"
							:disabled="profile.followingDisabled"
						>
							<i
								:class="[
									profile.following ? 'ion-minus-round' : 'ion-plus-round',
								]"
							></i>
							&nbsp; {{ profile.following ? "UnFollow" : "Follow" }}
							{{ profile.username }}
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<div class="articles-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{
										active: tab === 'my_articles',
									}"
									exact
									:to="{
										query: {
											tab: 'my_articles',
										},
									}"
									>My Articles
								</nuxt-link>
							</li>
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{
										active: tab === 'favorited_articles',
									}"
									exact
									:to="{
										query: {
											tab: 'favorited_articles',
										},
									}"
									>Favorited Article
								</nuxt-link>
							</li>
						</ul>
					</div>

					<template v-if="articlesCount">
						<div
							class="article-preview"
							v-for="article in articles"
							:key="article.slug"
						>
							<div class="article-meta">
								<nuxt-link
									:to="{
										name: 'profile-id',
										params: {
											id: article.author.username,
										},
									}"
								>
									<img :src="article.author.image" />
								</nuxt-link>
								<div class="info">
									<nuxt-link
										class="author"
										:to="{
											name: 'profile-id',
											params: {
												id: article.author.username,
											},
										}"
									>
										{{ article.author.username }}
									</nuxt-link>
									<span class="date">{{
										article.createdAt | date("MMM DD, YYYY")
									}}</span>
								</div>
								<button
									class="btn btn-outline-primary btn-sm pull-xs-right"
									:class="{ active: article.favorited }"
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
										slug: article.slug,
									},
								}"
							>
								<h1>{{ article.title }}</h1>
								<p>{{ article.description }}</p>
								<span>Read more...</span>
							</nuxt-link>
						</div>

						<nav>
							<ul class="pagination">
								<li
									class="page-item"
									v-for="item in totalPage"
									:key="item"
									:class="{ active: item === page }"
								>
									<nuxt-link
										class="page-link"
										:to="{
											query: {
												page: item,
												tab,
											},
										}"
									>
										{{ item }}
									</nuxt-link>
								</li>
							</ul>
						</nav>
					</template>

					<template v-else>
						<div class="article-preview">
							No articles are here... yet.
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getProfile, followProfile, unfollowProfile } from "@/api/profile";
import { getArticles, addFavorite, deleteFavorite } from "@/api/article";

export default {
	middleware: "authenticated",
	name: "profileIndex",
	async asyncData(context) {
		const { params, query } = context;
		const page = Number.parseInt(query.page || 1);
		const limit = 10;
		const tab = query.tab || "my_articles";
		let byWho = tab === "my_articles" ? "author" : "favorited";

		const [profileRes, articleRes] = await Promise.all([
			getProfile(params.id),
			getArticles({
				[byWho]: params.id,
				limit,
				offset: (page - 1) * limit,
			}),
		]);
		const { profile } = profileRes.data;
		const { articles, articlesCount } = articleRes.data;

		profile.followingDisabled = false;
		articles.forEach((article) => (article.favoriteDisabled = false));

		return {
			profile,
			articles,
			articlesCount,
			limit,
			tab,
			page,
		};
	},
	watchQuery: ["tab", "page"],
	computed: {
		totalPage() {
			return Math.ceil(this.articlesCount / this.limit);
		},
	},
	methods: {
		async onFavorite(article) {
			article.favoriteDisabled = true;
			if (article.favorited) {
				await deleteFavorite(article.slug);
				article.favorited = false;
				article.favoritesCount += -1;
			} else {
				await addFavorite(article.slug);
				article.favorited = true;
				article.favoritesCount += 1;
			}
			article.favoriteDisabled = false;
		},
		async onFollow(profile) {
			profile.followingDisabled = true;
			if (profile.following) {
				await unfollowProfile(profile.username);
				profile.following = false;
			} else {
				await followProfile(profile.username);
				profile.following = true;
			}
			profile.followingDisabled = false;
		},
	},
};
</script>

<style></style>
