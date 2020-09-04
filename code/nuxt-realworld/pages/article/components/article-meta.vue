<template>
	<div class="article-meta">
		<nuxt-link 
            :to="{
                name: 'profile-id',
                params: {
                    id: article.author.username
                }
            }"
        >
            <img :src="article.author.image"/>
        </nuxt-link>
		<div class="info">
            <nuxt-link
                class="author"
                :to="{
                name: 'profile-id',
                params: {
                    id: article.author.username
                }
            }"
            >
                {{ article.author.username }}
            </nuxt-link>
			<span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
		</div>
        <template v-if="user.username === article.author.username">
            <nuxt-link
                class="btn btn-outline-secondary btn-sm"
                :to="{
                    name:'editor-id',
                    params: {
                        id: $route.params.slug
                    }
                }"
            >
                <i class="ion-edit"></i>&nbsp; Edit Article
            </nuxt-link>
            <button 
                class="btn btn-outline-danger btn-sm"
                @click="onDeleteArticle(article)"
            >
                <i class="ion-trash-a"></i>&nbsp; Delete Article
            </button>
        </template>
        <template v-else>
            <button 
                class="btn btn-sm action-btn"
                :class="[article.author.following ? 'btn-secondary' : 'btn-outline-secondary']"
                @click="onFollow(article.author)"
                :disabled="followingDisabled"
            >
                <i class="ion-plus-round"></i>
                &nbsp; {{ article.author.following ? "UnFollow" : "Follow" }} {{ article.author.username }} <span class="counter"></span>
            </button>
            &nbsp;&nbsp;
            <button 
                class="btn btn-sm"
                :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
                @click="onFavorite(article)"
                :disabled="favoriteDisabled"
            >
                <i class="ion-heart"></i>
                &nbsp; {{article.favorited ? 'Unfavorite' : 'Favorite'}} Article <span class="counter">({{ article.favoritesCount }})</span>
            </button>
        </template>
		
	</div>
</template>

<script>
import { followProfile, unfollowProfile } from "@/api/profile";
import { addFavorite, deleteFavorite, deleteArticle } from '@/api/article'
import { mapState } from 'vuex'

export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            followingDisabled: false,
            favoriteDisabled: false
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        async onFollow(author) {
			this.followingDisabled = true;
			if (author.following) {
				await unfollowProfile(author.username);
				author.following = false;
			} else {
				await followProfile(author.username);
				author.following = true;
			}
			this.followingDisabled = false;
        },
        async onFavorite (article) {
			this.favoriteDisabled = true
			if (article.favorited) {
				await deleteFavorite(article.slug)
				article.favorited = false
				article.favoritesCount += -1
			} else {
				await addFavorite(article.slug)
				article.favorited = true
				article.favoritesCount += 1
			}
			this.favoriteDisabled = false
        },
        async onDeleteArticle (article) {
            await deleteArticle(article.slug)
            this.$router.push('/')
        }
    }
};
</script>

<style></style>
