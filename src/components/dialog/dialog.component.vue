<template>
    <div class="dialog-container">
        <div class="dialog">
            <div class="header">
                <div class="title">{{title}}</div>
                <div class="close" v-on:click.stop="close">X</div>
            </div>
            <component :is="_component" ref="component"></component>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Dialog',
        props: {
            title: String,
            component: {
                type: Function,
                required: true
            },
            onSuccess: {
                type: Function,
                required: false
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
        methods: {
            close() {
                this.$destroy();
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import './dialog.component';
</style>
