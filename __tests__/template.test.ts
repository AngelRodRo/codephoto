import fs from 'fs'
import path from 'path'
import { minify } from 'uglify-js'
import { getCodeSnippetHtmlSection, getHeadHtmlSection, getScriptsHtmlSection, htmlEntities } from '../src/template'

test('return head html with default styles', () => {
  const cssFile = fs.readFileSync(path.resolve(__dirname, './assets/prism.css'), 'utf-8')
  const minifiedCss = cssFile.toString().replace(/\s+/g, '')

  const expectedTemplate = `
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
            ${minifiedCss}
        </style>
    </head>
  `

  expect(getHeadHtmlSection().replace(/\s+/g, '')).toBe(expectedTemplate.replace(/\s+/g, ''))
})

test('return html with default scripts', () => {
  const jsFile = fs.readFileSync(path.resolve(__dirname, './assets/prism.js'), 'utf-8')
  const minifiedJs = minify(jsFile)

  const expectedTemplate = `
    <script>
      ${minifiedJs.code}
    </script>
   `

  expect(getScriptsHtmlSection().replace(/\s+/g, '')).toBe(expectedTemplate.replace(/\s+/g, ''))
})

test('return html section with code snippet content ', () => {
  const expectedTemplate = `
  <div>
  <pre>
    <code id="code-1" class="language-html">
${htmlEntities('<p>Hello World !</p>')}
    </code>
  </pre>
</div>
     `

  expect(getCodeSnippetHtmlSection('1', '<p>Hello World !</p>', 'html').replace(/\s+/g, '')).toBe(expectedTemplate.replace(/\s+/g, ''))
})
