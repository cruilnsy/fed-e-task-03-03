/**
 * 验证是否登录的中间件
 */
export default function ( { store, redirect }) {
    // if the user is not authenticated
    // 想保护谁，这个中间件给谁
    if (store.state.user) {
        return redirect('/')
    }
}