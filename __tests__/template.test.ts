import { generateSnippetsTemplate, htmlEntities } from '../src/template'

test('return main code template', () => {
  expect(generateSnippetsTemplate({ code: '<p>Hello World!</p>', language: 'html', id: '1' })).toBe(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
                rel="stylesheet"
                href="../statics/prism.css"
            />
        </head>
        <body style="padding: 40px 0">
            <div>
                <pre>
                    <code id="code-1" class="language-html">
                        ${htmlEntities('<p>Hello World!</p>')}
                    </code>
                </pre>
            </div>
            <script src="../statics/prism.js"></script>
        </body>
    </html>
  `)
})
