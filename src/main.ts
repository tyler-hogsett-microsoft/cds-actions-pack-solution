import * as core from '@actions/core'
import {execFile} from 'child_process'
import {join} from 'path'

async function run(): Promise<void> {
  try {
    const processPromise = new Promise((resolve, reject) => {
      const requiredOption: core.InputOptions = {
        required: true
      }
      const zipFile = core.getInput('zipFile', requiredOption)
      core.info(`zipFile: ${zipFile}`)
      const packageType = core.getInput('packageType') || 'Both'
      core.info(`packageType: ${packageType}`)
      const folder = core.getInput('folder', requiredOption)
      core.info(`folder: ${folder}`)
      core.info('running solution packager')
      const solutionPackagerPath = join(
        __dirname,
        '../',
        '/core-tools/SolutionPackager.exe'
      )
      const process = execFile(solutionPackagerPath, [
        '/action:Pack',
        `/zipfile:${zipFile}`,
        `/packagetype:${packageType}`,
        `/folder:${folder}`
      ])
      process.stdout?.addListener('data', core.info)
      process.stdout?.addListener('error', error => {
        core.info(error.message)
        core.error(error.message)
        core.setFailed(error.message)
        reject(error)
      })
      core.info(`process.stdout: ${process.stdout}`)

      const createEventHandler = (event: string): ((code: number) => void) => (
        code: number
      ): void => {
        core.info(`event: ${event}, code: ${code}`)
      }
      process.addListener('close', createEventHandler('close'))
      process.addListener('disconnect', createEventHandler('disconnect'))
      process.addListener('error', createEventHandler('error'))
      process.addListener('message', createEventHandler('message'))
      process.addListener('exit', code => {
        core.info(`solution packager exited. error code: ${code}`)
        resolve()
      })
    })
    await processPromise.catch(error => {
      core.error(error)
      throw error
    })
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

run()
