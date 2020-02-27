import * as core from '@actions/core'
//import {execFile} from 'child_process'

async function run(): Promise<void> {
  try {
    /*const processPromise = new Promise((resolve, reject) => {
      const requiredOption: core.InputOptions = {
        required: true
      }
      const zipFile = core.getInput('zipFile', requiredOption)
      core.info(`zipFile: ${zipFile}`)
      const packageType = core.getInput('packageType') || 'Both'
      core.info(`packageType: ${packageType}`)
      const folder = core.getInput('folder', requiredOption)
      core.info(`folder: ${folder}`)
      const process = execFile('./core-tools/SolutionPackager.exe', [
        '/action:Pack',
        `/zipfile:${zipFile}`,
        `/packagetype:${packageType}`,
        `/folder:${folder}`
      ])
      process.stdout?.addListener('data', core.info)
      process.addListener('error', error => reject(error.message))
      process.addListener('exit', resolve)
    })
    await processPromise*/
    const requiredOption: core.InputOptions = {
      required: true
    }
    const zipFile = core.getInput('zipFile', requiredOption)
    core.info(`zipFile: ${zipFile}`)
    const packageType = core.getInput('packageType') || 'Both'
    core.info(`packageType: ${packageType}`)
    const folder = core.getInput('folder', requiredOption)
    core.info(`folder: ${folder}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
