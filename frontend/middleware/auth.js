export default ({ store, redirect }) => {
    // Checks if a variable is not null
    // if not, means that user is logged
    if (!store.getters['auth/check']) {
        return redirect('/login')
    }
}