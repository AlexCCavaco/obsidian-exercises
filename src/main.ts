import { MarkdownPostProcessorContext, Plugin } from 'obsidian';
import ExerciseProcessor from './exercises';

export default class ObsidianExercises extends Plugin {

	async onload() {
		this.registerMarkdownCodeBlockProcessor(
			"exercise",
			(data:string,elm:HTMLElement,ctx:MarkdownPostProcessorContext)=>ExerciseProcessor(this.app,data,elm,ctx)
		);
	}

}
