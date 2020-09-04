<template>
	<div>
		<form class="card comment-form" @submit.prevent="onPost">
			<div class="card-block">
				<textarea
					class="form-control"
					placeholder="Write a comment..."
					rows="3"
                    v-model="comment"
                    required
				></textarea>
			</div>
			<div class="card-footer">
				<img :src="user.image" class="comment-author-img" />
				<button class="btn btn-sm btn-primary">
					Post Comment
				</button>
			</div>
		</form>

		<div 
            class="card"
            v-for="comment in comments"
            :key="comment.id"
        >
			<div class="card-block">
				<p class="card-text">{{ comment.body }}</p>
			</div>
			<div class="card-footer">
				<nuxt-link 
                    class="comment-author"
                    :to="{
                        name: 'profile',
                        params: {
                            username: comment.author.username
                        }
                    }"
                >
					<img
						:src="comment.author.image"
						class="comment-author-img"
					/>
				</nuxt-link>
				<nuxt-link 
                    class="comment-author"
                    :to="{
                        name: 'profile',
                        params: {
                            username: comment.author.username
                        }
                    }"
                >
                {{ comment.author.username }}
				</nuxt-link>
				<span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY')}}</span>
                <span 
                    v-if="comment.author.username === user.username"
                    class="mod-options"
                    @click="onDeleteComment(comment)"
                >
                    <i class="ion-trash-a"></i>
                </span>
			</div>
		</div>
	</div>
</template>

<script>
import { getComments, addComment, deleteComment } from '@/api/article'
import { mapState } from 'vuex'

export default {
    name: 'ArticleComments',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState(['user'])
    },
    data () {
        return {
            comments: [],
            comment: ''
        }
    },
    async mounted () {
        const { data } = await getComments(this.article.slug)
        this.comments = data.comments
    },
    methods: {
        async onPost () {
            try {
                const { data } = await addComment (
                    this.$route.params.slug,
                    {
                        comment: {
                            body: this.comment
                        }
                    }
                )
                this.comments.unshift(data.comment)
                this.comment = ''
            } catch (err) {
                console.log('error: ', err)
            }
        },
        async onDeleteComment (comment) {
            try {
                const { data } = await deleteComment (
                    this.$route.params.slug,
                    comment.id
                )
                this.comments = this.comments.filter(com => com.id !== comment.id)
            } catch (err) {
                console.log('error', err)
            }
        }
    }
};
</script>

<style></style>
