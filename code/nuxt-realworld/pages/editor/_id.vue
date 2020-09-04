<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<form @submit.prevent="onPublish">
						<fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control form-control-lg"
									placeholder="Article Title"
									required
									v-model="article.title"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="What's this article about?"
									required
									v-model="article.description"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control"
									rows="8"
									placeholder="Write your article (in markdown)"
									required
									v-model="article.body"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="Enter tags"
									v-model="tag"
									@keypress="addTag"
								/>
								<div class="tag-list">
									<span class="tag-default tag-pill" v-for="tag in article.tagList" :key="tag">
										<i class="ion-close-round" @click="removeTag(tag)"></i>
										{{ tag }}
									</span>
								</div>
							</fieldset>
							<button class="btn btn-lg pull-xs-right btn-primary">
								Publish Article
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { addArticle, getArticle } from '@/api/article'

export default {
	middleware: 'authenticated',
	name: 'EditorIndex',
	data () {
		return {
			article: {
				title: '',
				description: '',
				body: '',
				tagList: []
			},
			tag: ''
		}
	},
	async mounted () {
		if (this.$route.params.id) {
			const { data } = await getArticle(this.$route.params.id)
			this.article = data.article
		}
	},
	methods: {
		async onPublish () {
			const { data } = await addArticle({
				article: this.article
			})
			this.$router.push(`/article/${data.article.slug}`)
		},
		addTag (event) {
			const { tagList } = this.article
			if (event.keyCode === 13 && this.tag.trim() && !tagList.includes(this.tag)) {
				tagList.push(this.tag.trim())
				this.tag = ''
			}
		},
		removeTag (tag) {
			this.article.tagList = this.article.tagList.filter(t => t !== tag)
		}

	}
}
</script>

<style></style>
