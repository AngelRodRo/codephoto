<h1>CodeShot 💻📸</h1>

Codeshot is a NPM package to take screenshot from code snippets file from your terminal or using plain text.

## Installation
Use NPM to install codeshot:

    npm install codeshot

Or if you want to use globally in your terminal:

    npm install --global codeshot

## Usage

Programatically:

```typescript
import codeshot from 'codeshot'

const screenshotBuffer = await codeshot.takeScreenshot('<p>Hello World!</p>', 'html')
// You can save buffer in a file
```
CLI:

```bash
  codeshot ./code-sample.html
```
