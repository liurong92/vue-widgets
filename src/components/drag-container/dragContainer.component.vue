<template>
    <div ref="container" @mousedown="onMouseStart" @mousemove="onMouseMove" @mouseup="onMouseEnd">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isDragging: false,
                mouseX: 0,
                mouseY: 0,
                containerX: 0,
                containerY: 0
            }
        },
        methods: {
            onMouseStart(e) {
                this.isDragging = true;
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.containerX = parseInt(this.$refs.container.style.left) || 0;
                this.containerY = parseInt(this.$refs.container.style.top) || 0;
            },
            onMouseMove(e) {
                if (this.isDragging) {
                    const xOffset = e.clientX - this.mouseX;
                    const yOffset = e.clientY - this.mouseY;
                    this.$refs.container.style.left = this.containerX + xOffset + 'px';
                    this.$refs.container.style.top = this.containerY + yOffset + 'px';
                }
            },
            onMouseEnd() {
                this.isDragging = false;
                this.mouseX = 0;
                this.mouseY = 0;
            }
        }
    };
</script>
