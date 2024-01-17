#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { object, string } from 'yup'
import { green, bold } from 'colorette'
import { takeScreenshot } from './src/screenshot'

const schema = object().shape({
  codePath: string().required('Code Path is required')
})

const start = async (): Promise<void> => {
  const [, , codePath] = process.argv
  console.log(bold(green('Starting screenshot service... 🚀')))
  try {
    await schema.validate({ codePath })
    const code = fs.readFileSync(codePath, 'utf-8')
    const lang = path.extname(codePath).replace('.', '')
    console.log(bold(green('Taking screenshot... 📸')))
    const screenshotBuffer = await takeScreenshot(code, lang)
    const screenshotPath = path.resolve(process.cwd(), 'screenshot.png')
    if (screenshotBuffer !== undefined) {
      fs.writeFileSync(screenshotPath, screenshotBuffer)
      console.log(bold(green('Screenshot was taken and saved in: ')) + `${screenshotPath} 🙂`)
    }
  } catch (error) {
    console.error(error)
  }
}

start()
