class DOMHelper {
	static moveElement(elementID, newDestinationSelector) {
		const element = document.getElementById(elementID);
		const destinationEl = document.querySelector(newDestinationSelector);
		destinationEl.append(element);
	}
}

class ToolTip {}

class ProjectItem {
	constructor(id, updateProjectListsFunction) {
		this.id = id;
		this.updateProjectListsHandler = updateProjectListsFunction;
		this.connectMoreInfoBtn();
		this.connectSwitchBtn();
	}

	connectMoreInfoBtn() {}

	connectSwitchBtn() {
		const projectItemEl = document.getElementById(this.id);
		const switchBtn = projectItemEl.querySelector('button:last-of-type');

		switchBtn.addEventListener(
			'click',
			this.updateProjectListsHandler.bind(null, this.id)
		);
	}
}

class ProjectList {
	projects = [];

	constructor(type) {
		this.type = type;
		const prjItems = document.querySelectorAll(`#${type}-projects li`);

		for (const prjItem of prjItems) {
			this.projects.push(
				new ProjectItem(prjItem.id, this.switchProject.bind(this))
			);
		}
		console.log(this.projects);
	}

	setSwitchHandlerFunction(switchHandlerFunction) {
		this.switchHandlerFunction = switchHandlerFunction;
	}

	// add project to finished projects ist
	addProject(project) {
		this.projects.push(project);
		DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
	}

	// remove project from projects list
	switchProject(projectId) {
		console.log(projectId);
		this.switchHandlerFunction(this.projects.find((p) => p.id === projectId));
		const projectIndex = this.projects.findIndex((p) => p.id === projectId);
		this.projects.splice(projectIndex);
	}
}

class App {
	static init() {
		const activeProjectList = new ProjectList('active');
		const finishedProjectList = new ProjectList('finished');

		activeProjectList.setSwitchHandlerFunction(
			finishedProjectList.addProject.bind(finishedProjectList)
		);
		finishedProjectList.setSwitchHandlerFunction(
			activeProjectList.addProject.bind(activeProjectList)
		);
	}
}

App.init();
