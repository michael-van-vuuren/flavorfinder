import { spawnSync } from 'child_process';

export default class RecipeDisplayScraperController {
    static async getRecipeDisplay(url) {
        const wikibooksUrl = url;
        console.log('visiting', url)

        const pythonProcess = spawnSync('python', ['./recipe-display-scraper.py', wikibooksUrl]);

        if (pythonProcess.error) {
            console.error(`python process error: ${pythonProcess.error.message}`);
        }
        if (pythonProcess.stdout) {
            console.log(`python script stdout: ${pythonProcess.stdout}`);
            return pythonProcess.stdout.toString()
        }
        if (pythonProcess.stderr) {
            console.error(`python script errors: ${pythonProcess.stderr}`);
        }
        console.log(`python script exit code: ${pythonProcess.status}`);
    }
}