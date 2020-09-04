<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>
					<ul class="error-messages">
						<template  v-for="(messages, field) in errors">
							<li v-for="(message, index) in messages" :key="index">
								{{ field }} {{ message }}
							</li>
						</template>
					</ul>
					<form @submit.prevent="onUpdate">
						<fieldset>
							<fieldset class="form-group">
								<input
									v-model="user.image"
									class="form-control"
									type="text"
									placeholder="URL of profile picture"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									v-model="user.username"
									class="form-control form-control-lg"
									type="text"
									placeholder="Your Name"
									required
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									v-model="user.bio"
									class="form-control form-control-lg"
									rows="8"
									placeholder="Short bio about you"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									v-model="user.email"
									class="form-control form-control-lg"
									type="text"
									placeholder="Email"
									required
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
								v-model="user.password"
									class="form-control form-control-lg"
									type="password"
									placeholder="Password"
									required
								/>
							</fieldset>
							<button class="btn btn-lg btn-primary pull-xs-right">
								Update Settings
							</button>
						</fieldset>
					</form>
					<hr>
					<button 
						class="btn btn-outline-danger"
						@click="logout"
					>
						Or click here to logout.
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { update, getProfile } from '@/api/user'
import { mapState } from 'vuex'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
	middleware: 'authenticated',
	name: 'settingsIndex',
	data () {
		return {
			user: {
				image: '',
				bio: '',
				email: '',
				username: '',
				password: ''
			},
			errors: {}
		}
	},
	computed: {
		...mapState({stateUser: 'user' })
	},
	mounted () {
		this.user = Object.assign({}, this.stateUser)
	},
	methods: {
		async onUpdate () {
			try {
				const { data } = await update({
					user: this.user
				})
				this.$store.commit('setUser', data.user)
				Cookie.set('user', data.user)
				this.$router.push(`/profile/${data.user.username}`)
			} catch (err) {
				this.errors = err.response.data.errors
			}
		},
		logout () {
			Cookie.remove('user')
			this.$store.commit('setUser', null)
			this.$router.push('/')
		}
	}
};
</script>

<style></style>
