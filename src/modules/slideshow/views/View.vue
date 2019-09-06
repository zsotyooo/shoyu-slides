<template>
  <div ref="wrapper" class="reveal">
      <div class="slides" v-if="currentSlideshow">
        <section v-for="(p, i) in currentSlideshow.slides" :key="`slide-${i}`" data-markdown data-transition="convex-in slide-out" data-transition-speed="slow" data-fullscreen data-separator-notes="^Notes?:">
          <textarea data-template v-html="prepareMarkdown(p.content)">
          </textarea>
        </section>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Ref } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import WebFontLoader from 'webfontloader';
import Reveal from 'reveal.js/js/reveal';
import hljs from 'highlight.js';
import { Slideshow } from '..';
import { SlideshowTheme } from '../types';

const { Getter } = namespace('slideshow');

declare var RevealNotes: any;

(window as any).Reveal = Reveal;

@Component
export default class RevealSlideshow extends Vue {
    @Getter private readonly currentSlideshow!: Slideshow | null;
    @Ref('wrapper') private readonly wrapper!: HTMLDivElement;
    private inited = false;

    @Watch('currentSlideshow')
    private onCurrentSlideshowChanged(slideshow: Slideshow | null) {
        if (slideshow) {
            this.init();
        }
    }

    private async init() {
        if (!this.inited) {
            this.inited = true;
            this.$nextTick(async () => {
                if (this.currentSlideshow) {
                    // WebFontLoader.load({
                    //     google: {
                    //         families: [
                    //             'Source Sans Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i',
                    //         ],
                    //     },
                    // });

                    await this.loadTheme(this.currentSlideshow.theme);
                    if (this.currentSlideshow.imageUrl) {
                        this.wrapper.style.backgroundImage = `url(${this.currentSlideshow.imageUrl})`;
                    }
                    Reveal.initialize({
                        dependencies: [
                            {
                                src: '/js/reveal.js/plugin/markdown/marked.js',
                            },
                            {
                                src: '/js/reveal.js/plugin/markdown/markdown.js',
                            },
                            {
                                src: '/js/reveal.js/plugin/highlight/highlight.js',
                                async: true,
                                callback: () => { hljs.initHighlightingOnLoad(); },
                            },
                            {
                                src: '/js/reveal.js-menu/menu.js',
                            },
                            {
                                src: '/js/reveal.js-plugins/fullscreen/fullscreen.js',
                            },
                            {
                                src: '/js/reveal.js-toolbar/toolbar.js',
                            },
                            {
                                src: '/js/reveal.js/plugin/notes/notes.js',
                                async: true,
                            },
                        ],
                        toolbar: {
                            position: 'bottom',
                            fullscreen: true,
                            overview: true,
                            pause: false,
                            notes: true,
                            help: false,
                            captureMenu: true,
                            capturePlaybackControl: true,
                            loadIcons: false,
                        },
                    });
                }
            });
        }
    }

    private prepareMarkdown(md: string) {
        return md.replace(/\<\|\|\>/g, '<!-- .element: class="fragment" -->');
    }

    private async loadTheme(theme: SlideshowTheme): Promise<void> {
        try {
            await this.loadCss(`/js/reveal.js/css/reset.css`);
            await this.loadCss(`/js/reveal.js/css/reveal.css`);
            await this.loadCss(`/js/reveal.js/css/theme/${theme}.css`);
            await this.loadCss(`/js/highlight.js/styles/github.css`);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    private async loadCss(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const link = document.createElement( 'link' );
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = path;

            link.addEventListener('load', () => resolve());
            link.addEventListener('error', (e) => reject(e));
            document.getElementsByTagName('head')[0].appendChild(link);
        });
    }
}
</script>

<style lang="scss">
    div.reveal {
        background-size: cover;
        background-position: 50% 50%;
    }

    div.reveal .reveal-toolbar .reveal-toolbar-button {
        border: 0;
        background: transparent;
        opacity: 0.3;
        i {
            text-shadow: 1px 1px 3px rgba(0,0,0,.5);
        }
        &:hover {
            opacity: 1;
        }
    }

    .reveal section img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border: 0;
        box-shadow: none;
    }
</style>