<h1>CodePhoto 💻📸</h1>

Create and share images of your source code.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

## Installation
From NPM for use as a command line app:

    npm install codephoto -g

From NPM for programmatic use:

    npm install codephoto

## Usage

Programatic:

```typescript
import codephoto from 'codephoto'

const screenshotBuffer = await codephoto.takeScreenshot('<p>Hello World!</p>', 'html')
// Save the screenshot buffer to a file (e.g., 'screenshot.png')
// Example using the fs module
// fs.writeFileSync('screenshot.png', screenshotBuffer);
```
CLI:

```bash
codephoto [input file]
```
Example:

```bash
codephoto ./code-sample.html
```
All generated images will be saved in the same directory where command was executed.

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes.
4. Push your branch: `git push origin feature-name`.
5. Create a pull request.

## Roadmap

1. **Export in Different Formats:**
   - Enhance the package to support exporting screenshots in various formats such as PNG, JPEG, and SVG.
   - Provide users with options to specify the desired output format according to their needs.

2. **Create Aesthetic Frames for Generated Images:**
   - Introduce the capability to add aesthetic frames or borders to the generated images.
   - Allow users to customize and style the frames to enhance the visual appeal of the screenshots.

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).
