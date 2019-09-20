import Popup from './popup.component.vue';

function createPopup(Vue, {store = {}, router = {}}, options) {
    let popup = new Vue({
        name: 'new-popup',
        router,
        store,
        data() {
            return {
                options: { ...options }
            }
        },
        render(h) {
            return h(Popup, {
                props: this.options
            })
        }
    });

    popup.$mount();
    document.body.appendChild(popup.$el);
}

export default {
    install(Vue, options = {}) {
        Vue.prototype.$popup = createPopup.bind(this, Vue, options);
    }
}
