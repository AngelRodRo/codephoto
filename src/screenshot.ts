import puppeteer from 'puppeteer'

import { generateSnippetsTemplate } from '../src/template'

const PUPPETEER_VIEWPORT_WIDTH = 2048
const PUPPETEER_VIEWPORT_HEIGHT = 10000

export const takeScreenshot = async (code: string, lang: string): Promise<Buffer | undefined> => {
  const id = 'code-snippet'
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  })

  const page = await browser.newPage()
  await page.setViewport({
    width: PUPPETEER_VIEWPORT_WIDTH,
    height: PUPPETEER_VIEWPORT_HEIGHT,
    deviceScaleFactor: 2
  })

  try {
    await page.setContent(generateSnippetsTemplate({ id, code, language: lang }))
  } catch (error) {
    console.error('Unexpected error ocurred while creating the page template for the snippet: ', error)
  }

  try {
    const padding = 5
    const selector = `#code-${id}`

    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector)
      if (element == null) { return null }
      const { x, y, width, height } = element.getBoundingClientRect()
      return { left: x, top: y, width, height, id: element.id }
    }, selector)

    if (rect === null) { throw Error(`Could not find element that matches selector: ${selector}.`) }

    const screenshot = await page.screenshot({
      clip: {
        x: rect.left - padding * 2,
        y: rect.top - padding,
        width: rect.width + padding * 4,
        height: rect.height - padding
      }
    })

    return screenshot
  } catch (error) {
    console.error('Unexpected error ocurred while taking a screenshot for the code snippet: ', error)
  } finally {
    await browser.close()
  }
}
