<template>
    <div class="popup">
        <component class="body" :is="_component" ref="component" :style="{top: offsetTop, left: offsetLeft}"></component>
        <div class="mask" v-on:click="removeEvent"></div>
    </div>
</template>

<script>
    export default {
        name: 'Popup',
        props: {
            element: Element,
            component: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                offsetLeft: '',
                offsetTop: '',
                preZIndex: 0
            }
        },
        computed: {
            _component() {
                const fn = this.component;
                let vNode;
                const that = this;
                return {
                    name: 'Child-component',
                    render() {
                        vNode = fn();

                        let listeners = vNode.componentOptions.listeners;
                        if (!listeners) {
                            listeners = {};
                            vNode.componentOptions.listeners = listeners;
                        }

                        const originCancelHandler = listeners.cancel;
                        listeners.cancel = function() {
                            if (originCancelHandler) originCancelHandler();
                            that.close();
                        };

                        const originDoneHandler = listeners.done;
                        listeners.done = function() {
                            if (originCancelHandler) originDoneHandler();
                            if (that.onSuccess) that.onSuccess();
                            that.close();
                        };

                        return vNode
                    }
                }
            }
        },
        mounted() {
            this.generatePosition();
        },
        created() {
            this.element.addEventListener('mouseleave', this.removeEvent);
        },
        destroyed() {
            this.element.removeEventListener('mouseleave', this.removeEvent);
        },
        methods: {
            removeEvent() {
                if (this.$el.parentNode) {
                    this.$el.parentNode.removeChild(this.$el);
                    this.element.style.zIndex = 0;
                }
            },
            generatePosition(element) {
                const { clientHeight, clientWidth } = this.element;
                this.preZIndex = this.element.style.zIndex;
                this.element.style.zIndex = 200;

                const offsetTop = this.calculator(element, 'offsetParent', 'offsetTop');
                const offsetLeft = this.calculator(element, 'offsetParent', 'offsetLeft');
                const scrollTop = this.calculator(element, 'parentElement', 'scrollTop');
                this.offsetTop = `${5 + offsetTop + clientHeight - scrollTop}px`;
                this.offsetLeft = `${5 + offsetLeft + clientWidth}px`;
            },
            calculator(element, node, key) {
                let result = 0;
                do {
                    if (element[node] === null) {
                        result += element[key];
                    }
                } while (element = element[node])

                return result;
            }

        }
    };
</script>

<style lang="scss" scoped>
    @import 'popup.component';
</style>
