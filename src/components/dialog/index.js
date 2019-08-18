import Dialog from './dialog.component.vue';

function createDialog(Vue, {store = {}, router = {}}, options) {
    let dialog = new Vue({
        name: 'new-dialog',
        router,
        store,
        data() {
            return {
                options: { ...options }
            }
        },
        render(h) {
            return h(Dialog, {
                props: this.options
            })
        }
    });

    dialog.$mount();
    document.body.appendChild(dialog.$el);
}

export default {
    install(Vue, options = {}) {
        Vue.prototype.$dialog = createDialog.bind(this, Vue, options);
    }
}
