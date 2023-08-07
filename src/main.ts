import { Plugin } from 'obsidian';
import ExerciseProcessor from './exercises';

export default class ObsidianExercises extends Plugin {

	async onload() {
		this.registerMarkdownCodeBlockProcessor("exercise", ExerciseProcessor);
	}

}
