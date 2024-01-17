import fs from 'fs'
import path from 'path'
import { minify } from 'uglify-js'

interface CodeSnippetParams {
  id: string
  code: string
  language: string
}

export const htmlEntities = (str: string): string => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const getHeadHtmlSection = (): string => {
  const cssFile = fs.readFileSync(path.resolve(__dirname, './statics/prism.css'), 'utf-8')
  const minifiedCss = cssFile.replace(/\s+/g, '')
  return `
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        ${minifiedCss}
      </style>
    </head>
  `
}

export const getScriptsHtmlSection = (): string => {
  const jsFile = fs.readFileSync(path.resolve(__dirname, './statics/prism.js'), 'utf8')
  const minifiedJs = minify(jsFile) // TODO: Implement a correct method to minimize js file

  return `
    <script>
      ${minifiedJs.code}
    </script>
  `
}

export const getCodeSnippetHtmlSection = (id: string, code: string, language: string): string => {
  return `
    <div>
      <pre>
        <code id="code-${id}" class="language-${language}">
${htmlEntities(code)}
        </code>
      </pre>
    </div>
  `
}

export const generateSnippetsTemplate = ({ id, code, language }: CodeSnippetParams): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
        ${getHeadHtmlSection()}
        <body style="padding: 40px 0">
            ${getCodeSnippetHtmlSection(id, code, language)}
            ${getScriptsHtmlSection()}
        </body>
    </html>
  `
}
