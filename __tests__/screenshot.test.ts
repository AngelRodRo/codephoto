import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'
import { takeScreenshot } from '../src/screenshot'
import pixelmatch from 'pixelmatch'

jest.useFakeTimers()

test('return code snippet screenshot path', async () => {
  const screenshotBuffer = await takeScreenshot('<p>Hello World!</p>', 'html')
  const referenceImageBuffer = fs.readFileSync(path.resolve(__dirname, './assets/sample/screenshot.png'))

  if (screenshotBuffer != null) {
    const referenceImage = PNG.sync.read(referenceImageBuffer)
    const capturedImage = PNG.sync.read(screenshotBuffer)

    const diffImage = new PNG({ width: referenceImage.width, height: referenceImage.height })
    const diffPixels = pixelmatch(referenceImage.data, capturedImage.data, diffImage.data, referenceImage.width, referenceImage.height, { threshold: 0.1 })
    const threshold = 100

    expect(diffPixels).toBeLessThan(threshold)
  }
})
