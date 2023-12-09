import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class RecipeDisplayScraperController {
  static async getRecipeDisplay(url) {
    return new Promise((resolve, reject) => {
      const wikibooksUrl = url;
      const pythonScriptPath = join(__dirname, 'recipe-display-scraper.py');

      const py = spawn('python3', [pythonScriptPath, wikibooksUrl]);
      let stdoutData = '';

      py.on('error', (err) => {
        console.error('Failed to start subprocess.');
      });

      py.stdout.on('data', (data) => {
        stdoutData += data.toString();
      });

      py.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      py.on('close', (code) => {
        if (code === 0) {
          resolve(stdoutData);
        } else {
          reject(`Child process exited with non-zero code: ${code}`);
        }
      });
    });
  }
}

export default RecipeDisplayScraperController