import { defineConfig } from 'vite'

import { createHtmlPlugin } from 'vite-plugin-html'

// import htmlPurge from 'vite-plugin-html-purgecss'

export default defineConfig({
    base: "/2024-2-VK-EDU-Frontend-R-Gilemshin",

    plugins: [
        createHtmlPlugin({

            template: 'src/index.html',

            entry: "/src"

        }),
        // htmlPurge()
]
})
