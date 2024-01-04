interface CodeSnippetParams {
  id: string
  code: string
  language: string
}

export const htmlEntities = (str: string): string => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const generateSnippetsTemplate = ({ id, code, language }: CodeSnippetParams): string => {
  return `
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
                    <code id="code-${id}" class="language-${language}">
                        ${htmlEntities(code)}
                    </code>
                </pre>
            </div>
            <script src="../statics/prism.js"></script>
        </body>
    </html>
  `
}
