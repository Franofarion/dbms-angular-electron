import { app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

const SUB_FOLDER = 'appStorage';

console.log(SUB_FOLDER);

export class FileStorage<T> {
  private filePath: string;

  constructor(filename: string) {
    // Define the path for the sub-folder within userData
    const userDataPath = app.getPath('userData');
    const subFolderPath = path.join(userDataPath, SUB_FOLDER); // Change 'myAppData' to your preferred sub-folder name

    // Ensure the sub-folder exists
    if (!fs.existsSync(subFolderPath)) {
      fs.mkdirSync(subFolderPath);
    }

    // Set the file path within the sub-folder
    this.filePath = path.join(subFolderPath, `${filename}.json`);
  }

  // Load data from file
  load(): T {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as T;
      }
      return {} as T;
    } catch (error) {
      console.error(`Error loading data from ${this.filePath}:`, error);
      return {} as T;
    }
  }

  // Save data to file
  save(data: T) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error(`Error saving data to ${this.filePath}:`, error);
    }
  }
}
